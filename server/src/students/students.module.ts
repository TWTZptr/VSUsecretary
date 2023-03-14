import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './students.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DirectionsModule } from '../directions/directions.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    SequelizeModule.forFeature([Student]),
    DirectionsModule,
    AuthModule,
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
