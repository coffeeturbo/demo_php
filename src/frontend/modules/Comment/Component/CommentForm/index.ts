import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {Post} from "../../../Post/Entity/Post";
import {Comment} from "../../Entity/Comment";
import {CommentCreateRequest} from "../../Http/Request/CommentCreateRequest";
import {CommentService} from "../../Service/CommentService";

@Component({
    selector: 'comment-form',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentFormComponent {
    
    @Input() focus: boolean = false;
    @Input() post: Post;
    @Input() parent: Comment;
    public AttachmentType = AttachmentType;
    public attachments = new FormArray([], Validators.required);
    public isLoading: boolean = false;
    public form: FormGroup  = new FormGroup({
        attachments: this.attachments
    });
    
    constructor(private commentService: CommentService) {}

    ngOnInit() {
        this.addAttachment(AttachmentType.text);
        if(this.post) this.form.addControl("post_id", new FormControl(this.post.id));
        if(this.parent) this.form.addControl("parent_id", new FormControl(this.parent.id));
    }
    
    public addAttachment(type: AttachmentType, value?: any) {
        let attachment = new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(value || null, Validators.required)
        });

        this.attachments.push(attachment);
        this.form.controls.attachments.markAsDirty();
    }

    _attachmentDeleteConfirmed:boolean[] = [];
    public isAttachmentDeleteConfirmed(i) {
        return this._attachmentDeleteConfirmed[i];
    }
    
    public confirmDeleteAttachment(i) {
        this._attachmentDeleteConfirmed[i] = true;
    }

    public cancelDeleteAttachment(i) {
        delete this._attachmentDeleteConfirmed[i];
    }

    public deleteAttachment(i) {
        this.attachments.removeAt(i);
        delete this._attachmentDeleteConfirmed[i];
    }

    public handleEnterButton(e) {
        // @DOTO! implement
        console.log(e);
    }

    submit() {
        this.isLoading = true;
        let postCreateRequest: CommentCreateRequest = this.form.value; 

        // Fck nelmio
        postCreateRequest.attachments = JSON.stringify(postCreateRequest.attachments);

        this.commentService.create(postCreateRequest)
            .finally(() => this.isLoading = false)
            .subscribe(() => {
                this.attachments.controls = [];
                this.addAttachment(AttachmentType.text);
            });
    }
}