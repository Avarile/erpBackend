import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: { username: string; password: string }): Promise<any> {
    const targetUser = await this.authService.validateUserCredentials(user);
    if (!targetUser) {
      throw new UnauthorizedException(
        'User not exist, or wrong credential provided',
      );
    }

    const { password, ...result } = targetUser;
    return result;
  }
}
