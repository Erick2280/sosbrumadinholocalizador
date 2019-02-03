import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private backgroundGeolocation: BackgroundGeolocation,
    private geolocation: Geolocation,
    private storage: Storage
    ) {}
    locationServiceUrl: string;
    isLocationServiceEnabled: boolean;

    private startTracking() {
          
    this.storage.get('locationServiceUrl').then((urlValue) => {
        this.locationServiceUrl = urlValue;
        this.backgroundGeolocation.configure({
          desiredAccuracy: 10,
          stationaryRadius: 50,
          distanceFilter: 50,
          notificationTitle: 'Localizador SOS Brumadinho ativado',
          notificationText: 'Este dispositivo está configurado para enviar periodicamente sua localização.',
          debug: true, // botar false
          interval: 10000,
          fastestInterval: 5000,
          activitiesInterval: 10000,
          url: this.locationServiceUrl,
          syncUrl: this.locationServiceUrl,
          httpHeaders: {
            // arrumar o cabeçalho
          },
          // customizar as propriedades do post
          postTemplate: {
            lat: '@latitude',
            long: '@longitude',
          }
        });

      // Ativa o sistema de geolocalização.
      this.backgroundGeolocation.start();

      });
      console.log("Ativado!")

    }

    private stopTracking() {
      console.log('Desativado!');
      this.backgroundGeolocation.stop();
    }

    public toggleService() {
      this.storage.get('isLocationServiceEnabled').then((serviceEnabledValue) => {
        this.isLocationServiceEnabled = serviceEnabledValue;
        if (this.isLocationServiceEnabled) {
          // this.backgroundGeolocation.checkStatus().then()
          this.startTracking();
        } else {
          this.stopTracking();
        }

      });
    }

    public getCurrentLocation() {
      return this.geolocation.getCurrentPosition();
    }

    public watchCurrentLocation() {
      return this.geolocation.watchPosition();
    }

    public getPastLocations() {
        // implementar pra passar pro mapa
    }

  }
