import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'ngx-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  public questions: any[];

  constructor(private discussionService: DiscussionService, private router: Router) { }

  ngOnInit(): void {
    this.discussionService.getQuestions().subscribe(data => {
      this.questions = data;
    })
  }

  goToDetails(id: any) {
    this.router.navigate([`/pages/discussions/${id}`]);
  }
}
