# A simple demonstration of <a href="http://http://www.webrtc.org/" target="_new">WebRTC</a> powered by OpenTok and the Sencha Ext6 Framework. 
## Overview
So you want to do peer-to-peer audio and video calls. 

What you might not be aware of is that there are a lot of behind the scenes 
optimizations that are taken care of by using the <a href="http://tokbox.com/" target="_new">TokBox</a> services. 

You also want an extensible web framework that ties into your enterprise strategy. This is where <a href="http://www.sencha.com/" target="_new">Sencha ExtJs</a> excels. 

Finally you would like something that can handle data in real-time in both directions. You want to make a change locally and have your change is replicated to all connected clients. 

In addition you want changes that other participants are making to show up on your client.

By using websockets and <a href="http://www.sencha.com/" target="_new">ExtJs 6</a> 'Data Binding' changes are pushed directly into your client without reloading the page or even performing AJAX polling.

ExtJs is providing not only 'responsive' but many components of <a href="http://www.reactivemanifesto.org/" target="_new">'reactive design'</a> architecture as well. Note: Not all the components of reactive systems are present in this demo.

This demonstration example requires <a href="http://nodejs.org/" target="_new">node.js</a> some API keys from the providers and a WebRTC compatible browser (Chrome or Firefox on the desktop).

Currently IOS and Android mobile browsers are not supported. Neither are many older browsers, Safari or Internet Explorer.

## Screenshots
## Getting Started
### Step 1. Get your OpenTok Api Key
### Step 2. Get your Firebase Api Key
If you need to sign up start here. <a href="https://www.firebase.com/signup/" target="_new">https://www.firebase.com/signup/</a>

### Step 3. Start Server & Initial Setup
### Step 4. Login
### Step 5. Create First Room & Invite Others
### Step 6. Startup a video / audio chat
## What does this repository include?

### On the client side
Nearly all of the client side features are provided by the ExtJs 6 framework. The two notable additions are the <a href="http://tokbox.com/" target="_new">TokBox</a>  JS library and the Socket.io library.

### On the server side
The server is a node.js server running the Express middlewear. The Express app uses npm modules for <a href="http://tokbox.com/" target="_new">TokBox</a> , <a href="http://firebase.com/" target="_new">Firebase</a>  (for storage), <a href="http://socket.io/" target="_new">Socket.io</a> and a few other minor dependencies for compression, server configuration and other utilties. 

#### Server Modes
There are both development and production builds of the <a href="http://http://www.webrtc.org/" target="_new">WebRTC</a> application.
 
By default the node.js server will serve up a production version of the app. This means the js and css is compressed into one file each, and minified.
 
The development version, however, will load all the uncompressed source files dynamically.

To run the server in development mode and begin extending this demo for your own needs you will simply need to include an environment variable parameter when the server starts up.

<code>NODE_ENV=development</code>

#### Server Configuration
The server will need to be setup to run correctly for the first time. This data can be manually entered into the <code>/server/server-config.json</code> file or it can be entered using a web browser the first time the server is started.

If you want to change the server configuration at any time you can edit this file -or- you can sign-out and the login as 'admin'. From the admin user you can click the 'config' button on the top right of the screen. 

This is not meant to suggest that this type of authentication is ready for production as there is no security/authorization in this demo. The user name is simply and easy shortcut to edit the server settings for getting this demo up and running quickly.

 

