const isMobile = require("./isMobile");

function assignUser(clientIp, country, clientHeader, clientURL, clientReferrer, time, activeTime) {
    return { // Store client info in an object
        "Ip": clientIp,
        "Location": country,
        "User-Agent": clientHeader,
        "IsMobile": isMobile(clientHeader),
        "Url": clientURL,
        "Referrer": clientReferrer,
        "Date": time,
        "ActiveTimeInSecond": activeTime
    }
}

module.exports = assignUser;
