# Open Analytics
### A somewhat "Minimalist" SEO analytic for your website.

This project is using the features of open-analytics-core and simply displaying them in a dashboard.

So like its predecessor it logs the following to a MongoDB database:
- #### Device Ip
- #### User-agent
- #### IsMobile
- #### Date
- #### Active Time (Seconds)
- #### Visited url
- #### Location
- #### Referrer

### Demo

![alt demo](assets/demo.gif)

------------
### Requirements
These are the versions that I had so it **may** work on your PC if you had an older version installed:
- #### NodeJS (version 16 or later)
- #### MongoDB (version 5 or later)
- #### Any other webserver that you want to serve your clients with (even NodeJS)
- #### OpenSSL (Optional: For HTTPS setup.)

------------
### Setup

#### First Step
Add this code to your client HTML page ([Example](assets/clientExample.html "Example")):

```javascript
<script src="https://cdn.socket.io/4.4.0/socket.io.js"></script>
<script>
    let isFirstTime = true;
    if(document.cookie) {
    	isFirstTime = false
    } else {
        document.cookie = "name=hasVisited;path=/";
    }
    const socket = io("ADDRESS");
    socket.on('socketClientID', function (socketClientID) {
        socket.emit('clientMessage', {url: window.location.href, referrer: document.referrer, isFirstVisit: isFirstTime});
    });
</script>
```

#### Second Step
Run `npm install` in the main folder.
After that type `cd dashboard` and rerun `npm install`.
#### Third Step
And finally run `npm run dev` (in the main folder).

------------

### HTTPS Setup
If your website is using HTTPS instead of HTTP you'll need to do the steps which are shown below:
#### First Step
To set up HTTPS support you'll need an [SSL certificate](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/ "SSL certificate").
To generate a self-signed certificate, run the following in your shell:

    openssl genrsa -out key.pem
    openssl req -new -key key.pem -out csr.pem
    openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
    rm csr.pem
    
#### Second Step
After getting your `.pem` files just change line [7](https://github.com/Daniel31x13/open-analytics/blob/14aa0a39bd2af7f432d7a0c044b4af3fbd781058/index.js#L7) to [12](https://github.com/Daniel31x13/open-analytics/blob/14aa0a39bd2af7f432d7a0c044b4af3fbd781058/index.js#L12) (index.js file) with this: 

```javascript
const options = {
    key: fs.readFileSync('key.pem'), // Edit key.pem file path if needed (Default: Main folder)
    cert: fs.readFileSync('cert.pem'), // Edit key.pem file path if needed (Default: Main folder)
    cors: {
        origin: '*',
      }
}

const https = require('https').createServer(options, app);
const io = require('socket.io')(https, {
    cors: {
      origin: '*',
    }
});
```
#### Third Step
You'll need to add the `fs` module so add `const fs = require('fs');` at top of the index.js file.

#### Fourth Step
Change line [83](https://github.com/Daniel31x13/open-analytics/blob/14aa0a39bd2af7f432d7a0c044b4af3fbd781058/index.js#L83) to [86](https://github.com/Daniel31x13/open-analytics/blob/14aa0a39bd2af7f432d7a0c044b4af3fbd781058/index.js#L86) (bottom of the index.js file) with this:

```javascript
https.listen(PORT, () => {
    console.log("ALL SET!");
});
```

#### Fifth Step
Lastly change `const socket = io("ADDRESS");` to `const socket = io("ADDRESS", {secure: true});` where ever your using the [client script](assets/clientExample.html "client script").
