import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "pluralize",
})
export class PluralizePipe implements PipeTransform {

    transform(number: number, ...titles: any[]): string {
        let cases = [2, 0, 1, 1, 1, 2];
        return number + " " + titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
}