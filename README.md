# Bloggy API
A RESTful API for managing blog posts and comments built with NodeJS, Express and PostgreSQL with Prisma ORM.

## Routes

### Posts

| Endpoint                       | Method | Description                                               | Query Parameters |
|--------------------------------|--------|-----------------------------------------------------------|------------------|
| `/api/v1/posts`          | GET    | Retrieve all posts with filtering, pagination, and sorting by update date. | `filter`, `page`, `limit`, `sort` (default is descending) |
| `/api/v1/posts/:postId`  | GET    | Retrieve a specific post by ID.                          |                  |
| `/api/v1/posts`          | POST   | Create a new post (requires authentication).              |                  |
| `/api/v1/posts/:postId`  | PUT    | Update a specific post by ID (requires authentication).   |                  |
| `/api/v1/posts/:postId`  | DELETE | Delete a specific post by ID (requires authentication).   |                  |

### Comments

| Endpoint                                | Method | Description                                               | Query Parameters |
|-----------------------------------------|--------|-----------------------------------------------------------|------------------|
| `/api/v1/comments`                | GET    | Retrieve all comments with filtering, pagination, and sorting by update date. | `filter`, `page`, `limit`, `sort` (default is ascending) |
| `/api/v1/posts/:postId/comments`  | GET    | Retrieve all comments for a specific post with filtering, pagination, and sorting by update date. | `filter`, `page`, `limit`, `sort` (default is ascending) |
| `/api/v1/comments/:commentId`     | GET    | Retrieve a specific comment by ID.                       |                  |
| `/api/v1/posts/:postId/comment`   | POST   | Create a comment under a specific post.                  |                  |
| `/api/v1/comments/:commentId`     | PUT    | Update a specific comment by ID (requires authentication). |                  |
| `/api/v1/comments/:commentId`     | DELETE | Delete a specific comment by ID (requires authentication). |                  |

### User

| Endpoint                  | Method | Description                                | Query Parameters |
|---------------------------|--------|--------------------------------------------|------------------|
| `/api/v1/user`          | GET    | Retrieve authenticated user's details.     |                  |
| `/api/v1/user/register` | POST   | Register a new user.                        |                  |
| `/api/v1/user/login`    | POST   | Login and obtain a JWT.                    |                  |

