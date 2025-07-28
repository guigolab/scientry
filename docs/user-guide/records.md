# Records

This page contains detailed information about managing records in SCIENTRY.

## Overview

Records are the actual data entries in SCIENTRY that follow the structure defined by your models. Each record contains values for the attributes defined in its model and can be linked to records in other models through reference relationships.

### Key Features

- Create and manage data records
- Import records from TSV files
- Edit records inline
- Filter and search records
- Generate charts and visualizations
- Export records to various formats
- Link records across models

## Understanding Records

### Record Structure

Each record in SCIENTRY contains:

1. **System Fields** (automatically managed):
   - **item_id**: Unique identifier for the record
   - **model_name**: The model this record belongs to
   - **project_id**: The project containing this record
   - **reference_id**: Link to a parent record (if applicable)
   - **created_by**: User who created the record
   - **created**: Timestamp of creation

2. **Dynamic Fields** (defined by your model):
   - All the attributes you defined in your model
   - Values that match the field types (text, number, date, select)

### Record Relationships

Records can be linked together through model relationships:

#### Parent-Child Relationships

When a model references another model, records in the child model can link to records in the parent model:

- **Reference Field**: The `reference_id` field contains the `item_id` of the parent record
- **Validation**: The system ensures the referenced record exists
- **Inheritance**: If ID inheritance is enabled, the child record's ID includes the parent's ID

#### Example Relationship

```
Sample Model (Parent):
- item_id: "S001"
- sample_name: "Blood Sample A"
- collection_date: "2024-01-15"

Experiment Model (Child):
- item_id: "S001_E001"  (inherited from Sample)
- reference_id: "S001"  (links to Sample record)
- experiment_type: "PCR"
- temperature: 25.5
```

### Record Identifiers

Record identifiers are constructed based on your model's ID format:

- **Single Field**: If your model uses one field for ID (e.g., "sample_id")
- **Multiple Fields**: If your model combines multiple fields (e.g., "sample_id" + "collection_date")
- **Inherited IDs**: If the model references another model with ID inheritance enabled

## Creating Records

### Manual Record Creation

1. **Navigate to Records**: Go to your model's Records tab
2. **Add Record**: Click the "Add Record" button
3. **Fill Fields**: Enter values for all required fields and any optional fields
4. **Reference Validation**: If the model references another model:
   - Enter a valid `reference_id` that exists in the parent model
   - The system will validate the reference before saving
5. **Save**: Click "Save" to create the record

### Required vs Optional Fields

- **Required Fields**: Must have values
- **Optional Fields**: Can be left empty
- **ID Fields**: Fields used in the record identifier are automatically required

### Reference Field Handling

When creating records in a model that references another model:

1. **Reference Required**: You must provide a valid `reference_id`
2. **Validation**: The system checks that the referenced record exists
3. **Auto-completion**: The interface may suggest existing reference IDs
4. **Error Handling**: Invalid references will show an error message

## Importing Records from TSV

### TSV File Format

TSV (Tab-Separated Values) files are a convenient way to import multiple records at once.

#### File Requirements

- **Format**: Tab-separated values (not comma-separated)
- **Headers**: First row should contain column names, column names must be mapped to the model's attribute definition, use the auto-assign button for faster mapping
- **Encoding**: UTF-8 encoding recommended

#### Example TSV File

```
sample_id	collection_date	location	temperature	notes
S001	2024-01-15	Lab A	25.5	First batch
S002	2024-01-16	Lab B	24.8	Second batch
S003	2024-01-17	Lab A	26.1	Third batch
```

### Import Process

1. **Prepare File**: Create your TSV file with headers matching model fields
2. **Upload**: Click "Import TSV" in the Records tab
3. **File Selection**: Choose your TSV file
4. **Column Mapping**: Map TSV columns to model fields:
   - **Auto-mapping**: System attempts to match column names to field names
   - **Manual mapping**: You can manually select which column maps to which field
   - **Skip columns**: You can skip columns that don't correspond to model fields
5. **Reference Mapping**: If your model references another model:
   - Map the reference column to the appropriate parent model field
   - Ensure reference values exist in the parent model
6. **Validation**: System validates data before import
7. **Import**: Click "Import" to create the records

### Import Validation

The system validates imported data for:

- **Required Fields**: All required fields must have values
- **Data Types**: Values must match field types (text, number, date)
- **References**: Reference IDs must exist in parent models
- **Unique IDs**: Record identifiers must be unique
- **Format**: Date fields must be in correct format

### Import Results

After import, you'll see:

- **Success Count**: Number of records successfully imported
- **Error Count**: Number of records that failed to import
- **Error Details**: Specific errors for failed records
- **Preview**: Option to review imported records

## Editing Records

### Inline Editing

SCIENTRY supports inline editing for quick record updates:

1. **Enter Edit Mode**: Click the edit icon next to a record
2. **Make Changes**: Modify field values directly in the table
3. **Save Changes**: Click the save icon or press Enter
4. **Cancel**: Click the cancel icon to discard changes

## Filtering and Searching Records

### Filter Options

SCIENTRY provides multiple ways to filter records:

#### Text Filters
- **Contains**: Records containing specific text
- **Starts with**: Records starting with specific text
- **Ends with**: Records ending with specific text
- **Exact match**: Records exactly matching the text

#### Number Filters
- **Equals**: Records with exact number value
- **Greater than**: Records with values above threshold
- **Less than**: Records with values below threshold
- **Range**: Records within a value range

#### Date Filters
- **On date**: Records created on specific date
- **Before date**: Records created before date
- **After date**: Records created after date
- **Date range**: Records within date range

#### Reference Filters
- **Has reference**: Records that reference a specific parent record
- **No reference**: Records without any reference
- **Reference type**: Records referencing specific types of parent records

### Advanced Filtering

#### Multiple Filters
- **Combine filters**: Use multiple filters simultaneously
- **AND logic**: All filters must be true for a record to be shown
- **OR logic**: Any filter can be true for a record to be shown

#### Filter Presets
- **Save filters**: Save commonly used filter combinations
- **Quick access**: Access saved filters from dropdown
- **Share filters**: Share filter presets with team members

### Search Functionality

#### Field-Specific Search
- **Search specific fields**: Focus search on particular fields
- **Exact matching**: Search for exact field values
- **Pattern matching**: Use wildcards and patterns

## Charts and Visualizations

### Available Chart Types

SCIENTRY supports various chart types for data visualization:

#### Bar Charts
- **Horizontal bars**: Compare values with long category names

#### Line Charts
- **Time series**: Track changes over time

#### Pie Charts
- **Proportions**: Show parts of a whole
- **Percentages**: Display percentage distributions
- **Categories**: Compare categorical data

#### Doughnut Charts
- **Similar to pie**: Show proportions with center space
- **Multiple rings**: Show hierarchical data

### Creating Charts

1. **Select Data**: Choose the records and fields for your chart
2. **Chart Type**: Select the appropriate chart type
4. **Filters**: Apply filters to focus on specific data
5. **Generate**: Create and display the chart

### Interactive Features

#### Chart Interactions
- **Hover details**: See detailed information on hover
- **Click actions**: Click on chart elements for more details
- **Zoom**: Zoom in on specific chart areas
- **Pan**: Navigate around large charts

#### Export Options
- **Image export**: Save charts as PNG, JPG, or SVG
- **Data export**: Export chart data as CSV or TSV
- **Embed**: Get embed codes for external use

## Record Management

### Record Operations

#### Viewing Records
- **Table view**: View records in a sortable table
- **Card view**: View records as individual cards
- **Detail view**: View complete record information
- **Related records**: View records linked to the current record

#### Record Actions
- **Edit**: Modify record values
- **Delete**: Remove records (with confirmation)
- **Duplicate**: Create a copy of a record
- **Export**: Export individual records

### Data Export

#### Export Formats
- **TSV**: Tab-separated values for spreadsheet applications


#### Export Options
- **All records**: Export all records in the model
- **Filtered records**: Export only filtered records
- **Field selection**: Choose which fields to include

### Record History

#### Audit Trail
- **Creation**: Track when and by whom records were created
- **Modifications**: Track all changes to records
- **Deletions**: Track record deletions

## Best Practices

### Data Entry
- **Consistency**: Use consistent formats for similar data
- **Validation**: Check data before saving
- **Documentation**: Add notes for unusual values
- **Backup**: Export important data regularly

### Importing Data
- **Clean data**: Ensure data is clean before import
- **Test imports**: Test with small datasets first
- **Backup**: Backup existing data before large imports
- **Validation**: Review import results carefully

### Filtering and Analysis
- **Start broad**: Begin with broad filters and narrow down
- **Save filters**: Save useful filter combinations
- **Document analysis**: Keep notes on analysis steps
- **Share insights**: Share findings with team members

### Chart Creation
- **Choose appropriate type**: Select chart type based on data and goals
- **Simplify**: Keep charts simple and focused
- **Label clearly**: Use clear, descriptive labels
- **Test interactions**: Verify chart interactions work as expected

## Troubleshooting

### Common Issues

#### Import Problems
- **Encoding issues**: Ensure files are UTF-8 encoded
- **Format problems**: Check that files are tab-separated
- **Missing fields**: Ensure all required fields are present
- **Invalid references**: Verify reference IDs exist in parent models

#### Editing Issues
- **Cannot edit field**: Check if field is read-only or part of ID
- **Validation errors**: Review field requirements and data types
- **Reference errors**: Ensure referenced records exist

#### Filter Problems
- **No results**: Check filter criteria and data
- **Slow performance**: Use more specific filters
- **Unexpected results**: Review filter logic and combinations

### Getting Help

If you encounter issues with records:

1. **Check documentation**: Review field requirements and data types
2. **Validate data**: Ensure data meets model requirements
3. **Test with small datasets**: Use small datasets for testing
4. **Contact support**: Reach out to your system administrator

## Summary

Records are the core data elements in SCIENTRY. Understanding how to create, edit, filter, and visualize records effectively will help you manage your research data efficiently. Always validate your data and use appropriate tools for your specific needs.
