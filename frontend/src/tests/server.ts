import { rest } from "msw";
import { setupServer } from "msw/node";
import { USERS_URL, ORDERS_URL, PRODUCTS_URL } from "../constants";
import {
  mockAuthResponse,
  mockProfile,
  mockOrders,
  mockLamborghini,
  mockDeleteResponse,
  mockProducts,
  mockLogoutResponse,
} from "./mocks";

export const server = setupServer(
  rest.post(`${USERS_URL}/login`, (req, res, ctx) => {
    return res(ctx.json(mockAuthResponse));
  }),
  rest.post(`${USERS_URL}/registration`, (req, res, ctx) => {
    return res(ctx.json(mockAuthResponse));
  }),
  rest.get(`${USERS_URL}/logout`, (req, res, ctx) => {
    return res(ctx.json(mockLogoutResponse));
  }),
  rest.get(`${USERS_URL}/me`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),
  rest.patch(`${USERS_URL}/me`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),
  rest.patch(`${USERS_URL}/password-change`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
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
  })
);
