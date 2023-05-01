import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File, FileCreationAttributes } from './files.model';
import * as fs from 'fs/promises';
import {
  BAD_FILE_TEXT_MSG,
  FILE_DOES_NOT_EXIST_MSG,
  FILES_FOLDER,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import { getFilePathByUuid } from '../utils/getFilePathByUuid';
import { parseGraduateScripts } from '../utils/fileParsers/parseGraduateScripts';
import { StudentsService } from '../students/students.service';
import { ParsedGraduateScript } from '../utils/types/parsed-students.type';
import { ParseStudentsDto } from './dto/ParseStudents.dto';
import { GraduateScriptsService } from '../graduate-scripts/graduate-scripts.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private readonly studentsService: StudentsService,
    private readonly graduateScriptsService: GraduateScriptsService,
  ) {}

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

    const handle = await fs.open(getFilePathByUuid(fileItem.uuid), 'r');
    return handle.createReadStream();
  }

  async getFileInfoById(id: number) {
    const fileItem = await this.fileRepository.findByPk(id);
    if (!fileItem) {
      throw new NotFoundException();
    }

    return fileItem;
  }

  async saveFile(file: Express.Multer.File, year: number) {
    const uuid = uuidv4();
    const fileItem = await this.saveFileToDb({
      name: file.originalname,
      year,
      uuid,
    });
    await fs.writeFile(getFilePathByUuid(uuid), file.buffer);
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

    await fs.unlink(`${FILES_FOLDER}/${file.uuid}`);

    await file.destroy();
  }

  async parseAndSaveStudents(fileId: number, dto: ParseStudentsDto) {
    const file = await this.fileRepository.findByPk(fileId);
    if (!file) {
      throw new BadRequestException(FILE_DOES_NOT_EXIST_MSG);
    }

    const fileBuffer = await fs.readFile(getFilePathByUuid(file.uuid));
    const fileText = fileBuffer.toString();
    let graduateScripts: ParsedGraduateScript[];

    try {
      graduateScripts = parseGraduateScripts(fileText);
    } catch (err) {
      throw new BadRequestException(BAD_FILE_TEXT_MSG);
    }

    const promises: Promise<any>[] = [];

    for (const graduateScript of graduateScripts) {
      const createdGraduateScript =
        await this.graduateScriptsService.createGraduateScript({
          date: graduateScript.date,
        });

      for (const student of graduateScript.students) {
        promises.push(
          this.studentsService.createStudent({
            ...student,
            ...dto,
            graduateScriptId: createdGraduateScript.id,
          }),
        );
      }
    }

    return Promise.all(promises);
  }
}
