import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Direction } from './directions.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [DirectionsService],
  controllers: [DirectionsController],
  imports: [SequelizeModule.forFeature([Direction]), AuthModule],
  exports: [DirectionsService],
})
export class DirectionsModule {}
