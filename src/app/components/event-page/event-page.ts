import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
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
  @Input() event!: any; // or your Event interface
  @Output() close = new EventEmitter<void>();

  destroyEventPage() {
    this.close.emit();
  }
}
