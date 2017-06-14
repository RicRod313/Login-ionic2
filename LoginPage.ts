
import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController } from 'ionic-angular';

import { Auth } from '../../providers/auth';

import {Facebook} from '@ionic-native/facebook';

import { HomePage } from '../home/home';
import { Signup } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

    email: string;
    password: string;
    loading: any;

    user: any = {};
    showUser: boolean = false;

  constructor(
     public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public authService: Auth, 
    public loadingCtrl: LoadingController,
    private fb: Facebook,
  ) {
  }

  setLoadingFinalMessage(message) {

	 this.alertCtrl.create({
            title: 'Validacion',
            subTitle: message,
            buttons: ['OK']
        })

}

  login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };

 
        this.authService.login(credentials).then((data) => {
					          this.loading.dismiss();
                    this.navCtrl.setRoot(HomePage);
            },(err) => {
            this.loading.dismiss();
            });
       }



   loginFacebook(){
    this.fb.login(['public_profile', 'email'])
    .then((res) => {
       console.log(res.status);
       if(res.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo(){
    this.fb.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true; 
      this.user = data;
    })
    .catch(error =>{
      console.error( error );
    });
  }


  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Validando...'
    });
 
    this.loading.present();
 
  }
 
  logout(){
 
    this.authService.logout();
    this.navCtrl.setRoot(Login);
 
  }

}
