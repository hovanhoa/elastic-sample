# Elasticsearch Sample Index Creator

This project demonstrates how to create and populate an Elasticsearch index using Node.js.

## Prerequisites

- Docker
- Node.js (v14 or higher)
- npm

## Setup Instructions

### 1. Start Elasticsearch Container

```bash
docker compose up -d
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Run the Script
```bash
node create-index.js
```
This will create an index with sample badminton yards in HCMC.

### 4. Run search
```bash
node search-yards.js
```
