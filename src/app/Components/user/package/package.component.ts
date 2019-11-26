import { Component, OnInit } from '@angular/core';
import {StripeService, Elements, Element as StripeElement, ElementsOptions} from 'ngx-stripe';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Billing} from '../../../modals/modal';
import {AuthServices} from '../../../service/CommenService';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  plan = true;
  planname = 'monthly';
  price =  '9.99';
  currentdate: any;
  AddonPrice = '5.00';
  year: any;
  month: any;
  Package = true;
  Annual = 'annual';
  monthly = 'monthly';
  planAddon = false;
  totalAmount = 9.99;
  butontext = 'Add';
  Billing = 'plan';
  content: HTMLElement;
  optionalFields = false;
  card: StripeElement;
  elements: Elements;
  userBilling = new Billing();
  paybill = '';
  amt: any;
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
   ];
  constructor( private stripeService: StripeService, private Service: AuthServices, private Toastr: ToastrService,
               public spinner: NgxSpinnerService) {  }

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };


  ngOnInit() {
    const d = new Date();
    this.paybill = 'bill';
    this.currentdate = d.getDate();
    this.year = d.getFullYear();
    // tslint:disable-next-line: no-unused-expression
    this.month = this.monthNames[d.getMonth()];
    setTimeout(() => {
      this.monthly = document.getElementsByClassName('Monthly')[0].classList.value;
    }, 300);
  }

  public SelectPackage(val) {
    const d = new Date();
    this.butontext = 'Add';
    document.getElementsByClassName('MyAddon')[0].classList.remove('selected--1kbjm');
    if (val === 'Annual') {
      this.planname =  val.toLowerCase();
      this.price = '99.90';
      this.totalAmount = 99.90;
      this.AddonPrice  =  '50.00';
      this.planAddon = false;
      this.year = d.getFullYear() + 1;
      // tslint:disable-next-line: no-unused-expression
      this.month  = this.monthNames[d.getMonth()];
      this.Annual = document.getElementsByClassName('Annual')[0].classList.value;
      if (this.Annual.indexOf('selected--1kbjm') <= 0 ) {
        this.plan = false;
        this.monthly = null;
        document.getElementsByClassName('Annual')[0].classList.add('selected--1kbjm');
        document.getElementsByClassName('Monthly')[0].classList.remove('selected--1kbjm');
      }
    } else {
      this.planname =  val.toLowerCase();
      this.price = '9.99';
      this.totalAmount = 9.99;
      this.AddonPrice  =  '5.00';
      this.planAddon = false;
      this.year = d.getFullYear();
      // tslint:disable-next-line: no-unused-expression
      this.month  = this.monthNames[d.getMonth() + 1];
      this.monthly = document.getElementsByClassName('Monthly')[0].classList.value;
      if (this.monthly.indexOf('selected--1kbjm') <= 0 ) {
        this.plan = true;
        this.Annual = null;
        document.getElementsByClassName('Monthly')[0].classList.add('selected--1kbjm');
        document.getElementsByClassName('Annual')[0].classList.remove('selected--1kbjm');
      }
    }
  }

  public AddOns() {
    if (this.butontext === 'Add') {
      this.butontext = 'Remove';
      this.planAddon = true;
      document.getElementsByClassName('MyAddon')[0].classList.add('selected--1kbjm');
    } else {
      this.butontext = 'Add';
      this.planAddon = false;
      document.getElementsByClassName('MyAddon')[0].classList.remove('selected--1kbjm');
    }
    if (this.monthly != null) {
      if (this.butontext === 'Add') {
        this.totalAmount = 9.99;
      } else {
        this.AddonPrice  =  '5.00';
        this.AddonPrice = parseFloat(this.AddonPrice.toString()).toFixed(2) ;
        this.totalAmount = parseFloat(this.price.toString()) +  parseFloat(this.AddonPrice.toString());
      }
   } else {
    if (this.butontext === 'Add') {
      this.totalAmount = 99.90;
    } else {
      this.AddonPrice  =  '50.00';
      this.AddonPrice = parseFloat(this.AddonPrice.toString()).toFixed(2) ;
      this.totalAmount = parseFloat(this.price.toString()) +  parseFloat(this.AddonPrice.toString());
    }
   }
  }

  public ViewBiling() {
    setTimeout(() => {
      this.content = document.querySelector('.indicator--3z2AK');
      this.content.style.width = '60%';
    }, 200);
    this.Billing = 'Billing';
  }

  public PayBill(val) {
    this.customerBilling(val);
    setTimeout(() => {
      this.content = document.querySelector('.indicator--3z2AK');
      this.content.style.width = '100%';
    }, 200);
    this.paybill = null;
    this.Billing = null;
    this.StripePayment();
  }

  public customerBilling(val) {
    const customer = JSON.parse(localStorage.getItem('currentUser'));
    this.Service.Billing(customer.email, val).subscribe(res => {
     if (res.toString().indexOf('Added') >= 0) {
       this.Toastr.success('success', res.toString());
    } else {
      this.Toastr.warning('Might be some issue Please try again later');
    }
    });
  }

  public ShowFields() {
  this.optionalFields = true;
  }

  StripePayment() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              lineHeight: '40px',
              fontWeight: 300,
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          }
        });
        this.card.mount('#card-element');
      }
    });
  }

  public Payment() {
   this.spinner.show();
   this.stripeService.createToken(this.card, {}).subscribe(obj => {
    if (obj) {
    if (obj.error) {
        this.spinner.hide();
      }
    this.Service.StripePayment(obj.token.id, this.totalAmount).subscribe(Response => {
      this.spinner.hide();
      this.amt = Response;
      if (this.amt != null) {
        this.Toastr.success('Payment succeeded !!');
      }

    });
    setTimeout(() => {
      this.spinner.hide();
      if (this.amt == null) {
        this.Toastr.warning('Due to some issue payment not succeeded');
      }
    }, 5000);
    }
  });
  }
}
