import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DiscussionsComponent } from './discussions/discussions.component';
import { FilterComponent } from './filter/filter.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule
} from '@nebular/theme';
import { DetailsComponent } from './details/details.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';



@NgModule({
  declarations: [
    DiscussionsComponent,
    FilterComponent,
    DetailsComponent,
    AskQuestionComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ThemeModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule
  ]
})
export class DiscussionsModule { }
