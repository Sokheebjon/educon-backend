import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';
import { JwtPayload } from '@edufin-back/shared/types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create_user')
  handleUserCreate(@Payload() data) {
    return this.userService.createUser(data);
  }
  @MessagePattern('findAll_user')
  findAll() {
    return this.userService.findAll();
  }
  @MessagePattern('findOne_user')
  findOne(@Payload() payload:{id:string}) {
    return this.userService.findOne(payload.id);
  }
  @MessagePattern('get_roles')
  getRoles() {
    return this.userService.getRoles();
  }
  
  @MessagePattern('get_user_by_token')
  getUserByToken(@Payload() payload:JwtPayload) {
    return this.userService.getUserByToken(payload);
  }



}
