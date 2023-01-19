import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  PROFILE_AUTH_URL,
  ORDERS_URL,
  PRODUCTS_URL,
  CUSTOMERS_URL,
} from "../constants";
import {
  mockAuthResponse,
  mockProfile,
  mockOrders,
  mockOrder,
  mockFerrari,
  mockLamborghini,
  mockProducts,
  mockSuccessResponse,
  mockCustomers,
  mockOrderId,
  mockCustomerId,
  mockNewCustomer,
} from "./mocks";

export const server = setupServer(
  rest.post(`${PROFILE_AUTH_URL}/login`, (req, res, ctx) => {
    return res(ctx.json(mockAuthResponse));
  }),
  rest.post(`${PROFILE_AUTH_URL}/registration`, (req, res, ctx) => {
    return res(ctx.json(mockAuthResponse));
  }),
  rest.get(`${PROFILE_AUTH_URL}/logout`, (req, res, ctx) => {
    return res(ctx.json(mockSuccessResponse));
  }),
  rest.get(`${ORDERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockOrders));
  }),
  rest.delete(`${ORDERS_URL}/${mockOrderId}`, (req, res, ctx) => {
    return res(ctx.json(mockOrder));
  }),
  rest.get(`${ORDERS_URL}/${mockOrderId}`, (req, res, ctx) => {
    return res(ctx.json(mockOrder));
  }),
  rest.post(`${ORDERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockOrder));
  }),
  rest.patch(`${ORDERS_URL}/${mockOrderId}`, (req, res, ctx) => {
    return res(ctx.json(mockOrder));
  }),
  rest.get(`${PRODUCTS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  }),
  rest.get(`${PRODUCTS_URL}/ferrari`, (req, res, ctx) => {
    return res(ctx.json(mockFerrari));
  }),
  rest.get(`${PRODUCTS_URL}/lamborghini`, (req, res, ctx) => {
    return res(ctx.json(mockLamborghini));
  }),
  rest.get(`${CUSTOMERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockCustomers));
  }),
  rest.post(`${CUSTOMERS_URL}`, (req, res, ctx) => {
    return res(ctx.json(mockNewCustomer));
  }),
  rest.patch(`${CUSTOMERS_URL}/${mockCustomerId}`, (req, res, ctx) => {
    return res(ctx.json({ ...mockNewCustomer, _id: mockCustomerId }));
  }),
  rest.delete(`${CUSTOMERS_URL}/${mockCustomerId}`, (req, res, ctx) => {
    return res(ctx.json(mockNewCustomer));
  }),
  rest.get(`${PROFILE_AUTH_URL}/me`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),
  rest.patch(`${PROFILE_AUTH_URL}/me`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  }),
  rest.patch(`${PROFILE_AUTH_URL}/password-change`, (req, res, ctx) => {
    return res(ctx.json(mockProfile));
  })
);
