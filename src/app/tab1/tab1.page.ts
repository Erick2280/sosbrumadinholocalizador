import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LocationService } from '../location.service'
import leaflet from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public toastController: ToastController,
    private storage: Storage,
    private locationService: LocationService
    ) {}
    locationServiceUrl: string;
    locationServiceDescriptor: string;
    isLocationServiceEnabled: boolean = false;
    isLocationServiceUnavailable: boolean = false;
    map: any;

    ionViewWillEnter() {
      this.updateCard();
      this.updateMap();
    }

    updateMap() {        
      this.map = new leaflet.Map('map-container');

      let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      let attrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
      let mapLayer = new leaflet.TileLayer(url, {minZoom: 4, maxZoom: 20, attribution: attrib});		

      this.map.setView(new leaflet.LatLng(-20.126, -44.125),13);
      this.map.addLayer(mapLayer);
    }

    updateCard() {
      this.storage.get('locationServiceUrl').then((urlValue) => {
        this.locationServiceUrl = urlValue;
        if (urlValue == '') {
          this.locationServiceDescriptor = "A URL para enviar periodicamente sua localização não foi configurada. Você pode adicionar uma URL nas configurações"
          this.storage.set('isLocationServiceEnabled', false)
          this.isLocationServiceUnavailable = true;
          this.acknowledgeLocationService();
        } else {
          this.locationServiceDescriptor = "Este dispositivo está configurado para enviar periodicamente sua localização para "
          this.isLocationServiceUnavailable = false;
        }
      });
      this.storage.get('isLocationServiceEnabled').then((serviceEnabledValue) => {
        this.isLocationServiceEnabled = serviceEnabledValue;
      });

    }

    acknowledgeLocationService() {
      this.storage.set('isLocationServiceEnabled', this.isLocationServiceEnabled).then((onfullfiled) => {this.locationService.toggleService();});
    }

}
