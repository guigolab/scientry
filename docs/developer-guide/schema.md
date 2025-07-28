# Schema Reference

This page provides the complete OpenAPI schema for the SCIENTRY API.

## API Endpoints

Below is a comprehensive list of all API endpoints, grouped by resource/tag. Each entry shows the HTTP method, path, and a short summary.

### Auth
| Method | Path | Summary |
|--------|------|---------|
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |

### Users
| Method | Path | Summary |
|--------|------|---------|
| GET | `/users` | List all users |
| GET | `/users/{name}` | Get user by name |
| GET | `/users/{name}/projects` | Get projects for a user |

### Stats & Lookup
| Method | Path | Summary |
|--------|------|---------|
| GET | `/lookup` | Global lookup |
| GET | `/records/stats/{field}` | Get stats for a record field |
| GET | `/links/stats/{field}` | Get stats for a link field |
| GET | `/projects/{project_id}/models/{model_name}/stats/{field}` | Get stats for a model field |
| GET | `/projects/{project_id}/{model}/stats/{field}` | Get stats for a model in a project |

### Files
| Method | Path | Summary |
|--------|------|---------|
| GET | `/files/{hash}/download` | Download file by hash |
| GET | `/projects/{project_id}/models/{model_name}/files/{type}/download` | Download model files by type |

### Audit
| Method | Path | Summary |
|--------|------|---------|
| GET | `/audit-logs` | Get all audit logs |
| GET | `/projects/{project_id}/audit-logs` | Get audit logs for a project |
| GET | `/audit-logs/{document_type}/{document_id}` | Get audit logs for a document |

### Projects
| Method | Path | Summary |
|--------|------|---------|
| GET | `/projects` | List all projects |
| POST | `/projects` | Create a new project |
| GET | `/projects/{project_id}` | Get project by ID |
| PUT | `/projects/{project_id}` | Update project by ID |
| DELETE | `/projects/{project_id}` | Delete project by ID |
| POST | `/projects/{project_id}/archive` | Archive a project |
| POST | `/projects/{project_id}/unarchive` | Unarchive a project |
| GET | `/projects/{project_id}/schema` | Get project schema |
| GET | `/projects/{project_id}/lookup` | Lookup project data |

### Models
| Method | Path | Summary |
|--------|------|---------|
| GET | `/models` | List all models |
| POST | `/models` | Create a new model |
| GET | `/projects/{project_id}/models` | List models for a project |
| GET | `/projects/{project_id}/models/{model_name}` | Get model by name in project |
| PUT | `/projects/{project_id}/models/{model_name}` | Update model by name in project |
| DELETE | `/projects/{project_id}/models/{model_name}` | Delete model by name in project |
| GET | `/projects/{project_id}/models/{model_name}/related_models_count` | Get related models count |
| PUT | `/projects/{project_id}/models/{model_name}/fields/{field_key}/description` | Edit model field description |
| GET | `/projects/{project_id}/models/{model_name}/lookup` | Lookup model data |

### Records
| Method | Path | Summary |
|--------|------|---------|
| GET | `/records` | List all records |
| POST | `/records` | Create a new record |
| GET | `/projects/{project_id}/models/{model_name}/records` | List records for a model in a project |
| POST | `/projects/{project_id}/models/{model_name}/records/upload` | Upload records via TSV |
| GET | `/projects/{project_id}/models/{model_name}/records/{record_id}` | Get record by ID |
| PUT | `/projects/{project_id}/models/{model_name}/records/{record_id}` | Update record by ID |
| DELETE | `/projects/{project_id}/models/{model_name}/records/{record_id}` | Delete record by ID |
| GET | `/projects/{project_id}/models/{model_name}/records/{record_id}/related_records` | Get related records for a record |

### Links
| Method | Path | Summary |
|--------|------|---------|
| GET | `/links` | List all links |
| POST | `/links` | Create a new link |
| GET | `/projects/{project_id}/models/{model_name}/links` | List links for a model in a project |
| GET | `/projects/{project_id}/models/{model_name}/links/{type}/{name}` | Get a specific link by type and name |

---

## OpenAPI Schemas

The SCIENTRY API follows the OpenAPI 3.0 specification. Below is the complete schema definition:

```yaml
openapi: 3.0.0

info:
  version: "0.0.1"
  title: "LIMS API"
  contact:
    email: "emilio.righi@crg.eu"

tags:
- name: "projects"
- name: "links"
- name: "audit"
- name: "files"
- name: "models"
- name: "records"
- name: "stats"
- name: "users"
- name: "upload"

components:
  schemas:
    Project:
      type: "object"
      properties: 
        name:
          type: "string"
        description:
          type: "string"
        version:
          type: "string"
        archived:
          type: "boolean"
        created_by:
          type: "string"

    Model:
      type: "object"
      properties:
        name:
          type: "string"
        description:
          type: "string"
        reference_model:
          type: "string"
        project_id:
          type: "string"
        inherit_reference_id:
          type: "boolean"
        fields:
          type: "array"
          items:
            $ref: "#/components/schemas/Filter"

    Record:
      type: "object"
      properties:
        item_id:
          type: "string"
        model_name:
          type: "string"
        project_id:
          type: "string"
        reference_id:
          type: "string"
        created_by:
          type: "string"
      additionalProperties:
        oneOf:
          - type: "string"
          - type: "number"
          - type: "string"
            format: "date"
          - type: "array"
            items:
              type: "string"
      description: "Record object with dynamic attributes based on Filter schema. Additional properties can be added where the key is the Field name and the value matches the Field type."

    FileLink:
      type: "object"
      properties:
        name:
          type: "string"
        description:
          type: "string"
        type:
          type: "string"
          enum:
            - "images"
            - "protocols"
            - "analysis"
        created_by:
          type: "string"
        project_id:
          type: "string"
        model_name:
          type: "string"

    Filter:
      type: "object"
      properties:
        key:
          type: "string"
        required:
          type: "boolean"
        multi:
          type: "boolean"
        regex:
          type: "string"
        choices:
          type: "array"
          items:
            type: "string"
        description:
          type: "string"
        type:
          type: "string"
          enum:
            - "text"
            - "number"
            - "date"
            - "select"
```

## Data Types

### Field Types

The following field types are supported in SCIENTRY:

- **text**: String values
- **number**: Numeric values
- **date**: Date values (ISO 8601 format)
- **select**: Choice from predefined options

### Record Dynamic Attributes

Records support dynamic attributes based on the Filter schema. Each additional property in a record must:

1. Have a key that corresponds to a Filter's `key` field
2. Have a value that matches the Filter's `type` field

## Validation Rules

### Required Fields
Fields marked as `required: true` must have values when creating or updating records.

### Multi-Value Fields
Fields with `multi: true` can accept multiple values (arrays).

### Regular Expression Validation
Fields with a `regex` pattern will validate input against that pattern.

### Choice Validation
Fields of type `select` must have values that match one of the predefined `choices`.

## Examples

### Creating a Record with Dynamic Attributes

```json
{
  "item_id": "SAMPLE_001",
  "model_name": "Biosamples",
  "project_id": "PROJ_001",
  "reference_id": "REF_001",
  "created_by": "user123",
  "sample_id": "SAMPLE_001",
  "collection_date": "2024-01-15",
  "temperature": 25.5,
  "location": "Lab A"
}
```

In this example:
- `sample_id` corresponds to a Filter with `key: "sample_id"` and `type: "text"`
- `collection_date` corresponds to a Filter with `key: "collection_date"` and `type: "date"`
- `temperature` corresponds to a Filter with `key: "temperature"` and `type: "number"`
- `location` corresponds to a Filter with `key: "location"` and `type: "text"`

## API Endpoints

For complete API endpoint documentation, see the [API Reference Overview](/developer-guide/api-reference/). 