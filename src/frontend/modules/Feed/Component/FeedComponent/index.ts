import {Component, Input} from '@angular/core';

import {Feed} from "../../Entity/Feed";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent {
    @Input() feed: Feed;
}