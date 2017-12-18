import {Component, HostBinding, Input} from '@angular/core';
import {Comment} from "../../Entity/Comment";
import {MockData} from "../../Mock/MockData";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";

@Component({
    selector: 'comment',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentComponent {
    public AttachmentType = AttachmentType;

    @HostBinding('class.root')
    @Input() root: boolean = true;

    @Input() comment: Comment = MockData.comment;
    
    public showChildComments = true;
    public showForm = false;
    
    
    
    toggleChildComments() {
        this.showChildComments = !this.showChildComments;
    }
    toggleForm() {
        this.showForm = !this.showForm;
    }
}