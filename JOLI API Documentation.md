JOLI API Documentation
JOLI is a job-finding platform that provides APIs for user management, job postings, job applications, and category management. This documentation outlines the available endpoints, their request/response formats, and authentication requirements.

Base URL
https://api.joli.com/api/v1

Authentication

Most endpoints require authentication via a JWT token.
The token must be included in the Authorization header as Bearer <token>.
Use the /user/login endpoint to obtain a token.
Protected endpoints require the isAuthenticated middleware.

Endpoints

1. User Routes (/user)
   POST /register
   Register a new user.
   Request Body:
   {
   "fullname": "string",
   "email": "string",
   "phoneNumber": "string",
   "password": "string"
   }

Response:

201 Created: User registered successfully.{
"success": true,
"message": "User registered successfully",
"user": {
"id": "string",
"fullname": "string",
"email": "string",
"phoneNumber": "string"
}
}

400 Bad Request: Invalid input or user already exists.

Authentication: None

POST /login
Log in a user and return a JWT token.
Request Body:
{
"email": "string",
"password": "string"
}

Response:

200 OK: Login successful.{
"success": true,
"message": "Login successful",
"token": "string",
"user": {
"id": "string",
"fullname": "string",
"email": "string"
}
}

401 Unauthorized: Invalid credentials.

Authentication: None

POST /logout
Log out the current user by clearing the token cookie.
Response:

200 OK: Logout successful.{
"success": true,
"message": "Logged out successfully"
}

Authentication: Required

POST /profile/update
Update the authenticated user's profile. Supports single file upload (e.g., resume).
Request Body (multipart/form-data):
{
"fullname": "string",
"email": "string",
"phoneNumber": "string",
"bio": "string",
"location": "string"
}

File: file (optional, e.g., resume PDF)

Response:

200 OK: Profile updated successfully.{
"success": true,
"message": "Profile updated successfully",
"user": {
"id": "string",
"fullname": "string",
"email": "string",
"phoneNumber": "string",
"bio": "string",
"location": "string"
}
}

400 Bad Request: Invalid input.

Authentication: Required

2. Job Routes (/job)
   POST /post
   Create a new job posting (admin only).
   Request Body:
   {
   "title": "string",
   "description": "string",
   "requirements": "string",
   "wage": "number",
   "location": "string",
   "jobType": "string",
   "category": "string"
   }

Response:

201 Created: Job created successfully.{
"success": true,
"message": "Job created successfully",
"job": {
"id": "string",
"title": "string",
"description": "string",
"requirements": "string",
"wage": "number",
"location": "string",
"jobType": "string",
"category": "string",
"createdBy": "string"
}
}

400 Bad Request: Invalid input.

Authentication: Required (admin)

PUT /update/:jobId
Update an existing job posting (admin only).
Request Parameters:

jobId: Job ID (path parameter)

Request Body:
{
"title": "string",
"description": "string",
"requirements": "string",
"wage": "number",
"location": "string",
"jobType": "string",
"category": "string"
}

Response:

200 OK: Job updated successfully.{
"success": true,
"message": "Job updated successfully",
"job": {
"id": "string",
"title": "string",
"description": "string",
"requirements": "string",
"wage": "number",
"location": "string",
"jobType": "string",
"category": "string"
}
}

404 Not Found: Job not found.

Authentication: Required (admin)

DELETE /delete/:jobId
Delete a job posting (admin only).
Request Parameters:

jobId: Job ID (path parameter)

Response:

200 OK: Job deleted successfully.{
"success": true,
"message": "Job deleted successfully"
}

404 Not Found: Job not found.

Authentication: Required (admin)

GET /get
Retrieve all job postings (public).
Response:

200 OK: List of jobs.{
"success": true,
"jobs": [
{
"id": "string",
"title": "string",
"description": "string",
"requirements": "string",
"wage": "number",
"location": "string",
"jobType": "string",
"category": "string",
"createdBy": "string"
}
]
}

Authentication: None

GET /getadminjobs/:id
Retrieve all jobs posted by a specific admin.
Request Parameters:

id: Admin user ID (path parameter)

Response:

200 OK: List of admin's jobs.{
"success": true,
"jobs": [
{
"id": "string",
"title": "string",
"description": "string",
"requirements": "string",
"wage": "number",
"location": "string",
"jobType": "string",
"category": "string",
"createdBy": "string"
}
]
}

404 Not Found: Admin not found.

Authentication: Required

GET /get/:id
Retrieve a job by ID (public).
Request Parameters:

id: Job ID (path parameter)

Response:

200 OK: Job details.{
"success": true,
"job": {
"id": "string",
"title": "string",
"description": "string",
"requirements": "string",
"wage": "number",
"location": "string",
"jobType": "string",
"category": "string",
"createdBy": "string"
}
}

404 Not Found: Job not found.

Authentication: None

3. Application Routes (/application)
   POST /apply/:id
   Apply to a job.
   Request Parameters:

id: Job ID (path parameter)

Response:

201 Created: Application submitted successfully.{
"success": true,
"message": "Application submitted successfully",
"application": {
"id": "string",
"jobId": "string",
"userId": "string",
"status": "string"
}
}

400 Bad Request: Already applied or invalid job.

Authentication: Required

GET /applied
Retrieve all jobs the authenticated user has applied for.
Response:

200 OK: List of applied jobs.{
"success": true,
"applications": [
{
"id": "string",
"jobId": "string",
"userId": "string",
"status": "string",
"job": {
"title": "string",
"description": "string"
}
}
]
}

Authentication: Required

GET /:id/applicants
Retrieve all applications for a specific job (admin only).
Request Parameters:

id: Job ID (path parameter)

Response:

200 OK: List of applications.{
"success": true,
"applications": [
{
"id": "string",
"jobId": "string",
"userId": "string",
"status": "string",
"user": {
"fullname": "string",
"email": "string"
}
}
]
}

404 Not Found: Job not found.

Authentication: Required (admin)

POST /status/:id/update
Update the status of a job application (e.g., Accept/Reject) (admin only).
Request Parameters:

id: Application ID (path parameter)

Request Body:
{
"status": "string" // e.g., "Accepted", "Rejected"
}

Response:

200 OK: Status updated successfully.{
"success": true,
"message": "Application status updated",
"application": {
"id": "string",
"jobId": "string",
"userId": "string",
"status": "string"
}
}

404 Not Found: Application not found.

Authentication: Required (admin)

GET /appliedJobsProfile/:id
Retrieve the profile of a user who applied for jobs.
Request Parameters:

id: User ID (path parameter)

Response:

200 OK: User profile and applied jobs.{
"success": true,
"user": {
"id": "string",
"fullname": "string",
"email": "string",
"phoneNumber": "string",
"bio": "string",
"location": "string",
"applications": [
{
"jobId": "string",

??? "string", "status": "string" } ] } }

- **404 Not Found**: User not found.

**Authentication**: Required

---

### 4. Category Routes (`/category`)

#### POST `/post`

Insert a new job category.

**Request Body:**

```json
{
"name": "string"
}

Response:

201 Created: Category created successfully.{
  "success": true,
  "message": "Category created successfully",
  "category": {
    "id": "string",
    "name": "string"
  }
}


400 Bad Request: Invalid input.

Authentication: None

GET /list
Retrieve all job categories.
Response:

200 OK: List of categories.{
  "success": true,
  "categories": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}



Authentication: None

Error Handling
All endpoints return errors in the following format:
{
  "success": false,
  "message": "Error message"
}

Common Status Codes:

400: Bad Request - Invalid input.
401: Unauthorized - Missing or invalid token.
403: Forbidden - Insufficient permissions.
404: Not Found - Resource not found.
500: Internal Server Error - Server issue.


Notes

The isAuthenticated middleware ensures the user is authenticated and attaches the userId to req.id.
File uploads for /user/profile/update are handled via multer middleware (singleUpload).
Admin-only endpoints require additional permission checks (not detailed in the provided code).
All monetary values (e.g., wage) are expected in a standard currency format (e.g., USD).

```
