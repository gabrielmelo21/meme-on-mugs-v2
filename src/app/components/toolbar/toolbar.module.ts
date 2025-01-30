import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ToolbarComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        RouterLink
    ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
