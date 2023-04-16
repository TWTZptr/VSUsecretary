import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DegreeWorksService } from './degree-works.service';
import { CreateDegreeWorkDto } from './dto/create-degree-work.dto';
import { UpdateDegreeWorkDto } from './dto/update-degree-work.dto';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';

@Controller('degree-works')
@UseGuards(RoleGuard)
@RequireRoles()
export class DegreeWorksController {
  constructor(private readonly degreeWorksService: DegreeWorksService) {}

  @Post()
  createDegreeWork(@Body() degreeWorkDto: CreateDegreeWorkDto) {
    return this.degreeWorksService.createDegreeWork(degreeWorkDto);
  }

  @Get(':id')
  getDegreeWorkById(@Param('id') id: number) {
    return this.degreeWorksService.findDegreeWorkById(id);
  }

  @Patch()
  updateDegreeWork(@Body() degreeWorkDto: UpdateDegreeWorkDto) {
    return this.degreeWorksService.updateDegreeWork(degreeWorkDto);
  }

  @Delete(':id')
  deleteDegreeWork(@Param('id', ParseIntPipe) id: number) {
    return this.degreeWorksService.deleteDegreeWork(id);
  }

  @Get()
  getAllDegreeWorks(@Query('year', ParseIntPipe) year?: number) {
    return this.degreeWorksService.getAllDegreeWorks(year);
  }
}
