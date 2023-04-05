import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Product} from '../../../models/product.modal'

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  // product: Product | undefined = {
  //   id : 1,
  //   title : 'Sneakers',
  //   price : 50,
  //   category : 'shoes',
  //   description : 'Shoes Description',
  //   image : "https://via.placeholder.com/150"
  // };

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
      this.addToCart.emit(this.product);
  }

}
