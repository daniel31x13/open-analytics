<div align="center">

# Open Analytics

![GitHub](https://img.shields.io/github/license/Daniel31x13/open-analytics)  ![GitHub top language](https://img.shields.io/github/languages/top/daniel31x13/open-analytics)

**Self-hosted, accurate analytics tool for your website in a clean minimalist interface.**
    
[Demo](https://open-analytics-demo.herokuapp.com/) (w/ fake data)

</div>

---

This project is a derivation of [open-analytics-core](https://github.com/Daniel31x13/open-analytics-core).
So like its predecessor it logs the following to a MongoDB database: Device Ip, User-agent, IsMobile, Date, Active Time (Seconds), Visited url, Location, Referrer...

### And uses those data to visualize:
- Average time on each page
- Current active users
- Most used device (Mobile/Desktop)
- Visits by each country
- Websites most users are comming from
- Top visited links
- New vs returning users
- Sum of all users activity per day

---
### Setup

#### First Step:
Clone this repository.

#### Second Step:
Add this code inside the `body` tag of whatever page you want to include in the analytics:

```javascript
// If you need to include in multiple pages, add the latter script tag to a seperate .js file to avoid unnecessary lines of code.
<script src="https://cdn.socket.io/4.4.0/socket.io.js"></script>
<script>
    let isFirstTime = true;
    if(document.cookie) {
    	isFirstTime = false
    } else {
        document.cookie = "name=hasVisited;path=/";
    }
    const socket = io("ADDRESS", {secure: true}); // replace ADDRESS with the ip of the api address & port.
    socket.on('socketClientID', function (socketClientID) {
        socket.emit('clientMessage', {url: window.location.href, referrer: document.referrer, isFirstVisit: isFirstTime});
    });
</script>
```
#### Third Step:
Edit the [`./src/config.json`](src/config.json) file accordingly:
```javascript
{
    "api": { // Edit here accordingly
        "port": 8070,
        "uri": "mongodb://localhost:27017",
        "databaseName": "DatabaseName",
        "collectionName": "CollectionName",
        "address": "http://192.168.1.7"
    },
    "tls_support": { // Leave this as is if you dont need HTTPS support
        "enabled": false,
        "key": "", // key.pem file path (relative to "./api/server.js")
        "cert": "" // cert.pem file path (relative to "./api/server.js")
    }
}
```

#### Fourth Step:
Run `(cd api && node server.js) & npm start` in the main folder, the dashboard will be available in [http://localhost:3000](http://localhost:3000/).
