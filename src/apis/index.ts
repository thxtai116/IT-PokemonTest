import { http } from "@/lib/utils"
import axios from "axios"

export interface TypeResponse {
    count: number,
    next: string,
    previous?: unknown,
    result: Array<unknown>
};

export interface PokemonResponse {
    name: string,
    url: string
}

const Models: Record<string, string> = {
    types: "type",
    list: "pokemon"
}

export const getType = (signal?: AbortSignal) => {
    return http.get<TypeResponse>(`${Models.types}`, {
        signal,
    })
}

export const getPokemon = (
    type: Array<string>,
    limit: number | string,
    signal?: AbortSignal
) => {
    if (!type.length) {
        return http.get<PokemonResponse>(`${Models.list}`, {
            params: {
                limit,
            },
            signal
        })
    }
};

export const getDetail = (url: string) => axios.get<any>(`${url}`)
