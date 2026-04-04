// Watchlist DAO, handles data for the web app
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const jsonPath = path.join(process.cwd(), "data", "watchlist.json");

// Read data from watchlist, used in get
function readJson() {
    return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
}

// write new data to watchlist.json
function writeData(data) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

// GET all data, uses read data
function getAll() {
    return readJson();
}

// POST new stock
function newStock(item) {
    const data = readJson();
    const newItem = {
        symbol: item.symbol,
        company: item.company,
        price: item.price,
        change: 0,
        percent: 0
    };
    data.push(newItem);
    writeData(data);
    return newItem;
}

// UPDATE a stock
function updateStock(symbol, updatedStock) {
    const data = readJson();
    const index = data.findIndex(s => s.symbol === symbol);

    if (index === -1) return null;

    data[index] = { ...data[index], ...updatedStock };
    writeData(data);
    return data[index];
}

// DELETE a stock
function deleteStock(symbol) {
    const data = readJson();
    const newData = data.filter((s) => s.symbol !== symbol);

    if (newData.length === data.length) return false;

    writeData(newData);
    return true;
}

export default { getAll, newStock, updateStock, deleteStock };