import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { DetailsComponent } from './details/details.component';
import { DiscussionsComponent } from './discussions/discussions.component';

const routes: Routes = [
  {
    path: '',
    component: DiscussionsComponent,
  },
  {
    path: 'post/new',
    component: AskQuestionComponent,
  },
  {
    path: ':postId',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionsRoutingModule {}
