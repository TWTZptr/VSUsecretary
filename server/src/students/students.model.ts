import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { Group } from '../groups/groups.model';

interface StudentCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  publications: number;
}

@Table({ tableName: 'Students' })
export class Student extends Model<Student, StudentCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING(40), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  lastname: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  patronymic: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  publications: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'group_id' })
  groupId: number;

  @BelongsTo(() => Group, 'groupId')
  group: Group;

  @HasOne(() => DegreeWork, 'studentId')
  degreeWork: DegreeWork;
}
