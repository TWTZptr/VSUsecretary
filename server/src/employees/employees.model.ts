import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { DegreeWork } from 'src/degree-works/degree-work.model';
import { EmployeeGraduateScript } from 'src/employees-graduate-scripts/employees-graduate-scripts.model';
import { GraduateScript } from 'src/graduate-scripts/graduate-scripts.model';

interface EmployeeCreationAttributes {
  name: string;
  lastname: string;
  patronymic: string;
  // academicDegree: string;
  // academicRank: string;
  // position: string;
  // anotherJob?: string;
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

  @BelongsToMany(() => GraduateScript, () => EmployeeGraduateScript)
  graduateScripts: Array<
    GraduateScript & { EmployeeGraduateScript: EmployeeGraduateScript }
  >;

  @HasMany(() => DegreeWork, 'supervisorId')
  degreeWorksAsSupervisor: DegreeWork[];

  @HasMany(() => DegreeWork, 'reviewerId')
  degreeWorksAsReviewer: DegreeWork[];
}
