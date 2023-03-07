import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from '../roles/roles.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { UsersSeed } from './users.seed';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    SeederModule.forFeature([UsersSeed]),
  ],
})
export class UsersModule {}
