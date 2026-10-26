import { UserDto } from './user-dto';

export interface UserTokenResponseDto {
  user: UserDto;
  accessToken: string;
}
