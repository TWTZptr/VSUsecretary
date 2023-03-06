import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { GroupsModule } from 'src/groups/groups.module';
import { Student } from './students.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [SequelizeModule.forFeature([Student]), GroupsModule],
  exports: [StudentsService],
})
export class StudentsModule {}
