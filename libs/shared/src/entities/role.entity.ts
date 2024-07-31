import { ENUM_ROLE_TYPE } from '../enum/role.enum';
import { PermissionEntity } from './permission.entity';

export class RoleEntity {
  id?: string;
  name: string;
  description: string;
  type: ENUM_ROLE_TYPE;
  permissions: PermissionEntity[];
}
