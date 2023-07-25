import constants from "./constants";

export function fetchWithHeader(url: string) {
    return fetch(url, {
        headers: {
            "x-rapidapi-key": constants.KEY
        }
    }).then(res => res.json())
}