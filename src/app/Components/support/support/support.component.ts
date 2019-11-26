import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({selector: 'app-support', templateUrl: './support.component.html', styleUrls: ['./support.component.scss']})

export class SupportComponent implements OnInit {
  constructor(private route: Router) {}
  prev = 0;
  Next = 0;

  ngOnInit() {
    this.route.navigate(['/whereby-support/home']);
    this.selectedItem(0);
  }

  public selectedItem(item) {
    this.Next = item;
    const data = document.getElementsByClassName('nav');
    data[0].children[this.Next].classList.add('active');
    if (this.prev !== this.Next) {
      data[0].children[this.prev].classList.remove('active');
      this.prev = item;
    }
  }
}
