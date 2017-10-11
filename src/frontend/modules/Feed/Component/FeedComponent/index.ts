import {Component, Input} from '@angular/core';
import {Post} from "../../../Post/Entity/Post";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent {
    @Input() posts: Post[];
}