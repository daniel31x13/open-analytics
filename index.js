const assignUser = require("./lib/assignUser");
const geoip = require("fast-geoip");
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const cors = require("cors");

const PORT = process.env.PORT || 8080; // Edit port if needed
let count;
let totalClients = [];

// Connect to MongoDB
const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"; // Edit accordingly
const MClient = new MongoClient(uri);
MClient.connect().catch(console.error);

let results;
app.use(async (req, res, next) => {
  let lastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  );
  results = await MClient.db("DatabaseName") // Edit 'DatabaseName' & 'CollectionName' accordingly
    .collection("CollectionName")
    .find({Date: {$gt: lastMonth}})
    .toArray();
  next();
});

app.get("/api", cors(), (req, res) => {
  res.send(results);
});

app.get("/api/active", cors(), (req, res) => {
  res.send(count.toString());
});

// On connection
io.on("connection", async (socket) => {
  let clientIp = socket.request.connection.remoteAddress;
  let clientHeader = socket.request.headers["user-agent"];
  let geo = await geoip.lookup(clientIp.slice(7)); // Check location by ip (Does not work for local ip addresses)
  let clientURL;
  let clientReferrer;
  let isNewUser;

  // Add user to array
  totalClients.push(clientIp);

  // The number of unique clients from the array
  count = totalClients.filter(function (item, pos) {
    return totalClients.indexOf(item) == pos;
  }).length;

  const connectDate = new Date();

  console.clear(); // Clear previous log

  io.emit("socketClientID", socket.client.id);
  socket.on("clientMessage", (data) => { // Get data from client
    clientURL = data.url;
    clientReferrer = data.referrer;
    isNewUser = data.isFirstVisit;
    isNewUser = data.isFirstVisit;
  });

  // On disconnection
  socket.on("disconnect", () => {
    const disconnectDate = new Date();
    let activeTime = Math.ceil(
      (disconnectDate - connectDate) / 1000
    ).toString();

    // Remove user from array & update the number of unique clients from the array
    totalClients.splice(totalClients.indexOf(clientIp), 1);
    count = totalClients.filter(function (item, pos) {
      return totalClients.indexOf(item) == pos;
    }).length;

    let user = assignUser(
      clientIp,
      geo.country,
      clientHeader,
      clientURL,
      clientReferrer,
      connectDate,
      activeTime,
      isNewUser
    );

    // Add to DB
    MClient.db("DatabaseName").collection("CollectionName").insertOne(user); // Edit 'DatabaseName' & 'CollectionName' accordingly
  });
});

http.listen(PORT, () => {
  console.clear();
  console.log("ALL SET!");
});
