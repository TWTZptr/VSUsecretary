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
import { AddGraduateScriptDto } from './dto/add-graduate-script.dto';
import { GraduateScriptsService } from 'src/graduate-scripts/graduate-scripts.service';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { RoleGuard } from '../auth/guards/role-guard';

@Controller('employees')
@UseGuards(RoleGuard)
@RequireRoles()
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly graduateScriptsService: GraduateScriptsService,
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
    return this.employeesService.tryToDeleteEmployeeById(id);
  }

  @Post('graduateScripts')
  async addGraduateScriptToEmployee(
    @Body() addGraduateScriptDto: AddGraduateScriptDto,
  ) {
    const graduateScript =
      await this.graduateScriptsService.findGraduateScriptById(
        addGraduateScriptDto.graduateScriptId,
      );

    const employee = await this.employeesService.findEmployeeById(
      addGraduateScriptDto.employeeId,
    );

    return this.employeesService.addGraduateScriptToEmployee(
      employee,
      graduateScript,
    );
  }

  @Delete(':id/graduateScripts/:graduateScriptId')
  async removeEmployeeGraduateScript(
    @Param('id', ParseIntPipe) id: number,
    @Param('graduateScriptId', ParseIntPipe) graduateScriptId: number,
  ) {
    const graduateScript =
      await this.graduateScriptsService.findGraduateScriptById(
        graduateScriptId,
      );
    const employee = await this.employeesService.findEmployeeById(id);

    return this.employeesService.removeEmployeeGraduateScript(
      employee,
      graduateScript,
    );
  }

  @Get(':employeeId/graduateScripts')
  async findEmployeeGraduateScripts(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ) {
    return this.employeesService.getEmployeeGraduateScripts(employeeId);
  }

  @Get()
  getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }
}
