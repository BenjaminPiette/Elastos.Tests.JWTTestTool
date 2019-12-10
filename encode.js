var jwt = require('jsonwebtoken');

let jwtClaims = {
    "appid": "440645e21aabd6820110f3dc2449e02e05a2e7dc29a5f2a5882c509a566fd7f2aa4d0bd2bca040a2f3a7dc8b8dc2ec14a98688b28602f6a2efb3f0513ef04ac4",
    "iss":"did:elastos:iUQtoHoQx8zgxRcLx6FxLKE4eYJiEz8nzC",
    "iat":1566352213,
    "exp":1566382213,
    "callbackurl":"http://YOURIP:3020/credaccessresponse",
    //"redirecturl":"myapp://elastosschemeresponse",
    "claims": [
        {"email": true},
        {"name": true}
     ]
}

console.log();
console.log("JWT PAYLOAD:");
console.log(jwtClaims);
console.log();

var token = jwt.sign(jwtClaims, 'secret');

console.log();
console.log("JWT TOKEN:");
console.log();
console.log(token);
console.log();