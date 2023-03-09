import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DirectionsService } from 'src/directions/directions.service';
import { INVALID_DIRECTION_ID_MSG, UNEXIST_GROUP_ID_MSG } from './constants';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './groups.model';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private directionsService: DirectionsService,
  ) {}

  async createGroup(dto: CreateGroupDto) {
    if (
      dto.directionId &&
      (await this.directionsService.isDirectionExists(dto.directionId))
    ) {
      throw new BadRequestException(INVALID_DIRECTION_ID_MSG);
    }
    return this.groupRepository.create(dto);
  }

  async updateGroup(dto: UpdateGroupDto) {
    if (
      dto.directionId &&
      (await this.directionsService.isDirectionExists(dto.directionId))
    ) {
      throw new BadRequestException(INVALID_DIRECTION_ID_MSG);
    }
    const [affectedCount] = await this.groupRepository.update(dto, {
      where: { id: dto.id },
    });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_GROUP_ID_MSG);
    }

    return this.groupRepository.findByPk(dto.id);
  }

  getGroupById(id: number, attributes = null) {
    return this.groupRepository.findByPk(id, { attributes });
  }

  getGroupsByFilter(filter, attributes = null) {
    return this.groupRepository.findAll({ where: filter, attributes });
  }

  async findGroupById(id: number) {
    const group = await this.getGroupById(id);

    if (!group) {
      throw new NotFoundException(UNEXIST_GROUP_ID_MSG);
    }

    return group;
  }

  async deleteGroupById(id: number) {
    const affectedCount = await this.groupRepository.destroy({ where: { id } });

    if (!affectedCount) {
      throw new NotFoundException(UNEXIST_GROUP_ID_MSG);
    }
  }

  async isGroupExists(id?: number) {
    return id && !(await this.getGroupById(id));
  }

  getAllGroups() {
    return this.groupRepository.findAll({
      order: ['number'],
    });
  }
}
