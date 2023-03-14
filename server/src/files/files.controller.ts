import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';

@Controller('files')
@UseGuards(RoleGuard)
@RequireRoles()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  getAllFiles() {
    return this.filesService.getAllFiles();
  }
}
