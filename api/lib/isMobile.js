function isMobile(clientHeader) { // Checks if client is mobile
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return clientHeader.match(toMatchItem);
    });
}

module.exports = isMobile;