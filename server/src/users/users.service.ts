import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { FindOptions } from 'sequelize';
import {
  ADMIN,
  UNEXIST_USER_ID_MSG,
  INVALID_ADMIN_PASSWORD,
} from './constants';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PasswordService } from '../password/password.service';
import { Role } from '../roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly passwordService: PasswordService,
  ) {}

  findById(id: number, options: FindOptions<User> = {}) {
    return this.userRepository.findByPk(id, options);
  }

  findByRoleId(roleId: number, options: FindOptions<User> = {}) {
    return this.userRepository.findOne({
      ...options,
      where: { roleId },
    });
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const adminUser = await this.userRepository.findOne({
      where: {
        '$role.name$': ADMIN,
      },
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
    });

    const adminPasswordValid = await this.passwordService.compare(
      changePasswordDto.adminPassword,
      adminUser.password,
    );

    if (!adminPasswordValid) {
      throw new BadRequestException(INVALID_ADMIN_PASSWORD);
    }

    const user = await this.userRepository.findByPk(changePasswordDto.userId);
    if (!user) {
      throw new BadRequestException(UNEXIST_USER_ID_MSG);
    }

    const hash = await this.passwordService.hash(changePasswordDto.password);

    await this.userRepository.update(
      { password: hash },
      { where: { id: changePasswordDto.userId } },
    );
  }
}
