# API Reference

Welcome to the SCIENTRY API Reference! This documentation provides comprehensive information about the REST API endpoints, authentication, and data structures.

## Overview

The SCIENTRY API is a RESTful API that allows you to programmatically interact with the Scientific Entry System. It provides endpoints for managing projects, models, records, users, and files.

## Base URL

```
http://localhost:5000/api
```

For production deployments, replace `localhost:5000` with your server's domain.

## Authentication

Most API endpoints require authentication. SCIENTRY uses token-based authentication.
Refer to the [developer guide](/developer-guide) for more details

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Models
- `GET /api/models` - List all models
- `POST /api/projects/{id}/models` - Create a new model
- `GET /api/projects/{id}/models/{model_name}` - Get model details
- `PUT /api/projects/{id}/models/{model_name}` - Update model
- `DELETE /api/projects/{id}/models/{model_name}` - Delete model

### Records
- `GET /api/records` - List all records
- `POST /api/projects/{id}/models/<model_name>/records` - Create a new record
- `GET /api/projects/{id}/models/<model_name>/records/{record_id}` - Get record details
- `PUT /api/projects/{id}/models/<model_name>records/{record_id}` - Update record
- `DELETE /api/projects/{id}/models/<model_name>/records/{record_id}` - Delete record

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Upload
- `POST /api/projects/{id}/models/{model_name}/records` -Upload TSV file containing records

### Files
- `GET /api/files` - List files
- `POST /api/files` - Upload a file
- `GET /api/files/{id}` - Download a file
- `DELETE /api/files/{id}` - Delete a file

## Data Models

### Project
```json
{
  "name": "string",
  "description": "string",
  "version": "string",
  "archived": "boolean",
  "created_by": "string"
}
```

### Model
```json
{
  "name": "string",
  "description": "string",
  "reference_model": "string",
  "project_id": "string",
  "inherit_reference_id": "boolean",
  "fields": [
    {
      "name": "string",
      "description": "string",
      "type": "string",
      "required": "boolean",
      "choices": ["string"]
    }
  ]
}
```

### Record
```json
{
  "item_id": "string",
  "model_name": "string",
  "project_id": "string",
  "reference_id": "string",
  "created_by": "string",
  "additional_properties": "object"
}
```

## Pagination

List endpoints support pagination with the following parameters:

- `offset` - Number of records to skip (default: 0)
- `limit` - Number of records to return (default: 20)

Response format:
```json
{
  "data": [...],
  "total": 100
}
```
## API Reference Sections

### [Schema Reference](/developer-guide/schema)
Full OpenAPI schema documentation.

### [Developer Guide](/developer-guide)
Guide on how to programmatically interact with the API

## Support

For API support and questions:
- Email: emilio.righi@crg.eu
- Check the [User Guide](/user-guide/) for general usage
- Review the [Schema Reference](/api-reference/schema) for detailed data structures 