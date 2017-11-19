//encapsulates the event participants
export class EventMember{
    //put id as string as items pushed into firebase can have alphanumerical ids
    constructor(public id: string, public photo:string){
    }
}