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

## Front-End Applications

This API was used to make two separate front-end applications, both built with React, to serve different user roles and functionalities:

### 1. **User Interface (Main Blog)**
The user-facing application provides a seamless and engaging experience for visitors, allowing them to view, browse, and interact with blog posts and comments.

- **[Repository](https://github.com/gustydev/bloggy-user)**: Explore the source code and contribute.
- **[Live Preview](https://bloggy-blog.pages.dev)**: Try out the live application.

### 2. **Admin Interface**
The admin application is designed for blog administrators, offering features to manage content such as creating, editing, and deleting posts and comments, and moderating user activity.

- **[Repository](https://github.com/gustydev/bloggy-admin)**: Access the source code and contribute.
- **[Live Preview](https://bloggy-admin.pages.dev)**: Access the live admin panel.
