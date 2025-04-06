import React, { useRef, useState } from "react";

function Session() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCallStarted, setIsCallStarted] = useState(false);

  const servers = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302", // STUN server for public IP discovery
      },
    ],
  };

  // Start the call by accessing media devices and setting up peer connection
  const startCall = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = localStream;

      const connection = new RTCPeerConnection(servers);
      setPeerConnection(connection);

      localStream.getTracks().forEach((track) => connection.addTrack(track, localStream));

      // Handle remote stream
      connection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        remoteVideoRef.current.srcObject = remoteStream;
      };

      // Handle ICE candidate
      connection.onicecandidate = (event) => {
        if (event.candidate) {
          sendICECandidateToRemotePeer(event.candidate); // Send to remote peer
        }
      };

      // Create and send the offer
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      sendOfferToRemotePeer(offer); // Send to remote peer

      setIsCallStarted(true);
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  // Send the offer to remote peer (Placeholder for signaling server)
  const sendOfferToRemotePeer = (offer) => {
    console.log("Sending offer to remote peer:", offer);
    // Use signaling server (e.g., WebSocket) to send offer
  };

  // Send ICE candidate to remote peer (Placeholder for signaling server)
  const sendICECandidateToRemotePeer = (candidate) => {
    console.log("Sending ICE candidate to remote peer:", candidate);
    // Use signaling server (e.g., WebSocket) to send ICE candidate
  };

  // End the call by cleaning up local/remote streams and resetting state
  const endCall = () => {
    if (peerConnection) {
      peerConnection.close();
    }

    // Stop local stream tracks
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    // Reset remote video
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject = null;
    }

    setPeerConnection(null);
    setIsCallStarted(false);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-black">
      {/* Local Video */}
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover rounded-xl border-4 border-gray-800 shadow-lg"
      />

      {/* Remote Video */}
      <div className="absolute bottom-6 right-6 bg-black rounded-lg shadow-lg">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-40 h-30 object-cover rounded-lg border-4 border-white"
        />
      </div>

      {/* Call Control Buttons */}
      <div className="absolute top-6 left-6 flex space-x-6">
        {!isCallStarted ? (
          <button
            onClick={startCall}
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 shadow-lg focus:outline-none"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={endCall}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 shadow-lg focus:outline-none"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

export default Session;
