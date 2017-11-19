import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventItem } from '../../business/events/Event';

//this is the second "static" page that just displays the details
//right now I load the actual event title, description and the members
//the members and orange number are actually calculated for the event members 
//for the event members it shows 7 members (if there are) and the rest (if there are) with plus and remainder of mebers
//added just some sass variables to the css of this component
@Component({
  selector: 'page-event-details',
  templateUrl: 'eventDetails.html'
})
export class EventDetailsPage {

  event:EventItem;

  //the event is retrieved because it was passed as a navigation parameter
  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.event = this.navParams.get('selectedEvent');
  }

  //method to return back to the main events page
  back():void{
    this.navCtrl.pop();
  }
}
