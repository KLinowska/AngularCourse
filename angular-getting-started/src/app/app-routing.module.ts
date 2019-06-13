import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'products',
    canActivate: [AuthGuard],
    data: { preload: false },
    loadChildren: './products/product.module#ProductModule'
  },
  { path: '',   redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SelectiveStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
