## MERN Dashboard

![App logo](/frontend/public/logo192.png)

Full-featured web application. You can create or edit orders based on customers and products from the database. Authentication provided by JWT and stored in cookies. User data is editable in the profile settings.

This project deployed on render.com: [https://mern-dashboard.onrender.com/](https://mern-dashboard.onrender.com/)

### Frontend technology stack:

- TypeScript
- React
- Redux with RTK
- Ant Design
- React Testing Library

### Backend technology stack:

- JavaScript
- Node
- Express
- Mongo DB

### API endpoints:

Auth:

```
POST /api/v1/profile-auth/login
POST /api/v1/profile-auth/registration
GET /api/v1/profile-auth/logout
```

Profile:

```
GET /api/v1/profile-auth/me
PATCH /api/v1/profile-auth/me
PATCH /api/v1/profile-auth/password-change
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
