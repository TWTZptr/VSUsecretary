import { Module } from '@nestjs/common';
import { TakeDaysService } from './take-days.service';
import { TakeDaysController } from './take-days.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TakeDay } from './take-days.model';

@Module({
  controllers: [TakeDaysController],
  providers: [TakeDaysService],
  imports: [SequelizeModule.forFeature([TakeDay])],
  exports: [TakeDaysService]
})
export class TakeDaysModule {}
