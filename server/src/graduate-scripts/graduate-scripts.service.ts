import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGraduateScriptDto } from './dto/create-graduate-script.dto';
import { UpdateGraduateScriptDto } from './dto/update-graduate-script.dto';
import { GraduateScript } from './graduate-scripts.model';
import { UNEXIST_GRADUATE_SCRIPT_ID_MSG } from './constants';
import { EmployeesGraduateScriptsService } from '../employees-graduate-scripts/employees-graduate-scripts.service';
import { EmployeesService } from '../employees/employees.service';
import { UNEXIST_EMPLOYEE_ID_MSG } from '../employees/constants';
import { EMPLOYEE_ROLES } from '../employees-graduate-scripts/enums';
import { SetGraduateScriptCommissionMemberDto } from './dto/set-graduatescript-commission-member.dto';
import { FindOptions, Op } from 'sequelize';
import { SetEmployeeExtraInfoDto } from './dto/set-employee-extra-info.dto';
import { Direction } from '../directions/directions.model';
import { EducationLevel } from '../education-levels/education-levels.model';

@Injectable()
export class GraduateScriptsService {
  constructor(
    @InjectModel(GraduateScript)
    private graduateScriptRepository: typeof GraduateScript,
    private readonly employeesGraduateScriptsService: EmployeesGraduateScriptsService,
    private readonly employeesService: EmployeesService,
  ) {}

  async createGraduateScript(dto: CreateGraduateScriptDto) {
    return this.graduateScriptRepository.create(dto);
  }

  async updateGraduateScript(dto: UpdateGraduateScriptDto) {
    const [affectedCount] = await this.graduateScriptRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
    }
    return this.getGraduateScriptById(dto.id);
  }

  async getGraduateScriptById(
    id: number,
    options: FindOptions<GraduateScript> = {},
  ) {
    return this.graduateScriptRepository.findByPk(id, options);
  }

  async findGraduateScriptById(id: number) {
    const graduateScript = await this.getGraduateScriptById(id);

    if (!graduateScript) {
      throw new NotFoundException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
    }

    return graduateScript;
  }

  async deleteGraduateScriptById(id: number) {
    const affectedCount = await this.graduateScriptRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
    }
  }

  async isGraduateScriptExists(id: number) {
    return id && (await this.getGraduateScriptById(id));
  }

  getAllGraduateScripts(year?: number) {
    if (!year) {
      return this.graduateScriptRepository.findAll({
        order: ['date'],
      });
    }

    return this.graduateScriptRepository.findAll({
      order: ['date'],
      where: {
        date: {
          [Op.gte]: `${year}-01-01`,
          [Op.lte]: `${year}-12-31`,
        },
      },
      include: { model: Direction, include: [EducationLevel] },
    });
  }

  async getAllEmployeesByGraduateScript(id: number) {
    const employeesGraduateScripts =
      await this.employeesGraduateScriptsService.getEmployeesByGraduateScriptId(
        id,
      );

    const chairmanGraduateScript = employeesGraduateScripts.find(
      (rec) => rec.role === EMPLOYEE_ROLES.CHAIRMAN,
    );
    const secretaryGraduateScript = employeesGraduateScripts.find(
      (rec) => rec.role === EMPLOYEE_ROLES.SECRETARY,
    );

    const commissionGraduateScript = Array(5).fill(null);

    const unsortedEmployees = employeesGraduateScripts.filter(
      (rec) => rec.role === EMPLOYEE_ROLES.COMMISSION_MEMBER,
    );

    for (const emp of unsortedEmployees) {
      commissionGraduateScript[emp.index] = emp;
    }

    let chairman = null;
    let secretary = null;
    const commission = [];

    if (chairmanGraduateScript) {
      const plainChairman = await chairmanGraduateScript.$get('employee', {
        raw: true,
      });
      chairman = {
        ...chairmanGraduateScript.get({ plain: true }),
        ...plainChairman,
      };
    }

    if (secretaryGraduateScript) {
      const plainSecretary = await secretaryGraduateScript.$get('employee', {
        raw: true,
      });
      secretary = {
        ...secretaryGraduateScript.get({ plain: true }),
        ...plainSecretary,
      };
    }

    for (const emp of commissionGraduateScript) {
      if (emp) {
        const plainEmp = await emp.$get('employee', { raw: true });
        commission.push({
          ...emp.get({ plain: true }),
          ...plainEmp,
        });
      }
    }

    return { chairman, secretary, commission };
  }

  async validateEmployeeAndGraduateScriptExist(employeeId, graduateScriptId) {
    const existRecord =
      await this.employeesGraduateScriptsService.getEmployeeGraduateScript(
        employeeId,
        graduateScriptId,
      );

    if (existRecord) {
      await existRecord.destroy();
      return;
    }

    const employee = await this.employeesService.isEmployeeExists(employeeId);
    if (!employee) {
      throw new BadRequestException(UNEXIST_EMPLOYEE_ID_MSG);
    }

    const graduateScript = await this.findGraduateScriptById(graduateScriptId);
    if (!graduateScript) {
      throw new BadRequestException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
    }
  }

  async setGraduateScriptChairman(
    graduateScriptId: number,
    chairmanId: number,
  ) {
    await this.validateEmployeeAndGraduateScriptExist(
      chairmanId,
      graduateScriptId,
    );

    return this.employeesGraduateScriptsService.setChairman(
      chairmanId,
      graduateScriptId,
    );
  }

  async setGraduateScriptSecretary(
    graduateScriptId: number,
    secretaryId: number,
  ) {
    await this.validateEmployeeAndGraduateScriptExist(
      secretaryId,
      graduateScriptId,
    );

    return this.employeesGraduateScriptsService.setSecretary(
      secretaryId,
      graduateScriptId,
    );
  }

  async setGraduateScriptCommissionMember(
    graduateScriptId: number,
    { employeeId, index }: SetGraduateScriptCommissionMemberDto,
  ) {
    await this.validateEmployeeAndGraduateScriptExist(
      employeeId,
      graduateScriptId,
    );

    return this.employeesGraduateScriptsService.setCommissionMember(
      employeeId,
      graduateScriptId,
      index,
    );
  }

  async findEmployeeByIdWithGraduateScriptInfo(
    employeeId: number,
    graduateScriptId: number,
  ) {
    return this.employeesService.findEmployeeByIdWithGraduateScriptInfo(
      employeeId,
      graduateScriptId,
    );
  }

  saveExtraEmployeeInfo(
    employeeId: number,
    graduateScriptId: number,
    setEmployeeExtraInfoDto: SetEmployeeExtraInfoDto,
  ) {
    return this.employeesGraduateScriptsService.saveExtraInfo(
      employeeId,
      graduateScriptId,
      setEmployeeExtraInfoDto,
    );
  }

  getExtraEmployeeInfo(employeeId: number, graduateScriptId: number) {
    return this.employeesGraduateScriptsService.getEmployeeGraduateScript(
      employeeId,
      graduateScriptId,
    );
  }

  async getStudentsByGraduateScriptId(graduateScriptId: number) {
    const graduateScript = await this.findGraduateScriptById(graduateScriptId);
    if (!graduateScript) {
      throw new BadRequestException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
    }

    return graduateScript.$get('students', {
      include: ['degreeWork'],
      order: ['index', 'lastname'],
    });
  }

  async getGraduateScriptNumber(graduateScriptId: number) {
    const graduateScript = await this.findGraduateScriptById(graduateScriptId);
    const startOfTheYear = `${graduateScript.date.slice(0, 4)}-01-01`;

    const graduateScriptsPrev = await this.graduateScriptRepository.findAll({
      where: {
        date: {
          [Op.gte]: startOfTheYear,
          [Op.lt]: graduateScript.date,
        },
      },
    });

    return graduateScriptsPrev.length + 1;
  }

  getGraduateScriptsByOptions(options: FindOptions<GraduateScript>) {
    return this.graduateScriptRepository.findAll(options);
  }

  async useLastUsedEmployeesInfo(graduateScriptId: number) {
    const gs = await this.findGraduateScriptById(graduateScriptId);

    if (!gs) {
      throw new BadRequestException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
    }

    const prevGs = await this.graduateScriptRepository.findOne({
      order: [['date', 'DESC']],
      where: {
        date: {
          [Op.lt]: gs.date,
        },
      },
    });

    if (!prevGs) {
      return;
    }

    return this.employeesGraduateScriptsService.setEmployeesLastInfo(
      gs.id,
      prevGs.id,
    );
  }
}
