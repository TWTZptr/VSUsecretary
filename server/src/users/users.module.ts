import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from '../roles/roles.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { UsersSeed } from './users.seed';
import { PasswordModule } from '../password/password.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    SeederModule.forFeature([UsersSeed]),
    PasswordModule,
    AuthModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
