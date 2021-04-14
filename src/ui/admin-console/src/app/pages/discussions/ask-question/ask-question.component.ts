import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent, NbTagInputDirective } from '@nebular/theme';
import { Editor, toHTML, toDoc } from 'ngx-editor';
import { tags } from '../models/tags';

@Component({
  selector: 'ngx-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  title: string;
  editor: Editor;
  html: '';

  tags: Set<string> = new Set([]);
  options = tags;
  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.editor = new Editor();
  }

  postQuestion(){
    console.log(this.html);
    console.log(toDoc(this.html));
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.tags.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
