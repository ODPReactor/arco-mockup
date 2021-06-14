import {TimeIndexedTypedLocationBuilder} from "./TimeIndexedTypedLocationBuilder"

const titlInstancesN = process.argv[2] || 1

const titlBuilder = TimeIndexedTypedLocationBuilder.create({})

for (let i = 0; i < titlInstancesN; i++) {
    console.log(JSON.stringify(titlBuilder.make()))
}

