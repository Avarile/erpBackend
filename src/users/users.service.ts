import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// import the Repo
import { getRepository, Repository } from 'typeorm';
// import the entity
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private repoInstance: Repository<UserEntity>;
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    this.repoInstance = repo;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.repoInstance.create(createUserDto);
    this.repoInstance.save(newUser);
    return `${newUser.name} is succesfully created!`;
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.repoInstance.find();
  }

  async findByName(name: string): Promise<Array<UserEntity>> {
    const targetUser = await this.repoInstance.find({
      where: { name: name },
      select: ['name', 'id', 'authLevel'],
    });

    return targetUser;
  }

  async findByNameWithPassword(name: string): Promise<UserEntity> {
    const targetUser = await this.repoInstance.findOne({
      where: { name: name },
      select: ['name', 'password', 'id', 'authLevel'],
    });

    return targetUser;
  }
  async findByParams(query: Partial<UserEntity>) {
    return await this.repoInstance.find({ where: query });
  }

  update(name: string, updateUserDto: UpdateUserDto) {
    const targetUser = this.repoInstance.findOne(name);
  }

  remove(name: string) {
    return `This action removes a #${name} user`;
  }
}
