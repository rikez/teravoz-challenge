# Teravoz Challenge

## Task 1 - Proud of

There are actually three applications I feel proud of myself for developing/taking part of. First of them, "Data Driven" project at Hypnobox. This one I won't be able to show, but it was a huge challenge, because of the quality, fastness, and high-end technologies me and a colleague used. It is a macro reporting application with more than 180 reports used for consultant to real estate Headers Company. 

Second one, was at Hypnobox as well. It was a integration with Emobi service, adding proposal features in the CRM, for brokers with its clients. It was a challenge and I'm proud of due to the hardship to accomplish and deal with Emobi unstable services. At the end, many real estate companies provided plenty of positive feebacks.

Last one is attached to the e-mail I sent. It was a freelance I've done with a friend. It may be the most challenging and effective application I have made. This application is a generic checkout that integrates with Woocommerce, Pagseguro and Salesforce. I'm proud of that because of the code quality, client conversions, client feedback, high-end technologies used. 

Back-end: NodeJS (Typescript)
Front-end: VueJS (Server-side rendering with Nuxt.js),
Databases: Redis, MySQL

*How is it used*




To check this application in production as well, go to http://lp.crescimentum.com.br/app/home/ , and click on "Garantir Ingresso".


It was



# Task 3 Challenge

Teravoz API Client Mocked Project.
  
  * A call center would receive a call and a receptionist was going to start the call by delegating this client to a certain queue (returning clients or new ones).
  * It was required to consume every event calling a webhook.
  
# Solution Ideas
  * I decided to take advantage of NodeJS EventEmitters for that kind purpose. Why? With those observables, I could control the     flow of a call.
  * In terms of persistence, it was kind of complex, because I decided to use filesystem itself. It was a great experience         with data structure and NodeJS FS Library though.
  * I could not understand so well the challenge on github, so that I mocked the Dialer Teravoz API (This feature is working, but only locally). Later on, Saroka changed the README.md, it made me think of other possible solution, so I added external calls as well.
  * For the webhook, I launched an API that renders a dashboard (using EJS) showing calls and current events, and an extra route /webhook to receive every event emitted by the call, and emit through socket.io to front-end /events.
  * For testing purposes, there were no surprises. Using, mocha to run tests, chai/nodejs for assertion. I tested all the persistent and utilitary modules. 
  
# How does it work?

### Using Environment Options


##### Copy src/config/env.example.json -> src/env.json
##### .env in the root folder may contain a property ENV=(DEV|PROD|TESTING), copy .env.example -> .env.

```json
{
    "CLIENT_PATH":"PERSISTENCE PATH OF CLIENT", 
    "RETURNING_QUEUE_PATH":"PERSISTENCE OF RETURNING CLIENT QUEUE",
    "NEW_QUEUE_PATH":"PERSISTENCE PATH OF NEW CLIENT QUEUE",
    "CALLS_PATH":"PERSISTENCE PATH OF CALLS",
    "OUR_NUMBER":"CALL CENTER NUMBER",
    "WEBHOOK_URL": "WEBHOOK ENDPOINT",
    "RETRIES": " DIALING MAX RETRY CALLING A NUMBER OPTION ",
    "BASE_URL_RECORD": " URL OF THE AVAILABLE RECORD",
    "PORT":"API PORT",
    "DEBUG_EVENTS": "SHOULD EVENTS BE LOGGED IN CONSOLE"
}```



## Use two screens for testing (Recommended) - Notebook plugged in a Monitor Screen.

### Receive Call Mode Steps.

1. Open a terminal, start api with command *npm run api*.

2. Open browser at http://localhost:{PORT}/events

3. Open another terminal, start the call with command  *npm run call*, and interact with the console.

4. You will see information of the events being logged in console.

5. Check events at http://localhost:{PORT}/events

6. Finally, check the following urls http://localhost:{PORT}/calls

### Dialing Mode Steps.

1. Open a terminal, start api with command *npm run api*.

2. Open browser at http://localhost:{PORT}/events

3. Make a POST request to http://localhost:{PORT}/v1/api/dial, passing the following parameter: 

```json {
  numbers: ['11940289846', '11996763838', '1123232332'],
}```

4. You will see information of the events being logged in console.

5. Check events at http://localhost:{PORT}/events

6. Finally, check the following urls http://localhost:{PORT}/calls

### Deploy ?

* I have deployed the api. It is available at 198.211.105.96:8080.

#### You will only be able to see a list of calls in dialing mode ( check steps above ).

#### You can see current events list by changing env.json WEBHOOK_URL to 198.211.105.96:8080/v1/api/webhook locally.

## Task 4 - Feedback
 
 Since I've applied to Teravoz NodeJS Fullstack spot, I have been motivated. By showing us the challenge, I told myself, this is going to be tough. Why? I had no knowledge on phone operators companies, PABX, ..etc.
 













