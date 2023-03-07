import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { RolesSeed } from './roles.seed';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role]),
    SeederModule.forFeature([RolesSeed]),
  ],
})
export class RolesModule {}
