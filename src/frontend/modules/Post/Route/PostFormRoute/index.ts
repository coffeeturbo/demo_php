import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslationService} from "@angular-addons/translate";

import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {Tag} from "../../Entity/Tag";
import {Post} from "../../Entity/Post";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss', './tags.scss']
})

export class PostFormRoute implements OnInit {

    public attachments = new FormArray([]);
    public saved: boolean = true;
    public dragulaOptions = {
        moves: (el, container, handle) => handle.classList.contains('drag') || handle.parentElement.classList.contains('drag')
    };

    public form: FormGroup = this.initForm();
    public authorTag: Tag = {
        display: this.translationService.translate("Author's"),
        value: "Author's"
    };
    
    constructor(private translationService: TranslationService) {}

    ngOnInit() {
        this.form.valueChanges
            .do(() => this.saved = false)
            .debounceTime(1000) // Ohyenable feature 
            .subscribe((data) => {
                localStorage.setItem("postForm", JSON.stringify(data));
                this.saved = true;
            });
    }
ngOnChanges() {
        console.log("1");
}
    public initForm(): FormGroup {
        let data;
        if (localStorage.getItem("postForm")) {
            data = JSON.parse(localStorage.getItem("postForm"));
            data.attachments.map(attachment => this.addAttachment(attachment.type, attachment.value));
        }

        return new FormGroup({
            title: new FormControl(data ? data.title : null, [Validators.required, Validators.minLength(5)]),
            tags: new FormControl(data ? data.tags : null, [Validators.required]),
            attachments: this.attachments
        });

    }

    public addAttachment(type: AttachmentType, value?: any) {
        let attachment = new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(value || null)
        });

        this.attachments.push(attachment);
    }

    public removeAttachment(i: number) {
        this.attachments.removeAt(i);
    }

    public updateAuthorTag(isAuthor: boolean) {
        let tags: Tag[] = this.form.controls["tags"].value || [];

        if (isAuthor) {
            tags.push(this.authorTag);
        } else {
            tags = tags.filter((item: Tag) => item.value != this.authorTag.value);
        }

        this.form.controls["tags"].setValue(tags);
    }

    public hasAuthorTag(): boolean {
        let tags: Tag[] = this.form.controls["tags"].value || [];

        return tags.filter(
            (item: Tag) => item.value == this.authorTag.value
        ).length > 0;
    }

    public submit() {
        let post: Post;
        console.log(this.form.value);
        localStorage.removeItem("postForm");
    }

    public handleEnterButton(e: KeyboardEvent) {
        let element = <HTMLElement>e.target;

        if (element instanceof HTMLTextAreaElement === false && element.id !== "addPostTags") {
            e.preventDefault()
        }
    }
}