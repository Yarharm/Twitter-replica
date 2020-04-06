import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { TwitterCoreModule } from '@twitter-replica/core';
import { TwitterPostModule, TwitterPostRoutes } from '@twitter-replica/post';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TwitterCoreModule,
    TwitterPostModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'post' },
      { path: 'post', children: TwitterPostRoutes },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
