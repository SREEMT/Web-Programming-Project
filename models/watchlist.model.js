import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        change: {
            type: Number,
            required: true
        },
        percent: {
            type: Number,
            required: true,
        }
    },
    {
        collection: "watchlist",
        timestamps: true
    }
)

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist;