import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){
    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines() {
    // return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=mx&apiKey=bda71b0b81434044a88fad940caed150`);

    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria( categoria: string) {
    // return this.http.get(`https://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=bda71b0b81434044a88fad940caed150`);

    if( this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${categoria}&page=${ this.categoriaPage }`);
  }

}
