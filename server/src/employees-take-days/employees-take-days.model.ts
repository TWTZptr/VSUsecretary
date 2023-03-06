import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/employees.model';
import { TakeDay } from 'src/take-days/take-days.model';

interface EmployeeTakeDayCreationAttributes {
  employeeId: number;
  takeDayId: number;
}

@Table({ tableName: 'EmployeesTakeDays' })
export class EmployeeTakeDay extends Model<
  EmployeeTakeDay,
  EmployeeTakeDayCreationAttributes
> {
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'employee_id',
    onDelete: 'CASCADE',
  })
  employeeId: number;

  @ForeignKey(() => TakeDay)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'take_day_id',
    onDelete: 'CASCADE',
  })
  takeDayId: number;
}
