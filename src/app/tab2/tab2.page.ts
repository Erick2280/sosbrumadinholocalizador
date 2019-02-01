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
  disabledConfigWarning: string = "";
  isConfigFieldsDisabled: boolean = true;

  ionViewWillEnter() {
    this.storage.get('locationServiceUrl').then((urlValue) => {
      this.locationServiceUrl = urlValue;
    });
    this.storage.get('isLocationServiceEnabled').then((serviceEnabledValue) => {
      this.isLocationServiceEnabled = serviceEnabledValue;
      if (this.isLocationServiceEnabled) {
        this.isConfigFieldsDisabled = true;
        this.disabledConfigWarning = 'Desative o Envio de Localização para alterar.';
      } else {
        this.disabledConfigWarning = ''
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

}
