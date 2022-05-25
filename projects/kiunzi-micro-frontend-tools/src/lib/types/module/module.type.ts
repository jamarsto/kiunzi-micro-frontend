import { Guards } from "../guards/guards.type";
import { MenuItems } from "../menu-items/menu-items.type";
import { Roles } from "../roles/roles.type";

export type Module = { title: string, name: string, prefix: string, items: MenuItems, guards?: Guards, roles?: Roles }
