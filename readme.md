# Sample Twilio Video App

A basic working example of a P2P video chatroom application that makes use of Twilio's API; the backend is a very simple Express server that holds the Twilio Keys and dispatches tokens; the front-end is a React SPA. 
Both need their own .env files

For the server:
```
TWILIO_ACCOUNT_SID={{account_sid}}
TWILIO_API_KEY={{specific key identifier}}
TWILIO_API_SECRET={{specific key secret}}
```

, and for the front:
```
VITE_API_URL={{deployed server url}}
```

There's plenty of styling and in-call functionalities missing, and it's a very barebones implementation, but both Video and Audio transmissions seem to be working properly.

Thanks for the opportunity.

- jf

