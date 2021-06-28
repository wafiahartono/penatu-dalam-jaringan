import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {
    console.log('AuthGuard constructor')
  }

  canActivate() {
    if (this.apiService.initialized) return this.apiService.authorized ? true : this.router.parseUrl('/masuk')
    else return this.apiService.initialize().then(() => this.apiService.authorized ? true : this.router.parseUrl('/masuk'))
  }

}
