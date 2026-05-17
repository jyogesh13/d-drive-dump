# 1. GLOBAL REQUEST STRUCTURE
## Headers
```json
{
  "Authorization": "Bearer <JWT_TOKEN>",
  "Content-Type": "application/json"
}
```

## Success Response Format
```json
{
  "data": {},
  "message": "string",
  "meta": {}
}
```

## Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

# 2. AUTH FLOW
## POST /users/login
### Request
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
### Response
```json
{
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "_id": "userId",
      "username": "john"
    }
  },
  "message": "Login successful"
}
```

# 3. TASK APIs
## 3.1 Create Task
POST `/tasks`
### Request
```json
{
  "title": "Finish UI",
  "description": "Design dashboard",
  "dueDate": "2026-05-02T10:00:00Z",
  "priority": "high",
  "assignedTo": "userId",
  "boardId": "optional_boardId",
  "attachments": [
    {
      "url": "cloudinary_url",
      "public_id": "id"
    }
  ]
}
```
### Response
```json
{
  "data": {
    "_id": "taskId",
    "title": "Finish UI",
    "status": "todo",
    "priority": "high",
    "createdBy": { "username": "admin" },
    "assignedTo": { "username": "member" }
  },
  "message": "Task created successfully"
}
```

## 3.2 Get All Tasks (Personal)
GET `/tasks?page=1&limit=10&status=todo&priority=high`
### Response
```json
{
  "data": [],
  "message": "All tasks retrieved",
  "meta": {
    "page": 1,
    "limit": 10,
    "hasNextPage": true
  }
}
```

## 3.3 Get Single Task
GET `/tasks/:id`
### Response
```json
{
  "data": {},
  "message": "Task retrieved successfully"
}
```

## 3.4 Update Task
PATCH `/tasks/:id`
### Request
```json
{
  "title": "Updated",
  "status": "done",
  "keepAttachments": ["public_id"],
  "newAttachments": []
}
```
### Response
```json
{
  "data": {},
  "message": "Task updated"
}
```

## 3.5 Delete Task
DELETE `/tasks/:id`
### Response
```json
{
  "data": {},
  "message": "Task deleted successfully"
}
```

# 4. BOARD APIs
## 4.1 Create Board
POST `/boards`
### Request
```json
{
  "name": "Dev Board",
  "description": "Project tasks"
}
```
### Response
```json
{
  "data": {
    "_id": "boardId",
    "name": "Dev Board",
    "admin": "userId"
  },
  "message": "Board created"
}
```

## 4.2 Get User Boards
GET `/boards`
### Response
```json
{
  "data": [
    {
      "_id": "boardId",
      "name": "Dev Board",
      "admin": { "username": "john" },
      "totalMembers": 3,
      "isAdmin": true
    }
  ],
  "message": "User boards"
}
```

## 4.3 Get Board Details
GET `/boards/:boardId`
### If MEMBER / ADMIN
```json
{
  "data": {
    "name": "Dev Board",
    "description": "Project",
    "admin": { "username": "john" },
    "members": [
      { "user": { "username": "a" } }
    ]
  }
}
```
### If NOT MEMBER
```json
{
  "data": {
    "name": "Dev Board",
    "admin": { "username": "john" },
    "totalMembers": 3
  }
}
```

## 4.4 Add Member
POST `/boards/:boardId/members`
### Request
```json
{
  "userId": "memberId"
}
```
### Response
```json
{
  "data": {},
  "message": "Member added"
}
```

## 4.5 Remove Member
DELETE `/boards/:boardId/members/:memberId`
### Response
```json
{
  "data": {},
  "message": "Member removed"
}
```

## 4.6 Leave Board
POST `/boards/:boardId/leave`
### Response
```json
{
  "data": {},
  "message": "Left board"
}
```

## 4.7 Transfer Ownership
PATCH `/boards/:boardId/transfer`
### Request
```json
{
  "newAdminId": "userId"
}
```
### Response
```json
{
  "data": {},
  "message": "Ownership transferred"
}
```

## 4.8 Delete Board
DELETE `/boards/:boardId`
### Response
```json
{
  "data": {},
  "message": "Board deleted"
}
```

# 5. BOARD TASKS
## Get Board Tasks
GET `/boards/:boardId/tasks?page=1&limit=10&status=todo`
### Response
```json
{
  "data": [],
  "message": "Board tasks",
  "meta": {
    "page": 1,
    "limit": 10,
    "hasNextPage": true
  }
}
```

# 6. FILE UPLOAD FLOW
Step 1 → Get signature: GET `/upload/signature`
Step 2 → Upload to Cloudinary (frontend)
Step 3 → Send metadata to backend

# 7. REAL-TIME EVENTS (Socket.IO)
## Connection
```js
socket = io(SERVER_URL, {
  auth: { userId }
});
```
## Events
- `task-reminder`
- `task-completed`

# 8. CACHE BEHAVIOR (Frontend awareness)
Cached endpoints: GET /tasks, GET /boards, GET /boards/:id/tasks
Not cached: search queries

# 9. ROLE RULES
Admin: create tasks, assign tasks, manage members, delete board
Member: view tasks, update task status, leave board
Non-member: limited board view
