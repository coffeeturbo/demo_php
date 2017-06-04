import {NgModule} from "@angular/core";
import {PostRESTService} from "./Service/PostRESTService";
import {PostComponent} from "./Component/Post/index";

@NgModule({
    imports: [
    ],
    declarations: [
        PostComponent
    ],
    providers:[
        PostRESTService
    ],
    exports: [
        PostComponent
    ]
})
export class PostModule {}