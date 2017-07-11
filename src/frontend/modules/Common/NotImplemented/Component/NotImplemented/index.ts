import {Component, Input} from "@angular/core";

@Component({
    selector: "not-implemented",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class NotImplementedComponent {
    @Input() title: string = "Work in progress";
}
