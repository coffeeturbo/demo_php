import {AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, OnChanges, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import * as striptags from "striptags";

import {PlatformService} from "../../../Application/Service/PlatformService";

@Component({
    selector: 'attachment-input-text',
    styleUrls: ['./style.shadow.scss'],
    templateUrl: './template.pug',
    providers: [{
        provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => AttachmentInputTextComponent),
        multi: true
    }]
})

export class AttachmentInputTextComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit {
    propagateChange:any = () => {};
    @Input() id: string;
    @Input('value') _value = "";
    @Input() placeholder = "Enter text";
    @Input() focus: boolean = false;
    isPasteFormatted: boolean = true;

    constructor(
        private elementRef: ElementRef,
        private pl: PlatformService,
        private renderer: Renderer2
    ) {}
    
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.propagateChange(value);
    }
    
    ngOnInit() {
        if (this.focus) {
            this.textarea.nativeElement.focus()
        }
    }

    @ViewChild('textarea') public textarea: ElementRef;
    @ViewChild('actions') public actions: ElementRef;
    public ngAfterViewInit() {
        this.textarea.nativeElement.innerHTML = this.value;
    }

    writeValue(value) {
        if (value) {
            this.value = striptags(value, ['a', 'b', 'h2', 'i', 'u', 'p', 'strike', 'blockquote']);
            // this.value = value;
        }
    }

    ngOnChanges() {
        this.propagateChange(this.value);
    }
    
    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    onInput(value): void {
        this.writeValue(value)
    }
    
    state(command, value = null) {
        if(value) {
            return document.queryCommandValue(command) == value; 
        } else {
            return document.queryCommandState(command);
        }
    }
    
    exec(command, value = null) {
        if(typeof document !== "undefined" && typeof document.execCommand == "function") {
            if(value && this.state(command, value)) {
                let element = window.getSelection().anchorNode.parentElement;
                element.outerHTML = element.innerText;
                this.onInput(this.textarea.nativeElement.innerHTML);
                this.showEditor = false;
                return;
            } else {
                document.execCommand(command, false, value)
            }
        }
    }

    public selectionStart:boolean = false;
    public showEditor:boolean = false;
    public editorPosition: { left: string, top: string } = null;

    public prepareSelection() {
        this.selectionStart = true;
        this.showEditor = false
    }
    
    @HostListener('window:mouseup', ["$event"])
    public mouseup(e) {
        if(this.actions && this.actions.nativeElement.contains(e.target)) return;
        
        setTimeout(()=>{
            let selection: Selection = window.getSelection();
            if(this.pl.isPlatformBrowser()) {
                // console.log(selection.getRangeAt(0));
                this.showEditor = this.selectionStart && !selection.getRangeAt(0).collapsed;
                this.selectionStart = false;
                if (this.showEditor) {
                    let selectionClientRect: ClientRect = selection.getRangeAt(0).getBoundingClientRect();
                    
                    console.log(selectionClientRect);
                    let left = selectionClientRect.left  + (selectionClientRect.width/2) - 86.25;
                    this.editorPosition = {
                        left: left + "px",
                        top: (selectionClientRect.top - 37) + "px"
                    }
                }
            }
        },0);
    }

    public paste(e) { // Remove unallowed tags from clipboard
        let allowedTags = ['a', 'b', 'em', 'strong', 'h2', 'h3', 'i', 'u', 'p', 'strike', 'blockquote'];
        let allowedAttributes = ['href'];
        
        e.preventDefault();
        let clipboardData = ((e.originalEvent || e).clipboardData);
        
        let data = clipboardData.getData(this.isPasteFormatted ? "text/html" : "text/plain");
        
        data = striptags(data, allowedTags).trim();
        let htmlObject = this.renderer.createElement("div");
        htmlObject.innerHTML = data;
        
        for (let item of htmlObject.querySelectorAll("*")) {
            let prohibitedAttributeNames=[];
            for(let attribute of item.attributes) {
                if (allowedAttributes.indexOf(attribute.name) ==-1) {
                    prohibitedAttributeNames.push(attribute.name);
                }
            }
            
            for(let prohibitedAttributeName of prohibitedAttributeNames) {
                item.removeAttribute(prohibitedAttributeName);
            }
        }
        
        document.execCommand('insertHtml', false, htmlObject.innerHTML);
    }
}