import {Component, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";

@Component({
    selector: 'comment-form',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentFormComponent {
    
    
    @Input() focus: boolean = false;
    public AttachmentType = AttachmentType;
    
    public attachments = new FormArray([], Validators.required);

    public form: FormGroup = new FormGroup({
        attachments: this.attachments
    });

    
    ngOnInit() {
        this.addAttachment(AttachmentType.text);
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
    isAttachmentDeleteConfirmed(i) {
        return this._attachmentDeleteConfirmed[i];
    }
    
    confirmDeleteAttachment(i) {
        this._attachmentDeleteConfirmed[i] = true;
    }
    
    cancelDeleteAttachment(i) {
        delete this._attachmentDeleteConfirmed[i];
    }

    deleteAttachment(i) {
        this.attachments.removeAt(i);
        delete this._attachmentDeleteConfirmed[i];
    }
}