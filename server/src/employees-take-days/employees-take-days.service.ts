import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeTakeDay } from './employees-take-days.model';

@Injectable()
export class EmployeesTakeDaysService {
  constructor(
    @InjectModel(EmployeeTakeDay)
    private employeeTakeDayRepository: typeof EmployeeTakeDay,
  ) {}

  async getTakeDaysIdsByEmployeeId(employeeId: number) {
    return this.employeeTakeDayRepository.findAll({
      where: { employeeId },
      attributes: ['takeDayId'],
    });
  }

  async getEmployeesIdsByTakeDayId(takeDayId: number) {
    return this.employeeTakeDayRepository.findAll({
      where: { takeDayId },
      attributes: ['employeeId'],
    });
  }
}
