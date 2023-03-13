import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Direction } from '../directions/directions.model';

interface EducationLevelCreationAttributes {
  name: string;
}

@Table({ tableName: 'EducationLevels' })
export class EducationLevel extends Model<
  EducationLevel,
  EducationLevelCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Direction, 'educationLevelId')
  directions: Direction[];
}
