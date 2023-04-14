import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../shared/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  // @Output() showCategory = new EventEmitter<string>()
  // // categories: string[] | undefined;
  // categoriesSubscription: Subscription | undefined;
  // categories: string[] = [
  //   'Reef Water Element',
  //   'Reef Education',
  //   'Reef Conservation',

  // ];
  @Output() showCategory = new EventEmitter<string>()
  categoriesSubscription: Subscription | undefined;
  categories: string[] = [];

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
