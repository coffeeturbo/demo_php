import {ModuleWithProviders, NgModule} from "@angular/core";
import {RESTService} from "./Service/RESTService";
import {RESTServiceConfig} from "./Service/RESTServiceConfig";

@NgModule({
    providers: [
        RESTService
    ]
})
export class RESTModule {
    static setPath(path: string): ModuleWithProviders {
        return {
            ngModule: RESTModule,
            providers: [
                {provide: RESTServiceConfig, useValue: {path: path}}
            ]
        };
    }
}