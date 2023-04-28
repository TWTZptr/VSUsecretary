import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { SECRETARY } from '../users/constants';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @UseGuards(RoleGuard)
  @RequireRoles(SECRETARY)
  @Get('protocol')
  async generateProtocol(
    @Query('graduateScriptId', ParseIntPipe) graduateScriptId: number,
  ) {
    const buffer = await this.docsService.generateProtocol(graduateScriptId);

    return new StreamableFile(buffer);
  }

  @UseGuards(RoleGuard)
  @RequireRoles(SECRETARY)
  @Get('protocol-appendix')
  async generateProtocolAppendix(
    @Query('studentId', ParseIntPipe) studentId: number,
  ) {
    const buffer = await this.docsService.generateProtocolAppendix(studentId);

    return new StreamableFile(buffer);
  }
}
