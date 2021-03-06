import rp from 'request-promise'
import { checkError } from '../middleware/bungie-error-handler'

function createRequest(endpoint = '/', headers = {}) {
  return {
    uri: `${process.env.API_BASE_URL}/Destiny2${endpoint}`,
    headers: Object.assign({}, headers, {
      'X-API-Key': process.env.API_KEY
    }),
    json: true
  }
}

export async function getPostGameCarnage(activityId) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/Stats/PostGameCarnageReport/${activityId}/`)

    rp(request)
      .then(response => checkError(response))
      .then(response => resolve(response.Response))
      .catch(error => reject(error))
  })
}

export async function getMemberCharacterActivity(membershipType, membershipId, characterId) {
  return new Promise((resolve, reject) => {
    const activityRequest = createRequest(`/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities`)

    rp(activityRequest)
      .then(response => checkError(response))
      .then(response => resolve(response.Response.activities))
      .catch(error => reject(error))
  })
}

export async function getMemberCharacters(membershipType, membershipId) {
  return new Promise((resolve, reject) => {
    const profileRequest = createRequest(`/${membershipType}/Profile/${membershipId}?components=200`)

    rp(profileRequest)
      .then(response => checkError(response))
      .then(response => {
        if (response.ErrorStatus !== 'Success') {
          console.log('Non succcess response', response)
          reject(new Error(response.Message))
        }

        const characters = []
        try {
          Object.values(response.Response.characters.data).forEach(character => characters.push(character))
        } catch (e) {
          reject(e)
        }
        resolve(characters)
      })
      .catch(error => reject(error))
  })
}

export async function getProfile(membershipType, membershipId) {
  return new Promise((resolve, reject) => {
    const profileRequest = createRequest(`/${membershipType}/Profile/${membershipId}?components=100`)

    rp(profileRequest)
      .then(response => checkError(response))
      .then(response => resolve(response.Response.profile))
      .catch(error => reject(error))
  })
}

export async function getClanWeeklyRewards(clanId) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/Clan/${clanId}/WeeklyRewardState`)
    rp(request)
      .then(response => checkError(response))
      .then(response => resolve(response.Response))
      .catch(error => reject(error))
  })
}

export async function getHistoricalStats(membershipType, membershipId) {
  return new Promise((resolve, reject) => {
    const request = createRequest(`/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=5,6,4,2,18,63`)

    rp(request)
      .then(response => checkError(response))
      .then(response => resolve(response.Response))
      .catch(error => reject(error))
  })
}
