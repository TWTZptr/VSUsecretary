import { Module } from '@nestjs/common';
import { DegreeWorksService } from './degree-works.service';
import { DegreeWorksController } from './degree-works.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DegreeWork } from './degree-work.model';
import { TakeDaysModule } from 'src/take-days/take-days.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { StudentsModule } from 'src/students/students.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DegreeWorksController],
  providers: [DegreeWorksService],
  imports: [
    SequelizeModule.forFeature([DegreeWork]),
    TakeDaysModule,
    EmployeesModule,
    StudentsModule,
    AuthModule,
  ],
  exports: [DegreeWorksService],
})
export class DegreeWorksModule {}
