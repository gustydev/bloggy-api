# Bloggy API
A RESTful API for managing blog posts and comments built with NodeJS, Express and PostgreSQL with Prisma ORM.

## Routes

### Posts

| Endpoint                  | Method | Description                                                                         | Query Parameters                                                                                              |
|---------------------------|--------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `/api/v1/posts`           | GET    | Retrieve all posts with optional filtering, pagination, and sorting by update date or publish status. | `filter` (string), `page` (number), `limit` (number), `sort` ('asc' or 'desc', default: 'desc'), `published` (boolean: `true` or `false`, default: all posts) |
| `/api/v1/posts/:postId`   | GET    | Retrieve a specific post by its ID.                                                  | None                                                                                                          |
| `/api/v1/posts`           | POST   | Create a new post. Requires authentication.                                          | None                                                                                                          |
| `/api/v1/posts/:postId`   | PUT    | Update a specific post by its ID. Requires authentication.                           | None                                                                                                          |
| `/api/v1/posts/:postId`   | DELETE | Delete a specific post by its ID. Requires authentication.                           | None                                                                                                          |


### Comments

| Endpoint                            | Method | Description                                                                 | Query Parameters                                                                                  |
|-------------------------------------|--------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `/api/v1/comments`                  | GET    | Retrieve all comments with optional filtering, pagination, and sorting by update date. | `filter` (string), `page` (number), `limit` (number), `sort` ('asc' or 'desc', default: 'asc')  |
| `/api/v1/posts/:postId/comments`    | GET    | Retrieve all comments for a specific post with optional filtering, pagination, and sorting by update date. | `filter` (string), `page` (number), `limit` (number), `sort` ('asc' or 'desc', default: 'asc')  |
| `/api/v1/comments/:commentId`       | GET    | Retrieve a specific comment by its ID.                                        | None                                                                                              |
| `/api/v1/posts/:postId/comment`     | POST   | Create a new comment under a specific post. Requires authentication.          | None                                                                                              |
| `/api/v1/comments/:commentId`       | PUT    | Update a specific comment by its ID. Requires authentication.                 | None                                                                                              |
| `/api/v1/comments/:commentId`       | DELETE | Delete a specific comment by its ID. Requires authentication.                 | None                                                                                              |


### User

| Endpoint              | Method | Description                         | Query Parameters |
|-----------------------|--------|-------------------------------------|------------------|
| `/api/v1/user`        | GET    | Retrieve authenticated user's details. | None             |
| `/api/v1/user/register` | POST   | Register a new user.                  | None             |
| `/api/v1/user/login`  | POST   | Login and obtain a JWT.               | None             |
   |                  |

