# Teravoz Challenge

Teravoz API Client Mocked Project.

# Challenge
  
  * A call center would receive a call and a receptionist was going to start the call by delegating this client to a certain queue (returning clients or new ones).
  * It was required to consume every event calling a webhook.
  
# Solution Ideas
  * I decided to take advantage of NodeJS EventEmitters for that kind purpose. Why? With those observables, I could control the     flow of a call.
  * In terms of persistence, it was kind of complex, because I decided to use filesystem itself. It was a great experience         with data structure and NodeJS FS Library tough.
  * I could not understand so well the challenge on github, so that I mocked the Dialer Teravoz API (This feature is working, but only locally). Later on, Saroka changed the README.md, it made me think of other possible solution, so I added external calls as well.
  * For the webhook, I launched an API that renders a dashboard (using EJS) showing calls and current events, and an extra route /webhook to receive every event emitted by the call, and emit through socket.io to front-end /events.
  * For testing purposes, there were no surprises. Using, mocha to run tests, chai/nodejs for assertion. I tested all the persistent and utilitary modules. 
  
# How does it work?



NodeJS 8.9.4

#Fir
