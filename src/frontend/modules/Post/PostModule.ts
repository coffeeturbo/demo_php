import {NgModule} from "@angular/core";
import {PostRESTService} from "./Service/PostRESTService";
import {PostComponent} from "./Component/Post/index";
import {PostResolver} from "./Service/PostResolver";
import {PostTitleResolver} from "./Service/PostTitleResolver";
import {PostRoute} from "./Route/PostRoute/index";

@NgModule({
    imports: [
    ],
    declarations: [
        PostComponent,
        PostRoute
    ],
    providers:[
        PostRESTService,
        PostResolver,
        PostTitleResolver
    ]
})
export class PostModule {}