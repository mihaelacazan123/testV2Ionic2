import {Injectable} from '@angular/core'
import {Http, Response} from '@angular/http'

//this is the API calling service
@Injectable()
export class TestApi{

    private baseURL: string = "https://tsh-app.firebaseio.com/events.json";
    constructor(private http:Http){

    }

    //retrieve the events from the URL using prmises
    //when an error happens in the retrieval process it is just logged in the console
    getEvents(){
        try{
        return new Promise(resolve=>{
            this.http.get(this.baseURL)
                .subscribe(res=>resolve(res.json()), err=>console.log(err) /*some extra error logging can be addedS*/);
        })
    }catch(exc){
        console.log('!!Exception!!');
        console.log(exc); //some other logging can be added to better manage the errors
        console.log('!!Exception!!');
    }
    }
}