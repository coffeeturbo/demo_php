import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";

@Component({
    selector: 'comment-form',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class CommentFormComponent {

    public AttachmentType = AttachmentType;
    
    public attachments = new FormArray([], Validators.required);

    public form: FormGroup = new FormGroup({
        attachments: this.attachments
    });

    public addAttachment(type: AttachmentType, value?: any) {
        let attachment = new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(value || null, Validators.required)
        });

        this.attachments.push(attachment);
        this.form.controls.attachments.markAsDirty();
    }    

}