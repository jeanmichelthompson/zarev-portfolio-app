import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { CarouselBComponent } from './carousel-b/carousel-b.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, AboutComponent, CarouselBComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
