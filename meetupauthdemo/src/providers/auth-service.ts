import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

// Services
import { AppSettings } from './app-settings';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

	private serverAddress = new AppSettings().API_URL;	// URL to web API
	private signupUrl = this.serverAddress+'/api/users';
	private signinUrl = this.serverAddress+'/auth/local';
	private meUrl = this.serverAddress+'/api/users/me';
	private updateUserProfileUrl = this.serverAddress+'/api/users/';
	private newPasswordWithTokenUrl = this.serverAddress+"/api/users/requestNewPasswordWithToken";
	private passwordResetUrl = this.serverAddress+"/api/users/requestPasswordReset";
	private logoutUrl = this.serverAddress+"/api/users/logout";

	public Profile:any; 			//The Profile of the currently signed in user
	public jwt:string = '';

	public storeToken(response){
		console.log(response);
	}

	public extractData(res: Response) {
		let body = res.json();
		return body || { };
	}

	logout(){
	    let body = {};
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

			return new Promise((resolve, reject) => {
				this.http.post(this.logoutUrl, body, options)
				.subscribe(
					data => {
						resolve(data.json());
					},
					err => {
						reject(err.json())
					},
					() => console.log('Account Logout Complete')
				);
			});
	}

	requestPasswordReset(data){
	    let body = data;
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

		return new Promise((resolve, reject) => {
			this.http.post(this.passwordResetUrl, body, options)
				.subscribe(
					data => {
						resolve(data.json());
					},
					err => {
					 	reject(err.json())
					},
					() => console.log('Email signup Complete')
				);
		})
	}

	requestNewPasswordWithToken(data: any){
		let body = data;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return new Promise((resolve, reject) => {
			this.http.post(this.newPasswordWithTokenUrl, body, options)
				.subscribe(
					data => {
						resolve(data.json());
					},
					err => {
					 	reject(err.json())
					},
					() => console.log('Email signup Complete')
				);
		})
	}

	submitEmailSignupRequest(signUpData: any){

		console.log(signUpData);

	    let body = signUpData;
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

		return new Promise((resolve, reject) => {
		    this.http.post(this.signupUrl, body, options)
				.subscribe(
					data => {
						resolve(data.json());
					},
					err => {
					 	reject(err.json())
					},
					() => console.log('Email signup Complete')
				);
		})
	}

	submitEmailSigninRequest(signInData: any){
		console.log("submitEmailSigninRequest");
		console.log("signin from service.", signInData);

    let body = signInData;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
		return new Promise((resolve, reject) => {
		    this.http.post(this.signinUrl, body, options)
				.subscribe(
					data => {
						this.jwt = data.json().token
						//User exists, fetch the users profile
					    let profile_headers = new Headers({ 'Content-Type': 'application/json' });
						profile_headers.append('Authorization', 'Bearer ' + this.jwt);

					    let profile_options = new RequestOptions({ headers: profile_headers });

						this.http.get(this.meUrl, profile_options)
	  								.subscribe(data => {
	  									this.Profile = data.json();
	  									resolve(data.json());
	  								}, err => {
	  									reject(err.json());
	  								}, () => console.log("Get profile complete"));
					},
					err => {
						reject(err.json());
					},
					() => console.log('Email signin Complete')
				);
		});
	}

	saveUpdatestoProfile(){
		console.log("updateUser", this.Profile);
		let body = this.Profile;
		let headers = new Headers({ 'Content-Type': 'application/json' });
			headers.append('Authorization', 'Bearer ' + this.jwt);

		let options = new RequestOptions({ headers: headers });

		return new Promise((resolve, reject) => {
			this.http.post(this.updateUserProfileUrl+this.Profile._id+"/updateProfile", body, options)
				.subscribe(
					data => {
						resolve(data.json());
					},
					err => {
					 	reject(err.json())
					},
					() => console.log('Email signup Complete')
				);
		})

	}
}
