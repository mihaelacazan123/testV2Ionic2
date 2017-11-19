import {EventMember} from './EventMember';
import * as moment from 'moment';

//encapsulated the actual event
export class EventItem{
    //put id as string as items pushed into firebase can have alphanumerical ids
    constructor(public id: string,
                public decription:string,
                public title:string,
                public dateTime: string,
                public image: string,
                public status: string,
                public members: EventMember[],
                public selected:Boolean,
                public dateTimeAsDate,){
                    this.setDateTimeMoment();
                    }

    //uses moment to do the date conversion                 
    public setDateTimeMoment(){
        this.dateTimeAsDate = moment(this.dateTime, "DD-MM-YYYY HH:mm:ss");
    }
}