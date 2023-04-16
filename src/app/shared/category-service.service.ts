import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from '../shared/store.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private categoriesSource = new BehaviorSubject<string[]>([]);
  categories$ = this.categoriesSource.asObservable();

  constructor(private storeService: StoreService) {
    this.fetchCategories();
  }

  fetchCategories() {
    this.storeService.getAllCategories().subscribe((response: Array<string>) => {
      this.categoriesSource.next(response);
    });
  }
}
