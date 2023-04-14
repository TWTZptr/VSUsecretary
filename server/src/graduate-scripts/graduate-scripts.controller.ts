import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateGraduateScriptDto } from './dto/create-graduate-script.dto';
import { UpdateGraduateScriptDto } from './dto/update-graduate-script.dto';
import { GraduateScriptsService } from './graduate-scripts.service';
import { RoleGuard } from '../auth/guards/role-guard';
import { RequireRoles } from '../auth/decorators/role-auth.decorator';
import { SetGraduateScriptSingleEmployeeDto } from './dto/set-graduate-script-single-employee.dto';
import { SetGraduateScriptCommissionMemberDto } from './dto/set-graduatescript-commission-member.dto';

@Controller('graduate-scripts')
@UseGuards(RoleGuard)
@RequireRoles()
export class GraduateScriptsController {
  constructor(
    private readonly graduateScriptsService: GraduateScriptsService,
  ) {}

  @Post()
  createGraduateScript(@Body() graduateScriptDto: CreateGraduateScriptDto) {
    return this.graduateScriptsService.createGraduateScript(graduateScriptDto);
  }

  @Get(':id')
  getGraduateScriptById(@Param('id') id: number) {
    return this.graduateScriptsService.findGraduateScriptById(id);
  }

  @Patch()
  updateGraduateScript(@Body() graduateScriptDto: UpdateGraduateScriptDto) {
    return this.graduateScriptsService.updateGraduateScript(graduateScriptDto);
  }

  @Delete(':id')
  deleteGraduateScript(@Param('id', ParseIntPipe) id: number) {
    return this.graduateScriptsService.deleteGraduateScriptById(id);
  }

  @Get()
  getAllGraduateScripts() {
    return this.graduateScriptsService.getAllGraduateScripts();
  }

  @Get(':graduateScriptId/employees')
  findGraduateScriptEmployees(
    @Param('graduateScriptId', ParseIntPipe) graduateScriptId: number,
  ) {
    return this.graduateScriptsService.getAllEmployeesByGraduateScript(
      graduateScriptId,
    );
  }

  @Post(':graduateScriptId/chairman')
  setGraduateScriptChairman(
    @Param('graduateScriptId', ParseIntPipe) graduateScriptId: number,
    @Body() setGraduateScriptChairmanDto: SetGraduateScriptSingleEmployeeDto,
  ) {
    return this.graduateScriptsService.setGraduateScriptChairman(
      graduateScriptId,
      setGraduateScriptChairmanDto.employeeId,
    );
  }

  @Post(':graduateScriptId/secretary')
  setGraduateScriptSecretary(
    @Param('graduateScriptId', ParseIntPipe) graduateScriptId: number,
    @Body() setGraduateScriptSecretaryDto: SetGraduateScriptSingleEmployeeDto,
  ) {
    return this.graduateScriptsService.setGraduateScriptSecretary(
      graduateScriptId,
      setGraduateScriptSecretaryDto.employeeId,
    );
  }

  @Post(':graduateScriptId/commission-member')
  setGraduateScriptCommissionMember(
    @Param('graduateScriptId', ParseIntPipe) graduateScriptId: number,
    @Body() setGraduateScriptSecretaryDto: SetGraduateScriptCommissionMemberDto,
  ) {
    return this.graduateScriptsService.setGraduateScriptCommissionMember(
      graduateScriptId,
      setGraduateScriptSecretaryDto,
    );
  }
}
