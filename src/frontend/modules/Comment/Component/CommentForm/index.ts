import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Attachment, AttachmentType} from "../../../Attachment/Entity/Attachment";
import {Post} from "../../../Post/Entity/Post";
import {Comment} from "../../Entity/Comment";
import {CommentCreateRequest} from "../../Http/Request/CommentCreateRequest";
import {CommentService} from "../../Service/CommentService";
import {Observable} from "rxjs/Observable";
import {AttachmentVideo} from "../../../Attachment/Entity/AttachmentVideo";
import {AttachmentText} from "../../../Attachment/Entity/AttachmentText";
import {AttachmentImage} from "../../../Attachment/Entity/AttachmentImage";
import {ActivatedRoute} from "@angular/router";
import {AttachmentService} from "../../../Attachment/Service/AttachmentService";

@Component({
    selector: 'comment-form',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentFormComponent {
    
    @Input() focus: boolean = false;
    @Input() post: Post;
    @Input() parent: Comment;
    @Output() onSubmit = new EventEmitter<Comment>();
    public AttachmentType = AttachmentType;
    public attachments = new FormArray([], Validators.required);
    public isLoading: boolean = false;
    public form: FormGroup  = new FormGroup({
        attachments: this.attachments
    });
    
    constructor(
        private route: ActivatedRoute,
        private attachmentService: AttachmentService,
        private commentService: CommentService
    ) {}

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
        // @TODO: implement
        console.log(e);
    }

    submit() {
        this.isLoading = true;

        if(this.form.value.attachments.length > 1 && this.form.value.attachments[0].value == "") {
            (<FormArray>this.form.controls.attachments).removeAt(0);
        }
        
        let commentCreateRequest: CommentCreateRequest = this.form.value;

        let attachmentsObservable: Observable<Attachment<AttachmentImage | AttachmentText | AttachmentVideo>>[] = [];

        this.form.value.attachments.forEach(attachment => {
            let attachmentObservable: Observable<Attachment<AttachmentImage | AttachmentText | AttachmentVideo>>;

            switch(attachment.type) {
                case AttachmentType.image:
                    attachmentObservable = this.attachmentService.uploadImage({image: attachment.value.image});
                    break;
                case AttachmentType.text:
                    attachmentObservable = Observable.of(attachment);
                    break;
                case AttachmentType.video:
                    attachmentObservable = this.attachmentService.parseVideoLink({url: attachment.value});
                    break;
            }

            attachmentsObservable.push(attachmentObservable);
        });
        
        Observable
            .combineLatest(attachmentsObservable)
            .flatMap((attachments) => {
                // Fck nelmio
                commentCreateRequest.attachments = JSON.stringify(attachments);
                return this.commentService.create(commentCreateRequest)
            })
            .finally(() => this.isLoading = false)
            .subscribe(comment => {
                this.attachments.controls = [];
                this.addAttachment(AttachmentType.text);
                
                if(this.parent) {
                    this.parent.comments.push(comment);
                    this.parent.comments_total++;
                } else {
                    this.route.snapshot.data.comments.push(comment)
                }
                
                this.onSubmit.emit(this.parent);
            })
        ;
    }
}