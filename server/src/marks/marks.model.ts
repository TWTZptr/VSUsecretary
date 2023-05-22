import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { DegreeWork } from '../degree-works/degree-work.model';

interface MarkCreationAttributes {
  mark: number;
  name: string;
}

@Table({ tableName: 'Marks' })
export class Mark extends Model<Mark, MarkCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  mark: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => DegreeWork, 'markId')
  degreeWorksAsMark: DegreeWork[];

  @HasMany(() => DegreeWork, 'reviewerMarkId')
  degreeWorksAsReviewerMark: DegreeWork[];

  @HasMany(() => DegreeWork, 'supervisorMarkId')
  degreeWorksAsSupervisorMark: DegreeWork[];
}
