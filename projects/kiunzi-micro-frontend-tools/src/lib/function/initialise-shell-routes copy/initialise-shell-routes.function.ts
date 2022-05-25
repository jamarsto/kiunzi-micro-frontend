import { Routes } from "@angular/router";
import { CustomShellRoutes } from "../../types/custom-shell-routes/custom-shell-routes.type";
import { microFrontEndRoute } from "../micro-front-end-route/micro-front-end-route.function";


export function initialiseShellRoutes(customRoutes: CustomShellRoutes): Routes {
  const routes: Routes = [];
  customRoutes.headRoutes.forEach((route) => routes.push(route));
  customRoutes.moduleRoutes.forEach((module) => routes.push(microFrontEndRoute(module)));
  customRoutes.tailRoutes.forEach((route) => routes.push(route));
  return routes;
}
