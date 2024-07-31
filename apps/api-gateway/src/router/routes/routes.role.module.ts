import { Module } from "@nestjs/common";
import { RoleController } from "../../modules/role/role.controller";
import { RoleModule } from "../../modules/role/role.module";

@Module({
  controllers: [RoleController],
  providers: [],
  exports: [],
  imports: [RoleModule],
})
export class RoutesRoleModule {}
