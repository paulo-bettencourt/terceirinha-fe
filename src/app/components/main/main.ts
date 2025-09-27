import { Component, ComponentRef, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventPage } from '../event-page/event-page';

@Component({
  selector: 'app-main',
  standalone: true, // Add if this is a standalone component
  imports: [CommonModule, JsonPipe],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'], // fixed typo
})
export class Main implements OnInit {
  apiService = inject(Api);
  router = inject(Router);
  events = signal<any>([]);
  private viewContainer = inject(ViewContainerRef);
  componentRef: ComponentRef<EventPage> | null = null;
  isPageEvent = this.componentRef?.hostView.destroyed;

  // Keep reference to dynamically created component

  ngOnInit(): void {
    this.apiService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error:', err),
    });
  }

  goToEventDetail(eventId: number) {
    // Destroy previous component if exists
    if (this.componentRef && !this.componentRef.hostView.destroyed) {
      console.log('Component is not yet destroyed');

      this.componentRef.destroy(); // destroy the component
      console.log('Component destroyed:', this.componentRef.hostView.destroyed); // true

      this.componentRef = null; // remove reference
      return;
    }

    // Create the component dynamically
    this.componentRef = this.viewContainer.createComponent(EventPage);

    console.log('Component has been created!', this.componentRef.instance);

    // // Pass data to component
    // this.componentRef.instance.eventDetails = eventId;
  }

  destroyEventPage() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
      console.log('Component destroyed!');
    }
  }
}
