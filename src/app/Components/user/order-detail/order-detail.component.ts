import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  pic: any;
  name: string;
  progress = '33%';
  constructor(private route: Router) { }

  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    if (data != null) {
      this.pic = data.photoUrl;
      this.name = data.name;
    } else {
      this.pic = 'assets/icon.png';
      this.name = 'user';
    }
    this.route.navigate(['/order/detail']);
  }
}
