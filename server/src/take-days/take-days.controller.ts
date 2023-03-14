import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTakeDayDto } from './dto/create-take-day.dto';
import { UpdateTakeDayDto } from './dto/update-take-day.dto';
import { TakeDaysService } from './take-days.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { ADMIN } from '../users/constants';

@Controller('take-days')
@UseGuards(RoleGuard)
@RequireRoles()
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
