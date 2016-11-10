import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  emailSignupForm: any;
  userSignUp: any = {
    username: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  submitEmailSignupForm() {
    this.authService.submitEmailSignupRequest(this.userSignUp)
    .then((success) =>{
      console.log(success);
    })
    .catch((err) => {
      console.log(err);
    })
  }

}
