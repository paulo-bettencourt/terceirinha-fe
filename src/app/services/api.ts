import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  http = inject(HttpClient);

  getEvents() {
    return this.http.get('https://terceirinha-fe.onrender.com/events');
  }
}
