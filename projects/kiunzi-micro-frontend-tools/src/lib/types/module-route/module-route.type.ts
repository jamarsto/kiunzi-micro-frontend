import { Routes } from "@angular/router";
import { Guards } from "../guards/guards.type";
import { Roles } from "../roles/roles.type";

export type ModuleRoute = { component?: any, guards?: Guards, roles?: Roles, children: Routes }
