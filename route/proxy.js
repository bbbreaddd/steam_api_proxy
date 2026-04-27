import express from "express";
import request from "request-zero";
import { require } from "../util/esm.js";

const router = express.Router();
const apiKey = require("./key.json");

// Helper to forward requests to Steam
async function proxyToSteam(req, res, path) {
  try {
    const steamUrl = new URL(`https://api.steampowered.com${path}`);
    
    // Copy all query params from incoming request
    for (const [key, value] of Object.entries(req.query)) {
      steamUrl.searchParams.set(key, value);
    }
    
    // Append the private API key
    steamUrl.searchParams.set("key", apiKey.steam.web_api[0]);

    const response = await request.get(steamUrl.toString());
    
    res.set("Content-Type", "application/json");
    res.status(response.status || 200).send(response.body);
  } catch (err) {
    console.error(`Proxy Error (${path}):`, err.message);
    res.status(500).json({ error: "Failed to fetch from Steam" });
  }
}

// App List
router.get("/IStoreService/GetAppList/v1/", (req, res) => {
  proxyToSteam(req, res, "/IStoreService/GetAppList/v1/");
});

// Schema
router.get("/ISteamUserStats/GetSchemaForGame/v2/", (req, res) => {
  proxyToSteam(req, res, "/ISteamUserStats/GetSchemaForGame/v2/");
});

// Inventory Meta
router.get("/IInventoryService/GetItemDefMeta/v1/", (req, res) => {
  proxyToSteam(req, res, "/IInventoryService/GetItemDefMeta/v1/");
});

// Inventory Data
router.get("/IGameInventory/GetItemDefArchive/v0001/", (req, res) => {
  proxyToSteam(req, res, "/IGameInventory/GetItemDefArchive/v0001/");
});

export default {
  endpoint: "/",
  router: router
};
