import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pic: any;
  name: string;
  prev = 0;
  Next = 0;
  constructor(private route: Router) { }

  ngOnInit() {
    this.Chanageheader();
    this.selectedItem(0);
  }

  Chanageheader() {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    if (data != null ) {
      this.pic = data.photoUrl;
      this.name = data.name;
      this.route.navigate(['profile/account']);
    }
  }

  public Logout() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/user/login']);
  }

  public selectedItem(item) {
    this.Next = item;
    const data = document.getElementsByClassName('nav');
    data[0].children[this.Next].children[0].classList.add('active--6v328');
    if (this.prev !== this.Next) {
      data[0].children[this.prev].children[0].classList.remove('active--6v328');
      this.prev = item;
    }
  }

}
