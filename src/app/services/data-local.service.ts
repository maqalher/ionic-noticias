import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Article } from '../interfaces/interfaces';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private _storage: Storage | null = null;

  noticias: Article[] = [];

  constructor(
    private nativeStorage: NativeStorage,
    private storage: Storage
  ) {
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarNoticia( noticia: Article) {

    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if(!existe){
      this.noticias.unshift(noticia);
      // this.nativeStorage.setItem('favoritos', this.noticias);
      this.storage.set('favoritos', this.noticias);
    }

  }

  async cargarFavoritos(){
    // this.storage.get('favoritos')
    //   .then( favoritos => {
    //     console.log('favoritos', favoritos)
    //   })

    // return await this.storage.get('favoritos');

    // espera a que carguen los favoritos
    const favoritos = await this.storage.get('favoritos');

    // console.log('async await', favoritos)

    if(favoritos){
      // evita errar cunado favoritos sea nulo
      this.noticias = favoritos;
    }
    // else {
    //   this.noticias = [];
    // }
  }
}
