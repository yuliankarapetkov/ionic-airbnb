import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async logIn(): Promise<void> {
    this.authService.logIn();

    const loadingElement = await this.loadingController.create({ keyboardClose: true, message: 'Logging in..' });

    loadingElement.present();

    setTimeout(() => {
      loadingElement.dismiss();
      this.router.navigateByUrl('/places/tabs/discover');
    }, 1500);
  }
}
