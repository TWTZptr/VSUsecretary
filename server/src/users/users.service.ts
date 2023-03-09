import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { FindOptions } from 'sequelize';
import { UNEXIST_USER_ID_MSG } from './constants';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  findById(id: number, options: FindOptions<User> = {}) {
    return this.userRepository.findByPk(id, options);
  }

  findByRoleId(roleId: number, options: FindOptions<User> = {}) {
    return this.userRepository.findOne({
      ...options,
      where: { roleId },
    });
  }
}
