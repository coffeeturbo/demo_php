import {ValidationErrors} from "@angular/forms";

export interface CheckAliasResponse extends ValidationErrors {
    available: boolean
}