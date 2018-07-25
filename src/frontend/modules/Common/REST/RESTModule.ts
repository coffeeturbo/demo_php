import {ModuleWithProviders, NgModule} from "@angular/core";
import {RESTInterceptor} from "./Service/RESTInterceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RESTConfig} from "./Config/RESTConfig";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RESTInterceptor,
            multi: true,
        }
    ],
    declarations: []
})
export class RESTModule {
    static init(path: string, tokenPrefix?: string): ModuleWithProviders {
        return {
            ngModule: RESTModule,
            providers: [
                {
                    provide: RESTConfig,
                    useValue: {
                        path: path,
                        tokenPrefix: tokenPrefix
                    }
                }
            ]
        };
    }
} 