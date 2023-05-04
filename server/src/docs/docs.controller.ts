import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { ADMIN, SECRETARY } from '../users/constants';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @UseGuards(RoleGuard)
  @RequireRoles(SECRETARY, ADMIN)
  @Get('protocol')
  async generateProtocol(
    @Query('graduateScriptId', ParseIntPipe) graduateScriptId: number,
  ) {
    const buffer = await this.docsService.generateProtocol(graduateScriptId);

    return new StreamableFile(buffer);
  }

  @UseGuards(RoleGuard)
  @RequireRoles(SECRETARY, ADMIN)
  @Get('protocol-appendix')
  async generateProtocolAppendix(
    @Query('studentId', ParseIntPipe) studentId: number,
  ) {
    const buffer = await this.docsService.generateProtocolAppendix(studentId);

    return new StreamableFile(buffer);
  }

  @UseGuards(RoleGuard)
  @RequireRoles(SECRETARY, ADMIN)
  @Get('marks-list-short')
  async generateMarksListShort(
    @Query('graduateScriptId', ParseIntPipe) graduateScriptId: number,
  ) {
    const buffer = await this.docsService.generateMarksListShort(
      graduateScriptId,
    );

    return new StreamableFile(buffer);
  }

  @UseGuards(RoleGuard)
  @RequireRoles(SECRETARY, ADMIN)
  @Get('student-listing')
  async generateStudentListing(
    @Query('year', ParseIntPipe) year: number,
    @Query('directionId', ParseIntPipe) directionId: number,
  ) {
    const buffer = await this.docsService.generateStudentListing(
      year,
      directionId,
    );

    return new StreamableFile(buffer);
  }
}
