# Getting Started

Welcome to SCIENTRY! This guide will help you get up and running with the Scientific Entry System.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Git (for cloning the repository)

## Quick Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/lims.git
   cd lims
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## First Steps

### 1. Create Your First Project

1. Log in to SCIENTRY
2. Click "Project Form" in the left sidebar
3. Fill in the project details of the first step:
   - **Name**: Your project name
   - **Description**: Brief description of your research
   - **Version**: Initial version (e.g., "1.0.0")

### 2. Define Your Data Models

1. Navigate to the second step
2. Click the button "Add Model"
3. Define your model main details (model name and description)
4. Define your model attributes:
   - **Name**: Field name (e.g., "Sample ID")
   - **Type**: Choose from text, number, select, or date
   - **Description**: Field description
   - **Required**: Whether the field is mandatory
   ##### Attributes can also be imported from a TSV file
5. Select the record identifiers. This can be a combination of attributes or one single attribute
6. Click on the "Finish" button to add your first model to the project
7. Click on the "Add Model" button to add another model or go to the last step to review and submit your first project

#### Model Relationships

> **Model Linking Overview**
> 
> After creating the first model (source model), you can establish relationships between models by linking them. This enables you to create hierarchical data structures where records in one model can reference records in another model.
> 
> **How Model Linking Works:**
> 
> 1. **Reference Model Selection**: When creating a new model (after the first one), you'll see a "Reference Model" dropdown field that allows you to select an existing model as the source.
> 
> 2. **Relationship Establishment**: By selecting a reference model, you create a relationship where:
>    - The new model becomes a "child" or "dependent" model
>    - The selected model becomes the "parent" or "source" model
>    - Records in the new model can reference records in the source model
> 
> 3. **Record Identifier Inheritance**: When a reference model is selected, you'll see a checkbox option:
>    - **"Inherit [source_model_id] at the beginning of the [new_model] records identifiers"**
>    - When enabled, this means that the ID of the source model will be inherited and prefixed to the new model's record identifiers
>    - For example: If source model "Sample" has ID "S001" and new model "Experiment" has ID "E001", the final identifier becomes "S001_E001"
> 
> **Benefits of Model Linking:**
> 
> - **Data Integrity**: Ensures that records in dependent models reference valid records in source models
> - **Hierarchical Organization**: Creates logical data hierarchies (e.g., Sample → Experiment → Analysis)
> - **Identifier Consistency**: Inherited IDs maintain traceability across related records
> - **Data Validation**: The system validates that referenced records exist before allowing creation of dependent records
> 
> **Example Workflow:**
> 1. Create "Sample" model with ID field "Sample_ID"
> 2. Create "Experiment" model and select "Sample" as reference model
> 3. Enable ID inheritance checkbox
> 4. When creating an experiment record, you must provide a valid sample ID
> 5. The experiment record ID will be: "Sample_ID_Experiment_ID"

### 3. Add Your First Records

1. Go to Projects and select the project you have created
2. Go to the Records tab in your model
3. Click "Add Record"
4. Fill in the data according to your model's attributes
5. Save the record

#### Importing from TSV
> Records can also be imported from existing TSV files: 
>
>1. Click on the "Import TSV" button
>2. Map the TSV columns to the Model attributes 
>3. Select the columns related to the records of the source model if any.

## Core Concepts 

### Projects
Projects are containers that organize your research data. Each project can contain multiple models and has its own access control settings.

### Models
Models are like spreadsheets that define the structure of your data. They contain:
- **Attributes**: The columns/fields of your data
- **Records**: The actual data rows
- **Validation rules**: Based on attribute types
- **Protocols**: Protocols files (docx, pdf, txt or any format) related to your model
- **Images**: Images files (any format) related to model 

### Records
Records are individual data entries that follow the structure defined by your model. Each record can have:
- Standard fields (item_id, model_name, reference_id, created_by, project_id)
- Dynamic attributes based on your model's field definitions

### Access Control
SCIENTRY supports four user roles:
- **Admin**: Full system access
- **Project Manager**: Full access within assigned projects, can create new projects
- **Data Manager**: Create/update data for assigned projects
- **Researcher**: Read-only access

## Next Steps

- Read the [User Guide](/user-guide/) for detailed usage instructions
- Check the [API Reference](/api-reference/) for integration options
- Learn about [Deployment](/deployment) for production setup

## Need Help?

- Check the [User Guide](/user-guide/) for detailed documentation
- Review the [API Reference](/api-reference/) for technical details
- Contact: emilio.righi@crg.eu 