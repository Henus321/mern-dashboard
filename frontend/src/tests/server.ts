import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  mockOrders,
  mockLamborghini,
  mockDeleteResponse,
  mockProducts,
} from "./mocks";

export const server = setupServer(
  rest.get("/api/v1/orders/", (req, res, ctx) => {
    return res(ctx.json(mockOrders));
  }),
  rest.delete("/api/v1/orders/63a45698897ba4cbeb8331d1", (req, res, ctx) => {
    return res(ctx.json(mockDeleteResponse));
  }),
  rest.get("/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  }),
  rest.get("/api/v1/products/lamborghini", (req, res, ctx) => {
    return res(ctx.json(mockLamborghini));
  })
);
