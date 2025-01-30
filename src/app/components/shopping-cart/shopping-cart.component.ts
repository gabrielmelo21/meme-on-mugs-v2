import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MainAPIService} from "../../services/main-api.service";
import {catchError, finalize, map, throwError} from "rxjs";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cart: any[] = [];
  valorFrete: number = 9.90;
  errorMessage: string | null = null;

  email: string = localStorage.getItem('email') || '';
  nome: string = localStorage.getItem('nome') || '';
  cep: string = localStorage.getItem('cep') || '';
  endereco: string = localStorage.getItem('endereco') || '';
  numeroCasa: string = localStorage.getItem('numeroCasa') || '';




  constructor(private mainAPI: MainAPIService,private shoppingCartService: ShoppingCartService, private snackbarService: SnackbarService) {
    this.loadCart();
    if (this.cart.length === 0) {
      this.errorMessage = 'O carrinho está vazio.';
    }




  }



  calculateTotal(): number {
    const frete = Number(this.valorFrete);
    const totalProdutos = this.cart.reduce((total, product) => {
      const precoProduto = Number(product.product_price);
      return total + precoProduto;
    }, 0);

    return frete + totalProdutos;
  }


  loadCart(): void {
    this.cart = this.shoppingCartService.getCart();
    console.log("Carrinho foi Carregado...")
    if (this.cart.length === 0) {
      this.errorMessage = 'O carrinho está vazio.';
    }
  }

  removeFromCart(product: string): void {
    const audio = new Audio('assets/remove_cart_item.mp3');
    audio.play();

    this.shoppingCartService.removeFromCart(product);
    //this.snackbarService.show('Item removido do carrinho!');
    this.loadCart();
  }


  isLoading: boolean = false;
  status: any = "";




  inputTimeout: any; // Para armazenar o timeout
  buttonWasClicked: boolean = false;


  checkout() {

    this.isLoading = true;
    this.buttonWasClicked = true;

    // Verifica se todos os campos estão preenchidos
    if (this.email == "" || this.nome == "" || this.endereco == "" || this.cep == "" || this.numeroCasa == "") {
      alert("Preencha os campos para entrega.");
    } else {



    const user_info = {
      email: this.email,
      nome: this.nome,
      cep: this.cep,
      endereco: this.endereco,
      numeroCasa: this.numeroCasa
    };

      const pedido = {
        ...user_info,          // Adiciona os campos de user_info
        produtos: this.cart    // Adiciona os produtos do carrinho sob a chave "produtos"
      };


      // Chama o serviço para enviar os dados para a API em Flask
      this.mainAPI.registrarPedido(pedido).subscribe(
        (response) => {
          console.log('Pedido registrado com sucesso!', response);


          switch (this.cart.length) {
              case 1:
                window.location.href = 'https://pag.ae/7_iTAZpKq';
              break;
              case 2:
              window.location.href = 'https://pag.ae/7_iTC4z7N';
              break;
              case 3:
              window.location.href = 'https://pag.ae/7_iTCS8nM';
              break;
              case 4:
              window.location.href = 'https://pag.ae/7_iTDxp4r';
              break;
              case 5:
              window.location.href = 'https://pag.ae/7_iTE6hzr';
              break;
              case 6:
                alert("Limite de produtos nessa versão do App é 5 canecas.")

              break;

          }
          this.isLoading = false
          this.buttonWasClicked = false;

          // Novo link + link teste   Link para 1 produto, link para 2, link para 3
          // link para 4, link para 5
        },
        (error) => {
          this.isLoading = false
          this.buttonWasClicked = false;
          console.error('Erro ao registrar o pedido:', error);
        }
      );
    }
}



}









/**
 *
 *



    /**

   const formattedCart = this.cart.map(item => ({
    product_name: item.product_name,
    product_price: parseFloat(item.product_price),
    product_image: item.product_image
}));




   this.isLoading = true;
    this.mainAPI.pagBank(formattedCart).pipe(
      map(response => {
         window.location.href = response
         console.log(response)
         this.isLoading = false;
         this.status = "sucesso";
      }),
      catchError(err => {
        this.isLoading = false;
        this.status = "falha";
        console.error('Erro ao enviar dados para PagBank', err);
        return throwError(() => new Error('Erro ao enviar dados para PagBank. Por favor, tente novamente mais tarde.'));
      }),
      finalize(() => { this.isLoading = false})
    ).subscribe()
    **/
