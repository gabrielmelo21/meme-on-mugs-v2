import {Component, OnInit} from '@angular/core';
import {MainAPIService} from "../../services/main-api.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {timeout} from "rxjs";
import {PlayAudioService} from "../../services/play-audio.service";
import {SharedStateService} from "../../services/shared-state.service";
import {ActivatedRoute} from "@angular/router";





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  implements OnInit {
  isPlaying = false; // Estado do som
  showBoneco2: boolean = false;
  id: string | null = null; // Variável para armazenar o ID

  /**
   * Categorias
   *
   * celebridade_brasil
   * celebridade_gringa
   * diva_pop
   * politica
   * esporte
   * grunge
   *
   *
   */





  public isLoading = false;
  categorySelected: any = null;


  playSound(): void {
    //const audio = new Audio('assets/fart.mp3');
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }




  constructor(
              private apiService: MainAPIService,
              private shoppingCartService: ShoppingCartService,
              private snackbarService: SnackbarService,
              private playAudioService: PlayAudioService,
              private sharedStateService: SharedStateService,
              private route: ActivatedRoute
             ) {
    this.playAudioService.playMusic()
  }


  // Função para alterar o valor
  changeNumber(value: number): void {
    this.sharedStateService.updateNumber(value);  // Altera o valor através do serviço
  }


  products: any[] = [];
  product: any = null; // Variável para armazenar os dados do produto



  waitAsecond: boolean = false;
  showBoneco: boolean = false;




  ngOnInit(): void {

    // Pegando o parâmetro "id" da URL
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log('ID recebido:', this.id);
    });







    this.apiService.getProducts().subscribe(
      data => {
        this.products = data;

        if (this.id!=='' || this.id!==null) {
          // Filtrar o produto que tem a mesma `product_image` que o ID da URL
          this.product = this.products.find(p => p.product_image === this.id);
          console.log('Produto encontrado:', this.product);
        }
      },
      error => {
        console.error('Erro ao carregar produtos:', error);
      }
    );




    setTimeout(() => {
      this.showBoneco = false;
      this.waitAsecond = true;

    }, 1000)


    this.isPlaying = true;
  }



  filterByCategory(category: string) {
    return this.products.filter(product => product.category === category);
  }





  copyShareLink(id: string) {
    const url = `${window.location.origin}/home?id=${id}`;
    alert(url)

    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('Link copiado com sucesso:', url);
        alert('Link copiado!');
      })
      .catch(err => console.error('Erro ao copiar link:', err));
  }







  toggleSound(): void {
    if (this.isPlaying) {
       this.playAudioService.stopAudio();
      this.isPlaying = false;
       if (this.waitAsecond && !this.isPlaying) {
         this.showBoneco = true;
             this.playAudioService.playDontStopMusic()
         this.sharedStateService.updateNumber(-500000);  // Soma 1000 ao valor atual
       }

    }else{
        this.playAudioService.playMusic()
      this.sharedStateService.updateNumber(500000);  // Soma 1000 ao valor atual
      this.showBoneco2 = true;

      setTimeout(() => {
        this.showBoneco2 = false;
      }, 2000)
      this.showBoneco = false;
      this.isPlaying = true;

    }

  }





  playTransitionSound(){
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }

  addToCart(product: any): void {
     this.showBoneco2 = true;
    this.sharedStateService.updateNumber(50000);  // Soma 1000 ao valor atual

    setTimeout(() => {
      this.playAudioService.  playWow()
    },100)
    setTimeout(() => {
      this.playAudioService.playMusic()
      this.showBoneco2 = false
    },3000)



    this.shoppingCartService.addToCart(product);

    //this.snackbarService.show('Item adicionado ao carrinho!');
    this.showCart();
  }
  showCart(): void {
    const cart = this.shoppingCartService.getCart();
    console.log(cart);
  }
  clearCart(): void {
    this.shoppingCartService.clearCart();
  }









  currentImage:any = "/assets/logo-bonk-1.png";


  bonk(){
     this.currentImage = "/assets/logo-bonk-2.png";
    const audio = new Audio('assets/bonk.mp3');
    audio.play();

  // Após 2 segundos, restaurar a imagem original
  setTimeout(() => this.resetImage(), 500);
  }

  resetImage(): void {
     this.currentImage = "/assets/logo-bonk-1.png";
  }
  back_to_category(): void {
    this.scrollToTop();
    this.playTransitionSound();
    this.categorySelected = null;  // Reseta a categoria selecionada
  }


  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Rolagem suave para o topo
    });
  }



}

