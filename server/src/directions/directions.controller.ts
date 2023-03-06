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
import { DirectionsService } from './directions.service';
import { CreateDirectionDto } from './dto/create-direction.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';

@Controller('directions')
export class DirectionsController {
  constructor(private directionsService: DirectionsService) {}

  @Post()
  createDirection(@Body() directionDto: CreateDirectionDto) {
    return this.directionsService.createDirection(directionDto);
  }

  @Patch()
  updateDirection(@Body() directionDto: UpdateDirectionDto) {
    return this.directionsService.updateDirection(
      directionDto.id,
      directionDto,
    );
  }

  @Get(':id')
  getDirectionById(@Param('id') id: number) {
    return this.directionsService.findDirectionById(id);
  }

  @Delete(':id')
  deleteDirectionById(@Param('id', ParseIntPipe) id: number) {
    return this.directionsService.deleteDirectionById(id);
  }

  @Get()
  getAllDirections() {
    return this.directionsService.getAllDirections();
  }
}
