import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Direction } from 'src/directions/directions.model';
import { Student } from 'src/students/students.model';
import { EducationLevel } from '../education-levels/education-levels.model';

interface GroupCreationAttributes {
  number: number;
  educationLevelId: number;
}

@Table({ tableName: 'Groups' })
export class Group extends Model<Group, GroupCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number: number;

  @ForeignKey(() => Direction)
  @Column({ type: DataType.INTEGER, field: 'direction_id' })
  directionId: number;

  @ForeignKey(() => EducationLevel)
  @Column({ type: DataType.INTEGER, field: 'education_level_id' })
  educationLevelId: number;

  @BelongsTo(() => Direction, 'directionId')
  direction: Direction;

  @BelongsTo(() => EducationLevel, 'educationLevelId')
  educationLevel: EducationLevel;

  @HasMany(() => Student, 'groupId')
  students: Student[];
}
