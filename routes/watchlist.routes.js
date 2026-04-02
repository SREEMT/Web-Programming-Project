// Watchlist REST routes
import WatchlistController from "../controllers/watchlist.controller.js";
import dao from "../dao/watchlist.dao.js";

// Build a controller instance with its data-access dependency
const controller = WatchlistController(dao);

export default function WatchlistRoutes(app) {
    // GET all
    app.get("/watchlist", controller.getAll);

    // POST stock
    app.post("/watchlist", controller.postStock);

    // UPDATE stock

    // DELETE stock
}
