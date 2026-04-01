import express from "express";
import path from "path";
import WatchlistRoutes from "./routes/watchlist.routes.js";

const app = express();
const PORT = 3000;

// ✅ Serve everything in public folder
app.use(express.static(path.join(process.cwd(), "public")));

// API route
/*
app.get("/watchlist", (req, res) => {
    const jsonPath = path.join(process.cwd(), "data", "watchlist.json");
    fs.readFile(jsonPath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read JSON" });
        res.json(JSON.parse(data));
    });
});
*/

// New Routes
WatchlistRoutes(app);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));