import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByNameWithPassword(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  @Post('/signup')
  create(@Body() reqBody: CreateUserDto) {
    // validate the body from request against the dto
    return this.usersService.create(reqBody);
  }

  @Post('/login')
  async login(@Body() reqBody: { name: string; password: string }) {
    const targetUser = await this.usersService.findByParams({
      name: reqBody.name,
      password: reqBody.password,
    });
    if (targetUser.length === 0) {
      return 'Incorrect password or username!';
    }
    return {
      access_token: jwt.sign(
        {
          name: targetUser[0].name,
          id: targetUser[0].id,
          authLevel: targetUser[0].authLevel,
        },
        '123',
      ),
    };
  }

  @Get('/findall')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/findbyname')
  find(@Query('name') name: string) {
    return this.usersService.findByName(name);
  }

  @Get('/findbyparams')
  findByParams(@Query() query: Partial<UserEntity>) {
    return this.usersService.findByParams(query);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(name, updateUserDto);
  }

  @Delete(':name')
  remove(@Param('email') name: string) {
    return this.usersService.remove(name);
  }
}
