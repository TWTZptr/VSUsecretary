import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { GraduateScriptsModule } from 'src/graduate-scripts/graduate-scripts.module';
import { AuthModule } from '../auth/auth.module';
import { EmployeesGraduateScriptsModule } from '../employees-graduate-scripts/employees-graduate-scripts.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    SequelizeModule.forFeature([Employee]),
    forwardRef(() => GraduateScriptsModule),
    EmployeesGraduateScriptsModule,
    AuthModule,
  ],
  exports: [EmployeesService],
})
export class EmployeesModule {}
