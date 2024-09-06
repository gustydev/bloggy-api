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
