const assignUser = require('./lib/assignUser');
const geoip = require('fast-geoip');
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
});

const cors = require('cors');

const PORT = process.env.PORT || 8080; // Edit port if needed
let count;
let totalClients = [];

// Connect to MongoDB
const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"; // Edit accordingly
const MClient = new MongoClient(uri);
MClient.connect().catch(console.error);

let results;
app.use(async (req, res, next) => {
    let threeMonthBefore = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()); // Last 14 days...
    results = await MClient.db("DatabaseName").collection("CollectionName").find({Date: {$gt: threeMonthBefore}}).toArray(); // Edit 'DatabaseName' & 'CollectionName' accordingly
    next();
});

app.get('/api', cors(), (req, res) => {
    res.send(results);
});

app.get('/api/active', cors(), (req, res) => {
    res.send(count.toString());
});

io.on('connection', async (socket) => { // On connection
    let clientIp = socket.request.connection.remoteAddress;
    let clientHeader = socket.request.headers['user-agent'];
    let geo = await geoip.lookup(clientIp.slice(7)); // Check location by ip (Does not work for local ip addresses)
    let clientURL;
    let clientReferrer;
    let isNewUser;

    totalClients.push(clientIp); // Add user to array

    count = totalClients.filter(function(item, pos) { return totalClients.indexOf(item) == pos }).length; // The number of unique clients from the array

    const connectDate = new Date();

    console.clear(); // Clear previous log
    console.log('Total Clients: ' + count);

    io.emit('socketClientID', socket.client.id);
    socket.on('clientMessage', (data) => { // Get url from client
        clientURL = data.url;
        clientReferrer = data.referrer;
        isNewUser = data.isFirstVisit;
        isNewUser = data.isFirstVisit;
    });

    socket.on('disconnect', () => { // On disconnection
        const disconnectDate = new Date()
        let activeTime = Math.ceil((disconnectDate-connectDate)/1000).toString();

        totalClients.splice(totalClients.indexOf(clientIp), 1); // Remove user from array
        count = totalClients.filter(function(item, pos) { return totalClients.indexOf(item) == pos }).length; // Update the number of unique clients from the array
    
        let user = assignUser(clientIp, geo.country, clientHeader, clientURL, clientReferrer, connectDate, activeTime, isNewUser);

        // Add to DB
        MClient.db("DatabaseName").collection("CollectionName").insertOne(user); // Edit 'DatabaseName' & 'CollectionName' accordingly

        console.clear(); // Clear previous log
        
        console.log('Total Clients: ' + count);
    });
});

http.listen(PORT, () => {
    console.clear();
    console.log("ALL SET!");
});
