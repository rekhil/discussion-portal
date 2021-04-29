import { Component, OnInit } from '@angular/core';
import { Config } from '../../shared/config';
import { DiscussionService } from '../services/discussion.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  public posts: any[];
  postsByCategory = [];

  constructor(private discussionService: DiscussionService) { }

  ngOnInit(): void {
    this.discussionService.posts$.subscribe((data) => {
      this.posts = data;
      const tags = Config.allTags;
      tags.forEach((tag) => {
        const matchingPosts = this.posts.filter(
          (post) =>
            (tag == 'Untagged' && !post.tags) ||
            (tag == 'Untagged' && post.tags.length === 0) ||
            post.tags.indexOf(tag) > -1 ||
            post.tags.indexOf(tag.toLowerCase()) > -1
        );
        this.postsByCategory.push({
          tag,
          posts: matchingPosts,
        });
      });
    });
  }
}
