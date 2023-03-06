import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTakeDayDto } from './dto/create-take-day.dto';
import { UpdateTakeDayDto } from './dto/update-take-day.dto';
import { TakeDay } from './take-days.model';
import { UNEXIST_TAKEDAY_ID_MSG } from './constants';

@Injectable()
export class TakeDaysService {
  constructor(
    @InjectModel(TakeDay) private takeDayRepository: typeof TakeDay,
  ) {}

  async createTakeDay(dto: CreateTakeDayDto) {
    return this.takeDayRepository.create(dto);
  }

  async updateTakeDay(dto: UpdateTakeDayDto) {
    const [affectedCount] = await this.takeDayRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_TAKEDAY_ID_MSG);
    }
    const takeDay = await this.getTakeDayById(dto.id);
    return takeDay;
  }

  async getTakeDayById(id: number, attributes = null) {
    return this.takeDayRepository.findByPk(id, { attributes });
  }

  async findTakeDayById(id: number) {
    const takeDay = await this.getTakeDayById(id);

    if (!takeDay) {
      throw new NotFoundException(UNEXIST_TAKEDAY_ID_MSG);
    }

    return takeDay;
  }

  async deleteTakeDayById(id: number) {
    const affectedCount = await this.takeDayRepository.destroy({
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_TAKEDAY_ID_MSG);
    }
  }

  async isTakeDayExists(id: number) {
    return id && (await this.getTakeDayById(id));
  }

  async getAllTakeDays() {
    const takeDays = this.takeDayRepository.findAll({
      order: ['id'],
    });
    return takeDays;
  }

  async getAllEmployeesByTakeDay(id: number) {
    const takeDay = await this.findTakeDayById(id);
    const employees = takeDay.$get('employees');
    return employees;
  }
}
