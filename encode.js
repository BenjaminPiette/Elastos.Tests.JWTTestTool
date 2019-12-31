var jwt = require('jsonwebtoken');
const os = require("os")

function getAllLocalIPAddresses() {
    var allUsableInterfaces = [];

    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function(ifname) {
        ifaces[ifname].forEach(function(iface) {
            // Skip over non-ipv4 addresses and localhost
            if (iface.family !== 'IPv4' || iface.internal)
                return;

            allUsableInterfaces.push(iface);
        });
    });

    return allUsableInterfaces.map(addr => addr.address);
}
let url = "http://" + getAllLocalIPAddresses()[0] + ":3020/credaccessresponse";

let jwtClaims = {
    "appid": "",
    "iss":"did:elastos:iUQtoHoQx8zgxRcLx6FxLKE4eYJiEz8nzC",
    "iat":1566352213,
    // "exp":1566382213,
    "callbackurl":url,
    // "redirecturl": url //"myapp://elastosschemeresponse",
    "claims": {
        "email": true,
        "name": true
    },
    "anotherfield":"something"
}

console.log();
console.log("JWT PAYLOAD:");
console.log(jwtClaims);
console.log();

var token = jwt.sign(jwtClaims, 'secret', {algorithm: 'HS256'});

console.log();
console.log("JWT TOKEN:");
console.log();
console.log(token);
console.log();