import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { SequelizeConfigService } from './config/sequelize.config.service';
import { DirectionsModule } from './directions/directions.module';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';
import { EmployeesModule } from './employees/employees.module';
import { TakeDaysModule } from './take-days/take-days.module';
import { EmployeesTakeDaysModule } from './employees-take-days/employees-take-days.module';
import { DegreeWorksModule } from './degree-works/degree-works.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    DirectionsModule,
    GroupsModule,
    StudentsModule,
    EmployeesModule,
    TakeDaysModule,
    EmployeesTakeDaysModule,
    DegreeWorksModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
