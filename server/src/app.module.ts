import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { SequelizeConfigService } from './config/sequelize.config.service';
import { DirectionsModule } from './directions/directions.module';
import { StudentsModule } from './students/students.module';
import { EmployeesModule } from './employees/employees.module';
import { GraduateScriptsModule } from './graduate-scripts/graduate-scripts.module';
import { EmployeesGraduateScriptsModule } from './employees-graduate-scripts/employees-graduate-scripts.module';
import { DegreeWorksModule } from './degree-works/degree-works.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { EducationLevelsModule } from './education-levels/education-levels.module';
import { PasswordModule } from './password/password.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { GraduateMarksModule } from './graduate-marks/graduate-marks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
    }),
    DirectionsModule,
    StudentsModule,
    EmployeesModule,
    GraduateScriptsModule,
    EmployeesGraduateScriptsModule,
    DegreeWorksModule,
    UsersModule,
    RolesModule,
    EducationLevelsModule,
    PasswordModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
