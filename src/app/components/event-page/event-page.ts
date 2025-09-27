import { Component, input } from '@angular/core';

@Component({
  selector: 'app-event-page',
  imports: [],
  templateUrl: './event-page.html',
  styleUrl: './event-page.scss',
})
export class EventPage {
  eventDetails: any = input();
}
