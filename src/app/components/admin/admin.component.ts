import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {MainAPIService} from "../../services/main-api.service";
import {repeat} from "rxjs";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  currentPage: number = 1
  private validPassword = 'admin123'; // Defina a senha válida aqui
  public authenticated: boolean = false;
  productForm: FormGroup;





  selectedFile: File | undefined;
  selectedFileUrl: string | ArrayBuffer | null = null;

  uploadDone: boolean = false;
  uploading: boolean = false;



  uploadedImageUrl: any;

  categories = [''];





  constructor(private mainAPIService: MainAPIService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {


    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['34.90', Validators.required],
      productImg: [''],
      category: [''],
      productVideo: [false] // Adiciona o campo productVideo com valor padrão "false"
    });


    this.route.params.subscribe(params => {
      const password = params['password'];
      if (password == this.validPassword) {
        // Redirecionar se a senha for inválida
        this.authenticated = true;

      }else{

        this.router.navigate(['/home']);
      }
    });



    this.mainAPIService.getCategories().subscribe({
      next: (data: string[]) => {
        this.categories = data;
        console.log("categorias carregada...:" + JSON.stringify(this.categories))

      },
      error: (error: any) => {
        console.error('Erro ao buscar categorias:', error);
      }
    });
  }






  jsonContent: any = {};
  jsonSelected: number = 0;

  loadJson(json: number): void {

     if(json == 1){
       // JSON DE PEDIDOS
       this.jsonSelected = 1;
       this.mainAPIService.getPedidosJSON().subscribe(
         response => {
           this.jsonContent = JSON.stringify(response, null, 2);
         },
         error => {
           console.log(error);
         }

       );
     }

     if(json == 2){
       // JSON DE PEDIDOS
       this.jsonSelected = 2;
       this.mainAPIService.getCategories().subscribe(
         response => {
           this.jsonContent = JSON.stringify(response, null, 2);
         },
         error => {
           console.log(error);
         }

       );
     }

    if(json == 3){
      // JSON DE PRODUTOS
      this.jsonSelected = 3;
      this.mainAPIService.getProductsJson().subscribe(
        response => {
          this.jsonContent = JSON.stringify(response, null, 2);
        },
        error => {
          console.log(error);
        }

      );
    }

  }


  updateJson(): void {

    const parsedJson = JSON.parse(this.jsonContent);
    if(this.jsonSelected == 1){
       // UPDATE PEDIDOS
      try {
        this.mainAPIService.updatePedidosJSON(parsedJson).subscribe(
          response => {
            console.log('JSON atualizado com sucesso:', response);
            alert('JSON atualizado com sucesso!');
          },
          error => {
            console.error('Erro ao atualizar o JSON:', error);
            alert('Erro ao atualizar o JSON. Verifique o console para mais detalhes.');
          }
        );
      } catch (error) {
        console.error('O JSON é inválido:', error);
        alert('O JSON é inválido. Por favor, corrija antes de atualizar.');
      }

    }


    if(this.jsonSelected == 2){
      // UPDATE CATEGORIAS
      try {
        this.mainAPIService.updateCategoriasJSON(parsedJson).subscribe(
          response => {
            console.log('JSON atualizado com sucesso:', response);
            alert('JSON atualizado com sucesso!');
          },
          error => {
            console.error('Erro ao atualizar o JSON:', error);
            alert('Erro ao atualizar o JSON. Verifique o console para mais detalhes.');
          }
        );
      } catch (error) {
        console.error('O JSON é inválido:', error);
        alert('O JSON é inválido. Por favor, corrija antes de atualizar.');
      }

    }


    if(this.jsonSelected == 3){
      // UPDATE PRODUTOS
      try {
        this.mainAPIService.updateProductsJson(parsedJson).subscribe(
          response => {
            console.log('JSON atualizado com sucesso:', response);
            alert('JSON atualizado com sucesso!');
          },
          error => {
            console.error('Erro ao atualizar o JSON:', error);
            alert('Erro ao atualizar o JSON. Verifique o console para mais detalhes.');
          }
        );
      } catch (error) {
        console.error('O JSON é inválido:', error);
        alert('O JSON é inválido. Por favor, corrija antes de atualizar.');
      }
    }


  }

















  saveUpdatedJson() {
    try {
      const parsedJson = JSON.parse(this.jsonContent); // Converte o conteúdo para JSON
      this.mainAPIService.updateProductsJson(parsedJson).subscribe(
        response => {
          console.log('JSON atualizado com sucesso:', response);
          alert('Arquivo JSON atualizado com sucesso!');
         // this.loadProductsJson(); // Atualiza a lista de produtos para verificar a alteração
        },
        error => {
          console.error('Erro ao atualizar JSON', error);
          alert('Erro ao atualizar o arquivo JSON.');
        }
      );
    } catch (e) {
      console.error('Erro ao analisar o JSON:', e);
      alert('O conteúdo do JSON não está em um formato válido.');
    }
  }



  loadProductsJson() {
    this.mainAPIService.getProductsJson().subscribe(
      response => {
        console.log('Arquivo Json Carregado com sucesso.', response);
        // Formata o JSON com 2 espaços de indentação
        this.jsonContent = JSON.stringify(response, null, 2);
      },
      error => {
        console.error('Erro ao carregar arquivo .json', error);
      }
    );
  }



  changePage(page: number){
       this.currentPage = page;

       if(this.currentPage == 2){
               this.loadAllProducts();
       }

       if(this.currentPage == 3){
              // this.loadProductsJson();
       }

  }

  deleteProduct(product: string) {
    // Pedir confirmação ao usuário
    const confirmation = confirm(`Tem certeza de que deseja remover o produto: ${product}?`);

    // Se o usuário confirmar, prosseguir com a exclusão
    if (confirmation) {
      this.mainAPIService.deleteProduto(product).subscribe(
        response => {
          console.log('Produto removido com sucesso:', response);
          this.loadAllProducts();
        },
        error => {
          console.error('Erro ao remover o produto:', error);
        }
      );
    } else {
      console.log('Ação de remoção cancelada.');
    }
  }



  isLoading: boolean = false
  products: any[] = [];
  productsCount: any[] = [];
  totalProducts: number = 0;

  loadAllProducts(){
        // Chamar a API passando o objeto
        this.isLoading = true;
        this.mainAPIService.listAllProducts().subscribe(
          (data) => {
            this.products = data;
            this.isLoading = false;
            console.log("Products were loaded." + JSON.stringify(data));
            // Calcular o total de produtos
           this.totalProducts = Object.values(this.productsCount).reduce((acc: number, count: number) => acc + count, 0);

          },
          (error) => {
            console.error('Error fetching products', error);
            this.isLoading = false;
          }
        );

        this.mainAPIService.listProductsCount().subscribe(
          (data) => {
             this.productsCount = data
             console.log("Products were loaded." + JSON.stringify(data));
          },
          (error) => {
            console.error('Error fetching products', error);
          }
        )
  }


  removeProduct(product_name: string){

  }



  onFileSelected(event: any) {
    const files: FileList = event.target.files;


    if (files.length > 0) {
      this.selectedFile = files[0];

      // Exibir a imagem selecionada
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result;

      };
      reader.readAsDataURL(this.selectedFile);

      this.uploadFile()
    } else {

      this.selectedFile = undefined;
      this.selectedFileUrl = null;
    }
  }

   uploadFile() {
   if (this.selectedFile) {
     this.uploading = true;
   this.mainAPIService.uploadImage(this.selectedFile).subscribe(
   response => {
   console.log('File uploaded successfully', response);
   this.uploadedImageUrl = response; // Armazenar a URL da imagem
     this.productForm.patchValue({
       productImg: response
     });


   this.uploadDone = true;
   this.uploading = false;
   },
   error => {
   console.error('Error uploading file', error);
   }
   );
   }
   }

   changeVideoStatus(product_name: string, newStatus: boolean) {
    const confirmation = confirm(`Tem certeza de que deseja alterar o status de : ${product_name} para ` + newStatus + "?");

    if (confirmation) {
      this.mainAPIService.updateVideoStatus(product_name, newStatus).subscribe(
        response => {
          console.log('Produto atualizado com sucesso:', response);
          this.loadAllProducts();  // Atualiza a lista de produtos após a alteração
        },
        error => {
          console.error('Erro ao atualizar produto', error);
        }
      );
    } else {
      console.log('Ação de alteração cancelada.');
    }
  }



  productStatus: any;

  onSubmit(): void {
    if (this.productForm.valid) {
       alert(JSON.stringify(this.productForm.value))
     this.mainAPIService.addProduto(this.productForm.value).subscribe(
        response => {
          console.log('Product created successfully', response);
          this.productStatus = response
        },
        error => {
          console.log("Json enviado foi -> " + this.JSON.stringify(this.productForm.value))
          console.error('Error creating product', error);
          this.productStatus = error
        }
      );


    } else {
      console.error('Formulário inválido');
    }
  }


  protected readonly JSON = JSON;
}
