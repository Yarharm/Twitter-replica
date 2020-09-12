import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom modules
import { TwitterCoreModule } from '@twitter-replica/core';
import { TwitterAuthModule } from '@twitter-replica/auth';
import { TwitterPostModule } from '@twitter-replica/post';
import { TwitterFriendshipModule } from '@twitter-replica/friendship';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TwitterCoreModule,
    TwitterAuthModule,
    TwitterPostModule,
    TwitterFriendshipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
