import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Editor } from 'ngx-editor';
import { tags } from '../models/tags';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
  title: string;
  editor: Editor;
  htmlContent: any;

  tags = [];
  options = tags;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  @ViewChild('tagInput', { static: true }) tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;

  constructor(
    private discussionService: DiscussionService,
    private router: Router
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.options.slice()
      )
    );
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  postQuestion() {
    const request = {
      subject: this.title,
      postDescription: this.htmlContent,
      tags: Array.from(this.tags.values()),
      isTopic: true,
      createdBy: 'Code Owner',
    };
    this.discussionService.createPost(request).subscribe((data) => {
      this.router.navigate(['/discussions']);
    });
  }

  onTagRemove(x: any) { }
  // onTagRemove(tagToRemove: NbTagComponent): void {
  //   this.tags.delete(tagToRemove.text);
  //   this.options.push(tagToRemove.text);
  // }

  // onTagAdd(value: string): void {
  //   if (value) {
  //     this.tags.add(value);
  //     this.options = this.options.filter(o => o !== value);
  //   }
  //   this.tagInput.nativeElement.value = '';
  // }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
