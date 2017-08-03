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
            .debounceTime(300) // Ohyenable feature 
            .do(() => this.saved = false)
            .debounceTime(700) // Ohyenable feature 
            .subscribe((post: Post) => {
                localStorage.setItem("new-post", JSON.stringify(post));
                this.saved = true;
            });
    }

    public initForm(): FormGroup {
        let post: Post;
        try {
            post = JSON.parse(localStorage.getItem("new-post"));
            post.attachments.map(
                attachment => this.addAttachment(attachment.type, attachment.value)
            );

        } catch (e) {
            post = null;
        }
        
        return new FormGroup({
            title: new FormControl(post ? post.title : null, [Validators.required, Validators.minLength(5)]),
            tags: new FormControl(post ? post.tags : null, [Validators.required]),
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
    
    public reset() {
        this.form.reset();
        this.attachments.controls = [];
    }

    public submit() {
        let post: Post;
        console.log(this.form);
        localStorage.removeItem("new-post");
    }

    public handleEnterButton(e: KeyboardEvent) {
        let element = <HTMLElement>e.target;

        if (element instanceof HTMLTextAreaElement === false && element.id !== "addPostTags") {
            e.preventDefault()
        }
    }
}