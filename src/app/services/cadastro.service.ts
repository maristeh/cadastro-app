import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  url = 'http://localhost:8080/usuarios'
  cep_url = 'https://viacep.com.br/ws'

  constructor(private httpClient: HttpClient) { }

  cadastrar(dados: any){
    return this.httpClient.post(this.url, dados)
  }

  pegarEndereco(cep: string) {
    return this.httpClient.get(`${this.cep_url}/${cep}/json`)
  }
}
