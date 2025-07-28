# Projects

This page contains detailed information about managing projects in SCIENTRY.

## Overview

Projects are the top-level containers in SCIENTRY that organize your research data. Each project can contain multiple models and has its own access control settings.

### Key Features

- Create and manage project containers
- Set project-level permissions
- Archive completed projects
- Track project versions

## Project Creation and Versioning

When creating a project, the project version is a mandatory attribute that helps you track different iterations of your research work.

### Project Versioning System

SCIENTRY supports project versioning to help you manage different iterations of the same research project. This is particularly useful when you need to:

- Create variations of an existing project
- Maintain different versions for different experiments
- Track project evolution over time
- Share project templates with team members

### Using Existing Projects as Templates

When creating a new project, if you type the name of an existing project, SCIENTRY will detect this and offer you the option to use that project as a template:

1. **Template Detection**: As you type the project name, if it matches an existing project, a card will appear offering to use it as a template
2. **Template Selection**: Click on the template card to automatically populate the new project with:
   - The same description as the original project
   - All models from the original project (with their attributes and configurations)
   - The same access control settings
3. **Version Requirement**: When using a template, you **must** change the version number. This ensures that:
   - Each project version has a unique identifier
   - You can track which version was based on which template
   - The system can distinguish between different iterations

### Version Naming Conventions

While SCIENTRY doesn't enforce a specific versioning scheme, common practices include:

- **Semantic Versioning**: `1.0.0`, `1.1.0`, `2.0.0`
- **Date-based**: `2024.01`, `2024.02`, `2024.03`
- **Experiment-based**: `v1-control`, `v1-treatment`, `v2-optimized`
- **Simple numbering**: `v1`, `v2`, `v3`

### Benefits of Project Versioning

- **Data Integrity**: Each version maintains its own data and configurations
- **Experiment Tracking**: Easily compare results between different project versions
- **Collaboration**: Team members can work on different versions simultaneously
- **Backup and Recovery**: Previous versions serve as backups of your work
- **Template Sharing**: Create standardized project templates for your research group

### Example Workflow

1. **Create Initial Project**: Create "Genetic Analysis Study" with version "1.0.0"
2. **Add Models**: Define Sample, Experiment, and Analysis models
3. **Create New Version**: Use the project as a template to create "Genetic Analysis Study" version "1.1.0"
4. **Modify New Version**: Add new attributes or modify existing models as needed
5. **Compare Results**: Both versions maintain their own data and can be compared

### Important Notes

- **Unique Version Requirement**: You cannot create two projects with the same name and version
- **Independent Data**: Each project version maintains its own records and data
- **Template Inheritance**: When using a template, all models and their configurations are copied, but data is not transferred
- **Access Control**: Each project version can have different access control settings
