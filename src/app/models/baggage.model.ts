export interface Baggage {
    id?:string
    passengerFk:string
    flightFk:string
    tagNumber:string
    weight:number
    dimensions:string
    status:string
    checkInLocation:string
    incidentDetails:string
}
