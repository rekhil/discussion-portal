import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { UsersModule } from './users/users.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    Ng2SmartTableModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    DiscussionsModule,
    UsersModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
