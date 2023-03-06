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

interface GroupCreationAttributes {
  number: number;
  educationLevel: string;
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

  @Column({ type: DataType.STRING, allowNull: false, field: 'education_level' })
  educationLevel: string;

  @ForeignKey(() => Direction)
  @Column({ type: DataType.INTEGER, field: 'direction_id' })
  directionId: number;

  @BelongsTo(() => Direction, 'directionId')
  direction: Direction;

  @HasMany(() => Student, 'groupId')
  students: Student[];
}
