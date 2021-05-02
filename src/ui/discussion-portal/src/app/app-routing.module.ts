import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'discussions',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'discussions',
    loadChildren: () => import('./discussion-wrapper/discussion-wrapper.module').then((m) => m.DiscussionWrapperModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: () => import('./users-wrapper/users-wrapper.module').then((m) => m.UsersWrapperModule),
    canActivate: [AuthGuardService],
    data: { role: 'admin' }
  },
  {
    path: '**',
    redirectTo: 'discussions'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
