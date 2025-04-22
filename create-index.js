const { Client } = require('@elastic/elasticsearch')

// Create Elasticsearch client
const client = new Client({
  node: 'http://localhost:9200',
})

async function createSampleIndex() {
  try {
    // Define index name
    const indexName = 'badminton_yards'

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
            name: { type: 'text' },
            location: { type: 'text' }
          }
        }
      }
    })

    // Sample data
    const sampleData = [
      {
        name: 'Thanh Thai Sports Center',
        location: '131 Thanh Thai, Phuong 14, Quan 10, TP Ho Chi Minh'
      },
      {
        name: 'Phu Tho Stadium',
        location: '219 Ly Thuong Kiet, Phuong 15, Quan 11, TP Ho Chi Minh'
      },
      {
        name: 'Nguyen Du Stadium',
        location: '116 Nguyen Du, Phuong Ben Thanh, Quan 1, TP Ho Chi Minh'
      },
      {
        name: 'Rach Mieu Sports Center',
        location: '1 Hoa Phuong, Phuong 2, Quan Phu Nhuan, TP Ho Chi Minh'
      },
      {
        name: 'Tan Binh Sports Center',
        location: '448 Hoang Van Thu, Phuong 4, Quan Tan Binh, TP Ho Chi Minh'
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
