const { Client } = require('@elastic/elasticsearch')

// Create Elasticsearch client
const client = new Client({
  node: 'http://localhost:9200',
})

async function createSampleIndex() {
  try {
    // Define index name
    const indexName = 'badminton_tournaments'

    // Check if index exists and delete it
    const exists = await client.indices.exists({ index: indexName })
    if (exists) {
      await client.indices.delete({ index: indexName })
    }

    // Create index with mappings
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            tournament_id: { type: 'keyword' },
            player_name: { type: 'text' },
            category: { type: 'keyword' },
            round: { type: 'keyword' },
            score: { type: 'text' },
            result: { type: 'keyword' },
            opponent: { type: 'text' },
            tournament_date: { type: 'date' },
            venue: { type: 'text' }
          }
        }
      }
    })

    // Sample data
    const sampleData = [
      {
        tournament_id: 'T001',
        player_name: 'Viktor Axelsen',
        category: 'mens_singles',
        round: 'finals',
        score: '21-19, 21-18',
        result: 'win',
        opponent: 'Kento Momota',
        tournament_date: new Date('2023-10-15'),
        venue: 'Tokyo Metropolitan Gymnasium'
      },
      {
        tournament_id: 'T002',
        player_name: 'Carolina Marin',
        category: 'womens_singles',
        round: 'semi_finals',
        score: '21-15, 21-17',
        result: 'win',
        opponent: 'Tai Tzu-ying',
        tournament_date: new Date('2023-09-28'),
        venue: 'Istora Senayan'
      },
      {
        tournament_id: 'T003',
        player_name: 'Marcus Gideon',
        category: 'mens_doubles',
        round: 'quarter_finals',
        score: '18-21, 21-19, 19-21',
        result: 'loss',
        opponent: 'Lee Yang/Wang Chi-lin',
        tournament_date: new Date('2023-10-05'),
        venue: 'Axiata Arena'
      }
    ]

    // Bulk index the sample data
    const operations = sampleData.flatMap(doc => [
      { index: { _index: indexName } },
      doc
    ])

    const bulkResponse = await client.bulk({
      refresh: true,
      operations
    })

    console.log('Index created successfully!')
    console.log('Sample data indexed:', bulkResponse)

  } catch (error) {
    console.error('Error:', error)
  }
}

createSampleIndex()
