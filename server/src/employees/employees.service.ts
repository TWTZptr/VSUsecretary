import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employees.model';
import { UNEXIST_EMPLOYEE_ID_MSG } from './constants';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { TakeDay } from '../take-days/take-days.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);
    return employee;
  }

  async findEmployeeById(id: number) {
    const employee = await this.getEmployeeById(id);
    if (!employee) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }

    return employee;
  }

  async getEmployeeById(id: number, attributes = null) {
    return this.employeeRepository.findByPk(id, { attributes });
  }

  async updateEmployee(dto: UpdateEmployeeDto) {
    const [affectedCount] = await this.employeeRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }
    const employee = await this.getEmployeeById(dto.id);
    return employee;
  }

  async deleteEmployeeById(id: number) {
    const affectedCount = await this.employeeRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }
  }

  async addTakeDayToEmployee(employee: Employee, takeDay: TakeDay) {
    await employee.$add('takeDays', takeDay);
    const updatedEmployee = this.getEmployeeById(employee.id);
    return updatedEmployee;
  }

  async removeEmployeeTakeDay(employee: Employee, takeDay: TakeDay) {
    await employee.$remove('takeDay', takeDay);
    const updatedEmployee = this.getEmployeeById(employee.id);
    return updatedEmployee;
  }

  async isEmployeeExists(id: number) {
    return id && (await this.getEmployeeById(id));
  }

  async getEmployeeTakeDays(employeeId: number) {
    const employee = await this.findEmployeeById(employeeId);
    const takeDays = await employee.$get('takeDays');
    return takeDays;
  }

  async getAllEmployees() {
    const employees = this.employeeRepository.findAll({
      order: ['lastname'],
    });
    return employees;
  }
}
