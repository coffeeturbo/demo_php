import {Component, Input} from "@angular/core";

@Component({
    selector: "modal-header",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ModalHeaderComponent {
    @Input("title") title: string;
}
