import { ENUM_PERMISSION_ACTION } from '../enum/permission-action.enum';
import { ENUM_PERMISSION_TYPE } from '../enum/permission-type.enum';

export class PermissionEntity {
  id?: string;
  permissionName: string;
  description: string;
  permissionType: ENUM_PERMISSION_TYPE;
  permissionAction: ENUM_PERMISSION_ACTION;
}
