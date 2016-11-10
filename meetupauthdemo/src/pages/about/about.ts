import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  userSignIn: any = {
    email: '',
    password: ''
  }
  constructor(public navCtrl: NavController, private authService: AuthService) {

  }
  submitEmailSigninForm() {
    this.authService.submitEmailSigninRequest(this.userSignIn)
    .then((success) =>{
      console.log(success);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
