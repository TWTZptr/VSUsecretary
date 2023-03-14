import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

interface FileCreationAttributes {
  path: string;
  ownerId: number;
}

@Table({ tableName: 'Files' })
export class File extends Model<File, FileCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  path: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'owner_id' })
  ownerId: number;

  @BelongsTo(() => User, 'ownerId')
  owner: User;
}
