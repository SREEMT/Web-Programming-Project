// Watchlist DAO, handles data for the web app
import fs from "fs";
import path from "path";

const jsonPath = path.join(process.cwd(), "data", "watchlist.json");

// Read data from watchlist, used in get
function readJson() {
    return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

// write new data to watchlist.json

// GET all data, uses read data
function getAll() {
    return readJson();
}

// POST new stock

// UPDATE a stock

// DELETE a stock

export default { getAll };