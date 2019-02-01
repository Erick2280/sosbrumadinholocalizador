import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public toastController: ToastController,
    private storage: Storage
    ) {}
  locationServiceUrl: string;
  isLocationServiceEnabled: boolean;
  configWarningField: string = "";
  isConfigFieldsDisabled: boolean = true;

  ionViewWillEnter() {
    this.storage.get('locationServiceUrl').then((urlValue) => {
      this.locationServiceUrl = urlValue;
    });
    this.storage.get('isLocationServiceEnabled').then((serviceEnabledValue) => {
      this.isLocationServiceEnabled = serviceEnabledValue;
      if (this.isLocationServiceEnabled) {
        this.isConfigFieldsDisabled = true;
        this.configWarningField = 'Desative o Envio de Localização para alterar.';
      } else {
        this.configWarningField = '';
        this.isConfigFieldsDisabled = false;
      }
    });
  }
  
  async presentSaveToast() {
    const toast = await this.toastController.create({
      message: 'Configurações salvas!',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'OK'
    });
    toast.present();
  }

  saveConfigs() {
    this.storage.set('locationServiceUrl', this.locationServiceUrl);
    this.presentSaveToast();
  }

  testIfUrlIsValid() {
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.locationServiceUrl)) {
      this.configWarningField = '';
    } else {
      this.configWarningField = 'Esta URL parece não ser válida.';
    }
  }

}
