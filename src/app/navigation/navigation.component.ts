import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterState, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../admin-panel/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService) {}
  isAdmin = false;
  isLoggedIn = false;
  private isLoggedInSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdmin = event.url.includes('admin');
      }
    });

    this.isLoggedInSubscription = this.authService.getLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    alert('Logout');
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription?.unsubscribe();
  }
}
