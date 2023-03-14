import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { TakeDaysModule } from 'src/take-days/take-days.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [SequelizeModule.forFeature([Employee]), TakeDaysModule, AuthModule],
  exports: [EmployeesService],
})
export class EmployeesModule {}
