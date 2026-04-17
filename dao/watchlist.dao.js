import Watchlist from "../models/watchlist.model.js";

function formatStock(doc) {
    if(!doc) return null;

    return {
        symbol: doc.symbol,
        company: doc.company,
        price: doc.price,
        change: doc.change,
        percent: doc.percent
    }
}

async function getAll() {
    const items = await Watchlist.find({});
    return items;
}

async function newStock(item) {
    const created = await Watchlist.create({
        symbol: String(item.symbol).toUpperCase(),
        company: item.company,
        price: Number(item.price),
        change: item.change !== undefined ? Number(item.change) : 0,
        percent: item.percent !== undefined ? Number(item.percent) : 0
    });

    return formatStock(created.toObject());
}

async function updateStock(symbol, updatedStock) {
    const updates = {};

    if(updatedStock.symbol !== undefined) {
        updates.symbol = String(updatedStock.symbol).toUpperCase();
    }

    if(updatedStock.company !== undefined) {
        updates.company = updatedStock.company;
    }

    if(updatedStock.price !== undefined) {
        updates.price = Number(updatedStock.price);
    }

    if(updatedStock.change !== undefined) {
        updates.change = Number(updatedStock.change);
    }

    if(updatedStock.percent !== undefined) {
        updates.percent = Number(updatedStock.percent);
    }

    const updated = await Watchlist.findOneAndUpdate(
        { symbol: String(symbol).toUpperCase() },
        { $set: updates},
        {
            returnDocument: "after",
            runValidators: true
        }
    )
    .select("symbol company change percent -_id")
    .lean();

    return updated;
}

async function deleteStock(symbol) {
    const deleted = await Watchlist.findOneAndDelete({
        symbol: String(symbol).toUpperCase(),
    }).lean();

    return !!deleted;
}

export default {
    getAll, newStock, updateStock, deleteStock
}

// // Watchlist DAO, handles data for the web app
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const jsonPath = path.join(process.cwd(), "data", "watchlist.json");

// // Read data from watchlist, used in get
// function readJson() {
//     return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
// }

// // write new data to watchlist.json
// function writeData(data) {
//     fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
// }

// // GET all data, uses read data
// function getAll() {
//     return readJson();
// }

// // POST new stock
// function newStock(item) {
//     const data = readJson();
//     const newItem = {
//         symbol: item.symbol,
//         company: item.company,
//         price: item.price,
//         change: 0,
//         percent: 0
//     };
//     data.push(newItem);
//     writeData(data);
//     return newItem;
// }

// // UPDATE a stock
// function updateStock(symbol, updatedStock) {
//     const data = readJson();
//     const newData = data.filter((s) => s.symbol !== symbol);
// UPDATE a stock
// function updateStock(symbol, updatedStock) {
//     const data = readJson();
//     const index = data.findIndex(s => s.symbol === symbol);

//     if (newData === -1) return null;

//     data[newData] = {...data[newData], ...updatedStock };
//     writeData(data);
//     return data[index];
// }

// // DELETE a stock
// function deleteStock(symbol) {
//     const data = readJson();
//     const newData = data.filter((s) => s.symbol !== symbol);

//     if (newData.length === data.length) return false;

//     writeData(newData);
//     return true;
// }

// export default { getAll, newStock, deleteStock };