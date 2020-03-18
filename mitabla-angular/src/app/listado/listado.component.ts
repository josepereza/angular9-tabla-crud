import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from "../productos.service";
import {Product} from "../product";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  
  term : string;
  p: number = 1;

  
  _id = '';
  prod_name = '';
  prod_desc = '';
  prod_price: number = null;
  data: Product[] = [];
  
  displayedColumns: string[] = ['_id', 'prod_name', 'prod_desc', 'prod_price','actions'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private api: ProductosService ) { }

  ngOnInit() {
   
this.Lista(); 
    
  }
  Lista(){
    this.api.getProducts()
    .subscribe((res: any) => {
      this.dataSource= new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     

      this.data=res;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
    

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSubmit() {
   
}
editar(id: any) {
  
}

borrar(id: any) {
  
}

onFormSubmit() {
  

}
prueba(nombre){
  alert("Has pulsado "+ nombre)
}
}
export interface misDatos {
  _id: string;
  prod_name: string;
  prod_desc:string;
  prod_price: number;
}