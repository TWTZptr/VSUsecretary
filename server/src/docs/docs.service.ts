import { Injectable } from '@nestjs/common';
import { GraduateScriptsService } from '../graduate-scripts/graduate-scripts.service';
import { DirectionsService } from '../directions/directions.service';
import { EmployeesService } from '../employees/employees.service';
import { StudentsService } from '../students/students.service';
import { DegreeWorksService } from '../degree-works/degree-works.service';
import { EmployeesGraduateScriptsService } from '../employees-graduate-scripts/employees-graduate-scripts.service';
import { generateProtocol } from './generation-scripts/generateProtocol';
import { Employee } from '../employees/employees.model';
import { generateAppendixToTheProtocol } from './generation-scripts/generateAppendixToTheProtocol';

@Injectable()
export class DocsService {
  constructor(
    private readonly graduateScriptsService: GraduateScriptsService,
    private readonly directionsService: DirectionsService,
    private readonly employeesService: EmployeesService,
    private readonly studentsService: StudentsService,
    private readonly degreeWorksService: DegreeWorksService,
    private readonly employeesGraduateScriptsService: EmployeesGraduateScriptsService,
  ) {}

  async generateProtocol(graduateScriptId: number) {
    const graduateScript =
      await this.graduateScriptsService.findGraduateScriptById(
        graduateScriptId,
      );

    const { chairman, commission, secretary } =
      await this.graduateScriptsService.getAllEmployeesByGraduateScript(
        graduateScriptId,
      );

    const fullCommissionInfo = {
      chairman: await this.getCompleteGraduateScriptEmployeeInfo(
        graduateScriptId,
        chairman,
      ),
      secretary: await this.getCompleteGraduateScriptEmployeeInfo(
        graduateScriptId,
        secretary,
      ),
      commission: [],
    };

    for (const member of commission) {
      fullCommissionInfo.commission.push(
        await this.getCompleteGraduateScriptEmployeeInfo(
          graduateScriptId,
          member,
        ),
      );
    }

    const students = await graduateScript.$get('students');

    const direction = await students[0].$get('direction');
    const number = await this.graduateScriptsService.getGraduateScriptNumber(
      graduateScriptId,
    );

    return generateProtocol({
      graduateScript,
      number,
      commission: fullCommissionInfo,
      direction,
    });
  }

  async getCompleteGraduateScriptEmployeeInfo(
    graduateScriptId: number,
    employee: Employee,
  ): Promise<any> {
    const info =
      await this.employeesGraduateScriptsService.getEmployeeGraduateScript(
        employee.id,
        graduateScriptId,
      );

    return {
      employee,
      info,
    };
  }

  async generateProtocolAppendix(studentId: number) {
    const student = await this.studentsService.getStudentById(studentId);
    const degreeWork = await student.$get('degreeWork', {
      include: ['firstQuestionAuthor', 'secondQuestionAuthor'],
    });
    const graduateScript = await student.$get('graduateScript');
    const { chairman, secretary } =
      await this.graduateScriptsService.getAllEmployeesByGraduateScript(
        graduateScript.id,
      );

    const number = await this.graduateScriptsService.getGraduateScriptNumber(
      graduateScript.id,
    );

    const supervisor = await degreeWork.$get('supervisor');

    return generateAppendixToTheProtocol({
      degreeWork,
      graduateScript,
      chairman,
      secretary,
      student,
      number,
      supervisor,
    });
  }
}
