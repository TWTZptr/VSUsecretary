import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mark } from './marks.model';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { MarksSeed } from './marks.seed';

@Module({
  controllers: [MarksController],
  providers: [MarksService],
  imports: [
    SequelizeModule.forFeature([Mark]),
    SeederModule.forFeature([MarksSeed]),
  ],
})
export class MarksModule {}
