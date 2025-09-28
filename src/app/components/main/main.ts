import {
  Component,
  ComponentRef,
  inject,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { EventPage } from '../event-page/event-page';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, JsonPipe, EventPage],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main implements OnInit {
  apiService = inject(Api);
  router = inject(Router);
  events = signal<any>([]);
  componentRef: ComponentRef<EventPage> | null = null;
  isListOfEvents = signal(true);
  @ViewChild('dynamicContainer', { static: true })
  dynamicContainer!: TemplateRef<any>;
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  viewContainer!: ViewContainerRef;

  ngOnInit(): void {
    this.apiService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error:', err),
    });
  }

  eventId = signal(0);

  goToEventDetail(eventId: number, index: number) {
    this.eventId.set(index);
    // Destroy previous component if exists
    if (this.componentRef) {
      this.destroyEventPage();
    }

    // Hide the list and show the dynamic component
    this.isListOfEvents.set(false);

    // Create the component dynamically inside the placeholder
    this.componentRef = this.viewContainer.createComponent(EventPage);

    // Pass the event data
    this.componentRef.instance.eventDetails = eventId;

    // Pass data via the instance
    this.componentRef.instance.event = this.events()[index];

    console.log('Component has been created!', this.componentRef.instance);
  }

  destroyEventPage() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;

      // Show the list again
      this.isListOfEvents.set(true);
      console.log('Component destroyed!');
    }
  }
}
