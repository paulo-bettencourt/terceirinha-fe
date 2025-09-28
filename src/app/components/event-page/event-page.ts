import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  output,
  Output,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-event-page',
  imports: [],
  templateUrl: './event-page.html',
  styleUrl: './event-page.scss',
})
export class EventPage {
  event = input<Event>();
  close = output<boolean>();

  destroyEventPage() {
    this.close.emit(true);
  }
}

export interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  image: string;
}
