import { Routes } from "@angular/router";
import { CustomModuleRoutes } from "../../types/custom-module-routes/custom-module-routes.type";
import { moduleRoute } from "../module-route/module-route.function";

export function initialiseModuleRoutes(customRoutes: CustomModuleRoutes): Routes {
  const routes: Routes = [];
  customRoutes.headRoutes.forEach((route) => routes.push(route));
  routes.push(moduleRoute(customRoutes.moduleRoute));
  customRoutes.tailRoutes.forEach((route) => routes.push(route));
  return routes;
}
