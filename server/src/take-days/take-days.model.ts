import {
  Model,
  Column,
  DataType,
  Table,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { EmployeeTakeDay } from 'src/employees-take-days/employees-take-days.model';
import { Employee } from 'src/employees/employees.model';

interface TakeDayCreationAttributes {
  date: Date;
}

@Table({ tableName: 'TakeDays' })
export class TakeDay extends Model<TakeDay, TakeDayCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @BelongsToMany(() => Employee, () => EmployeeTakeDay)
  employees: Array<Employee & { EmployeeTakeDay: EmployeeTakeDay }>;

  @HasMany(() => DegreeWork, 'takeDayId')
  degreeWorks: DegreeWork[];
}
