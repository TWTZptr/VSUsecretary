import { forwardRef, Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { AuthModule } from '../auth/auth.module';
import { GraduateScriptsModule } from '../graduate-scripts/graduate-scripts.module';
import { DirectionsModule } from '../directions/directions.module';
import { EmployeesModule } from '../employees/employees.module';
import { StudentsModule } from '../students/students.module';
import { DegreeWorksModule } from '../degree-works/degree-works.module';
import { EmployeesGraduateScriptsModule } from '../employees-graduate-scripts/employees-graduate-scripts.module';

@Module({
  controllers: [DocsController],
  providers: [DocsService],
  imports: [
    forwardRef(() => AuthModule),
    GraduateScriptsModule,
    DirectionsModule,
    EmployeesModule,
    StudentsModule,
    DegreeWorksModule,
    EmployeesGraduateScriptsModule,
  ],
})
export class DocsModule {}
