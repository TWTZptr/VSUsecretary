import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/roles.model';

interface UserCreationAttributes {
  name: string;
  password: string;
  roleId: number;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'role_id' })
  roleId: number;

  @BelongsTo(() => Role, 'roleId')
  role: Role;
}
