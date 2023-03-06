import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { DirectionsModule } from 'src/directions/directions.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [SequelizeModule.forFeature([Group]), DirectionsModule],
  exports: [GroupsService]
})
export class GroupsModule {}
