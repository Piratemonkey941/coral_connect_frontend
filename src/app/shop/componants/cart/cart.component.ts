import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem,  } from '../../../models/cart.modal';
import { CartService } from '../../../shared/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  windowWidth: number = window.innerWidth;
  cart: Cart = { items: []
  };

  get screenWidth(): number {
    return this.windowWidth;
  }

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

    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.windowWidth = window.innerWidth;
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
    this.http .post('http://localhost:3000/checkout', {
        items: this.cart.items,
      }).subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_test_51LuemBBuyZCYZ5t40dobSfe9oAh0oA5m9g2KYb3VtgdKfEbnMGRFmOWyDf31T1dhMwLDJcko8YEZ7jINalV8hBkz00aLyro2yY');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }



  // ngOnDestroy() {
  //   if (this.cartSubscription) {
  //     this.cartSubscription.unsubscribe();
  //   }
  // }
}
