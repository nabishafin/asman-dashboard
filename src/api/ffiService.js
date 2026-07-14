export async function fetchDetentionCenters() {
  try {
    const response = await fetch('https://map.freedomforimmigrants.org/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        operationName: 'GetDetentionCenters',
        variables: {},
        query: `
          query GetDetentionCenters {
            detentionCenters {
              id
              name
              address
              latitude
              longitude
              website
              phoneNumber
              facilityOwner {
                id
                name
              }
              facilityType {
                id
                name
                typeCode
                detailCode
              }
              facilityOperator {
                id
                name
              }
              iceFieldOffice {
                id
                name
              }
            }
          }
        `,
      }),
    })

    const json = await response.json()
    return json?.data?.detentionCenters || []
  } catch (error) {
    console.error('Error fetching FFI data:', error)
    return []
  }
}
