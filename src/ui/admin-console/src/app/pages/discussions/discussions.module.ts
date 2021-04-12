import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DiscussionsComponent } from './discussions/discussions.component';



@NgModule({
  declarations: [
    DiscussionsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class DiscussionsModule { }
