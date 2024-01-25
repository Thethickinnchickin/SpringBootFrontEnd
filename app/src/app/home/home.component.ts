import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authToken : any;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authToken = localStorage.getItem('user_token');
      
    }
  }

  isLoggedIn(): boolean {
    if(this.authToken) {
      return true;
    } else {
      return false;
    }
  }

  logOut() : void {
    if(this.authToken) {
      localStorage.clear();
      window.location.reload();
    }
  }
}
