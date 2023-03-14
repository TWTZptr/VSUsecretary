import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';
import { AddTakeDayDto } from './dto/add-take-day.dto';
import { TakeDaysService } from 'src/take-days/take-days.service';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { RoleGuard } from '../auth/guards/role-guard';

@Controller('employees')
@UseGuards(RoleGuard)
@RequireRoles()
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly takeDaysService: TakeDaysService,
  ) {}

  @Post()
  createEmployee(@Body() employeeDto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(employeeDto);
  }

  @Patch()
  updateEmployee(@Body() employeeDto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(employeeDto);
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: number) {
    return this.employeesService.findEmployeeById(id);
  }

  @Delete(':id')
  deleteEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.deleteEmployeeById(id);
  }

  @Post('takeDays')
  async addTakeDayToEmployee(@Body() addTakeDayDto: AddTakeDayDto) {
    const takeDay = await this.takeDaysService.findTakeDayById(
      addTakeDayDto.takeDayId,
    );

    const employee = await this.employeesService.findEmployeeById(
      addTakeDayDto.employeeId,
    );

    return this.employeesService.addTakeDayToEmployee(employee, takeDay);
  }

  @Delete(':id/takeDays/:takeDayId')
  async removeEmployeeTakeDay(
    @Param('id', ParseIntPipe) id: number,
    @Param('takeDayId', ParseIntPipe) takeDayId: number,
  ) {
    const takeDay = await this.takeDaysService.findTakeDayById(takeDayId);
    const employee = await this.employeesService.findEmployeeById(id);

    return this.employeesService.removeEmployeeTakeDay(employee, takeDay);
  }

  @Get(':employeeId/takeDays')
  async findEmployeeTakeDays(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.employeesService.getEmployeeTakeDays(employeeId);
  }

  @Get()
  getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }
}
