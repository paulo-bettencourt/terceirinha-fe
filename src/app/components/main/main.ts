import { Component, inject, OnInit, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-main',
  imports: [CommonModule, JsonPipe],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  apiService = inject(Api);
  events = signal<any>([]);

  ngOnInit(): void {
    console.log('?? ');
    this.apiService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error:', err),
    });
  }
}
