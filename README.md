### Installation

- Clone this repo
- npm install

### Generate a JWT token

    node encode.js

### Listen to received responses

- Generate a JWT token that includes a "callbackurl" that uses your computer's IP address.
- Run your mobile phone app on the same wifi as your computer, no VPN.
- Run the server:


		node server.js


- Let the mobile app (ex: DID App) handle a credaccess request and send the callbackurl.