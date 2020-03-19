import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from "../productos.service";
import {Product} from "../product";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  
  term : string;
  p: number = 1;

  profileForm: FormGroup;

  _id = '';
  prod_name = '';
  prod_desc = '';
  prod_price: number = null;
  data: Product[] = [];
  actualizar:boolean=false;
  tituloModal:string="Agregar";
  displayedColumns: string[] = ['_id', 'prod_name', 'prod_desc', 'prod_price','actions'];
  isLoadingResults = true;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private api: ProductosService,private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required]
    });
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
    if (this.actualizar){
      
    this.onFormSubmit();
    return
    }else {
    // TODO: Use EventEmitter with form 
    this.api.addProduct(this.profileForm.value)
    .subscribe((res: any) => {
      this.Lista();
    console.log(res);
  })
    }
}
editar(id: any) {
  this.actualizar=true;
  this.tituloModal="Editar";
  this.api.getProduct(id).subscribe((data: any) => {
    this._id = data._id;
    this.profileForm.setValue({
      prod_name: data.prod_name,
      prod_desc: data.prod_desc,
      prod_price: data.prod_price
    });
  });
}

borrar(id: any) {
  this.isLoadingResults = true;
  this.api.deleteProduct(id)
    .subscribe(res => {
      this.Lista();
        this.isLoadingResults = false;
        
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}


onFormSubmit() {
  this.isLoadingResults = true;
  this.api.updateProduct(this._id, this.profileForm.value)
    .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.actualizar=false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.Lista();

}

}
export interface misDatos {
  _id: string;
  prod_name: string;
  prod_desc:string;
  prod_price: number;
}