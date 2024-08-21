import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/v1/carro";

  constructor() { }

  listar(): Observable<Carro[]>{
    return this.http.get<Carro[]>(this.API + "/listar");
  }

  deletar(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/deletar/"+id, {responseType: 'text' as 'json'});
  }

  salvar(carro: Carro): Observable<string>{
    return this.http.post<string>(this.API+"/salvar", carro, {responseType: 'text' as 'json'});
  }

  atualizar(carro: Carro, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/atualizar/"+id, carro, {responseType: 'text' as 'json'});
  }

  listarId(id: number): Observable<Carro>{
    return this.http.get<Carro>(this.API+"/listar/"+id);
  }




}
