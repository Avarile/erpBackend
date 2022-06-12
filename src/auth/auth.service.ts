import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(user: {
    username: string;
    password: string;
  }): Promise<Partial<UserEntity>> {
    const targetUser = await this.usersService.findByNameWithPassword(
      user.username,
    );

    if (targetUser && targetUser.password === user.password) {
      const { password, ...result } = targetUser;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: Partial<UserEntity>) {
    const payload = {
      username: user.name,
      id: user.id,
      authLevel: user.authLevel,
    };

    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
