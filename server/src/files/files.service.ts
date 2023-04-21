import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File, FileCreationAttributes } from './files.model';
import * as fs from 'fs/promises';
import { FILE_DOES_NOT_EXIST_MSG, FILES_FOLDER } from './constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File) private fileRepository: typeof File) {}

  getFilesList(year: number) {
    return this.fileRepository.findAll({
      where: { year },
      attributes: { exclude: ['storageName'] },
    });
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
    const uuid = uuidv4();
    const fileItem = await this.saveFileToDb({
      name: file.originalname,
      year,
      storageName: uuid,
    });
    await fs.writeFile(`${FILES_FOLDER}/${uuid}`, file.buffer);
    return fileItem;
  }

  saveFileToDb(file: FileCreationAttributes) {
    return this.fileRepository.create(file);
  }

  async deleteFileById(id: number) {
    const file = await this.fileRepository.findByPk(id);
    if (!file) {
      throw new BadRequestException(FILE_DOES_NOT_EXIST_MSG);
    }

    await fs.unlink(`${FILES_FOLDER}/${file.storageName}`);

    await file.destroy();
  }
}
