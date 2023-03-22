import { forwardRef, Module } from '@nestjs/common';
import { GraduateScriptsService } from './graduate-scripts.service';
import { GraduateScriptsController } from './graduate-scripts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraduateScript } from './graduate-scripts.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [GraduateScriptsController],
  providers: [GraduateScriptsService],
  imports: [
    SequelizeModule.forFeature([GraduateScript]),
    forwardRef(() => AuthModule),
  ],
  exports: [GraduateScriptsService],
})
export class GraduateScriptsModule {}
