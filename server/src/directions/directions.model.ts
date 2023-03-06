import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Group } from 'src/groups/groups.model';

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

  @HasMany(() => Group, 'directionId')
  groups: Group[];
}
