import { nanoid } from "nanoid";
import faker from "faker"
const cities = require("all-the-cities");

type IntervalRange = {
    startTime: number,
    endTime: number
}

type Address = {
    addressLabel : string,
    lat : number,
    long: number
}

type fakeCity = {
    country : string,
    name : string,
    loc : {
        coordinates: number[]
    }
}

type TimeIndexedTypedLocation = {
    cProp : string,
    cPropLabel: string,
    tITL : string,
    startTime: string,
    endTime: string,
    locationType: string,
    long: number,
    lat: number,
    addressLabel: string 
}

type TimeIndexedTypedLocationBuilderInput = {
    intervalRange? : IntervalRange,
    intervalDelta? : number,
    locationTypes? : string[]
}

export class TimeIndexedTypedLocationBuilder {

    private arcoResourcePrefix : string = "https://w3id.org/arco/resource/" 

    constructor(public intervalRange : IntervalRange, public intervalDelta : number, public locationTypes : string[]) {}

    static create({
        intervalRange,
        intervalDelta, 
        locationTypes
    } : TimeIndexedTypedLocationBuilderInput) {
        intervalRange = intervalRange ||{startTime : 200, endTime: 1900}
        intervalDelta = intervalDelta || 110
        locationTypes = locationTypes || ["StorageLocation", "CurrentLocation", "PreviousLocation", "ExhibitionLocation"]
        return new TimeIndexedTypedLocationBuilder(intervalRange, intervalDelta, locationTypes)
    }

    make() : TimeIndexedTypedLocation {

        const {startTime, endTime} = this.fakeTimeInterval()

        const {addressLabel, long, lat } = this.fakeAddress()

        return {
            cProp: this.fakeCprop(),
            cPropLabel: this.fakeCpropLabel(),
            tITL: this.fakeTitl(),
            startTime : startTime.toString(),
            endTime : endTime.toString(),
            locationType : this.fakeLocationType(),
            addressLabel : addressLabel,
            lat: lat,
            long: long
        }
    }

    fakeCprop() : string {
        return this.arcoResourcePrefix + "HistoricOrArtisticProperty/" + nanoid()
    }
    fakeCpropLabel() : string {
        return faker.lorem.words()
    }
    fakeTitl() : string {
        return this.arcoResourcePrefix + "TimeIndexedTypedLocation/" + nanoid()
    }
    fakeTimeInterval() : IntervalRange {
        const startTime = this.fakeRandomInt(this.intervalRange.startTime, this.intervalRange.endTime)
        const endTime = this.fakeRandomInt(startTime, startTime + this.intervalDelta)
        return {
            startTime, endTime
        }
    }
    private fakeRandomInt(min : number, max : number) : number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    fakeLocationType() : string {
        const locationIndex = this.fakeRandomInt(0, this.locationTypes.length - 1)
        return this.locationTypes[locationIndex]
    }
    fakeAddress() : Address {
        const fakeObject : fakeCity = faker.random.arrayElement(cities)

        return {
            addressLabel : fakeObject.country  + " , " + fakeObject.name,
            long : fakeObject.loc.coordinates[0],
            lat : fakeObject.loc.coordinates[1]
        }
    }
}

/* Example instance

"geometry" : "",
"lat" : "",
"long" : "",
"siteAddress" :"https://w3id.org/arco/resource/Address/baf8c807fbde64045fa67254dafd3e9f",
"addressLabel" : "Toscana, FI, Firenze"
*/