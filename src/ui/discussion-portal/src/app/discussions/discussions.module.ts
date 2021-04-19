import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';

import { DiscussionsRoutingModule } from './discussions-routing.module';
import { DiscussionsComponent } from './discussions/discussions.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { DetailsComponent } from './details/details.component';
import { PostComponent } from './post/post.component';
import { FilterComponent } from './filter/filter.component';
import { NgxEditorModule } from 'ngx-editor';

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatChipsModule,
  MatTableModule,
  MatPaginatorModule,
  MatDividerModule,
];

@NgModule({
  declarations: [
    DiscussionsComponent,
    AskQuestionComponent,
    DetailsComponent,
    PostComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...materialModules,
    NgxEditorModule,
    DiscussionsRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DiscussionsModule {}
