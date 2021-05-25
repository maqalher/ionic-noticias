import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private platform: Platform
  ) { }

  ngOnInit() {}

  abrirNoticia(){
    console.log('Noticia:', this.noticia.url)
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorrarBtn;

    if(this.enFavoritos){
      // borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');

            this.compartirNoticia();

          }
        },
        guardarBorrarBtn
        ,
        {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  compartirNoticia(){

    if(this.platform.is('cordova') || this.platform.is('capacitor')){

      this.socialSharing.share(
        this.noticia.title,  // mensaje
        this.noticia.source.name, // subject
        '', // file - tmabian puede ser null
        this.noticia.url // url
      );
    } else {

      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('no se pudo compartir porque el navegador no lo soporta')
      }

    }


  }

}
