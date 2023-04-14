import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeGraduateScript } from './employees-graduate-scripts.model';
import { EmployeesGraduateScriptsService } from './employees-graduate-scripts.service';

@Module({
  providers: [EmployeesGraduateScriptsService],
  exports: [EmployeesGraduateScriptsService],
  imports: [SequelizeModule.forFeature([EmployeeGraduateScript])],
})
export class EmployeesGraduateScriptsModule {}
