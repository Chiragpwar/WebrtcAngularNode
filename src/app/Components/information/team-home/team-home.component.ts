import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.scss']
})
export class TeamHomeComponent implements OnInit {

  constructor(private route: Router) { }
   Url: string;
  ngOnInit() {
    this.Url = this.route.url;
    if (this.Url.indexOf('tos') >= 0) {
      this.route.navigate([this.Url]);
    } else if (this.Url.indexOf('cookie') >= 0) {
      this.route.navigate([this.Url]);
    }  else {
      this.route.navigate(['/ourteam/team']);
    }
  }

}
