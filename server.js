const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Demo in-memory data. Replace with PostgreSQL/MySQL in production.
const users = new Map();
const calls = [];

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "NigeriaCall API", mode: "starter" });
});

app.post("/api/auth/request-otp", (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ error: "Phone number is required." });

  // IMPORTANT: connect your real OTP provider here.
  res.json({
    ok: true,
    message: "OTP request accepted. Connect an OTP provider to send the real code.",
    phone
  });
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { phone, otp } = req.body || {};
  if (!phone || !otp) return res.status(400).json({ error: "Phone and OTP are required." });

  // IMPORTANT: validate OTP through your real provider here.
  if (String(otp).length !== 6) return res.status(400).json({ error: "OTP must contain 6 digits." });

  users.set(phone, { phone, balance: users.get(phone)?.balance ?? 0 });
  res.json({ ok: true, message: "Demo verification successful.", user: users.get(phone) });
});

app.get("/api/wallet/:phone", (req, res) => {
  const user = users.get(req.params.phone) || { phone: req.params.phone, balance: 0 };
  res.json(user);
});

app.post("/api/calls/quote", (req, res) => {
  const { destination } = req.body || {};
  if (!destination) return res.status(400).json({ error: "Destination is required." });

  // Example rate only. Set your real commercial rate in the admin system.
  res.json({ destination, currency: "NGN", ratePerMinute: 25 });
});

app.post("/api/calls/start", (req, res) => {
  const { phone, destination } = req.body || {};
  if (!phone || !destination) return res.status(400).json({ error: "Phone and destination are required." });

  // IMPORTANT: connect a compliant VoIP/telephony provider here.
  const call = {
    id: "call_" + Date.now(),
    phone,
    destination,
    status: "provider_not_connected",
    createdAt: new Date().toISOString()
  };
  calls.push(call);

  res.status(202).json({
    ok: true,
    call,
    message: "Call request created. Connect a VoIP provider for real calling."
  });
});

app.get("/api/calls/:phone", (req, res) => {
  res.json(calls.filter(c => c.phone === req.params.phone));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`NigeriaCall running at http://localhost:${PORT}`);
});
