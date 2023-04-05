import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../shared/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>()
  // categories: string[] | undefined;
  categoriesSubscription: Subscription | undefined;
  categories: string[] = [
    'B4 Elems',
    'Major Elems',
    'Minor Elems A-I',
    'Minor Elems I-N',
    'Minor Elems M-Z',
    'Coral Fraging'
  ];


  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
  
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
