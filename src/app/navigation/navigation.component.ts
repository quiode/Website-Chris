import { Component, OnInit } from '@angular/core';
import { RouterState, ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router) {}
  isAdmin = false;
  isLoggedIn = false;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdmin = event.url.includes('admin');
      }
    });
  }

  logout() {
    alert('Logout');
  }
}
