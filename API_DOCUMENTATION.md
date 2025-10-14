# Epstein Investigation Platform - API Documentation

## Overview

The Epstein Investigation Platform provides a comprehensive RESTful API for accessing investigation data. All endpoints return JSON responses and support filtering, pagination, and search capabilities.

**Base URL:** `/api`  
**Version:** 1.0.0  
**Authentication:** Not required (public read-only access)

## Response Format

### Success Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  },
  "timestamp": "2024-10-14T12:00:00.000Z",
  "version": "1.0.0"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description",
  "timestamp": "2024-10-14T12:00:00.000Z",
  "version": "1.0.0"
}
```

## Endpoints

### 1. People API

#### GET /api/people
Get all people with optional filtering.

**Parameters:**
- `query` (string, optional): Search query
- `significance` (string, optional): Filter by significance level (critical, high, medium, low)
- `limit` (number, optional): Number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Example:**
```
GET /api/people?query=epstein&significance=critical&limit=10
```

#### GET /api/people/[id]
Get a specific person by ID.

**Example:**
```
GET /api/people/person_jeffrey_epstein
```

---

### 2. Timeline API

#### GET /api/timeline
Get timeline events with optional filtering.

**Parameters:**
- `query` (string, optional): Search query
- `startDate` (string, optional): Filter by start date (YYYY-MM-DD)
- `endDate` (string, optional): Filter by end date (YYYY-MM-DD)
- `significance` (string, optional): Filter by significance level
- `type` (string, optional): Filter by event type
- `limit` (number, optional): Number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Example:**
```
GET /api/timeline?startDate=2000-01-01&endDate=2020-12-31&significance=critical
```

---

### 3. Financial API

#### GET /api/financial
Get financial transactions with optional filtering.

**Parameters:**
- `query` (string, optional): Search query
- `minAmount` (number, optional): Minimum transaction amount in USD
- `maxAmount` (number, optional): Maximum transaction amount in USD
- `startDate` (string, optional): Filter by start date (YYYY-MM-DD)
- `endDate` (string, optional): Filter by end date (YYYY-MM-DD)
- `suspiciousOnly` (boolean, optional): Show only suspicious transactions
- `fromEntity` (string, optional): Filter by source entity ID
- `toEntity` (string, optional): Filter by target entity ID
- `limit` (number, optional): Number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Response includes statistics:**
```json
{
  "statistics": {
    "totalTransactions": 100,
    "totalValue": 50000000,
    "suspiciousCount": 15,
    "averageAmount": 500000
  }
}
```

**Example:**
```
GET /api/financial?minAmount=1000000&suspiciousOnly=true&limit=20
```

---

### 4. Search API

#### GET /api/search
Universal search across all data types.

**Parameters:**
- `query` (string, **required**): Search query
- `types` (string, optional): Comma-separated list of types (person,event,organization,transaction,document)
- `limit` (number, optional): Number of results (default: 50)

**Example:**
```
GET /api/search?query=manhattan&types=person,event,transaction
```

---

### 5. Organizations API

#### GET /api/organizations
Get all organizations with optional filtering.

**Parameters:**
- `query` (string, optional): Search query
- `type` (string, optional): Filter by organization type
- `limit` (number, optional): Number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Example:**
```
GET /api/organizations?type=corporation&limit=20
```

---

### 6. Documents API

#### GET /api/documents
Get all documents with optional filtering.

**Parameters:**
- `query` (string, optional): Search query
- `type` (string, optional): Filter by document type
- `significance` (string, optional): Filter by significance level
- `limit` (number, optional): Number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Example:**
```
GET /api/documents?type=court_document&significance=critical
```

---

### 7. Relationships API

#### GET /api/relationships
Get all relationships with optional filtering.

**Parameters:**
- `query` (string, optional): Search query
- `type` (string, optional): Filter by relationship type
- `entity` (string, optional): Filter by entity ID (either entity1 or entity2)
- `limit` (number, optional): Number of results (default: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Example:**
```
GET /api/relationships?type=financial&limit=50
```

---

## Rate Limiting

Currently, rate limiting is not enforced, but may be implemented in the future:
- **Limit:** 1000 requests per hour
- **Headers:** Rate limit information will be included in response headers

## CORS

CORS is enabled for all origins:
- **Allowed Origins:** `*`
- **Allowed Methods:** `GET`
- **Note:** Currently read-only API. POST/PUT/DELETE methods are not supported.

## Authentication

Authentication is not currently required for read-only access. Future write operations may require API keys.

## Best Practices

1. **Use Pagination:** Always use `limit` and `offset` parameters for large datasets
2. **Cache Responses:** API responses can be cached for improved performance
3. **Specific Queries:** Use specific search queries and filters to reduce response size
4. **Error Handling:** Always check the `success` field in responses

## Example Usage

### JavaScript/TypeScript
```typescript
// Fetch people
const response = await fetch('/api/people?query=epstein&limit=10');
const data = await response.json();

if (data.success) {
  console.log(data.data); // Array of people
  console.log(data.pagination); // Pagination info
}
```

### Python
```python
import requests

# Search across all types
response = requests.get('/api/search', params={
    'query': 'manhattan',
    'types': 'person,event,transaction',
    'limit': 20
})

data = response.json()
if data['success']:
    for result in data['data']:
        print(f"{result['type']}: {result['title']}")
```

### cURL
```bash
# Get financial transactions
curl "https://yourdomain.com/api/financial?minAmount=1000000&suspiciousOnly=true"

# Search for specific person
curl "https://yourdomain.com/api/people/person_jeffrey_epstein"
```

## Support

For API support, feature requests, or bug reports, please open an issue on the project repository.

## Changelog

### Version 1.0.0 (2024-10-14)
- Initial API release
- Support for people, timeline, financial, organizations, documents, and relationships endpoints
- Universal search endpoint
- Pagination and filtering support
- Comprehensive documentation

