import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) {
    console.log('GuestGuard constructor')
  }

  canActivate() {
    if (this.apiService.initialized) return this.apiService.authorized ? this.router.parseUrl('/home') : true
    else return this.apiService.initialize().then(() => this.apiService.authorized ? this.router.parseUrl('/home') : true)
  }

}
