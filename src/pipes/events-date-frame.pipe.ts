import { Pipe,PipeTransform} from '@angular/core';
import {EventItem} from '../business/events/Event';
import {DateConvertor} from '../business/shared/DateConvertor';
import * as moment from 'moment';

//Pipe to filter the events into categories based on day number ranges
//e.g. today -> start:0, end:0
//e.g. today -> start:-1, end:-1
@Pipe({
    name: 'eventsDateFramePipe'
})
export class EventsDateFramePipe implements PipeTransform {
    transform(items: EventItem[], start: number, stop: number): any {

        //old code - before moment
        //let today:Date = new Date();
        //today.setHours(0,0,0,0);

        let today:Date = new Date();

        return items.filter((event:EventItem)=>{
            //old code - before moment
            //var dayDifference = this.CalculateDaysBetweenDates(
            //    this.CleanOfTime(event), 
            //    today);
            var dayDifference = this.CalculateDayDifferenceBetweenDate(event.dateTimeAsDate, today);
            if (start === null)
                return dayDifference>=stop;
            if (stop === null)
                return dayDifference<=start;
            return dayDifference>=start && dayDifference<=stop;
        });
    }


    private CalculateDayDifferenceBetweenDate(firstDate:Date, secondDate:Date):number{
        console.log(firstDate);
        console.log(moment(firstDate));
        console.log(moment(secondDate));
        if (firstDate>secondDate)
            return moment(firstDate).startOf('day').diff(moment(secondDate).startOf('day'),'days')
        else
            return -moment(secondDate).startOf('day').diff(moment(firstDate).startOf('day'),'days')
    }

    //old method - before I used moment
    //to get the date clean of time
    private CleanOfTime(eventItem: EventItem):Date{
        var finalDate = DateConvertor.ConvertJsonDateToDate(eventItem.dateTime);
        finalDate.setHours(0,0,0,0);
        return finalDate;
    }

    //old method before I used moment
    //to calculate the difference in days
    private CalculateDaysBetweenDates(firstDate:Date, secondDate:Date):number
    {
        let oneDay:number = 24*60*60*1000; // hours*minutes*seconds*
        let diff:number =0;
        if (firstDate>secondDate)
            diff = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        else
            diff = - Math.round(Math.abs((secondDate.getTime() - firstDate.getTime())/(oneDay)));
        return diff;
    }
}