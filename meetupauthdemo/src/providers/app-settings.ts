import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppSettings {
  public environment = "production";
  public SERVER_URL = "http://localhost:9000";
  // public SERVER_URL = "http://cindt.com:9035";
  public API_URL = this.SERVER_URL;
  public user_token = "";

  constructor() {
    console.log('Hello AppSettings Provider');
  }

  public setUserToken(token){
  	this.user_token = token;
  }
}
