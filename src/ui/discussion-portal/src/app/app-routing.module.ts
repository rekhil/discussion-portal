import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'discussions',
    loadChildren: () =>
      import('./discussions/discussions.module').then(
        (m) => m.DiscussionsModule
      ),
  },
  {
    path: 'discussion-wrapper',
    loadChildren: () =>
      import('./discussion-wrapper/discussion-wrapper.module').then(
        (m) => m.DiscussionWrapperModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
