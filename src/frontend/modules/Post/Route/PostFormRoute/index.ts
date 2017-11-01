import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslationService} from "@angular-addons/translate";

import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {Tag} from "../../../Tag/Entity/Tag";
import {Post} from "../../Entity/Post";
import {Observable} from "rxjs/Observable";
import {AttachmentRESTService} from "../../../Attachment/Service/AttachmentRESTService";

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
        name: this.translationService.translate("author's")
    };

    constructor(
        private translationService: TranslationService,
        private attachmentRest: AttachmentRESTService
    ) {}

    ngOnInit() {
        try {
            let postForm = JSON.parse(localStorage.getItem("post-form"));
            
            if (postForm.attachments.length > 0) {
                postForm.attachments.map(attachment => this.addAttachment(attachment.type, attachment.value));
            }

            if (postForm.title) {
                this.form.controls.title.setValue(postForm.title);
                this.form.controls.title.markAsDirty();
            }
            
            if (postForm.tags) {
                this.form.controls.tags.setValue(postForm.tags);
                this.form.controls.tags.markAsDirty();
            }
        } catch (e) {}

        this.form.valueChanges
            .debounceTime(500) // Ohyenable feature 
            .do(() => this.saved = false)
            .debounceTime(500) // Ohyenable feature 
            .subscribe((post: Post) => {
                localStorage.setItem("post-form", JSON.stringify(post));
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
            tags = tags.filter((item: Tag) => item.name != this.authorTag.name);
        }

        this.form.controls.tags.setValue(tags);
        this.form.controls.tags.markAsDirty();
    }
    
    public hasAuthorTag(): boolean {
        let tags: Tag[] = this.form.controls.tags.value || [];

        return tags.filter(
                (item: Tag) => item.name == this.authorTag.name
            ).length > 0;
    }

    public reset() {
        this.attachments.controls = [];
        this.submitted = false;
        this.form.reset();
    }

    public submit() {
        this.submitted = true;
        
        // this.form.value.attachments.forEach(attachment => {
        //     if(attachment.type == AttachmentType.image) {
        //         console.log(attachment.value);
        //         this.attachmentRest.uploadImage({image: attachment.value.image}).subscribe((data)=>{
        //             console.log("123");
        //             console.log(data);
        //         })
        //     }
        // });
        
        console.log(this.form.value);
        // localStorage.removeItem("post-form");
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
                {name: text},
                {name: text + " foo"},
                {name: text + " bar"},
                {name: text + " baz"}
            ])
        ;
    };
}   
 