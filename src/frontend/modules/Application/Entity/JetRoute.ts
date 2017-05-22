import {Route} from "@angular/router";

import {Roles} from "../../Auth/Entity/Role";

export interface JetRoute extends Route {
    children?: JetRoute[];
    data?: {
        [name: string]: any;
        title?: string;
        allow?: Roles;
    }
}

export type JetRoutes = JetRoute[];