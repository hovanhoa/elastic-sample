const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  node: 'http://localhost:9200'
})

async function searchBadmintonYards(location) {
  try {
    const response = await client.search({
      index: 'badminton_yards',
      body: {
        query: {
          bool: {
            should: [
              {
                match_phrase: {
                  location: location
                }
              },
              {
                match: {
                  location: {
                    query: location,
                    fuzziness: 1,
                    minimum_should_match: "90%"
                  }
                }
              }
            ],
            minimum_should_match: 1
          }
        },
        min_score: 0.5
      }
    })

    console.log('Found yards:', JSON.stringify(response.hits.hits, null, 2))
    return response.hits.hits
  } catch (error) {
    console.error('Search error:', error)
  }
}

// Example searches
async function runExampleSearches() {
  // Example with fuzziness
//   await searchBadmintonYards('Quan 1O')  // Will match "Quan 10"
//   await searchBadmintonYards('Quaan 10') // Will match "Quan 10"
  await searchBadmintonYards('Qun 10')   // Will match "Quan 10"
}

runExampleSearches()