import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { ADMIN } from './constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RoleGuard)
  @RequireRoles(ADMIN)
  @Patch()
  changeUserPassword(@Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(dto);
  }
}
