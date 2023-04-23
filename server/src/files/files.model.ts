import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface FileCreationAttributes {
  name: string;
  year: number;
  uuid: string;
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
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  uuid: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;
}
