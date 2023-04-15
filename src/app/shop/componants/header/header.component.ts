import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Cart, CartItem } from '../../../models/cart.modal';
import { CartService } from '../../../shared/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _cart: Cart = { items: [] };                        // Initialize an empty cart
  itemsQuantity = 0;                                          // Initialize the itemsQuantity to 0
  cartSubscription: Subscription;                             // Declare a Subscription for cart updates

  // Define a getter for the cart property
  get cart(): Cart {
    return this._cart;
  }

  // Define a setter for the cart property
  set cart(cart: Cart) {
    this._cart = cart;
     this.itemsQuantity = cart.items                          // Calculate the total items quantity in the cart
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  // Inject the CartService as a dependency
  constructor(private cartService: CartService) {}

  // ngOnInit lifecycle hook to subscribe to cart updates
  ngOnInit() {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {  // Subscribe to the cart service and update the cart when it changes
      this.cart = _cart;
    });
  }

  // ngOnDestroy lifecycle hook to unsubscribe from cart updates
  ngOnDestroy() {
    if (this.cartSubscription) {            // Unsubscribe from the cartSubscription to prevent memory leaks
      this.cartSubscription.unsubscribe();
    }
  }

  // Get the total price of all items in the cart
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  // Clear the cart by calling the clearCart method of the CartService
  onClearCart() {
    this.cartService.clearCart();
  }
}
