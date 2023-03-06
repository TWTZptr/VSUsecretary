import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Direction } from './directions.model';

@Module({
  providers: [DirectionsService],
  controllers: [DirectionsController],
  imports: [SequelizeModule.forFeature([Direction])],
  exports: [DirectionsService],
})
export class DirectionsModule {}
