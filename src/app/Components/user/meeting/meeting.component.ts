import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthServices} from '../../../service/CommenService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

 viewroom = false;
 Room: any;
 DisableButton = true;
 params: string;
 FeaturePlan = false;

  constructor(public route: Router, private routes: ActivatedRoute, public spinner: NgxSpinnerService, public service: AuthServices
              // tslint:disable-next-line: align
              , public tostr: ToastrService) { }

  ngOnInit() {
    this.routes.paramMap.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.params = params['params'].roomname;
    });
    this.getOwnerroom();
  }

  public GetValue(val) {
    if (val !== '' && val != null) {
      this.DisableButton = false;
    } else {
      this.DisableButton = true;
    }
  }

  public GetRoomName(roomname) {
    if (roomname != null && roomname !== '') {
      const user =  JSON.parse(localStorage.getItem('currentUser'));
      this.service.AddRoom(roomname, user).subscribe(Response => {
        // tslint:disable-next-line: no-string-literal
        if (Response['Roomname'] != null) {
        this.viewroom = true;
        // tslint:disable-next-line: no-string-literal
        this.Room = Response['Roomname'];
        } else {
        this.tostr.info('Room Name already Exist', 'Room');
        }
      });
    }
  }

  public deleteRoom(room) {
    this.service.deleteroom(room).subscribe(Response => {
      this.viewroom = false;
    });
  }

  public MeetingRoom() {
     this.spinner.show();
     setTimeout(() => {
      this.route.navigate(['/' + this.Room]);
    }, 3000);
  }

  public getOwnerroom() {
    const user =  JSON.parse(localStorage.getItem('currentUser'));
    if (user != null) {
      this.service.GetownerRoom(user.email).subscribe(Response => {
        // tslint:disable-next-line: no-string-literal
        if (Response['Email'] != null) {
          // tslint:disable-next-line: no-string-literal
          this.Room = Response['Roomname'];
          this.viewroom = true;
        } else {
          this.viewroom = false;
        }
      });
    } else {
      this.route.navigate(['/']);
    }
  }

  public showFeture() {
  this.FeaturePlan = this.FeaturePlan === true ? false : true;
  }

}
