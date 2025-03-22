const express = require("express");
const cors = require("cors");
const db = require("./models");
const notesRoutes = require("./routes/notes");

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/notes", notesRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3001;
db.sequelize.sync({ force: false }).then(() => {
  console.log("✅ Database synced");
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch(error => console.log('❌ Database sync error:', error));