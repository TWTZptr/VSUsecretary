import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { EMPTY_FILE_PROVIDED_MSG } from '../graduate-scripts/constants';
import { UploadFileDto } from './dto/UploadFile.dto';
import { Response } from 'express';

@Controller('files')
@UseGuards(RoleGuard)
@RequireRoles()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('')
  getFilesList(@Query('year', ParseIntPipe) year: number) {
    return this.filesService.getFilesList(year);
  }

  @Get(':id')
  async getFile(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const readStream = await this.filesService.getFileById(id);
    readStream.pipe(res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  loadFile(
    @Body() dto: UploadFileDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(EMPTY_FILE_PROVIDED_MSG);
    }

    return this.filesService.saveFile(file, dto.year);
  }
}
