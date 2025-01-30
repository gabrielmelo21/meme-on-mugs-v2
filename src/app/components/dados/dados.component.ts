import { Component } from '@angular/core';
import {MainAPIService} from "../../services/main-api.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent {


  email: string = localStorage.getItem('email') || '';
  nome: string = localStorage.getItem('nome') || '';
  cep: string = localStorage.getItem('cep') || '';
  endereco: string = localStorage.getItem('endereco') || '';
  numeroCasa: string = localStorage.getItem('numeroCasa') || '';

  updatedEmail: boolean = false;
  updatedNome: boolean = false;
  updatedCep: boolean = false;
  updatedEndereco: boolean = false;
  updatedNumeroCasa: boolean = false;

  searching: boolean = false;



  constructor(private mainAPI: MainAPIService,  private snackbarService: SnackbarService) {


    // Inicializar localStorage se as chaves não existirem
    if (!localStorage.getItem('email')) {
      localStorage.setItem('email', '');
    }

    if (!localStorage.getItem('nome')) {
      localStorage.setItem('nome', '');
    }
    if (!localStorage.getItem('cep')) {
      localStorage.setItem('cep', '');
    }
    if (!localStorage.getItem('endereco')) {
      localStorage.setItem('endereco', '');
    }
    if (!localStorage.getItem('numeroCasa')) {
      localStorage.setItem('numeroCasa', '');
    }

}




  viaCepFind(cep: string) {
    this.searching = true;
    if (cep.length === 8) { // Certifica que o CEP tem 8 dígitos
      this.mainAPI.consultarCEP({ cep }).subscribe(
        (data) => {
          // Caso a API retorne os dados corretamente
          this.endereco = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
          localStorage.setItem('endereco', this.endereco);
          this.updatedEndereco = true;
          this.searching = false;
        },
        (error) => {
          // Caso ocorra algum erro na requisição
          console.error('Erro ao consultar o CEP', error);
          this.searching = false;

        }
      );
    } else {
      console.error('CEP inválido');
      this.searching = false;
    }
  }
  inputTimeout: any; // Para armazenar o timeout


  onInputChangeEmail(event: Event): void {
    clearTimeout(this.inputTimeout); // Limpa o timeout anterior
    this.inputTimeout = setTimeout(() => {
      // Salvar os dados no localStorage
      localStorage.setItem('email', this.email);
      console.log(localStorage.getItem("email"))
      this.updatedEmail = true;
    }, 1500); // Define o tempo de inatividade (500ms)
  }



  onInputChangeName(event: Event): void {
    clearTimeout(this.inputTimeout); // Limpa o timeout anterior
    this.inputTimeout = setTimeout(() => {
      // Salvar os dados no localStorage
      localStorage.setItem('nome', this.nome);
      console.log(localStorage.getItem("nome"))
      this.updatedNome = true;
    }, 1500); // Define o tempo de inatividade (500ms)
  }


  onInputChangeCEP(event: Event): void {
    clearTimeout(this.inputTimeout); // Limpa o timeout anterior
    this.inputTimeout = setTimeout(() => {
      // Salvar os dados no localStorage
      localStorage.setItem('cep', this.cep);
      console.log(localStorage.getItem("cep"))
      this.updatedCep = true;
    }, 1500); // Define o tempo de inatividade (500ms)
  }

  onInputChangeEndereco(event: Event): void {
    clearTimeout(this.inputTimeout); // Limpa o timeout anterior
    this.inputTimeout = setTimeout(() => {
      // Salvar os dados no localStorage
      localStorage.setItem('endereco', this.endereco);
      console.log(localStorage.getItem("endereco"))
      this.updatedEndereco = true;
    }, 1500); // Define o tempo de inatividade (500ms)
  }


  onInputChangeNumeroCasa(event: Event): void {
    clearTimeout(this.inputTimeout); // Limpa o timeout anterior
    this.inputTimeout = setTimeout(() => {
      // Salvar os dados no localStorage
      localStorage.setItem('numeroCasa', this.numeroCasa);
      console.log(localStorage.getItem("numeroCasa"))
      this.updatedNumeroCasa = true;
    }, 1500); // Define o tempo de inatividade (500ms)
  }






}
