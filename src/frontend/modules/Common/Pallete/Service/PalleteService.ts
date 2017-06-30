import {Injectable} from "@angular/core";

@Injectable()
export class PalleteService
{
    private pallete = [
        'red',
        'pink',
        'purple',
        'deep-purple',
        'indigo',
        'blue',
        'light-blue',
        'cyan',
        'teal',
        'green',
        'light-green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'deep-orange',
        'brown',
        'grey',
        'blue-grey'
    ];

    public encode(string: string)
    {
        let index: number = string
                .split("")                          // make array
                .map(char => +char.charCodeAt(0))   //convert chr to int chr codes
                .reduce((a, b) => a + b, 0)         // summ all chr codes
            % this.pallete.length               // module summ of availible pallete ( 123123 % 19 is always < 19)
        ;

        return this.pallete[index];
    }

}
