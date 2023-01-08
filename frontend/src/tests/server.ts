import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  USERS_URL,
  ORDERS_URL,
  PRODUCTS_URL,
  CUSTOMERS_URL,
} from "../constants";
import {
  mockAuthResponse,
  mockProfile,
  mockOrders,
  mockLamborghini,
  mockDeleteResponse,
  mockProducts,
  mockSuccessResponse,
  mockCustomers,
} from "./mocks";

export const server = setupServer(
  rest.post(`${USERS_URL}/login`, (req, res, ctx) => {
    return res(ctx.json(mockAuthResponse));
  }),
  rest.post(`${USERS_URL}/registration`, (req, res, ctx) => {
    return res(ctx.json(mockAuthResponse));
  }),
  rest.get(`${ORDERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockOrders));
  }),
  rest.delete(`${ORDERS_URL}/63a45698897ba4cbeb8331d1`, (req, res, ctx) => {
    return res(ctx.json(mockDeleteResponse));
  }),
  rest.get(`${PRODUCTS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  }),
  rest.get(`${PRODUCTS_URL}/lamborghini`, (req, res, ctx) => {
    return res(ctx.json(mockLamborghini));
  }),
  rest.get(`${CUSTOMERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockCustomers));
  }),
  rest.post(`${CUSTOMERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockSuccessResponse));
  }),
  rest.patch(`${CUSTOMERS_URL}/637e4eeb73efdf2fa89cb3ee`, (req, res, ctx) => {
    return res(ctx.json(mockSuccessResponse));
  }),
  rest.delete(`${CUSTOMERS_URL}/637e4eeb73efdf2fa89cb3ee`, (req, res, ctx) => {
    return res(ctx.json(mockSuccessResponse));
  }),
  rest.get(`${USERS_URL}/logout`, (req, res, ctx) => {
    return res(ctx.json(mockSuccessResponse));
  }),
  rest.get(`${USERS_URL}/me`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),
  rest.patch(`${USERS_URL}/me`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),
  rest.patch(`${USERS_URL}/password-change`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  })
);
