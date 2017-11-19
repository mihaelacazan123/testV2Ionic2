//This is just an extra class - in my initial version I did not 
//use moment and created this simple class instead for parsing the data
export class DateConvertor{
    public static ConvertJsonDateToDate(date:string):Date{
        let finalDate:Date = null;

        var dateTimeParts = date.split(' ');

        try{
            if(dateTimeParts.length==2){
                var dateParts = dateTimeParts[0].split('-');
                var timeParts = dateTimeParts[1].split(':');
                if (dateParts.length == 3 && timeParts.length ==3){
                    finalDate = new Date(parseInt(dateParts[2]),
                                        parseInt(dateParts[1])-1,
                                        parseInt(dateParts[0]),
                                        parseInt(timeParts[0]),
                                        parseInt(timeParts[1]),
                                        parseInt(timeParts[2])
                                        );
                }
            }
        }catch(exc){
            console.log(exc);
        }

        return finalDate;
    }
}