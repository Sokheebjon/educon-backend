import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { Public } from '@edufin-back/common/decorators';
@ApiTags('Role')
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Public()
  @Get()
  async getRoles() {
    return await this.roleService.getRoles();
  }
}
