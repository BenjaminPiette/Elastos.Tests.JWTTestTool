const express = require('express')
const app = express()
const os = require("os")
var jwt = require('jsonwebtoken')
var bodyParser = require("body-parser");

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

function printJWT(jwtToken) {
    console.log();
    console.log("Received JWT:");
    console.log(jwtToken);
    console.log();

    console.log("Decoded JWT:");
    let jwtPayload = jwt.decode(jwtToken);
    console.log(jwtPayload);
    console.log("------ end --------");
}

app.get('/credaccessresponse/:JWT', function (req, res) {
    console.log("Received response scheme request.");

    console.log("Process redirecturl");
    printJWT(req.params.JWT);

    res.json({
        decoded: jwtPayload
    });
})

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/credaccessresponse", function (req, res) {
    console.log("post");
    console.log("Process callbackurl");
    printJWT(req.body.jwt);
    res.send(" post successfully!");
});

let port = 3020;
app.listen(port, '0.0.0.0', function () {
    console.log();
    console.log('Server is running at ' + getAllLocalIPAddresses() + ':'+port);
    console.log();
})

/**
 * Call example:
 *
 * http://localhost:3020/credaccessresponse/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBpZCI6IjQ0MDY0NWUyMWFhYmQ2ODIwMTEwZjNkYzI0NDllMDJlMDVhMmU3ZGMyOWE1ZjJhNTg4MmM1MDlhNTY2ZmQ3ZjJhYTRkMGJkMmJjYTA0MGEyZjNhN2RjOGI4ZGMyZWMxNGE5ODY4OGIyODYwMmY2YTJlZmIzZjA1MTNlZjA0YWM0IiwiaXNzIjoiZGlkOmVsYXN0b3M6aVVRdG9Ib1F4OHpneFJjTHg2RnhMS0U0ZVlKaUV6OG56QyIsImlhdCI6MTU2NjM1MjIxMywiZXhwIjoxNTY2MzgyMjEzLCJjYWxsYmFja3VybCI6Imh0dHA6Ly9ZT1VSSVA6MzAyMC9jcmVkYWNjZXNzcmVzcG9uc2UiLCJjbGFpbXMiOlt7ImVtYWlsIjp0cnVlfSx7Im5hbWUiOnRydWV9XX0.GqD1UZC_mDkzksSt_4QU6ZTlJaG2U8PIqEQ0M9oMpW4
 */
