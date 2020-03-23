import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatToolbarModule, HttpClientModule],
  exports: [MatToolbarModule, HeaderComponent, HttpClientModule]
})
export class TwitterCoreModule {}
