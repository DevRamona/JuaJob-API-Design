# JuaJobs API Style Guide

## Table of Contents

1. [General Principles](#general-principles)
2. [URL Design](#url-design)
3. [HTTP Methods](#http-methods)
4. [Request/Response Format](#requestresponse-format)
5. [Error Handling](#error-handling)
6. [Authentication](#authentication)
7. [Pagination](#pagination)
8. [Filtering & Sorting](#filtering--sorting)
9. [Versioning](#versioning)
10. [Documentation](#documentation)

## General Principles

### RESTful Design

Follow REST principles for resource-oriented design
Use nouns for resource names, not verbs
Maintain statelessness between requests
Use appropriate HTTP methods for operations
Return proper HTTP status codes

### Consistency

Use consistent naming conventions
Maintain uniform response formats
Follow established patterns across endpoints
Use standard HTTP headers

### Security

Always use HTTPS
Implement proper authentication
Validate all input data
Sanitize output data
Follow OWASP security guidelines

## URL Design ### Base URL

https://api.juajobs.com/v1

### Resource Naming

Use plural nouns for collections
Use kebab-case for multi-word resources
Keep URLs simple and intuitive
Avoid deep nesting (max 2 levels)
Examples:
/jobs /worker-profiles /job-applications

### Query Parameters

Use camelCase for parameter names
Keep parameter names descriptive
Use standard parameter names for common operations
Examples:
?page=1 ?limit=20 ?sortBy=createdAt ?order=desc

## HTTP Methods ### GET

Retrieve resources
Should not modify data
Can include query parameters
Returns 200 OK for success

### POST

Create new resources
Submit data for processing
Returns 201 Created for success
Include Location header for new resources

### PUT

Update existing resources
Replace entire resource
Returns 200 OK for success
Idempotent operation

### PATCH

Partial resource updates
Returns 200 OK for success
Idempotent operation

### DELETE

Remove resources
Returns 204 No Content for success
Idempotent operation

## Request/Response Format ### Request Headers

Content-Type: application/json Accept: application/json Authorization: Bearer <token>

### Response Headers

Content-Type: application/json X-Request-ID: <uuid> X-RateLimit-Limit: <number> X-RateLimit-Remaining: <number>

### JSON Format

Use camelCase for property names
Include timestamps in ISO 8601 format
Use proper data types
Include null for optional fields
Example:
json { "id": "123e4567-e89b-12d3-a456-426614174000", "title": "Senior Developer", "description": "Looking for an experienced developer", "createdAt": "2024-03-20T10:00:00Z", "updatedAt": "2024-03-20T10:00:00Z" }

## Error Handling ### Error Response Format

json { "error": { "code": "VALIDATION_ERROR", "message": "Invalid input data", "details": { "email": "Invalid email format" }, "requestId": "123e4567-e89b-12d3-a456-426614174000", "timestamp": "2024-03-20T10:00:00Z" } }

### HTTP Status Codes

200: Success
201: Created
204: No Content
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
409: Conflict
422: Unprocessable Entity
429: Too Many Requests
500: Internal Server Error

## Authentication ### JWT Authentication

Use Bearer token authentication
Include token in Authorization header
Token format: Bearer <token>
Token expiration: 24 hours

### Token Refresh

Use refresh token for new access tokens
Refresh token expiration: 30 days
Include refresh token in secure HTTP-only cookie

## Pagination ### Standard Pagination

GET /jobs?page=1&limit=20

### Response Format

json { "data": [...], "pagination": { "total": 100, "page": 1, "limit": 20, "pages": 5 } }

### Cursor-based Pagination

GET /jobs?cursor=<base64-encoded-cursor>

## Filtering & Sorting ### Filtering

Use query parameters for filters
Support multiple filter conditions
Use standard operators
Examples:
?status=OPEN ?category=DEVELOPMENT ?minBudget=1000 ?maxBudget=5000

### Sorting

Use sortBy and order parameters
Support multiple sort fields
Default to createdAt desc
Examples:
?sortBy=createdAt&order=desc ?sortBy=budget&order=asc

## Versioning ### URL Versioning

https://api.juajobs.com/v1/jobs

### Header Versioning

Accept: application/vnd.juajobs.v1+json

### Version Selection 1. URL version takes precedence 2. Header version as fallback 3. Default to latest stable version ## Documentation ### OpenAPI Specification

Maintain up-to-date OpenAPI spec
Include all endpoints
Document all schemas
Provide examples

### API Reference

Clear endpoint descriptions
Request/response examples
Error scenarios
Authentication details

### Code Examples

Provide examples in multiple languages
Include common use cases
Show error handling
Demonstrate best practices

### Changelog

Document all API changes
Include migration guides
Note breaking changes
Provide upgrade paths
