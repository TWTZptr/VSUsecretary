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

  async getAllGraduateScripts() {
    return this.graduateScriptRepository.findAll({
      order: ['id'],
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
    const commissionGraduateScript = employeesGraduateScripts.filter(
      (rec) => rec.role === EMPLOYEE_ROLES.COMMISSION_MEMBER,
    );

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

    if (commissionGraduateScript.length) {
      for (const emp of commissionGraduateScript) {
        commission.push(await this.employeesService.findEmployeeById(emp.id));
      }
    }

    return { chairman, secretary, commission };
  }

  async validateEmployeeAndGraduateScriptExist(employeeId, graduateScriptId) {
    const employee = await this.employeesService.isEmployeeExists(employeeId);
    if (!employee) {
      return new BadRequestException(UNEXIST_EMPLOYEE_ID_MSG);
    }

    const graduateScript = await this.findGraduateScriptById(graduateScriptId);
    if (!graduateScript) {
      return new BadRequestException(UNEXIST_GRADUATE_SCRIPT_ID_MSG);
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
}
