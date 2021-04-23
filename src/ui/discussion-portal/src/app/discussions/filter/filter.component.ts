import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/shared/config';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public postCount: number;
  public tags: Array<string> = Config.allTags;
  public selectedTags = [];
  @Input() selectedOption = 0; // 1,2,3.. in order of display
  @Output() setSelectedOptionFilter = new EventEmitter();

  constructor(private discussionService: DiscussionService) {}

  ngOnInit(): void {
    this.selectedTags = this.tags;
    this.discussionService.posts$.subscribe((data) => {
      this.postCount = data.length;
    });
  }

  setOption(option) {
    this.selectedOption = this.selectedOption === option ? 0 : option;
    this.setSelectedOptionFilter.emit(this.selectedOption);
  }
}
