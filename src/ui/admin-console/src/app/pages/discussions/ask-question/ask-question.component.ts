import { Component, OnInit } from '@angular/core';
import { Editor, toHTML, toDoc } from 'ngx-editor';

@Component({
  selector: 'ngx-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  title: string;
  editor: Editor;
  html: '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  postQuestion(){
    console.log(this.html);
    console.log(toDoc(this.html));
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
