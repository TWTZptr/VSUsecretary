import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeGraduateScript } from './employees-graduate-scripts.model';
import { EMPLOYEE_ROLES } from './enums';
import { SetEmployeeExtraInfoDto } from '../graduate-scripts/dto/set-employee-extra-info.dto';
import { FindOptions } from 'sequelize';

@Injectable()
export class EmployeesGraduateScriptsService {
  constructor(
    @InjectModel(EmployeeGraduateScript)
    private employeeGraduateScriptRepository: typeof EmployeeGraduateScript,
  ) {}

  async getGraduateScriptsIdsByEmployeeId(employeeId: number) {
    return this.employeeGraduateScriptRepository.findAll({
      where: { employeeId },
      attributes: ['graduateScriptId'],
    });
  }

  async getEmployeesByGraduateScriptId(graduateScriptId: number) {
    return this.employeeGraduateScriptRepository.findAll({
      where: { graduateScriptId },
    });
  }

  private async setEmployee(
    employeeId: number,
    graduateScriptId: number,
    employeeRole: EMPLOYEE_ROLES.SECRETARY | EMPLOYEE_ROLES.CHAIRMAN,
  ) {
    const currentEmployee = await this.employeeGraduateScriptRepository.findOne(
      {
        where: { employeeId, role: employeeRole },
      },
    );

    if (currentEmployee) {
      await currentEmployee.destroy();
    }

    return this.employeeGraduateScriptRepository.create({
      graduateScriptId,
      employeeId,
      role: employeeRole,
    });
  }

  setChairman(employeeId: number, graduateScriptId: number) {
    return this.setEmployee(
      employeeId,
      graduateScriptId,
      EMPLOYEE_ROLES.CHAIRMAN,
    );
  }

  setSecretary(employeeId: number, graduateScriptId: number) {
    return this.setEmployee(
      employeeId,
      graduateScriptId,
      EMPLOYEE_ROLES.SECRETARY,
    );
  }

  setCommissionMember(
    employeeId: number,
    graduateScriptId: number,
    index: number,
  ) {
    return this.employeeGraduateScriptRepository.create({
      employeeId,
      graduateScriptId,
      role: EMPLOYEE_ROLES.COMMISSION_MEMBER,
      index,
    });
  }

  getEmployeeGraduateScript(
    employeeId: number,
    graduateScriptId: number,
    options = {},
  ) {
    return this.employeeGraduateScriptRepository.findOne({
      where: {
        employeeId,
        graduateScriptId,
      },
      ...options,
    });
  }

  saveExtraInfo(
    employeeId: number,
    graduateScriptId: number,
    setEmployeeExtraInfoDto: SetEmployeeExtraInfoDto,
  ) {
    return this.employeeGraduateScriptRepository.update(
      setEmployeeExtraInfoDto,
      {
        where: { employeeId, graduateScriptId },
      },
    );
  }

  getEmployeeGraduateScriptByOptions(
    options: FindOptions<EmployeeGraduateScript>,
  ) {
    return this.employeeGraduateScriptRepository.findOne(options);
  }
}
