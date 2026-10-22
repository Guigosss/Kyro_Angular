import { UserDto } from './user-dto';

export interface UserTokenResponseDto {
  user: UserDto;
  token: string;
}
