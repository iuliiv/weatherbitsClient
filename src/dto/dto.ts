import { Entity, EntityData } from "redis-om"

export interface City extends EntityData {
    name: string,
    cityId: number
}
export interface Weather extends EntityData {
    cityId: number,
    temperature: number,
    date: Date
}

export interface Statistics extends EntityData {
    cityId: number,
    temperature: number,
    date: Date
}

export interface ServerConfig extends EntityData {
    dataInit: boolean,
}

export interface ServerConfig {
    dataInit: boolean
}