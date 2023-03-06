import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTakeDayDto } from './dto/create-take-day.dto';
import { UpdateTakeDayDto } from './dto/update-take-day.dto';
import { TakeDaysService } from './take-days.service';

@Controller('take-days')
export class TakeDaysController {
  constructor(private readonly takeDaysService: TakeDaysService) {}

  @Post()
  createTakeDay(@Body() takeDayDto: CreateTakeDayDto) {
    return this.takeDaysService.createTakeDay(takeDayDto);
  }

  @Get(':id')
  getTakeDayById(@Param('id') id: number) {
    return this.takeDaysService.findTakeDayById(id);
  }

  @Patch()
  updateTakeDay(@Body() takeDayDto: UpdateTakeDayDto) {
    return this.takeDaysService.updateTakeDay(takeDayDto);
  }

  @Delete(':id')
  deleteTakeDay(@Param('id', ParseIntPipe) id: number) {
    return this.takeDaysService.deleteTakeDayById(id);
  }

  @Get()
  getAllTakeDays() {
    return this.takeDaysService.getAllTakeDays();
  }

  @Get(':takeDayId/employees')
  findTakeDayEmployees(@Param('takeDayId', ParseIntPipe) takeDayId: number) {
    return this.takeDaysService.getAllEmployeesByTakeDay(takeDayId);
  }
}
