import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './files.model';
import { AuthModule } from '../auth/auth.module';
import { StudentsModule } from '../students/students.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [SequelizeModule.forFeature([File]), AuthModule, StudentsModule],
})
export class FilesModule {}
