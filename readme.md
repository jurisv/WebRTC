# A simple demonstration of <a href="http://http://www.webrtc.org/" target="_new">WebRTC</a> powered by OpenTok and the <a href="http://www.sencha.com/" target="_new">Sencha</a> ExtJs 6 Framework. 
## Overview
So you want to do peer-to-peer audio and video calls. 

Your thinking WebRTC is the way to go. We agree.

However, WebRTC with more than two people can get complicated. 

But don't worry. 

All that complexity of the behind the scenes optimizations for multi-node video streams are taken care of by using the <a href="http://tokbox.com/" target="_new">TokBox</a> services. 


You'll also want an extensible web framework that ties into your enterprise strategy. This is where <a href="http://www.sencha.com/" target="_new">Sencha ExtJs</a> excels. 

Finally you would like something that can handle data in real-time in both directions. You want to make a change locally and have your change is replicated to all connected clients. 

In addition you want changes that other participants are making to show up on your client.

By using websockets and <a href="http://www.sencha.com/" target="_new">ExtJs 6</a> 'Data Binding' changes are pushed directly into your client without reloading the page or even performing AJAX polling.

ExtJs is providing not only 'responsive' but many components of <a href="http://www.reactivemanifesto.org/" target="_new">'reactive design'</a> architecture as well. Note: Not all the components of reactive systems are present in this demo.

This demonstration example requires <a href="http://nodejs.org/" target="_new">node.js</a> some API keys from the providers and a WebRTC compatible browser (Chrome or Firefox on the desktop).

Currently IOS and Android mobile browsers are not supported. Neither are many older browsers, Safari or Internet Explorer.

## Screenshots


## PRE REQUISITES
First you will need to:
<ol>
<li>Make sure <a href="https://nodejs.org/download/">node.js</a> is installed.
<li>Make sure you have <a href="http://www.sencha.com/" target="_new">Sencha Framework and Sencha CMD</a> installed.
<li>Clone this repository to your local machine.
<li>Get an OpenTok account.
<li>Get a Firebase Account.
</ol>




### Step 1. Get your OpenTok Api Key
You'll need an API key from tokbox. It's free for a trial so <a href="https://dashboard.tokbox.com/users/sign_up"  target="_new">signup</a> from the tokbox home page.

Once your signed in you will need to goto your dashboard and get an ApiKey and ApiSecretKey.

The screen should look something like this:

<img src="/WebRTC/resources/images/TokBoxApi.png" border=0 width=600 />

### Step 2. Get your Firebase Api Key
If you need to sign up start here. <a href="https://www.firebase.com/signup/" target="_new">https://www.firebase.com/signup/</a> a free trial should work as well.

You will then need to get your secret key and URL for this Firebase.

The screen should look something like this:

<img src="/WebRTC/resources/images/FireBaseApi.png" border=0 width=600 />

### Step 3. Start Server & Initial Setup

Once you have node installed, your Api Keys and URL and the Sencha Framework and CMD installed its time to get the server running.

Using your terminal navigate to the folder for this repository and navigate to the 'server' sub-directory.

-use the path to your node server-

From here we wil start the server in development mode. This is done by setting the an environment variable.

type:  NODE_ENV=development /usr/local/bin/node server.js  

The server is set to startup on port 8000. So lets navigate there and make sure we see the app.

<a href="http://localhost:8000/" target="_new">http://localhost:8000/</a>

On your initial startup you should see an administrative setup screen like this:

<img src="/WebRTC/resources/images/DefaultSettings.png" border=0 width=600 />

Replace the Base URL with your Firebase URL, fill in all the other fields and then hit OK.
 
In order to have these settings saved to your filesystem you will want to restart your node server now.

Use the same development mode startup and then reload your browser.

This time you should see a prompt for a login.

### Step 4. Login

Once your settings have been saved and the server restarted all new users will receive a login screen like this:

<img src="/WebRTC/resources/images/Login.png" border=0 width=600 />

Use any name you want. If you need to change your administrative settings then you will want to login as 'admin'.

Using the 'admin' login will provide a settings button for you to change your server settings.


### Step 5. Create First Room & Invite Others

In order to chat and do video conferences you will need to create a room.

To do that you can press the new room button in the top navigation. You should then see a form like this:

<img src="/WebRTC/resources/images/NewRoom.png" border=0 width=600 />

Private rooms are not visible in the room selector. Lets create a public room to start.

If you are running locally and don't have a URL you will need to give people the IP address where your name service is running.

Share your IP address ( with port 8000 ) and have someone join you in your new room.

### Step 6. Startup a video / audio chat

Now that you can join rooms; you can see and hear others in the room if they are broadcasting.

To broadcast to the room, decide how you want to broadcast Audio Only or Video. 

If you choose video you can later decide to hide your video and still use audio. If you choose audio, at no time will your video be sent.

Click either the 'call' or 'camera' icons below your avatar silhouette.

Now you will need to give permission to access the camera and microphone. Granting access should look something like this:

<img src="/WebRTC/resources/images/AllowAccess.png" border=0 width=600 />

Grant access and you you should see your camera feed replace the avatar. Now when new people join they will see your video at the bottom of their screen like this:


<img src="/WebRTC/resources/images/VideoRoom.png" border=0 width=600 />

Congrats. You are now running secure peer-to-peer video conferencing. What you do with it is up to you... 

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

 

