const app = require("./app");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

// *load environment variables
const productionMode = process.env.NODE_ENV === "production";
if (!productionMode) {
    dotenv.config();
}

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to db, host: ${mongoose.connection.host}`);
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}

function startServer() {
    const port = +process.env.PORT || 8001;
    app.listen(port, () => {
        console.log(
            `Server is running in ${productionMode ? "production" : "development"} mode on port ${port}`,
        );
    });
}

async function run() {
    await connectToDB();
    startServer();
}

run();
