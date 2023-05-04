import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Direction } from './directions.model';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { DIRECTION_DOES_NOT_EXIST_MSG } from './constants';
import { FindOptions } from 'sequelize';

@Injectable()
export class DirectionsService {
  constructor(
    @InjectModel(Direction) private directionRepository: typeof Direction,
  ) {}

  async createDirection(dto: CreateDirectionDto) {
    const direction = await this.directionRepository.create(dto);
    return direction;
  }

  async updateDirection(id: number, dto: UpdateDirectionDto) {
    const [affectedCount] = await this.directionRepository.update(
      { ...dto },
      { where: { id } },
    );
    if (!affectedCount) {
      throw new NotFoundException(DIRECTION_DOES_NOT_EXIST_MSG);
    }
    return this.getDirectionById(id);
  }

  getDirectionById(id: number, options: FindOptions<Direction> = {}) {
    return this.directionRepository.findByPk(id, options);
  }

  async getDirectionByFilter(filter, attributes = null) {
    return this.directionRepository.findAll({ where: filter, attributes });
  }

  async findDirectionById(id: number) {
    const direction = await this.getDirectionById(id);
    if (!direction) {
      throw new NotFoundException(DIRECTION_DOES_NOT_EXIST_MSG);
    }
    return direction;
  }

  async isDirectionExists(id?: number) {
    return id && !(await this.getDirectionById(id));
  }

  async deleteDirectionById(id: number) {
    const affectedCount = await this.directionRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(DIRECTION_DOES_NOT_EXIST_MSG);
    }
  }

  async getAllDirections() {
    return this.directionRepository.findAll({
      order: ['full_name'],
    });
  }
}
