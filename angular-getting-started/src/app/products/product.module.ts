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
import { AuthGuard } from '../user/auth.guard';

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
      {
        path: 'products',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ProductListComponent },
          {
            path: ':id',
            component: ProductDetailComponent,
            resolve: { resolvedData: ProductResolver }
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            resolve: { resolvedData: ProductResolver },
            children: [
              {
                path: '',
                redirectTo: 'info',
                pathMatch: 'full'
              },
              {
                path: 'info',
                component: ProductEditInfoComponent
              },
              {
                path: 'tags',
                component: ProductEditTagsComponent
              }
            ]
          }
        ]
      },
    ]),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProductModule { }
