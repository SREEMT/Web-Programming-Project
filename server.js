import express from "express";
import path from "path";
import WatchlistRoutes from "./routes/watchlist.routes.js";

const app = express();
const PORT = 3000;

// Necessary to proces json inputs through server
app.use(express.json());

// Watchlist routes
WatchlistRoutes(app);

// Moved here to allow file pathing after routes are served
app.use(express.static(path.join(process.cwd(), "public")));
/*
app.get("/watchlist", (req, res) => {
    const jsonPath = path.join(process.cwd(), "data", "watchlist.json");
    fs.readFile(jsonPath, "utf-8", (err, data) => {
        if (err) return res.status(500).json({ error: "Could not read JSON" });
        res.json(JSON.parse(data));
    });
});
*/


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));