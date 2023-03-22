import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeGraduateScript } from './employees-graduate-scripts.model';

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

  async getEmployeesIdsByGraduateScriptId(graduateScriptId: number) {
    return this.employeeGraduateScriptRepository.findAll({
      where: { graduateScriptId },
      attributes: ['employeeId'],
    });
  }
}
