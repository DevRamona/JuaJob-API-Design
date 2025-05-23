# Example API Requests

## Authentication

### Register User
http
POST /v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "phoneNumber": "+250788123456",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securePassword123",
  "role": "WORKER"
}

### Login
http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

## Worker Profiles

### Create Worker Profile
http
POST /v1/workers
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Senior Software Developer",
  "bio": "Experienced developer with 5+ years in web development",
  "hourlyRate": 25.00,
  "skills": ["JavaScript", "Node.js", "React"],
  "availability": {
    "status": "AVAILABLE",
    "schedule": [
      {
        "day": "MONDAY",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  }
}

### Update Worker Skills
http
PUT /v1/workers/{id}/skills
Authorization: Bearer {token}
Content-Type: application/json

{
  "skills": ["JavaScript", "Node.js", "React", "TypeScript"]
}

## Jobs

### Create Job
http
POST /v1/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Full Stack Developer Needed",
  "description": "Looking for an experienced full stack developer...",
  "category": "Technology",
  "subCategory": "Web Development",
  "budget": {
    "amount": 1000.00,
    "currency": "USD",
    "type": "FIXED"
  },
  "location": {
    "type": "REMOTE",
    "address": "Remote"
  },
  "requiredSkills": ["JavaScript", "Node.js", "React"],
  "deadline": "2024-12-31T23:59:59Z"
}

### Search Jobs with Filters
http
GET /v1/jobs?category=Technology&minPrice=500&maxPrice=2000&location[type]=REMOTE&sort=createdAt:desc&page=1&limit=20
Authorization: Bearer {token}

## Applications

### Submit Application
http
POST /v1/jobs/{jobId}/applications
Authorization: Bearer {token}
Content-Type: application/json

{
  "proposal": "I am interested in this position...",
  "bidAmount": {
    "amount": 800.00,
    "currency": "USD"
  }
}

### List Applications with Field Selection
http
GET /v1/applications?fields=id,proposal,bidAmount,status&sort=createdAt:desc&page=1&limit=10
Authorization: Bearer {token}

## Reviews

### Submit Review
http
POST /v1/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": "job-uuid",
  "revieweeId": "user-uuid",
  "rating": 5,
  "comment": "Excellent work, very professional!"
}

## Payments

### Initiate Payment
http
POST /v1/payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "jobId": "job-uuid",
  "amount": {
    "amount": 800.00,
    "currency": "USD"
  },
  "paymentMethod": "MOBILE_MONEY"
}

### Request Refund
http
POST /v1/payments/{id}/refund
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Service not delivered as agreed",
  "amount": {
    "amount": 800.00,
    "currency": "USD"
  }
}

## Error Examples

### Validation Error
http
POST /v1/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Short",
  "description": "Too short",
  "budget": {
    "amount": -100
  }
}

Response:
json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "title": ["Minimum length is 10 characters"],
      "description": ["Minimum length is 50 characters"],
      "budget.amount": ["Must be greater than 0"]
    },
    "requestId": "req-123",
    "timestamp": "2024-03-15T10:30:00Z"
  }
}

### Authentication Error
http
GET /v1/users
Authorization: Bearer invalid-token

Response:
json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid or expired token",
    "requestId": "req-124",
    "timestamp": "2024-03-15T10:31:00Z"
  }
}

### Rate Limit Error
http
GET /v1/jobs
Authorization: Bearer {token}

Response:
http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1710498660

json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "requestId": "req-125",
    "timestamp": "2024-03-15T10:32:00Z"
  }
}