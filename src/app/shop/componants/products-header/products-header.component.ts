import { Component, EventEmitter, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime,takeUntil } from 'rxjs/operators';
import { ReplaySubject, fromEvent, Subscription } from 'rxjs';
import { CategoryServiceService } from '../../../shared/category-service.service';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss']
})
export class ProductsHeaderComponent implements OnInit {
  @Input() categories: string[] = [];
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() showCategory = new EventEmitter<string>(); // Add this line

  sort = 'desc';
  itemsShowCount = 12;

  showColumnButtons = true;                         // Add a variable to track the visibility of the column buttons
  private onDestroy$ = new ReplaySubject(1);
  categoriesSubscription: Subscription | undefined;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private categoryService: CategoryServiceService
    ) { }

    ngOnInit(): void {
      // Subscribe to breakpoint changes
      this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(result => {
          if (result.matches) {
            this.showColumnButtons = false;
            this.onColumnsUpdated(1);
          } else {
            this.showColumnButtons = true;
          }
        });
      this.showColumnButtons = window.innerWidth >= 920;

      // Subscribe to categories
      this.categoriesSubscription = this.categoryService.categories$.subscribe((response: Array<string>) => {
        this.categories = response;
      });
    }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        // Update the breakpoint to 1280px
        this.showColumnButtons = window.innerWidth >= 920;
      });
  }

  ngOnDestroy(): void {
  this.onDestroy$.next(1);
  this.onDestroy$.complete();

  // Unsubscribe from categories
  if (this.categoriesSubscription) {
    this.categoriesSubscription.unsubscribe();
  }
}

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onItemsUpdated(count: number): void {
    this.itemsCountChange.emit(count);
    this.itemsShowCount = count;
  }

  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort = newSort;
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

}
