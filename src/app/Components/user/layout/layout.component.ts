import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../../home/home.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  constructor(private home: HomeComponent) { }

  ngOnInit() {
    this.home.Changelayout();
  }

}
