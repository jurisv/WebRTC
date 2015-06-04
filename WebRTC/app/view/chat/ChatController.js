Ext.define('WebRTC.view.chat.ChatController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chat',

    config: {
        localConnection: null,
        remoteConnection: null,
        sendChannel: null,
        receiveChannel: null,
        pcConstraint: null
    },


    //Sencha UI relate here

    // NOTE: These need to be finished.

    onSend: function(button){
       var historyGrid = button.up('panel').down('grid'),
           message = button.up('toolbar').down('textfield');

       historyGrid.store.add({message:message.getValue()});
       message.setValue('');
       historyGrid.getView().scrollBy(0, 999999, true);
    },

    //RTC Related Below
    enableStartButton: function () {
      startButton.disabled = false;
    },

    disableSendButton: function () {
      sendButton.disabled = true;
    },

    createConnection: function () {
      dataChannelSend.placeholder = '';
      var servers = null,
      pcConstraint = null,
      dataConstraint = null;
      trace('Using SCTP based data channels');
      // SCTP is supported from Chrome 31 and is supported in FF.
      // No need to pass DTLS constraint as it is on by default in Chrome 31.
      // For SCTP, reliable and ordered is true by default.
      // Add localConnection to global scope to make it visible from the browser console.
      window.localConnection = localConnection =
          new RTCPeerConnection(servers, pcConstraint);
      trace('Created local peer connection object localConnection');

      sendChannel = localConnection.createDataChannel('sendDataChannel',
          dataConstraint);
      trace('Created send data channel');

      localConnection.onicecandidate = iceCallback1;
      sendChannel.onopen = onSendChannelStateChange;
      sendChannel.onclose = onSendChannelStateChange;

      // Add remoteConnection to global scope to make it visible from the browser console.
      window.remoteConnection = remoteConnection =
          new RTCPeerConnection(servers, pcConstraint);
      trace('Created remote peer connection object remoteConnection');

      remoteConnection.onicecandidate = iceCallback2;
      remoteConnection.ondatachannel = receiveChannelCallback;

      localConnection.createOffer(gotDescription1, onCreateSessionDescriptionError);
      startButton.disabled = true;
      closeButton.disabled = false;
    },

    onCreateSessionDescriptionError: function (error) {
      trace('Failed to create session description: ' + error.toString());
    },

    sendData: function () {
      var data = dataChannelSend.value;
      sendChannel.send(data);
      trace('Sent Data: ' + data);
    },

    closeDataChannels: function () {
      trace('Closing data channels');
      sendChannel.close();
      trace('Closed data channel with label: ' + sendChannel.label);
      receiveChannel.close();
      trace('Closed data channel with label: ' + receiveChannel.label);
      localConnection.close();
      remoteConnection.close();
      localConnection = null;
      remoteConnection = null;
      trace('Closed peer connections');
      startButton.disabled = false;
      sendButton.disabled = true;
      closeButton.disabled = true;
      dataChannelSend.value = '';
      dataChannelReceive.value = '';
      dataChannelSend.disabled = true;
      disableSendButton();
      enableStartButton();
    },

    gotDescription1: function (desc) {
      localConnection.setLocalDescription(desc);
      trace('Offer from localConnection \n' + desc.sdp);
      remoteConnection.setRemoteDescription(desc);
      remoteConnection.createAnswer(gotDescription2,
          onCreateSessionDescriptionError);
    },

    gotDescription2: function (desc) {
      remoteConnection.setLocalDescription(desc);
      trace('Answer from remoteConnection \n' + desc.sdp);
      localConnection.setRemoteDescription(desc);
    },

    iceCallback1: function (event) {
      trace('local ice callback');
      if (event.candidate) {
        remoteConnection.addIceCandidate(event.candidate,
            onAddIceCandidateSuccess, onAddIceCandidateError);
        trace('Local ICE candidate: \n' + event.candidate.candidate);
      }
    },

    iceCallback2: function (event) {
      trace('remote ice callback');
      if (event.candidate) {
        localConnection.addIceCandidate(event.candidate,
            onAddIceCandidateSuccess, onAddIceCandidateError);
        trace('Remote ICE candidate: \n ' + event.candidate.candidate);
      }
    },

    onAddIceCandidateSuccess: function () {
      trace('AddIceCandidate success.');
    },

    onAddIceCandidateError: function (error) {
      trace('Failed to add Ice Candidate: ' + error.toString());
    },

    receiveChannelCallback: function (event) {
      trace('Receive Channel Callback');
      receiveChannel = event.channel;
      receiveChannel.onmessage = onReceiveMessageCallback;
      receiveChannel.onopen = onReceiveChannelStateChange;
      receiveChannel.onclose = onReceiveChannelStateChange;
    },

    onReceiveMessageCallback: function (event) {
      trace('Received Message');
      dataChannelReceive.value = event.data;
    },

    onSendChannelStateChange: function () {
      var readyState = sendChannel.readyState;
      trace('Send channel state is: ' + readyState);
      if (readyState === 'open') {
        dataChannelSend.disabled = false;
        dataChannelSend.focus();
        sendButton.disabled = false;
        closeButton.disabled = false;
      } else {
        dataChannelSend.disabled = true;
        sendButton.disabled = true;
        closeButton.disabled = true;
      }
    },

    onReceiveChannelStateChange: function () {
      var readyState = receiveChannel.readyState;
      trace('Receive channel state is: ' + readyState);
    }


});
