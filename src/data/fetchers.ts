import constants from "./constants"
import { fetchWithHeader } from "./utils"

export async function fetchSeasons() {
    return fetchWithHeader(`${constants.BASE_API}/seasons`)
}

export async function fetchRanking(isTeams: boolean = false, season: number) {
  return fetchWithHeader(`${constants.BASE_API}/rankings/${isTeams ? 'teams' : 'drivers'}?season=${season}`)
}