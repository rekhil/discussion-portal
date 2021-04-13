import { Component, OnInit } from '@angular/core';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'ngx-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public qnCount: number;
  public filterBy: any;
  public showSettings: boolean;

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.discussionService.getQuestions().subscribe(data => {
      this.qnCount = data.length;
    })
  }

}
