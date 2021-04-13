import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DiscussionsComponent } from './discussions/discussions.component';
import { FilterComponent } from './filter/filter.component';
import { NbIconModule } from '@nebular/theme';



@NgModule({
  declarations: [
    DiscussionsComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NbIconModule
  ]
})
export class DiscussionsModule { }
