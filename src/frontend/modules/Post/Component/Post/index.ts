import {Component, Input} from '@angular/core';
import {Post} from "../../Entity/Post";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";

@Component({
    selector: 'post',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostComponent {
    public AttachmentType = AttachmentType;

    @Input() post: Post;
}