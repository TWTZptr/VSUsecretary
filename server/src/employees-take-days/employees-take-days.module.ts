import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeTakeDay } from './employees-take-days.model';
import { EmployeesTakeDaysService } from './employees-take-days.service';

@Module({
  providers: [EmployeesTakeDaysService],
  exports: [EmployeesTakeDaysService],
  imports: [SequelizeModule.forFeature([EmployeeTakeDay])]
})
export class EmployeesTakeDaysModule {}
