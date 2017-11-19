import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TestApi } from '../../services/event-api.service'
import { EventItem } from '../../business/events/Event';

//this is displayed as the main page, it displays all events grouped in today/ this week, other
//to achieve the groupin I created a paipe that shows events based on a number of dates to show date range
//as an alternative a filtration in here would have also been good to create 3 array and display the content
//the actual event details are displayed using a child component because I am reusing the UI
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  public allEvents: EventItem[];
  public filteredEvents: EventItem[];
  
  //the filter for the search box
  _eventNameFilter:string;
  get eventNameFilter():string
  {
    return this._eventNameFilter;
  }
  set eventNameFilter(value:string)
  {
    this._eventNameFilter=value;
    this.filteredEvents = this.eventNameFilter? this.performFilterByEventName(this.eventNameFilter): this.allEvents;
  }

  constructor(public navCtrl: NavController, private testApi: TestApi) {
  }

  //get the events from the api
  ionViewDidLoad() {
    this.testApi.getEvents().then(data => this.setData(data));
  }

  //for receiving notifications from the child
  onNotify(eventID:string){
    this.setAllAsUnselectedAnsSelectOneById(this.allEvents, eventID);
    this.setAllAsUnselectedAnsSelectOneById(this.filteredEvents, eventID);
  }

  //set the selected event and deselect any other selected events
  private setAllAsUnselectedAnsSelectOneById(events:EventItem[], eventID: string):void{
    for(let event of events){
        event.selected = (event.id ===eventID) ;
    }
  }

  //filters the events based on the searched text
  //the lack of events upon filtration is handled in the UI with *ngIf
  private performFilterByEventName(filterBy:string): EventItem[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.allEvents.filter((event:EventItem)=> event.title.toLocaleLowerCase().indexOf(filterBy) !== -1 );
  }

  //set the data
  private setData(data: any){
    this.allEvents = [];
    data.forEach((evt:EventItem, index)=>{ 
      let newItem = new EventItem(
      String(evt.id) + index, //just added this piece to randomize a little bit the ids as for 2 events there is the same id of id
      evt.decription,
      evt.title,
      evt.dateTime,
      evt.image,
      evt.status,
      evt.members,
      false,
      null);
      this.allEvents.push(newItem);
    }); 
    this. filteredEvents =this.allEvents;
  }
}
