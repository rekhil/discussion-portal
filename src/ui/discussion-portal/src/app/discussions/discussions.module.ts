import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiscussionsRoutingModule } from './discussions-routing.module';
import { DiscussionsComponent } from './discussions/discussions.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { DetailsComponent } from './details/details.component';
import { PostComponent } from './post/post.component';
import { FilterComponent } from './filter/filter.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    DiscussionsComponent,
    AskQuestionComponent,
    DetailsComponent,
    PostComponent,
    FilterComponent,
    CategoriesComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    DiscussionsRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DiscussionsModule {}
