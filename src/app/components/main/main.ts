import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';
@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  apiService = inject(Api);
  events!: any;

  ngOnInit(): void {
    console.log('?? ');
    this.apiService.getEvents().subscribe((data) => (this.events = data));
  }
}
