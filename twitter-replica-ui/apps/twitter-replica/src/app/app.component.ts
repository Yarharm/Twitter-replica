import { Component, OnInit } from '@angular/core';
import { AuthService } from '@twitter-replica/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.fetchAuthFromStorage();
  }
}
