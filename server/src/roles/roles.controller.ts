import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('')
  getRoles() {
    return this.rolesService.getAllRoles();
  }
}
