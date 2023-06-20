import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkComponent } from './work.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent,
    children: [
      { path: '', component: WorkComponent },
    ],
  },
];

@NgModule({
  declarations: [
    WorkComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WorkModule { }
