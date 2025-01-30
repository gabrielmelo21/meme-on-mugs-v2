import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home/home.component";
import {ComponentRoutingModule} from "./component-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from '@angular/material/select';
import {MatRippleModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";

import {MatGridListModule} from "@angular/material/grid-list";

import {MatToolbarModule} from "@angular/material/toolbar";
import { CreateMugComponent } from './create-mug/create-mug.component';
import { AdminComponent } from './admin/admin.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FuckComponent } from './fuck/fuck.component';
import { DadosComponent } from './dados/dados.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
  HomeComponent,
  CreateMugComponent,
  AdminComponent,
  ShoppingCartComponent,
  FuckComponent,
  DadosComponent,
  FooterComponent,

  ],
    imports: [
        CommonModule,
        ComponentRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatRippleModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatToolbarModule,


    ]
})
export class ComponentsModule { }
