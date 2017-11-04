import {Component, ElementRef, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslationService} from "@angular-addons/translate";

import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {Tag} from "../../Entity/Tag";
import {Post} from "../../Entity/Post";
import {Observable} from "rxjs/Observable";

const localStorage = typeof window !='undefined' ? window.localStorage : { getItem(key: any): any { return null }, removeItem(key: any) {}, setItem(key: any, val: any) {} };

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss', './tags.scss']
})

export class PostFormRoute implements OnInit {
    public AttachmentType = AttachmentType;
    public attachments = new FormArray([]);
    public submitted: boolean = false;
    public saved: boolean = true;

    public form: FormGroup = new FormGroup({
        title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
        tags: new FormControl(null, [Validators.required]),
        attachments: this.attachments
    });

    public authorTag: Tag = {
        display: this.translationService.translate("author's"),
        value: this.translationService.translate("author's")
    };

    constructor(private translationService: TranslationService, private el: ElementRef) {}

    ngOnInit() {
        this.el.nativeElement.querySelector(".ng2-tag-input__text-input").size = 1; // bugfix ngxchips (flex width input)
        
        try {
            let post: Post = JSON.parse(localStorage.getItem("new-post"));
            
            if (post.attachments.length > 0) {
                post.attachments.map(
                    attachment => this.addAttachment(attachment.type, attachment.value)
                );
            }

            if (post.title) {
                this.form.controls.title.setValue(post.title);
                this.form.controls.title.markAsDirty();
            }
            
            if (post.tags) {
                this.form.controls.tags.setValue(post.tags);
                this.form.controls.tags.markAsDirty();
            }
        } catch (e) {}

        this.form.valueChanges
            .debounceTime(500) // Ohyenable feature 
            .do(() => this.saved = false)
            .debounceTime(500) // Ohyenable feature 
            .subscribe((post: Post) => {
                localStorage.setItem("new-post", JSON.stringify(post));
                this.saved = true;
            });

    }

    public addAttachment(type: AttachmentType, value?: any) {
        let attachment = new FormGroup({
            type: new FormControl(type || AttachmentType.text),
            value: new FormControl(value || null)
        });

        this.attachments.push(attachment);
        this.form.controls.attachments.markAsDirty();
    }

    public removeAttachment(i: number) {
        this.attachments.removeAt(i);
    }

    public updateAuthorTag(isAuthor: boolean) {
        let tags: Tag[] = this.form.controls.tags.value || [];

        if (isAuthor) {
            tags.push(this.authorTag);
        } else {
            tags = tags.filter((item: Tag) => item.value != this.authorTag.value);
        }

        this.form.controls.tags.setValue(tags);
        this.form.controls.tags.markAsDirty();
    }
    
    public hasAuthorTag(): boolean {
        let tags: Tag[] = this.form.controls.tags.value || [];

        return tags.filter(
                (item: Tag) => item.value == this.authorTag.value
            ).length > 0;
    }

    public reset() {
        this.attachments.controls = [];
        this.submitted = false;
        this.form.reset();
    }

    public submit() {
        this.submitted = true;
        let post: Post;
        console.log(this.form);
        // console.log(this.form.value);
        localStorage.removeItem("new-post");
        // this.form.controls['title'].getError("minlength").requiredLength
    }

    public handleEnterButton(e: KeyboardEvent) {
        let element = <HTMLElement>e.target;

        if (element instanceof HTMLTextAreaElement === false && element.id !== "addPostTags") {
            e.preventDefault()
        }
    }

    public requestAutocompleteItems = (text: string): Observable<Tag[]> => {
        // @DOTO: Make rest service
        return Observable
            .of([
                {value: text, display: text},
                {value: text + " foo", display: text + " foo"},
                {value: text + " bar", display: text + " bar"},
                {value: text + " baz", display: text + " baz"}
            ])
        ;
    };
}   
 