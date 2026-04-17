import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import Watchlist from "../models/watchlist.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Coonected for seeding");

        const filePath = path.join(__dirname, "../data/watchlist.json");
        const rawData = await fs.readFile(filePath, "utf-8");
        const stocks = JSON.parse(rawData);

        await Watchlist.deleteMany({});

        const inserted = await Watchlist.insertMany(stocks);

        console.log(`Seeded ${inserted.length} stocks into MongoDB`);
        await mongoose.connection.close();
        console.log("Seeding complete");
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);        
    }
}

seed();