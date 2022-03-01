import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    if (this.getDarkMode()) {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

  title = 'Website-Chris';
  @HostBinding('style.--primary-color')
  @Input()
  primaryColor: string | undefined;
  @HostBinding('style.--secondary-color')
  @Input()
  secondaryColor: string | undefined;

  /**
   * @description enables or disables the dark mode color scheme for the website
   * @param darkMode true to enable dark mode, false to disable
   */
  setDarkMode(darkMode: boolean) {
    if (darkMode) {
      this.primaryColor = 'var(--dark-primary)';
      this.secondaryColor = 'var(--dark-secondary)';
    } else {
      this.primaryColor = 'var(--white-primary)';
      this.secondaryColor = 'var(--white-secondary)';
    }
    this.cookieService.set('darkMode', '' + darkMode);
  }

  getDarkMode(): boolean {
    if (this.cookieService.check('darkMode')) {
      return this.cookieService.get('darkMode') == 'true';
    } else {
      this.setDarkMode(false);
      return false;
    }
  }
}
