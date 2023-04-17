import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.modal';
import { CartService } from '../../shared/cart.service';
import { StoreService } from '../../shared/store.service';
import { Subscription } from 'rxjs';


import { CategoryServiceService } from './../../shared/category-service.service'; // Import the CategoryServiceService

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  categoriesSubscription: Subscription | undefined;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  // products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
      // Initialize the filteredProducts with all products
      this.filteredProducts = products;
    });
  }


  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    // if (this.categoriesSubscription) {
    //   this.categoriesSubscription.unsubscribe();
    // }
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.applySorting(newSort);
  }

  onShowCategory(category: string): void {
    this.filteredProducts = category === 'All' ? this.products : this.products.filter(product => product.category === category);
  }

  // onShowCategory(categories: string[] | string): void {
  //   if (Array.isArray(categories)) {
  //     // Handle multiple categories
  //     this.loadProductsForMultipleCategories(categories);
  //   } else {
  //     // Handle single category
  //     this.loadProductsForSingleCategory(categories);
  //   }
  // }


  applySorting(sort: string): void {
    if (sort === 'asc') {
      this.filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      this.filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  getProducts(): void {
    console.log('Count:', this.count);
    console.log('Sort:', this.sort);
    console.log('Category:', this.category);
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        console.log('Products:', _products);
        this.products = _products;
      });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }


}
