import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './files.model';
import * as fs from 'fs/promises';
import { FILES_FOLDER } from './constants';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private fileRepository: typeof File) {}

  getFilesList(year: number) {
    return this.fileRepository.findAll({ where: { year } });
  }

  async getFileById(id: number) {
    const fileItem = await this.fileRepository.findByPk(id);
    if (!fileItem) {
      throw new NotFoundException();
    }

    const handle = await fs.open(`${FILES_FOLDER}/${fileItem.id}`, 'r');
    return handle.createReadStream();
  }

  async saveFile(file: Express.Multer.File, year: number) {
    const fileItem = await this.saveFileToDb(file.originalname, year);
    await fs.writeFile(`${FILES_FOLDER}/${fileItem.id}`, file.buffer);
    return fileItem;
  }

  saveFileToDb(name: string, year: number) {
    return this.fileRepository.create({ name, year });
  }
}
