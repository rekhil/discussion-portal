import { Component, OnInit } from '@angular/core';
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
  public selectedOption = 0; // 1,2,3.. in order of display

  constructor(private discussionService: DiscussionService) {}

  ngOnInit(): void {
    this.selectedTags = this.tags;
    this.discussionService.posts$.subscribe((data) => {
      this.postCount = data.length;
    });
  }

  sortByLatest() {
    this.selectedOption = this.selectedOption === 1 ? 0 : 1;
  }

  topPosts() {
    this.selectedOption = this.selectedOption === 2 ? 0 : 2;
  }

  showByCategory() {
    this.selectedOption = this.selectedOption === 3 ? 0 : 3;
  }
}
