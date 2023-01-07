export const PREFIX = "/dashboard";
export const API_PREFIX = "/api/v1";

export const LOGIN_ROUTE = "/";
export const REGISTRATION_ROUTE = "/registration";
export const ORDERS_ROUTE = `${PREFIX}/orders`;
export const CREATE_ORDER_ROUTE = `${PREFIX}/orders/create-order`;
export const EDIT_ORDER_ROUTE = `${PREFIX}/orders/edit-order`;
export const PRODUCTS_ROUTE = `${PREFIX}/products`;
export const CUSTOMERS_ROUTE = `${PREFIX}/customers`;
export const EDIT_PROFILE_ROUTE = `${PREFIX}/profile/edit-profile`;
export const PORTFOLIO_ROUTE = `${PREFIX}/profile/portfolio`;
export const PASSWORD_ROUTE = `${PREFIX}/profile/password`;

export const DEFAULT_UNAUTHORIZED_USER_ROUTE = LOGIN_ROUTE;
export const DEFAULT_AUTHORIZED_USER_ROUTE = ORDERS_ROUTE;

export const PHOTO_URL = "/uploads/";
export const USERS_URL = `${API_PREFIX}/users`;
export const PORTFOLIO_URL = `${API_PREFIX}/portfolio`;
export const CUSTOMERS_URL = `${API_PREFIX}/customers`;
export const PRODUCTS_URL = `${API_PREFIX}/products`;
export const ORDERS_URL = `${API_PREFIX}/orders`;
