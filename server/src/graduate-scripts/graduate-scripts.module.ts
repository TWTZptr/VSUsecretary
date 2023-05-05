import { forwardRef, Module } from '@nestjs/common';
import { GraduateScriptsService } from './graduate-scripts.service';
import { GraduateScriptsController } from './graduate-scripts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraduateScript } from './graduate-scripts.model';
import { AuthModule } from '../auth/auth.module';
import { EmployeesModule } from '../employees/employees.module';
import { EmployeesGraduateScriptsModule } from '../employees-graduate-scripts/employees-graduate-scripts.module';
import { StudentsModule } from '../students/students.module';

@Module({
  controllers: [GraduateScriptsController],
  providers: [GraduateScriptsService],
  imports: [
    SequelizeModule.forFeature([GraduateScript]),
    forwardRef(() => AuthModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => EmployeesGraduateScriptsModule),
    forwardRef(() => StudentsModule),
  ],
  exports: [GraduateScriptsService],
})
export class GraduateScriptsModule {}
