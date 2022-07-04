import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  login() {
    const isPermitted = window.confirm('Do you have rights to visit this page?')
    
    return isPermitted;
  }
}
