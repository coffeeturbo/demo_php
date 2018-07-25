import {Route} from "@angular/router";

import {Roles} from "../../Auth/Entity/Role";

export interface JetRoute extends Route {
    children?: JetRoute[];
    data?: {
        [name: string]: any;
        title?: string;
        allow?: Roles;
        verificationType?: "full" | "partially"; // all roles in must be at account or only their part
    }
}

export type JetRoutes = JetRoute[];