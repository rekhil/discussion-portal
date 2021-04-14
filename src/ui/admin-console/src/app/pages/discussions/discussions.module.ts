import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DiscussionsComponent } from './discussions/discussions.component';
import { FilterComponent } from './filter/filter.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgxEditorModule } from 'ngx-editor';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    DiscussionsComponent,
    FilterComponent,
    DetailsComponent,
    AskQuestionComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NgxEditorModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DiscussionsModule { }
