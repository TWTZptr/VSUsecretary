import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { EmployeeTakeDay } from 'src/employees-take-days/employees-take-days.model';
import { TakeDay } from 'src/take-days/take-days.model';

interface EmployeeCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  academicDegree: string;
  academicRank: string;
  position: string;
  anotherJob?: string;
  phoneNumber: string;
  email: string;
  status: string;
}

@Table({ tableName: 'Employees' })
export class Employee extends Model<Employee, EmployeeCreationAttributes> {
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

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'academic_degree',
  })
  academicDegree: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'academic_rank',
  })
  academicRank: string;

  @Column({ type: DataType.STRING, allowNull: false })
  position: string;

  @Column({ type: DataType.STRING, allowNull: true, field: 'another_job' })
  anotherJob: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: 'phone_number',
  })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  status: string;

  @BelongsToMany(() => TakeDay, () => EmployeeTakeDay)
  takeDays: Array<TakeDay & { EmployeeTakeDay: EmployeeTakeDay }>;

  @HasMany(() => DegreeWork, 'supervisorId')
  degreeWorksAsSupervisor: DegreeWork[];

  @HasMany(() => DegreeWork, 'reviewerId')
  degreeWorksAsReviewer: DegreeWork[];
}
