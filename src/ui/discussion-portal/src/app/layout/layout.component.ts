import { Component, OnInit } from '@angular/core';
import { Config } from '../shared/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public menuItems = Config.menuItems;

  constructor() {}

  ngOnInit(): void {}
}
