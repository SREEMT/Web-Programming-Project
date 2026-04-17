import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dao from "./watchlist.dao.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    dbName: "jest_watchlist",
  });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("watchlist DAO", () => {
  test("getAll returns empty array when collection is empty", async () => {
    const items = await dao.getAll();
    expect(Array.isArray(items)).toBe(true);
    expect(items).toHaveLength(0);
  });

  test("newStock creates a stock with default change and percent values", async () => {
    const item = await dao.newStock({
      symbol: "eth",
      company: "EnrgTrack",
      price: 20,
    });

    expect(item).toEqual({
      symbol: "ETH",
      company: "EnrgTrack",
      price: 20,
      change: 0,
      percent: 0,
    });

    const all = await dao.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].symbol).toBe("ETH");
    expect(all[0].company).toBe("EnrgTrack");
  });

  test("newStock stores provided change and percent values", async () => {
    const item = await dao.newStock({
      symbol: "xom",
      company: "Exxon",
      price: "30.5",
      change: "1.2",
      percent: "4.0",
    });

    expect(item).toEqual({
      symbol: "XOM",
      company: "Exxon",
      price: 30.5,
      change: 1.2,
      percent: 4,
    });
  });

  test("updateStock updates all provided fields and returns selected fields", async () => {
    await dao.newStock({
      symbol: "aapl",
      company: "Apple",
      price: 100,
    });

    const updated = await dao.updateStock("AAPL", {
      symbol: "appl",
      company: "Apple Inc.",
      price: "150",
      change: "2",
      percent: "1.5",
    });

    expect(updated).toEqual({
      symbol: "APPL",
      company: "Apple Inc.",
      change: 2,
      percent: 1.5,
    });

    const all = await dao.getAll();
    expect(all).toHaveLength(1);
    expect(all[0].symbol).toBe("APPL");
  });

  test("updateStock returns null when target symbol does not exist", async () => {
    const updated = await dao.updateStock("NONE", { company: "Nope" });
    expect(updated).toBeNull();
  });

  test("deleteStock returns false when the stock does not exist", async () => {
    const result = await dao.deleteStock("MISSING");
    expect(result).toBe(false);
  });

  test("deleteStock removes an existing stock and returns true", async () => {
    await dao.newStock({
      symbol: "tsla",
      company: "Tesla",
      price: 750,
    });

    const result = await dao.deleteStock("TSLA");
    expect(result).toBe(true);

    const all = await dao.getAll();
    expect(all).toHaveLength(0);
  });
});
