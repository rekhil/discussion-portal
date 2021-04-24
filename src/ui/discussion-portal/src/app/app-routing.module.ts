import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'discussions',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  // {
  //   path: 'discussions',
  //   loadChildren: () =>
  //     import('./discussions/discussions.module').then(
  //       (m) => m.DiscussionsModule
  //     ),
  // },
  {
    path: 'discussions',
    loadChildren: () =>
      import('./discussion-wrapper/discussion-wrapper.module').then(
        (m) => m.DiscussionWrapperModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users-wrapper/users-wrapper.module').then(
        (m) => m.UsersWrapperModule
      ),
  },
  // {
  //   path: 'users',
  //   loadChildren: () =>
  //     import('./users/users.module').then((m) => m.UsersModule),
  // },
  {
    path: '**',
    redirectTo: 'discussions',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
