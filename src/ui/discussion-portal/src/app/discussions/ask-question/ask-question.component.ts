import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Config } from 'src/app/shared/config';

import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
  @Input() title: string;
  @Input() htmlContent: any;
  @Input() currentTags: string[];
  @Output() updatePost = new EventEmitter();

  tags = [];
  options = Config.tags;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  isEdit: boolean;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private discussionService: DiscussionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.currentTags) {
      this.currentTags.forEach((t) => {
        this.tags.push(t);
      });
      this.isEdit = true;
    }
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.options.slice()
      )
    );
  }

  postQuestion() {
    const loggedInUser = JSON.parse(window.localStorage.getItem('discussion@profile'));
    const request = {
      subject: this.title,
      postDescription: this.htmlContent,
      tags: Array.from(this.tags.values()),
      isTopic: true,
      createdBy: loggedInUser.userName,
    };
    if (this.isEdit) {
      this.updatePost.emit(request);
    } else {
      this.discussionService.createPost(request).subscribe((data) => {
        this.router.navigate(['/discussions']);
      });
    }
  }

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

  /* Cancel edit */
  cancel() {
    this.updatePost.emit();
  }

  ngOnDestroy(): void { }
}
