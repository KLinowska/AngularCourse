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
  listFilter: string = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
  }

  ngAfterViewInit(): void {
    this.listFilter = this.filterComponent.listFilter;
  }

  performFilter(filterBy?: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredProducts = this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    return this.filteredProducts;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  onValueChange(value: string): void {
    this.listFilter = value;
    this.performFilter(value);
  }

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter);
      },
      error => this.errorMessage = error as any
    );
  }
}
