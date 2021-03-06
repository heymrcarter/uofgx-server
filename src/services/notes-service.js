import rp from 'request-promise'

export async function getNotesForMember(clanId, membershipId) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.NOTES_BASE_URL}/${clanId}/${membershipId}`,
      json: true
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export async function addNoteForMember(clanId, membershipId, note) {
  return new Promise((resolve, reject) => {
    const request = {
      uri: `${process.env.NOTES_BASE_URL}/${clanId}/${membershipId}`,
      body: note,
      json: true,
      method: 'POST'
    }

    rp(request)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}
