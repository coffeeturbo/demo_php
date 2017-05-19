import {PipeTransform, Pipe} from "@angular/core";
import {TranslationService} from "../Service/TranslationService";

@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform
{
    constructor(private translationService: TranslationService){}

    transform(value: string, ...args: any[]): string {
        return this.translationService.translate(value);
    }
}