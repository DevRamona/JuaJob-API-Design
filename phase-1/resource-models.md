# Phase 1: Resource Modeling

## 1. Resource Identification & Analysis

### Core Resources

#### 1.1 User
**Business Context**: Represents all platform participants (clients, workers, admins)
**Justification**: Essential for authentication, authorization, and user management
**Lifecycle**: Created during registration, updated throughout user activity, archived when inactive

#### 1.2 Worker Profile
**Business Context**: Detailed professional information for service providers
**Justification**: Enables clients to evaluate worker qualifications and experience
**Lifecycle**: Created after user registration, updated as worker gains experience

#### 1.3 Job Posting
**Business Context**: Service requests from clients
**Justification**: Core business entity that drives the platform's purpose
**Lifecycle**: Created by clients, progresses through various states until completion

#### 1.4 Application
**Business Context**: Worker's response to job postings
**Justification**: Facilitates the matching process between workers and jobs
**Lifecycle**: Created when worker applies, updated through the selection process

#### 1.5 Review
**Business Context**: Feedback mechanism for completed jobs
**Justification**: Builds trust and reputation in the platform
**Lifecycle**: Created after job completion, immutable once published

#### 1.6 Payment
**Business Context**: Financial transactions for services
**Justification**: Enables secure and traceable monetary exchanges
**Lifecycle**: Created when payment initiated, updated through payment process

### Additional Resources

#### 1.7 Skill
**Business Context**: Categorization of worker expertise
**Justification**: Enables better job matching and search functionality
**Lifecycle**: Created by system, updated by admins, referenced by workers

#### 1.8 Category
**Business Context**: Classification of job types
**Justification**: Organizes platform content and improves discoverability
**Lifecycle**: Created by system, updated by admins, referenced by jobs

#### 1.9 Availability
**Business Context**: Worker's schedule and availability
**Justification**: Enables better scheduling and job matching
**Lifecycle**: Created with worker profile, updated regularly by worker

## 2. Resource Attribute Design

### 2.1 User Resource
json
{
    "id": {
        "type": "UUID",
        "required": true,
        "systemGenerated": true
    },
    "email": {
        "type": "String",
        "required": true,
        "validation": "email format"
    },
    "phoneNumber": {
        "type": "String",
        "required": true,
        "validation": "phone format"
    },
    "firstName": {
        "type": "String",
        "required": true,
        "validation": "min:2, max:50"
    },
    "lastName": {
        "type": "String",
        "required": true,
        "validation": "min:2, max:50"
    },
    "role": {
        "type": "Enum",
        "required": true,
        "values": ["CLIENT", "WORKER", "ADMIN"]
    },
    "status": {
        "type": "Enum",
        "required": true,
        "systemGenerated": true,
        "values": ["ACTIVE", "INACTIVE", "SUSPENDED"]
    },
    "createdAt": {
        "type": "DateTime",
        "required": true,
        "systemGenerated": true
    },
    "updatedAt": {
        "type": "DateTime",
        "required": true,
        "systemGenerated": true
    }
}

### 2.2 Worker Profile Resource
json
{
    "id": {
        "type": "UUID",
        "required": true,
        "systemGenerated": true
    },
    "userId": {
        "type": "UUID",
        "required": true,
        "foreignKey": "User.id"
    },
    "title": {
        "type": "String",
        "required": true,
        "validation": "min:5, max:100"
    },
    "bio": {
        "type": "String",
        "required": false,
        "validation": "max:1000"
    },
    "hourlyRate": {
        "type": "Decimal",
        "required": true,
        "validation": "min:0"
    },
    "skills": {
        "type": "String[]",
        "required": true,
        "validation": "min:1"
    },
    "verificationStatus": {
        "type": "Enum",
        "required": true,
        "systemGenerated": true,
        "values": ["PENDING", "VERIFIED", "REJECTED"]
    },
    "rating": {
        "type": "Decimal",
        "required": true,
        "computed": true,
        "validation": "min:0, max:5"
    },
    "completedJobs": {
        "type": "Integer",
        "required": true,
        "computed": true,
        "validation": "min:0"
    }
}

### 2.3 Job Posting Resource
json
{
    "id": {
        "type": "UUID",
        "required": true,
        "systemGenerated": true
    },
    "clientId": {
        "type": "UUID",
        "required": true,
        "foreignKey": "User.id"
    },
    "title": {
        "type": "String",
        "required": true,
        "validation": "min:10, max:200"
    },
    "description": {
        "type": "String",
        "required": true,
        "validation": "min:50, max:5000"
    },
    "category": {
        "type": "String",
        "required": true,
        "validation": "exists in categories"
    },
    "subCategory": {
        "type": "String",
        "required": false,
        "validation": "exists in subcategories"
    },
    "budget": {
        "type": "Object",
        "required": true,
        "properties": {
            "amount": {
                "type": "Decimal",
                "required": true,
                "validation": "min:0"
            },
            "currency": {
                "type": "String",
                "required": true,
                "validation": "supported currency"
            },
            "type": {
                "type": "Enum",
                "required": true,
                "values": ["FIXED", "HOURLY"]
            }
        }
    },
    "location": {
        "type": "Object",
        "required": true,
        "properties": {
            "type": {
                "type": "Enum",
                "required": true,
                "values": ["REMOTE", "ONSITE", "HYBRID"]
            },
            "address": {
                "type": "String",
                "required": true
            },
            "coordinates": {
                "type": "Object",
                "required": false,
                "properties": {
                    "latitude": {
                        "type": "Decimal",
                        "required": true
                    },
                    "longitude": {
                        "type": "Decimal",
                        "required": true
                    }
                }
            }
        }
    },
    "requiredSkills": {
        "type": "String[]",
        "required": true,
        "validation": "min:1"
    },
    "status": {
        "type": "Enum",
        "required": true,
        "systemGenerated": true,
        "values": ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
    },
    "deadline": {
        "type": "DateTime",
        "required": true,
        "validation": "future date"
    },
    "createdAt": {
        "type": "DateTime",
        "required": true,
        "systemGenerated": true
    },
    "updatedAt": {
        "type": "DateTime",
        "required": true,
        "systemGenerated": true
    }
}

### 2.4 Application Resource
json
{
    "id": {
        "type": "UUID",
        "required": true,
        "systemGenerated": true
    },
    "jobId": {
        "type": "UUID",
        "required": true,
        "foreignKey": "JobPosting.id"
    },
    "workerId": {
        "type": "UUID",
        "required": true,
        "foreignKey": "User.id"
    },
    "proposal": {
        "type": "String",
        "required": true,
        "validation": "min:100, max:2000"
    },
    "bidAmount": {
        "type": "Object",
        "required": true,
        "properties": {
            "amount": {
                "type": "Decimal",
                "required": true,
                "validation": "min:0"
            },
            "currency": {
                "type": "String",
                "required": true,
                "validation": "matches job currency"
            }
        }
    },
    "status": {
        "type": "Enum",
        "required": true,
        "systemGenerated": true,
        "values": ["PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN"]
    },
    "createdAt": {
        "type": "DateTime",
        "required": true,
        "systemGenerated": true
    },
    "updatedAt": {
        "type": "DateTime",
        "required": true,
        "systemGenerated": true
    }
}
## 3. Resource Relationships

### 3.1 One-to-One Relationships
User ↔ WorkerProfile
  - A user can have one worker profile
  - A worker profile belongs to one user

### 3.2 One-to-Many Relationships
User → JobPosting
  - A user can post multiple jobs
  - A job belongs to one user

User → Application
  - A user can submit multiple applications
  - An application belongs to one user

User → Review
  - A user can write multiple reviews
  - A review belongs to one user

User → Payment
  - A user can make multiple payments
  - A payment belongs to one user

JobPosting → Application
  - A job can have multiple applications
  - An application belongs to one job

JobPosting → Review
  - A job can have multiple reviews
  - A review belongs to one job

JobPosting → Payment
  - A job can have multiple payments
  - A payment belongs to one job

### 3.3 Many-to-Many Relationships
WorkerProfile ↔ Skill
  - A worker can have multiple skills
  - A skill can be associated with multiple workers

JobPosting ↔ Category
  - A job can belong to multiple categories
  - A category can contain multiple jobs

## 4. Resource Dependencies

### 4.1 Hard Dependencies
WorkerProfile depends on User
Application depends on User and JobPosting
Review depends on User and JobPosting
Payment depends on User and JobPosting

### 4.2 Soft Dependencies
JobPosting depends on Category
WorkerProfile depends on Skill

## 5. Referential Integrity Requirements

### 5.1 Cascade Delete
When a User is deleted:
  - Delete associated WorkerProfile
  - Archive associated JobPostings
  - Archive associated Applications
  - Archive associated Reviews
  - Archive associated Payments

### 5.2 Restrict Delete
JobPosting cannot be deleted if it has:
  - Active Applications
  - Pending Payments
  - Published Reviews

### 5.3 Set Null
When a Category is deleted:
  - Set category to null in JobPostings
  - Set category to null in Skills 