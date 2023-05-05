import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './students.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { GraduateScriptsModule } from '../graduate-scripts/graduate-scripts.module';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    SequelizeModule.forFeature([Student]),
    AuthModule,
    forwardRef(() => GraduateScriptsModule),
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
