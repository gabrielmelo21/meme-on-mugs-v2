import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainAPIService} from "../../services/main-api.service";

@Component({
  selector: 'app-create-mug',
  templateUrl: './create-mug.component.html',
  styleUrls: ['./create-mug.component.css']
})
export class CreateMugComponent {

  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  triggerFileInput() {
    this.fileInput?.nativeElement.click();
  }


  productForm: FormGroup;


  selectedFile: File | undefined;
  selectedFileUrl: string | ArrayBuffer | null = null;

  uploadDone: boolean = false;
  uploading: boolean = false;


  uploadedImageUrl: any;


  constructor(private mainAPIService: MainAPIService,private fb: FormBuilder){

    this.productForm = this.fb.group({
      productName: [''],
      productImg: ['']
    });
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

    } else {

      this.selectedFile = undefined;
      this.selectedFileUrl = null;
    }
  }


   /** uploadFile bem quando eu clicar em criar caneca,
    *    this.uploadDone = true;
    *           this.uploading = false;
    * **/

   message: string = '';
   messageType: 'success' | 'error' | '' = '';
   uploadFile(): void {
     if (this.selectedFile) {
       this.uploading = true;
       this.message = '';
       this.messageType = '';
       this.mainAPIService.uploadImageCreateMug(this.selectedFile).subscribe(
         response => {
           console.log('File uploaded successfully', response);
           this.productStatus = response;
           this.uploading = false;
           this.message = 'Caneca criada com sucesso!';
           this.messageType = 'success';
         },
         error => {
           console.error('Error uploading file', error);
           this.uploading = false;
           this.message = 'Erro ao criar caneca, tente novamente.';
           this.messageType = 'error';
         }
       );
     }
   }




  productStatus: any;

  onSubmit(): void {
              this.uploadFile()
  }




}
