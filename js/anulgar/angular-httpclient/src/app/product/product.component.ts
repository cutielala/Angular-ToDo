import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  //hold product data
  products: any = [];
  constructor(
    public rest: RestService, 
    private route:ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.products = [];
    this.rest.getProducts().subscribe((data:{}) =>{
      console.log(data);
      this.products = data;
    })
  }

  add(){
    this.router.navigate(['/product-add']);
  }

  delete(id: string): void {
    this.rest.deleteProduct(id)
      .subscribe(() => {
          this.getProducts();
        }, (err) => {
          console.log(err);
        }
      );
  }



}
