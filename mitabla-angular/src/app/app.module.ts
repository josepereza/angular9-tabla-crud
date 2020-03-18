import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductosService } from "./productos.service";
import { HttpClientModule } from "@angular/common/http";




import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';



import { AppComponent } from './app.component';
import { ListadoComponent } from './listado/listado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,MatPaginatorModule,MatSortModule,MatTableModule, BrowserAnimationsModule,
    ModalManagerModule,MatFormFieldModule,MatInputModule,HttpClientModule
  ],
  providers: [ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
