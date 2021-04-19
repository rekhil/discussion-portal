import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public postCount: number;
  public filterBy: any;
  public showSettings: boolean;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.discussionService.posts$.subscribe(data => {
      this.postCount = data.length;
    })
  }

}
