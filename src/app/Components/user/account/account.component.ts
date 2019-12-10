import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AuthServices} from '../../../service/CommenService';
import {HomeComponent} from '../../home/home.component';
import {User} from '../../../modals/modal';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  Deletebox = false;
  Email: string;
  Detail: any;
  name: string;
  profileUrl: string;
  inputBox = false;
  NewUser: string;
  public imageSrc: string;
  Avatar = true;
  userdata = new User();
  constructor(private service: AuthServices, private home: HomeComponent) { }
  @ViewChild('Inputname', null) namebox: ElementRef;
  @ViewChild('imgs', null) imgs: ElementRef;

  ngOnInit() {
    this.GetDetail();
  }

  public DeleteAccount() {
    this.Deletebox = true;
  }

  public GetDetail() {
  this.Detail = JSON.parse(localStorage.getItem('currentUser'));
  if (this.Detail != null) {
      this.Email = this.Detail.email;
      this.name = this.Detail.name;
      this.profileUrl = this.Detail.photoUrl;
  }
  }

  public Displaybox(val) {
    this.inputBox = true;
  }

  public boxon(action) {
    if (action === 'cancle') {
     this.namebox.nativeElement.value = this.name;
    } else {
      this.name =   this.namebox.nativeElement.value;
      this.userdata.name = this.name;
      this.userdata.email = this.Email;
      if (this.imageSrc === undefined) {
        this.userdata.photoUrl =  this.imgs.nativeElement.currentSrc;
      } else {
        this.userdata.photoUrl = this.imageSrc;
      }
      this.service.updateuserprofile(this.userdata).subscribe(Response => {
        this.GetDetail();
        this.home.Changelayout();
      });
    }
    this.inputBox = false;
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.Avatar = false;
  }
  public Revert() {
    this.Avatar = true;
    this.imageSrc = '';
  }
}
