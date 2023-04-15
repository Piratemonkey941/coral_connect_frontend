import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '.././models/cart.modal';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items:[]});

  constructor(private _snackBar: MatSnackBar) {
    // Load the cart data from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart.next(JSON.parse(savedCart));
    }

    // Subscribe to the cart updates to save them in localStorage
    this.cart.subscribe((cart) => {
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
  
  addToCart(item: CartItem):void {
    const items = [...this.cart.value.items];                             // Create a copy of the current items array in the cart
    const itemInCart = items.find((_item) => _item.id === item.id);       // Check if the item is already in the cart

    if(itemInCart) {
      itemInCart.quantity += 1;                                           // If the item is already in the cart, increase its quantity by 1
    } else {
      items.push(item);                                                   // If the item is not in the cart, add it to the items array
    }

    this.cart.next({items});                                              // Update the cart's items array with the updated items array

    this._snackBar.open('1 item added to cart.', 'Ok', {duration:3000});  // Show a snack bar notification that 1 item was added to the cart

    console.log(this.cart.value);                                         // Log the current value of the cart to the console
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id                                     // Create a new array of items that excludes the input item
    );

    if (updateCart) {                                                     // Check if the updateCart flag is true (default)
      this.cart.next({ items: filteredItems });                           // Update the cart's items array with the new filtered items array
      this._snackBar.open('1 item removed from cart.', 'Ok', {            // Show a snack bar notification that 1 item was removed from the cart
        duration: 3000,
      });
    }
    return filteredItems;                                                 // Return the new filtered items array
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;                                        // Declare a variable to track if the item's quantity reaches 0

    let filteredItems = this.cart.value.items.map((_item) => {            // Map over the items array and decrement the quantity of the input item by 1 if it is found
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;                                         // Set the itemForRemoval variable to the input item if its quantity reaches 0
        }
      }
      return _item;
    });

    if (itemForRemoval) {                                                 // Check if the itemForRemoval variable is truthy (i.e. if the input item's quantity reached 0)
      filteredItems = this.removeFromCart(itemForRemoval, false);         // If so, remove the item from the cart without updating the cart's value
    }

    this.cart.next({ items: filteredItems });                             // Update the cart's items array with the new filtered items array
    this._snackBar.open('1 item removed from cart.', 'Ok', {              // Show a snack bar notification to indicate that 1 item was removed from the cart
      duration: 3000,
    });
  }



  getTotal(items: Array<CartItem>): number {
    return items.
      map((item) => item.price *item.quantity)
      .reduce((prev, current) => prev + current, 0);
    }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }





}
