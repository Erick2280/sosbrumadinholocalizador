import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
    ) {
      this.initializeApp();
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        this.splashScreen.hide();  
        this.storage.ready().then(() => {
          this.storage.get('locationServiceUrl').then((urlValue) => {
            if (urlValue === null) {
              this.storage.set('locationServiceUrl', '')
            }
          });
          this.storage.get('isLocationServiceEnabled').then((serviceEnabledValue) => {
            if (serviceEnabledValue === null) {
              this.storage.set('isLocationServiceEnabled', false)
            }
          });
        });
      });
    }
}
      