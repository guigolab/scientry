# Developer Guide

This guide explains how to interact with the SCIENTRY API to perform CRUD (Create, Read, Update, Delete) operations on projects, models, records, and other resources.

## Authentication

All API requests require authentication. The API uses session-based authentication with CSRF protection.

### Python Example

```python
import requests

def login(base_url, username, password):
    """
    Authenticate with the SCIENTRY API
    
    Args:
        base_url (str): The base URL of the API (e.g., "http://localhost:5000/api")
        username (str): Your username
        password (str): Your password
    
    Returns:
        dict: Session cookies and headers for subsequent requests
    """
    session = requests.Session()
    login_data = {
        "name": username,
        "password": password
    }
    
    response = session.post(f"{base_url}/auth/login", data=login_data)
    
    if response.status_code != 200:
        print(f"Login failed: {response.status_code}")
        print(response.text)
        return None
    
    cookies = session.cookies.get_dict()
    csrf_token = cookies.get('csrf_access_token')
    
    if not csrf_token:
        print("CSRF token not found in cookies")
        return None
    
    headers = {"X-CSRF-TOKEN": csrf_token}
    
    return {
        "cookies": cookies,
        "headers": headers,
        "csrf_token": csrf_token
    }

# Usage example
base_url = "http://localhost:5000/api"
auth_data = login(base_url, "user_name", "user_password")

if not auth_data:
    print("Authentication failed!")

cookies = auth_data["cookies"]
headers = auth_data["headers"]
project_payload = {
    ....
}
#use in CRUD operations
response = requests.post(f"{base_url}/projects",headers=headers, cookies=cookies, data=project_payload)


```

## API Endpoints Overview

The API follows RESTful conventions and is organized around the following main resources:

- **Projects**: Container for research data
- **Models**: Data structure definitions
- **Records**: Actual data entries
- **Links**: File attachments (protocols and images)
- **Users**: User management
- **Audit**: Activity logging

*** For a complete list of possible actions take a look at the code in /server/rest folder ***

## Complete Example

Here's a complete example showing how to create a project, model, and records:

```python
import requests

def main():
    # 1. Login
    base_url = "http://localhost:5000/api"
    auth_data = login(base_url, "biogenome-user", "biogenome-password")
    
    if not auth_data:
        print("Authentication failed!")
        return
    
    cookies = auth_data["cookies"]
    headers = auth_data["headers"]
    
    # 2. Create a project
    project_data = {
        "name": "Genetic Study 2024",
        "description": "Comprehensive genetic analysis project",
        "version": "1.0.0"
    }
    
    project_response = requests.post(
        f"{base_url}/projects",
        json=project_data,
        headers=headers,
        cookies=cookies
    )
    
    if project_response.status_code != 201:
        print(f"Failed to create project: {project_response.text}")
        return
    
    project = project_response.json()
    project_id = project["project_id"]
    print(f"Created project: {project_id}")
    
    # 3. Create a model
    model_data = {
        "name": "Sample",
        "description": "Sample collection model",
        "fields": [
            {
                "key": "sample_id",
                "type": "text",
                "description": "Unique sample identifier",
                "required": True
            },
            {
                "key": "collection_date",
                "type": "date",
                "description": "Date when sample was collected",
                "required": True
            },
            {
                "key": "location",
                "type": "text",
                "description": "Collection location",
                "required": False
            }
        ],
        "id_format": ["sample_id"]
    }
    
    model_response = requests.post(
        f"{base_url}/projects/{project_id}/models",
        json=model_data,
        headers=headers,
        cookies=cookies
    )
    
    if model_response.status_code != 201:
        print(f"Failed to create model: {model_response.text}")
        return
    
    print("Created model: Sample")
    
    # 4. Create records
    records_data = [
        {
            "sample_id": "S001",
            "collection_date": "2024-01-15",
            "location": "Lab A"
        },
        {
            "sample_id": "S002",
            "collection_date": "2024-01-16",
            "location": "Lab B"
        }
    ]
    
    for record_data in records_data:
        record_response = requests.post(
            f"{base_url}/projects/{project_id}/models/Sample/records",
            json=record_data,
            headers=headers,
            cookies=cookies

        )
        
        if record_response.status_code == 201:
            record = record_response.json()
            print(f"Created record: {record['item_id']}")
        else:
            print(f"Failed to create record: {record_response.text}")
    
    # 5. Get all records
    records_response = requests.get(
        f"{base_url}/projects/{project_id}/models/Sample/records"
    )
    
    if records_response.status_code == 200:
        records = records_response.json()
        print(f"Total records: {len(records)}")
        for record in records:
            print(f"  - {record['item_id']}: {record['collection_date']}")

if __name__ == "__main__":
    main()
```
