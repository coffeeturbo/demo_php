import { CanDeactivate } from '@angular/router';
import {PostFormRoute} from "../Route/PostFormRoute";
import {TranslationService} from "@angular-addons/translate";

export class CanDeactivatePostFormRoute implements CanDeactivate<PostFormRoute> 
{
    canDeactivate(postFormRoute: PostFormRoute) {
        return postFormRoute.canDeactivate();
    }
}