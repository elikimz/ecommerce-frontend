const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

// Protect with a simple secret key
const SECRET_KEY = "your_secret_key";

app.post("/api/regenerate-sitemap", (req, res) => {
  if (req.headers["x-api-key"] !== SECRET_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  exec("node generate-sitemap.cjs", (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Sitemap generation error:", stderr);
      return res.status(500).json({ message: "Sitemap generation failed" });
    }

    console.log("✅ Sitemap regenerated:\n", stdout);
    res.status(200).json({ message: "Sitemap regenerated successfully" });
  });
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Sitemap webhook running on http://localhost:${PORT}`);
});
