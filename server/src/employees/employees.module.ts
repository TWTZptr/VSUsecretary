import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees.model';
import { GraduateScriptsModule } from 'src/graduate-scripts/graduate-scripts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [
    SequelizeModule.forFeature([Employee]),
    GraduateScriptsModule,
    AuthModule,
  ],
  exports: [EmployeesService],
})
export class EmployeesModule {}
