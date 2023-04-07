import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem,  } from '../../../models/cart.modal';
import { CartService } from '../../../shared/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

// import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart = { items: []
};

dataSource: Array<CartItem> = []
displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
]
cartSubscription: Subscription | undefined;

constructor(private cartService: CartService, private http: HttpClient) {}

ngOnInit(): void {
  this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
    this.cart = _cart;
    this.dataSource = _cart.items;
  });
}

getTotal(items: CartItem[]): number {
  return this.cartService.getTotal(items);
}

onAddQuantity(item: CartItem): void {
  this.cartService.addToCart(item);
}

onRemoveFromCart(item: CartItem): void {
  this.cartService.removeFromCart(item);
}

onRemoveQuantity(item: CartItem): void {
  this.cartService.removeQuantity(item);
}

onClearCart(): void {
  this.cartService.clearCart();
}

onCheckout(): void {
  // this.http
  //   .post('http://localhost:4242/checkout', {
  //     items: this.cart.items,
  //   })
  //   .subscribe(async (res: any) => {
  //     let stripe = await loadStripe('your token');
  //     stripe?.redirectToCheckout({
  //       sessionId: res.id,
  //     });
  //   });
}

ngOnDestroy() {
  if (this.cartSubscription) {
    this.cartSubscription.unsubscribe();
  }
}
}
