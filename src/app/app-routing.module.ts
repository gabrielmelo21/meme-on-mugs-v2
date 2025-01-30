import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateMugComponent} from "./components/create-mug/create-mug.component";
import {AdminComponent} from "./components/admin/admin.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import { FuckComponent } from './components/fuck/fuck.component';
import {DadosComponent} from "./components/dados/dados.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  { path: 'createMug', component: CreateMugComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent},
  { path: 'admin/:password', component: AdminComponent},
  { path: 'fuck', component: FuckComponent},
  { path: 'dados', component: DadosComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
