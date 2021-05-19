import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticas();
  }

  loadData(event){

    // console.log(event); // se encunata en complete

    this.cargarNoticas(event);
  }

  cargarNoticas( event? ){
    this.noticiasService.getTopHeadlines()
      .subscribe( resp => {
        // console.log( 'noticias', resp)

        if (resp.articles.length === 0){
          event.target.disabled = true;
          event.target.complete();
          return
        }

        // this.noticias = res.articles;
        this.noticias.push(...resp.articles);

        if (event) {
          event.target.complete();
        }

      })
  }

}
