import { Module } from '@nestjs/common';
import { DegreeWorksService } from './degree-works.service';
import { DegreeWorksController } from './degree-works.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DegreeWork } from './degree-work.model';
import { GraduateScriptsModule } from 'src/graduate-scripts/graduate-scripts.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { StudentsModule } from 'src/students/students.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DegreeWorksController],
  providers: [DegreeWorksService],
  imports: [
    SequelizeModule.forFeature([DegreeWork]),
    GraduateScriptsModule,
    EmployeesModule,
    StudentsModule,
    AuthModule,
  ],
  exports: [DegreeWorksService],
})
export class DegreeWorksModule {}
