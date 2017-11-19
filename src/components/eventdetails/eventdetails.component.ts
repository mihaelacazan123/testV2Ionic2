import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import {EventItem} from '../../business/events/Event';
import {DateConvertor} from '../../business/shared/DateConvertor';
import { EventDetailsPage } from '../../pages/eventDetails/eventDetails';
import * as moment from 'moment'

//component to show the event details for the main page
@Component({
  selector: 'eventdetails',
  templateUrl: 'eventdetails.component.html'
})
export class EventDetailsComponent {

  //the input parameter is the event object
  @Input() event:EventItem;
  //output parameter so that when the user want's to do the redirect the main page 
  //(parent component) will be notified about the selection to 
  //change the events selected state
  @Output() notify:EventEmitter<string> = new EventEmitter<string>();

  constructor(public navCtrl: NavController) {
  }

  //the parent is notified about the selection to change the events 
  //selected state and the redirect to the details page is executed
  public GoToDetails(event:EventItem){
    this.notify.emit(event.id);
    this.navCtrl.push(EventDetailsPage, {selectedEvent: event});
  }

  //this could have been extended to get additional details
  public getEventDateTimeV2():string{
    return moment(this.event.dateTimeAsDate).calendar();
  }
  //the UI showed the date as Tomorrow ... so I did the pasing in here instead of creating an additional pipe
  //replaced this with moment calendar
  public getEventDateTime():string{
    let dateString:string="";
    var date= new Date(this.event.dateTimeAsDate);
    
    let today:Date = new Date();
    today.setHours(0,0,0,0);
    
    let yesterday:Date = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    yesterday.setHours(0,0,0,0);

    let tomorrow:Date = new Date();
    yesterday.setDate(yesterday.getDate()+1);
    tomorrow.setHours(0,0,0,0);

    let time:string = this.GetTimeAMPM(date.getHours());

    date.setHours(0,0,0,0);

    switch (date){
      case today:
        dateString = "Today from ";
        break;
      case tomorrow:
        dateString = "Tomorrow from ";
        break;
      case yesterday:
        dateString = "Yesterday from ";
        break;
      default:
        dateString = date.toDateString() + " from ";
    }

    dateString += time;
    return dateString;
  }

  //helper to convert the time to am/pm for display purposes
  private GetTimeAMPM(hours: number):string{
    var ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return hours + ampm;
  }

  //set the going/ignore buttons as selected or not based on the status
  //i used the status as a string for simplicity but an enum would have been an better approach
  public getClass(condition: string):string{
    if (this.event.status === condition)
      return "enabledBttn";
    else
      return "disabledBttn";
  }

  //to change the status based on the user action (click on going, click on ignore)
  //clicking on a selected option deselects it
  //as a to do: here a save in the db would have been good 
  public ChangeStatus(status:string){
    if (this.event.status === status)
      this.event.status="none";
    else
      this.event.status = status;
  }

}
