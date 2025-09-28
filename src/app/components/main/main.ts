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
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main implements OnInit {
  apiService = inject(Api);
  router = inject(Router);
  events = signal<any>([]);

  isListOfEvents = signal(true);
  eventId = signal(0);

  componentRef: ComponentRef<EventPage> | null = null;
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  viewContainer!: ViewContainerRef;

  ngOnInit(): void {
    this.apiService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error:', err),
    });
  }

  goToEventDetail(eventId: number, index: number) {
    this.eventId.set(index);

    if (this.componentRef) {
      this.destroyEventPage();
    }

    this.isListOfEvents.set(false);

    this.componentRef = this.viewContainer.createComponent(EventPage);

    this.componentRef.instance.event = this.events()[index];

    // Subscribe to output
    this.componentRef.instance.close.subscribe(() => {
      this.destroyEventPage();
    });
  }

  destroyEventPage() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
      this.isListOfEvents.set(true);
    }
  }
}
