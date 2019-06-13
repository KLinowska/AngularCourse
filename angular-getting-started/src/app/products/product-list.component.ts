import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  includeDetail: boolean = true;
  @ViewChild(CriteriaComponent, {static: true}) filterComponent: CriteriaComponent;
  errorMessage: string = '';
  parentListFilter: string = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  performFilter(filterBy?: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnInit(): void {
    //this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.parentListFilter);
      },
      error => this.errorMessage = error as any
    );
  }
}
