import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './files.model';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [SequelizeModule.forFeature([File])],
})
export class FilesModule {}
