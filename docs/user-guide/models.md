# Models

This page contains detailed information about managing models in SCIENTRY.

## Overview

Models are the data structure definitions in SCIENTRY that define how your research data is organized. Each model contains attributes (fields) that define the structure of your records, and can be linked to other models to create hierarchical relationships.

### Key Features

- Create and manage data structure definitions
- Define attributes with different data types
- Link models to create hierarchical relationships
- Edit models in controlled or override modes
- Clone models for reuse
- Import/export model definitions

## Model Creation

### Basic Model Structure

When creating a model, you need to define:

1. **Model Information**:
   - **Name**: Unique identifier for the model within the project
   - **Description**: Detailed description of what the model represents

2. **Attributes (Fields)**:
   - **Key**: Field name (e.g., "sample_id", "collection_date")
   - **Type**: Data type (text, number, date, select)
   - **Description**: Field description
   - **Required**: Whether the field is mandatory

3. **Record Identifiers**:
   - Combination of attributes that uniquely identify each record
   - Can be a single attribute or multiple attributes combined

### Attribute Types

SCIENTRY supports several attribute types:

- **Text**: Free-form text input
- **Number**: Numeric values (integers or decimals)
- **Date**: Date values with calendar picker
- **Select**: Dropdown with predefined options

## Model Relationships and Referencing

### Understanding Model References

Models can be linked together to create hierarchical relationships where one model references another. This is useful for creating structured data hierarchies like:

- **Sample → Experiment → Analysis**
- **Patient → Visit → Test**
- **Project → Task → Result**

### How Model Referencing Works

1. **Reference Model Selection**: When creating a new model (after the first one), you can select an existing model as a reference
2. **Relationship Establishment**: This creates a parent-child relationship where:
   - The selected model becomes the "source" or "parent" model
   - The new model becomes the "dependent" or "child" model
3. **Data Validation**: Records in the child model must reference valid and existing records in the parent model

### Record Identifier Inheritance

When a reference model is selected, you have the option to inherit the parent model's identifier:

- **Checkbox Option**: "Inherit [source_model_id] at the beginning of the [new_model] records identifiers"
- **Effect**: The parent model's ID becomes a prefix in the child model's record identifiers
- **Example**: If parent model "Sample" has ID "S001" and child model "Experiment" has ID "E001", the final identifier becomes "S001_E001"

### Benefits of Model Referencing

- **Data Integrity**: Ensures records reference valid parent records
- **Hierarchical Organization**: Creates logical data structures
- **Traceability**: Maintains relationships between related data
- **Validation**: System validates references before allowing record creation

## Model Editing

Once a model is created, you can edit it in two different modes, each with different capabilities and restrictions.

### Controlled Edit Mode

**Purpose**: Safe editing that preserves data integrity and existing relationships.

**What You Can Edit**:
- Model name
- Model description
- Field descriptions

**What You Cannot Edit**:
- Field names (keys)
- Field types
- Record identifier structure
- Reference model relationships

**When to Use**:
- Adding documentation to existing fields
- Changing the model name
- Adding new optional fields
- Updating field descriptions
- When the model has existing data or is referenced by other models

**Safety Level**: ⭐⭐⭐⭐⭐ (Very Safe)

### Override Edit Mode

**Purpose**: Full model editing with complete control over all aspects.

**What You Can Edit**:
- Everything in controlled mode, plus:
- Field names (keys)
- Field types
- Field order
- Record identifier structure
- Reference model relationships
- Remove existing fields

**Risks and Dangers**:
- **Broken References**: Changing field names can break existing data references
- **Data Loss**: Removing fields can result in data loss
- **Broken Links**: Changing model structure can break relationships with other models
- **Invalid Data**: Existing records may become invalid if required fields are removed

**When to Use**:
- Early in development before data is added
- When you're certain no other models depend on this one
- When you're willing to accept potential data loss
- For major structural changes

**Safety Level**: ⭐⭐ (Use with Extreme Caution)

### Switching Between Edit Modes

1. **Access Model**: Navigate to the model you want to edit
2. **Edit Options**: Click the edit button to see available modes
3. **Mode Selection**:
   - **Controlled**: Available if the model has dependencies or data
   - **Override**: Available if you have sufficient permissions and understand the risks
4. **Confirmation**: Override mode will show warnings about potential data loss

### Edit Mode Indicators

The interface provides clear indicators about which mode you're using:

- **Controlled Mode**: Shows warning about restricted editing capabilities
- **Override Mode**: Shows prominent warnings about potential data loss and broken references

## Model Cloning

### What is Model Cloning?

Model cloning allows you to create a copy of an existing model with all its structure and configuration, but without the data.

### What Gets Cloned

- **Model structure**: All fields and their configurations
- **Field definitions**: Names, types, descriptions, validation rules
- **Record identifier structure**: ID format and field combinations
- **Reference model relationships**: Links to parent models

### What Does NOT Get Cloned

- **Data**: No records are copied to the cloned model
- **Model name**: The cloned model gets a new name (original name + "_copy")
- **Project association**: The cloned model is created in the same project

### When to Use Model Cloning

- **Template Creation**: Create reusable model templates
- **Experiment Variations**: Create variations of existing models for different experiments
- **Testing**: Test model changes without affecting the original
- **Collaboration**: Share model structures with team members

### Cloning Process

1. **Select Model**: Choose the model you want to clone
2. **Clone Action**: Click the clone button
3. **Review**: The system shows what will be cloned
4. **Confirm**: Confirm the cloning operation
5. **Edit**: The cloned model opens in edit mode for customization

### Post-Cloning Steps

After cloning, you should:

1. **Rename**: Give the cloned model a meaningful name
2. **Review**: Check all field definitions and relationships
3. **Customize**: Modify fields, descriptions, or structure as needed
4. **Test**: Create test records to verify the model works as expected

## Best Practices

### Model Design

- **Clear Naming**: Use descriptive, consistent names for models and fields
- **Documentation**: Provide detailed descriptions for models and fields
- **Validation**: Use appropriate field types and validation rules
- **Relationships**: Plan model relationships carefully before implementation

### Editing Models

- **Start with Controlled**: Always try controlled editing first
- **Backup Data**: Export data before making major changes
- **Test Changes**: Create test records to verify changes work correctly
- **Communicate**: Inform team members about model changes

### Versioning Strategy

- **Use Cloning**: Clone models for major changes instead of editing existing ones
- **Document Changes**: Keep track of model evolution
- **Gradual Updates**: Make small, incremental changes rather than large overhauls

## Common Scenarios

### Scenario 1: Adding Documentation

**Situation**: You want to add better descriptions to existing fields
**Solution**: Use controlled edit mode to update field descriptions

### Scenario 2: Adding New Fields

**Situation**: You need to add new optional fields to an existing model
**Solution**: Use controlled edit mode to add fields at the end

### Scenario 3: Major Restructure

**Situation**: You need to completely restructure a model
**Solution**: Clone the model, make changes, and migrate data if needed

### Scenario 4: Creating Similar Models

**Situation**: You need multiple similar models for different experiments
**Solution**: Create one model, then clone it for each experiment

## Troubleshooting

### Common Issues

**"Cannot edit in controlled mode"**
- The model has dependencies or data that prevent controlled editing
- Consider using override mode or cloning the model

**"Field changes will break references"**
- Changing field names can break existing data relationships
- Review all dependencies before proceeding

**"Cannot delete field with data"**
- Fields containing data cannot be deleted in controlled mode
- Use override mode or export data first

### Getting Help

If you encounter issues with model editing:

1. **Check Dependencies**: Review what other models reference this one
2. **Export Data**: Backup your data before making changes
3. **Use Cloning**: Clone the model instead of editing if unsure
4. **Contact Support**: Reach out to your system administrator

## Summary

Models are the foundation of your data structure in SCIENTRY. Understanding how to create, edit, and manage models effectively will help you build robust research data management systems. Always consider the impact of your changes on existing data and relationships, and use the appropriate editing mode for your needs.
