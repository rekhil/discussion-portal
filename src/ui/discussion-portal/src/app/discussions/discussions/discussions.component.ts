import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DiscussionService } from '../services/discussion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss'],
})
export class DiscussionsComponent implements OnInit, OnDestroy {
  public posts: any[];
  dataSource: MatTableDataSource<any>;
  selectedOption: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;

  constructor(
    private discussionService: DiscussionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.discussionService.posts$.subscribe((data) => {
      this.posts = data;
      this.dataSource = new MatTableDataSource(data);
      this.cdr.detectChanges();
      this.obs = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;
    });
  }

  setSelectedOptionFilter($event) {
    this.selectedOption = $event;
    // sort option - Top
    if (this.selectedOption === 2) {
      this.posts = this.posts.sort((post1, post2) => {
        return post1.likeCount - post1.disLikeCount >
          post2.likeCount - post2.disLikeCount
          ? 1
          : -1;
      });
    }
  }

  pageChange(event: PageEvent) {
    this.dataSource.paginator.pageIndex = event.pageIndex;
  }

  goToDetails(postId: any) {
    this.router.navigate([`/discussions/${postId}`]);
  }

  askQuestion() {
    this.router.navigate([`/discussions/post/new`]);
  }

  ngOnDestroy() {
    this.dataSource.disconnect();
  }
}
