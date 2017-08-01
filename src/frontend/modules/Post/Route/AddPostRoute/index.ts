import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss', './tags.scss']
})

export class AddPostRoute {
    public attachments = new FormArray([]);
    public dragulaOptions = {
        direction: 'vertical', 
        moves: (el, container, handle) => handle.classList.contains('drag') || handle.parentElement.classList.contains('drag')
    };
    
    public form: FormGroup = new FormGroup({
        title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        tags: new FormControl(null, [Validators.required]),
        author_is_me: new FormControl(false),
        attachments:  this.attachments
    }); 
        
    public initAttachment(type?: AttachmentType) {
        return new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(null)
        });
    }

    public addAttachment(type: AttachmentType) {
        this.attachments.push(this.initAttachment(type));
    }

    public removeAttachment(i: number) {
        this.attachments.removeAt(i);
    }

    public submit() {
        console.log(this.form.value);
    }

    handleEnterButton(e: KeyboardEvent) {
        let element = <HTMLElement>e.target;

        if(element instanceof HTMLTextAreaElement === false && element.id !== "addPostTags") {
            e.preventDefault()
        }
    }
}