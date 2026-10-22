import { RoleDto } from './role-dto';

export interface UserDto {
  id: number;
  username: string;
  role: RoleDto;
}
