## MERN Dashboard

![App logo](/frontend/public/logo192.png)

Fullstack web app with authentication and ability to create or edit orders based on customers and products from database. You can edit your profile data and change avatar. Authentication provided by JWT and stored in cookies.

This project deployed on render.com: [https://mern-dashboard.onrender.com/](https://mern-dashboard.onrender.com/)

### Frontend technology stack:

- TypeScript
- React
- Redux with RTK
- Ant Design
- LESS

### Backend technology stack:

- JavaScript
- Node
- Express
- Mongo DB

### API endpoints:

Auth:

```
POST /api/v1/users/login
POST /api/v1/users/registration
GET /api/v1/users/logout
```

Profile:

```
GET /api/v1/users/me
PATCH /api/v1/users/me
PATCH /api/v1/users/password-change
```

Orders:

```
GET /api/v1/orders
POST /api/v1/orders
GET /api/v1/orders/{orderId}
PATCH /api/v1/orders/{orderId}
DELETE /api/v1/orders/{orderId}
```

Products:

```
GET /api/v1/products
POST /api/v1/products
GET /api/v1/products/{brand}
```

Customers:

```
GET /api/v1/customers
POST /api/v1/customers
GET /api/v1/customers/{customerId}
PATCH /api/v1/customers/{customerId}
DELETE /api/v1/customers/{customerId}
```
