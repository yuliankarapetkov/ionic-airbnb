import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl('/auth');
    }

    return this.authService.isAuthenticated;
  }
}
