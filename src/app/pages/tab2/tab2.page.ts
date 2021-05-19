import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(IonSegment, { static: false }) segment: IonSegment

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor( private noticasService: NoticiasService) {}

  //ngOnInit: Se ejecuta mientras se va creando los componentes por debajo.

  //ionViewDidEnter: Se ejecuta cuando ya estés dentro en una página, o sea después de cargar los elementos.

  ionViewDidEnter() {
    this.segment.value = this.categorias[0];
    // this.noticasService.getTopHeadlinesCategoria(this.categorias[0])
    //   .subscribe( resp => {
    //     console.log(resp)
    //     this.noticias.push(...resp.articles);
    //   })
    this.cargarNoticas(this.segment.value)
  }

  cambioCategoria(event){

    // console.log(event.detail.value);
    this.noticias = [];

    this.cargarNoticas(event.detail.value)
  }

  cargarNoticas( categoria: string, event?) {
    this.noticasService.getTopHeadlinesCategoria(categoria)
      .subscribe( resp => {

        if (resp.articles.length === 0){
          event.target.disabled = true;
          event.target.complete();
          return
        }

        // console.log(resp)
        this.noticias.push(...resp.articles);

        if(event){
          event.target.complete();
        }

      })
  }

  loadData(event){
    this.cargarNoticas( this.segment.value, event );
  }

}
