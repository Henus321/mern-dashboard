export const PREFIX = "/dashboard";

export const DEFAULT_UNAUTHORIZED_USER_ROUTE = "/";
export const DEFAULT_AUTHORIZED_USER_ROUTE = `${PREFIX}/orders`;

export const ORDERS_ROUTE = `${PREFIX}/orders`;
export const CREATE_ORDER_ROUTE = `${PREFIX}/orders/create-order`;
export const EDIT_ORDER_ROUTE = `${PREFIX}/orders/edit-order`;

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://mern-dashboard-api.onrender.com"
    : "";
export const PHOTO_URL = `${API_URL}/api/v1/uploads/`;
export const USERS_URL = `${API_URL}/api/v1/users`;
export const PORTFOLIO_URL = `${API_URL}/api/v1/portfolio`;
export const CUSTOMERS_URL = `${API_URL}/api/v1/customers`;
export const PRODUCTS_URL = `${API_URL}/api/v1/products`;
export const ORDERS_URL = `${API_URL}/api/v1/orders`;
