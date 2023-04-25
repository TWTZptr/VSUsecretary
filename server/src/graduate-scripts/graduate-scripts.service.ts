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
import { Op } from 'sequelize';
import { SetEmployeeExtraInfoDto } from './dto/set-employee-extra-info.dto';
import { StudentsService } from '../students/students.service';

@Injectable()
export class GraduateScriptsService {
  constructor(
    @InjectModel(GraduateScript)
    private graduateScriptRepository: typeof GraduateScript,
    private readonly employeesGraduateScriptsService: EmployeesGraduateScriptsService,
    private readonly employeesService: EmployeesService,
    private readonly studentsService: StudentsService,
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

  async getGraduateScriptById(id: number, attributes = null) {
    return this.graduateScriptRepository.findByPk(id, { attributes });
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
        order: ['id'],
      });
    }

    return this.graduateScriptRepository.findAll({
      order: ['id'],
      where: {
        date: {
          [Op.gte]: `${year}-01-01`,
          [Op.lte]: `${year}-12-31`,
        },
      },
    });
  }

  async getAllEmployeesByGraduateScript(id: number) {
    const employeesGraduateScripts =
      await this.employeesGraduateScriptsService.getEmployeesIdsByGraduateScriptId(
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
      chairman = await this.employeesService.findEmployeeById(
        chairmanGraduateScript.employeeId,
      );
    }

    if (secretaryGraduateScript) {
      secretary = await this.employeesService.findEmployeeById(
        secretaryGraduateScript.employeeId,
      );
    }

    for (const emp of commissionGraduateScript) {
      if (emp) {
        commission.push(
          await this.employeesService.findEmployeeById(emp.employeeId),
        );
      } else {
        commission.push(emp);
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
      order: ['index'],
    });
  }
}
