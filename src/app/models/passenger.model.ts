export interface Passenger {
    id?: string
    name: string
    passportId: string
    email: string
    phone: string
    seatPreference: string
    mealPreference: string
    isActive?: boolean
}