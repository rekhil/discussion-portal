import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { Editor } from 'ngx-editor';
import { tags } from '../models/tags';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'ngx-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  title: string;
  editor: Editor;
  htmlContent: any;

  tags: Set<string> = new Set([]);
  options = tags;
  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  postQuestion() {
    const request = {
      subject: this.title,
      postDescription: this.htmlContent,
      tags: Array.from(this.tags.values()),
      isTopic: true,
      createdBy: "Code Owner"
    };
    this.discussionService.createPost(request);
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
