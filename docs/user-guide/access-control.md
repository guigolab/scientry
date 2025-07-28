# Access Control

This page contains detailed information about user roles, permissions, and access control in SCIENTRY.

## Overview

SCIENTRY implements a role-based access control system that ensures users can only access and modify data according to their assigned permissions. This system helps maintain data security and integrity while enabling effective collaboration.

### Key Features

- Role-based access control
- Project-level permissions
- User management capabilities
- Secure data access
- Audit trail for all actions

## User Roles and Permissions

SCIENTRY supports four distinct user roles, each with specific permissions and capabilities:

### Admin Role

**Highest level of access and control**

#### Permissions
- **Full System Access**: Access to all projects and data
- **User Management**: Create, edit, and delete all user accounts
- **Project Management**: Create, edit, and delete all projects
- **System Administration**: Configure system settings
- **Audit Access**: View all audit logs and system activities

#### Use Cases
- System administrators
- IT support personnel
- Organization leaders who need full oversight

### Project Manager Role

**Manages specific projects and can create users**

#### Permissions
- **Project Creation**: Create new projects
- **User Management**: Create and manage Data Manager and Researcher users
- **Project Assignment**: Assign users to their managed projects
- **Full Project Access**: Complete control over assigned projects
- **Data Management**: Create, edit, and delete all data in assigned projects
- **Model Management**: Create, edit, and delete models in assigned projects

#### User Creation Capabilities
Project Managers can create two types of users:
- **Data Managers**: Users who can manage data within projects
- **Researchers**: Users with read-only access to projects

#### Use Cases
- Principal investigators
- Research team leaders
- Project coordinators
- Lab managers

### Data Manager Role

**Manages data within assigned projects**

#### Permissions
- **Data Management**: Create, edit, and delete records in assigned projects
- **Model Management**: Create, edit, and delete models in assigned projects
- **File Management**: Upload, edit, and delete protocols and images
- **Read Access**: View all data in assigned projects
- **Export Capabilities**: Export data from assigned projects

#### Restrictions
- **No User Management**: Cannot create or manage other users
- **No Project Creation**: Cannot create new projects
- **Limited Project Access**: Only access to specifically assigned projects

#### Use Cases
- Research assistants
- Data entry personnel
- Lab technicians
- Research coordinators

### Researcher Role

**Read-only access to assigned projects**

#### Permissions
- **Read Access**: View all data in assigned projects
- **Export Capabilities**: Export data from assigned projects
- **Chart Generation**: Create charts and visualizations
- **Search and Filter**: Use all search and filtering capabilities

#### Restrictions
- **No Data Modification**: Cannot create, edit, or delete records
- **No Model Changes**: Cannot modify model structures
- **No File Upload**: Cannot upload protocols or images
- **No User Management**: Cannot create or manage other users
- **No Project Creation**: Cannot create new projects

#### Use Cases
- Research collaborators
- Data analysts
- External researchers
- Students and trainees

## User Management

### Creating Users

#### Who Can Create Users

1. **Admin Users**: Can create all types of users (Admin, Project Manager, Data Manager, Researcher)
2. **Project Manager Users**: Can create Data Manager and Researcher users only

#### User Creation Process

1. **Access User Management**: Navigate to the Users page
2. **Create New User**: Click "Create User" or "Add User" button
3. **Fill User Details**:
   - **Username**: Unique identifier for the user
   - **Role**: Select appropriate role (Admin, Project Manager, Data Manager, or Researcher)
   - **Password**: Set initial password (user may be required to change on first login)
   - **Projects (Optional)**: Assign projects to the user (disabled when role Admin is selected)
4. **Save User**: Confirm user creation

#### Role Assignment Guidelines

When creating users, consider these guidelines:

- **Admin**: Only for system administrators and IT personnel
- **Project Manager**: For research team leaders and project coordinators
- **Data Manager**: For users who need to manage data and models
- **Researcher**: For users who only need to view and analyze data

### Project Assignment

#### Project Manager Capabilities

Project Managers can:
- **Assign Users**: Add Data Managers and Researchers to their projects
- **Remove Users**: Remove users from their projects
- **Modify Access**: Change user access levels within their projects
- **Manage Permissions**: Control what users can do within their projects

## Access Control in Practice

### Project-Level Access

#### How Project Access Works
- **Project Assignment**: Users are explicitly assigned to specific projects
- **Access Scope**: Users can only see and work with their assigned projects
- **Data Isolation**: Data from unassigned projects is completely hidden
- **Permission Inheritance**: Project-level permissions apply to all data within the project

#### Managing Project Access
1. **Add Users**: Assign new users to projects
2. **Remove Users**: Remove users from projects when no longer needed
3. **Modify Permissions**: Change user roles within projects
4. **Audit Access**: Review who has access to which projects

## Best Practices

### User Management

#### Creating Users
- **Principle of Least Privilege**: Give users only the permissions they need
- **Regular Review**: Periodically review user access and permissions
- **Documentation**: Keep records of user assignments and permissions
- **Training**: Ensure users understand their roles and responsibilities

#### Role Assignment
- **Clear Roles**: Define clear roles and responsibilities
- **Consistent Assignment**: Use consistent role assignment across projects
- **Regular Updates**: Update roles as user responsibilities change
- **Access Reviews**: Regular reviews of user access and permissions

### Security Practices

#### Password Management
- **Strong Passwords**: Enforce strong password policies
- **Regular Changes**: Require periodic password changes
- **Secure Storage**: Passwords are securely stored and encrypted
- **Recovery Process**: Clear process for password recovery

#### Access Control
- **Regular Audits**: Regular audits of user access and permissions
- **Immediate Removal**: Remove access when users leave or change roles
- **Documentation**: Document all access control decisions
- **Training**: Train users on security best practices

### Project Management

#### Project Assignment
- **Clear Ownership**: Clearly define project ownership and responsibility
- **Regular Review**: Regularly review project assignments
- **Access Documentation**: Document who has access to each project
- **Change Management**: Clear process for changing project access

### Getting Help

If you encounter access control issues:

1. **Check Permissions**: Verify your current role and permissions
2. **Review Assignments**: Check your project assignments
3. **Contact Project Manager**: Reach out to your project manager for access
4. **System Administrator**: Contact system administrator for technical issues

## Summary

SCIENTRY's access control system provides secure, role-based access to research data while enabling effective collaboration. Understanding your role and permissions will help you work effectively within the system while maintaining data security and integrity.

Always follow security best practices and contact your system administrator or project manager if you need assistance with access control issues.
