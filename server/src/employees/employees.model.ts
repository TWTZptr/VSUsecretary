import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { EmployeeGraduateScript } from 'src/employees-graduate-scripts/employees-graduate-scripts.model';
import { GraduateScript } from 'src/graduate-scripts/graduate-scripts.model';

interface EmployeeCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  phoneNumber: string;
  email: string;
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
    type: DataType.STRING(20),
    allowNull: false,
    field: 'phone_number',
  })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @HasMany(() => EmployeeGraduateScript, 'employeeId')
  employeeGraduateScripts: EmployeeGraduateScript[];

  @HasMany(() => DegreeWork, 'supervisorId')
  degreeWorksAsSupervisor: DegreeWork[];

  @HasMany(() => DegreeWork, 'reviewerId')
  degreeWorksAsReviewer: DegreeWork[];

  @HasMany(() => DegreeWork, 'firstQuestionAuthorId')
  firstQuestionDegreeWorks: DegreeWork[];

  @HasMany(() => DegreeWork, 'secondQuestionAuthorId')
  secondQuestionDegreeWorks: DegreeWork[];
}
