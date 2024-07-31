import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '@edufin-back/shared/dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@edufin-back/common/decorators';
import { UserService } from './user.service';
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly authService: UserService) {}
  @Public()
  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }
  @Get()
  async findAll() {
    return await this.authService.findAll();
  }
}
