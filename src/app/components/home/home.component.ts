import {Component, OnInit} from '@angular/core';
import {MainAPIService} from "../../services/main-api.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {timeout} from "rxjs";





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  implements OnInit {


  products: any[] = [];

  public isLoading = false;
  categorySelected: any = null;


  playSound(): void {
    //const audio = new Audio('assets/fart.mp3');
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }




  constructor(
              private mainAPI: MainAPIService,
              private shoppingCartService: ShoppingCartService,
              private snackbarService: SnackbarService
             ) {

  }


  ngOnInit(): void {
    this.isLoading = true;
    this.mainAPI.getCategories().subscribe({
      next: (data: string[]) => {
        this.categories = data;
        console.log("categorias carregada...:" + JSON.stringify(this.categories))
        this.checkAndLoadCategoriesProducts();

      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
      }
    });

  }


  // irá carregar as categorias via API no NgOnInit acima
  categories = [''];

  //contem todos os produtos da frontPage
  categoriesProducts: { category: string, products: any[] }[] = [];

  // Defina o limite inicial de produtos exibidos por categoria
  productsToShow = 6;


  // Para evitar sobrecarga na API, salvamos em localStorage, mas esta com algum problema
  async checkAndLoadCategoriesProducts(): Promise<void> {
    const timestamp = localStorage.getItem('lastLoadTimestamp');
    const cachedCategories = localStorage.getItem('categoriesProducts');

    if (timestamp && cachedCategories) {
      const lastLoadTime = parseInt(timestamp, 10);
      const currentTime = Date.now();
      const hoursDifference = (currentTime - lastLoadTime) / (1000 * 60 * 60);

      if (hoursDifference < 12) {
        // Carrega produtos do localStorage se dentro de 12 horas
        this.isLoading = false
        this.categoriesProducts = JSON.parse(cachedCategories);
        return;
      }
    }

    // Caso não haja dados válidos no localStorage, chama a função e salva os dados
    await this.loadCategoriesProducts();
  }

  async loadCategoriesProducts(): Promise<void> {
    this.categoriesProducts = []; // Limpa array para evitar duplicação
    this.isLoading = true; // Ativa o estado de carregamento

    try {
      for (const category of this.categories) {
        const requestObject = { category };
        const data = await this.mainAPI.listProdutos(requestObject).toPromise();
        this.categoriesProducts.push({ category, products: data || [] });
        console.log(`Produtos da categoria ${category} carregados:`, data);
      }

      // Salva os produtos e o timestamp no localStorage após o loop
      localStorage.setItem('categoriesProducts', JSON.stringify(this.categoriesProducts));
      localStorage.setItem('lastLoadTimestamp', Date.now().toString());
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      this.isLoading = false; // Desativa o estado de carregamento
    }
  }


   selectedCategory = "";

  //carrega pagina de produtos com categoria especifica
  loadProducts(categoryName: string): void {
    this.playTransitionSound();
    this.scrollToTop();
    // Define a categoria selecionada e redefine productsToShow para exibir todos
    this.categorySelected = this.categoriesProducts.find(cat => cat.category === categoryName);

  }

  playTransitionSound(){
    const audio = new Audio('assets/swipe.mp3');
    audio.play();
  }

  addToCart(product: any): void {
    const audio = new Audio('assets/fart.mp3');
    audio.play();
    this.shoppingCartService.addToCart(product);
    this.snackbarService.show('Item adicionado ao carrinho!');
    this.showCart();
  }
  showCart(): void {
    const cart = this.shoppingCartService.getCart();
    console.log(cart);
  }
  clearCart(): void {
    this.shoppingCartService.clearCart();
  }




  category_selected: string = "";
  select_category(category: string): void {

    this.playSound();

    // Criar o objeto com a categoria
    const requestObject = { category: category };

    // categoria esta ativa
    this.categorySelected = true;


   // const selectedCategory = this.categories.find(cat => cat.tag === category);

  /**  if (selectedCategory) {
      this.category_selected = selectedCategory.name; // Armazena o name da categoria correspondente
    }**/

    // Chamar a API passando o objeto
    this.isLoading = true;
    this.mainAPI.listProdutos(requestObject).subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
        console.log("Products were loaded." + JSON.stringify(data));
      },
      (error) => {
        console.error('Error fetching products', error);
        this.isLoading = false;
        console.log("Error loading products in home.");
      }
    );
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


  /**
   *
   *
   *   /**
   *   categories = [
   *     { name: 'Canecas com IA', imageUrl: 'assets/capa_ia.jpg', tag: 'IA' },
   *     { name: 'Canecas Aleatórias', imageUrl: 'assets/capa_random.png', tag: 'Random' },
   *     { name: 'Canecas com Animais', imageUrl: 'assets/capa_animais.jpg', tag: 'Animais'},
   *     { name: 'Canecas com Macacos', imageUrl: 'assets/capa_macacos.png', tag: 'Macacos'},
   *     { name: 'Canecas com Gatos', imageUrl: 'assets/capa_gatos.png', tag: 'Gatos' },
   *     { name: 'Canecas com Cachorros', imageUrl: 'assets/capa_cachorro.jpg', tag: 'Cachorros' }
   *   ];


   * <!--
   *   <div *ngIf="!categorySelected">
   *   <div class="categories-grid" *ngIf="!categorySelected || !isLoading">
   *     <div class="category" *ngFor="let category of categories">
   *       <div (click)="select_category(category.tag)">
   *         <img [src]="category.imageUrl" alt="{{ category.name }}" />
   *         <p>{{ category.name }}</p>
   *       </div>
   *     </div>
   *   </div>
   * -->
   *
   *
   *
  public listWords$: Observable<any> | undefined;
  public isLoading = false;




  emptyList: boolean = false;
  public listWords(){
    this.isLoading = true;
    this.listWords$ = this.mainAPI.listAllWords(localStorage.getItem("UserId")+"").pipe(
      map(resp => {
         if(resp.length === 0){
           this.emptyList = true;
         }else{
            this.emptyList = false;
         }
        return resp.reverse();
      }),
      finalize(() => this.isLoading = false)

    );
  }


  delete_smartcard(id: number) {
     this.mainAPI.deleteSmartcard(id).pipe(
       map(resp => {
          alert(JSON.stringify(resp))
         this.listWords();
       })
     ).subscribe();
  }

    **/


}

