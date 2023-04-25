import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employees.model';
import { UNEXIST_EMPLOYEE_ID_MSG } from './constants';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GraduateScript } from '../graduate-scripts/graduate-scripts.model';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
  ) {}

  createEmployee(dto: CreateEmployeeDto) {
    return this.employeeRepository.create(dto);
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
    return this.getEmployeeById(dto.id);
  }

  async deleteEmployeeById(id: number) {
    const affectedCount = await this.employeeRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_EMPLOYEE_ID_MSG);
    }
  }

  async addGraduateScriptToEmployee(
    employee: Employee,
    graduateScript: GraduateScript,
  ) {
    await employee.$add('graduateScripts', graduateScript);
    return this.getEmployeeById(employee.id);
  }

  async removeEmployeeGraduateScript(
    employee: Employee,
    graduateScript: GraduateScript,
  ) {
    await employee.$remove('graduateScript', graduateScript);
    const updatedEmployee = this.getEmployeeById(employee.id);
    return updatedEmployee;
  }

  async isEmployeeExists(id: number) {
    return id && (await this.getEmployeeById(id));
  }

  async getEmployeeGraduateScripts(employeeId: number) {
    const employee = await this.findEmployeeById(employeeId);
    const graduateScripts = await employee.$get('graduateScripts');
    return graduateScripts;
  }

  async getAllEmployees() {
    const employees = this.employeeRepository.findAll({
      order: ['lastname'],
    });
    return employees;
  }
}
