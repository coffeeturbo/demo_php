import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "datediff",
})
export class ProfileDateCreatedPipe implements PipeTransform {

    transform(dateString: string, ...args: any[]) {
        
        let format = args[0];
        let roundUntil = args[1] || "day";
        let date: Date = new Date(dateString);
        let now: Date = new Date();

        switch (roundUntil){
            case 'year':
                now.setHours(0,0,0,0);
                now.setDate(0);
                now.setMonth(0);
            break;
            case 'month':
                now.setHours(0,0,0,0);
                now.setDate(0);
            break;
            case 'day':
                now.setHours(0,0,0,0);
            break;
            case 'hour':
                now.setMinutes(0,0,0);
                break;
            case 'minute':
                now.setSeconds(0,0);
            break;
        }
        
        let dateDiff = new Date(Math.abs(+now - +date));
        let years = dateDiff.getFullYear() - 1970;
        let months = dateDiff.getMonth();
        let days = dateDiff.getDate();

        switch (format) {
            case 'year':
                return years;
            case 'month':
                return months;
            case 'day':
                return days;
        }
    }
}
