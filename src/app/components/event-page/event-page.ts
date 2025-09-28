import { AfterViewInit, Component, Input, input, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-event-page',
  imports: [],
  templateUrl: './event-page.html',
  styleUrl: './event-page.scss',
})
export class EventPage implements AfterViewInit {
  eventDetails: any = input();
  @Input() event!: any; // or your Event interface

  ngAfterViewInit(): void {
    console.log('event: ', this.event);
  }
}
