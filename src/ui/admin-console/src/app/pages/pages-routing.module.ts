import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DiscussionsComponent } from './discussions/discussions/discussions.component';
import { DetailsComponent as DiscussionDetailsComponent } from './discussions/details/details.component';
import { AskQuestionComponent } from './discussions/ask-question/ask-question.component';
import { UsersComponent } from './users/users/users.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'discussions',
      component: DiscussionsComponent
    },
    {
      path: 'discussions/question/ask',
      component: AskQuestionComponent
    },
    {
      path: 'discussions/:postId',
      component: DiscussionDetailsComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: '',
      redirectTo: 'discussions',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
