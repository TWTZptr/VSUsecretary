import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';

interface RoleCreationAttributes {
  name: string;
}

@Table({ tableName: 'Roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => User, 'roleId')
  users: User[];
}
