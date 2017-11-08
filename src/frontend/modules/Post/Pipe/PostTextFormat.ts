import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
        name: "post_text_format",
})
export class PostTextFormat implements PipeTransform {
    constructor() {}
    transform(value: string) {
        return value.replace(/\n/g, "<br/>");
    }
}