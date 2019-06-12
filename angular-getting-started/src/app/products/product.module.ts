import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductResolver } from './product-resolver.service';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductEditComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: { resolvedData: ProductResolver }
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        resolve: { resolvedData: ProductResolver }
      }
    ]),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
