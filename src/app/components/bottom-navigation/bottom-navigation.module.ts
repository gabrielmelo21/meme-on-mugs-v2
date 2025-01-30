import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BottomNavigationComponent} from "./bottom-navigation.component";
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [BottomNavigationComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [BottomNavigationComponent]
})
export class BottomNavigationModule { }
