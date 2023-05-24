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
import { generateMarksListShort } from './generation-scripts/generateMarksListShort';
import { Op } from 'sequelize';
import { generateStudentListing } from './generation-scripts/generateStudentListing';
import { Student } from '../students/students.model';
import { DegreeWork } from '../degree-works/degree-work.model';
import { generateStudentPassports } from './generation-scripts/generateStudentPassports';
import { generateQualificationListing } from './generation-scripts/generateQualificationList';

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

    const direction = await graduateScript.$get('direction');
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

  async generateMarksListShort(graduateScriptId) {
    const graduateScript =
      await this.graduateScriptsService.findGraduateScriptById(
        graduateScriptId,
      );

    const direction = await graduateScript.$get('direction', {
      include: ['educationLevel'],
    });
    const { chairman, secretary } =
      await this.graduateScriptsService.getAllEmployeesByGraduateScript(
        graduateScript.id,
      );

    const students = await this.studentsService.getStudentsByGraduateScriptId(
      graduateScriptId,
    );

    return generateMarksListShort({
      graduateScript,
      chairman,
      secretary,
      direction,
      students,
    });
  }

  async generateStudentListing(year: number, directionId: number) {
    const direction = await this.directionsService.getDirectionById(
      directionId,
      { include: ['educationLevel'] },
    );

    const graduateScripts =
      await this.graduateScriptsService.getGraduateScriptsByOptions({
        where: {
          directionId,
          date: {
            [Op.gte]: `${year}-01-01`,
            [Op.lte]: `${year}-12-31`,
          },
        },
      });

    const students = await this.studentsService.getStudentsByOptions({
      where: {
        graduateScriptId: {
          [Op.in]: graduateScripts.map((gs) => gs.id),
        },
      },
      order: ['lastname', 'name', 'patronymic'],
      include: [{ model: DegreeWork, include: ['mark'] }],
    });

    return generateStudentListing({
      students: students.filter((student) => student.degreeWork),
      direction,
    });
  }

  async getStudentsPassports(graduateScriptId: number) {
    const graduateScript =
      await this.graduateScriptsService.getGraduateScriptById(
        graduateScriptId,
        {
          include: [
            {
              model: Student,
              include: [
                {
                  model: DegreeWork,
                  include: ['supervisor'],
                },
              ],
            },
          ],
        },
      );

    return generateStudentPassports(graduateScript.students);
  }

  async getQualificationListing(graduateScriptId: number) {
    const graduateScript =
      await this.graduateScriptsService.getGraduateScriptById(graduateScriptId);

    const year = graduateScript.date.split('-')[0];

    const graduateScripts =
      await this.graduateScriptsService.getGraduateScriptsByOptions({
        where: {
          complete: true,
          directionId: graduateScript.directionId,
          date: {
            [Op.gte]: `${year}-01-01`,
            [Op.lte]: `${year}-12-31`,
          },
        },
        order: [['date', 'DESC']],
      });

    const direction = await graduateScript.$get('direction', {
      include: ['educationLevel'],
    });
    const students = [];

    for (const gs of graduateScripts) {
      students.push(...(await gs.$get('students')));
    }

    const { chairman, secretary } =
      await this.graduateScriptsService.getAllEmployeesByGraduateScript(
        graduateScriptId,
      );

    return generateQualificationListing({
      date: graduateScripts[0].date,
      direction,
      students,
      chairman,
      secretary,
      number: graduateScripts.length,
    });
  }
}
