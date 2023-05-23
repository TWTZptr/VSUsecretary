import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Student } from '../students/students.model';
import { EducationLevel } from '../education-levels/education-levels.model';
import { GraduateScript } from '../graduate-scripts/graduate-scripts.model';

interface DirectionCreationAttributes {
  code: string;
  degree: string;
  fullName: string;
  shortName: string;
}

@Table({ tableName: 'Directions' })
export class Direction extends Model<Direction, DirectionCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(10), allowNull: false })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'full_name' })
  fullName: string;

  @Column({ type: DataType.STRING, allowNull: false, field: 'short_name' })
  shortName: string;

  @ForeignKey(() => EducationLevel)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'education_level_id',
  })
  educationLevelId: number;

  @BelongsTo(() => EducationLevel, 'educationLevelId')
  educationLevel: EducationLevel;

  @HasMany(() => GraduateScript, 'directionId')
  graduateScripts: GraduateScript[];
}
