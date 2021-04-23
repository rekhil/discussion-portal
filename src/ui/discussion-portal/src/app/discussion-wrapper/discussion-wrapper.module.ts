import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionWrapperRoutingModule } from './discussion-wrapper-routing.module';
import { DiscussionsModule } from 'ngx-community';
import { DiscussionsTestComponent } from './discussions-test/discussions-test.component';

@NgModule({
  declarations: [DiscussionsTestComponent],
  imports: [CommonModule, DiscussionsModule, DiscussionWrapperRoutingModule],
})
export class DiscussionWrapperModule {}
