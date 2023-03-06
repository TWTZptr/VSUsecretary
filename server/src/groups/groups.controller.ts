import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  createGroup(@Body() groupDto: CreateGroupDto) {
    return this.groupsService.createGroup(groupDto);
  }

  @Patch()
  updateGroup(@Body() groupDto: UpdateGroupDto) {
    return this.groupsService.updateGroup(groupDto);
  }

  @Get(':id')
  getGroupById(@Param('id') id: number) {
    return this.groupsService.findGroupById(id);
  }

  @Delete(':id')
  deleteGroupById(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.deleteGroupById(id);
  }

  @Get()
  getAllGroups() {
    return this.groupsService.getAllGroups();
  }
}
