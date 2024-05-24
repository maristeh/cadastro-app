import { Component, OnInit } from '@angular/core';
import { EMPTY, Subscription, catchError, empty } from 'rxjs';
import { CadastroService } from '../../services/cadastro.service';
import { error } from 'console';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit {

  usuario: any = {}

  constructor(private service: CadastroService){}

  cadastro : any = Subscription;

  ngOnInit(): void { 
  }

  save(dados:any){
    this.usuario.nome = dados.nome
    this.usuario.dataNascimento = dados.dataNascimento
    this.usuario.sexo = dados.sexo
    this.usuario.email = dados.email
    this.usuario.cep = dados.cep
    this.usuario.rua = dados.rua
    this.usuario.numero = dados.numero
    this.usuario.complemento = dados.complemento
    this.usuario.bairro = dados.bairro
    this.usuario.cidade = dados.cidade
    this.usuario.estado = dados.estado

    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const emailValido: boolean =expression.test(this.usuario.email)

    let timeDiff = Math.abs(Date.now() - new Date(this.usuario.dataNascimento).getTime());
    let idade = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

    if(emailValido && (idade >= 18)){
      this.cadastro = this.service.cadastrar(dados).subscribe(
        (data) =>{
          catchError(error => {
            console.error(error);
            return EMPTY;
          })
          console.log(data)
        })
    }

    console.log(this.usuario.dataNascimento)

  }

  capturarEndereco(cep: string) {
    this.service.pegarEndereco(cep).subscribe((data) => {
      let endereco: any = {};
      endereco = data;
      this.usuario.rua = endereco.logradouro;

      this.usuario.bairro = endereco.bairro;

      this.usuario.estado = endereco.uf;

      this.usuario.cidade = endereco.localidade;
    });
  }

  pegarCep(evento: any) {
    let cep = evento.target.value;
    this.capturarEndereco(cep);
  }

}
