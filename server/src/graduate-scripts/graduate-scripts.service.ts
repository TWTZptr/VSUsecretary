import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGraduateScriptDto } from './dto/create-graduate-script.dto';
import { UpdateGraduateScriptDto } from './dto/update-graduate-script.dto';
import { GraduateScript } from './graduate-scripts.model';
import { UNEXIST_TAKEDAY_ID_MSG } from './constants';

@Injectable()
export class GraduateScriptsService {
  constructor(
    @InjectModel(GraduateScript)
    private graduateScriptRepository: typeof GraduateScript,
  ) {}

  async createGraduateScript(dto: CreateGraduateScriptDto) {
    return this.graduateScriptRepository.create(dto);
  }

  async updateGraduateScript(dto: UpdateGraduateScriptDto) {
    const [affectedCount] = await this.graduateScriptRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_TAKEDAY_ID_MSG);
    }
    return this.getGraduateScriptById(dto.id);
  }

  async getGraduateScriptById(id: number, attributes = null) {
    return this.graduateScriptRepository.findByPk(id, { attributes });
  }

  async findGraduateScriptById(id: number) {
    const graduateScript = await this.getGraduateScriptById(id);

    if (!graduateScript) {
      throw new NotFoundException(UNEXIST_TAKEDAY_ID_MSG);
    }

    return graduateScript;
  }

  async deleteGraduateScriptById(id: number) {
    const affectedCount = await this.graduateScriptRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_TAKEDAY_ID_MSG);
    }
  }

  async isGraduateScriptExists(id: number) {
    return id && (await this.getGraduateScriptById(id));
  }

  async getAllGraduateScripts() {
    const graduateScripts = this.graduateScriptRepository.findAll({
      order: ['id'],
    });
    return graduateScripts;
  }

  async getAllEmployeesByGraduateScript(id: number) {
    const graduateScript = await this.findGraduateScriptById(id);
    const employees = graduateScript.$get('employees');
    return employees;
  }
}
