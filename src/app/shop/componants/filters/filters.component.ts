import { Component, EventEmitter, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { StoreService } from '../../../shared/store.service';
import { CategoryServiceService } from '../../../shared/category-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, AfterViewInit {

  showFilters = true;
  onDestroy$ = new Subject();

  @Output() showCategory = new EventEmitter<string>()
  @Input() categories: string[] = [];
  categoriesSubscription: Subscription | undefined;
  // categories: string[] = [];

  constructor(
    private storeService: StoreService,
    private categoryService: CategoryServiceService
    ) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoryService.categories$.subscribe((response: Array<string>) => {
      this.categories = response;
    });
      // Set the initial value of showFilters based on the screen width
    this.showFilters = window.innerWidth >= 920;
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        // Update the breakpoint to 920px
        this.showFilters = window.innerWidth >= 920;
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
  // onShowCategory(allCategories: boolean): void {
  //   if (allCategories) {
  //     this.showCategory.emit(this.categories);
  //   } else {
  //     this.showCategory.emit('');
  //   }
  // }


  ngOnDestroy(): void {
    this.onDestroy$.next(1);
    this.onDestroy$.complete();
  }

}
