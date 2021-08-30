let socket;
let attendeeIdDirectCall;
let roomId;

const connection = () => {
  const memberId = document.querySelector("#memberId").value;
  if (memberId) {
    var socketConnected = io("localhost:3000", {
      query: {
        userId: memberId,
        eventId: 91,
      },
    });
    if (socketConnected) {
      document.querySelector(
        "#welcome"
      ).innerHTML = `<h3>welcome ${memberId}<h3/>`;
    }
    socketConnected.on("Server:makeDirectCall", (msg) => {
      // alert(msg)
      console.log("Server:makeDirectCall ", msg);
      attendeeIdDirectCall = msg.partner.id;
      const isAccept = confirm(`Got a call from ${msg.partner}`);
      if (isAccept) {
        socket.emit("Client:acceptDirectCall", { partnerId: msg.partner.id });
      } else {
        socket.emit("Client:cancelDirectCall", {
          partnerId: attendeeIdDirectCall,
        });
      }
    });

    socketConnected.on("Server:startDirectCall", (message) => {
      roomId = message.room.roomId;
      console.log("Server:startDirectCall ", message);
      document.querySelector("#message").innerText = "start direct call!";
    });

    socketConnected.on("Server:endDirectCall", (message) => {
      console.log("Server:endDirectCall ", message);
      document.querySelector("#message").innerText = "end direct call!";
    });

    socketConnected.on("Server:cancelDirectCall", (message) => {
      console.log("Server:endDirectCall ", message);
      document.querySelector("#message").innerText = "cancel direct call!";
    });

    socketConnected.on("Server:workshopInfo", (message) => {
      console.log("message ", message);
      const workshopOfEventJson = JSON.stringify(message, (key, value) => {
        if (typeof value === "object" && value instanceof Set) {
          return [...value];
        }
        return value;
      });
      console.log("rs ", workshopOfEventJson);
    });

    console.log("socket ", socketConnected);
    socket = socketConnected;
  }
};

const makeDirectCall = () => {
  console.log("makeDirectCall ===", socket);
  socket.emit("Client:makeDirectCall", { partnerId: 464 });
  attendeeIdDirectCall = 464;
};

const endDirectCall = () => {
  socket.emit("Client:endDirectCall", {
    partnerId: attendeeIdDirectCall,
    roomId,
  });
};

const canDirectCall = () => {
  socket.emit("Client:cancelDirectCall", {
    partnerId: attendeeIdDirectCall,
  });
};

const readyNetworking = () => {
  socket.emit("Client:readyNetworking", {
    sessionId: 1276,
  });
};

const preJoinWorkshop = () => {
  socket.emit("Client:preJoinWorkshop", {
    sessionId: 1793,
  });
};

const joinWorkshop = () => {
  socket.emit("Client:joinWorkshop", {
    sessionId: 1793,
  });
};

const outWorkshop = () => {
  socket.emit("Client:outWorkshop", {
    sessionId: 1793,
  });
};

const publishCamera = (status) => {
  if (status) {
    socket.emit("Client:Workshop:publishCamera", {
      sessionId: 1793,
    });
  } else {
    socket.emit("Client:Workshop:unpublishCamera", {
      sessionId: 1793,
    });
  }
};

const prePublishCamera = () => {
  socket.emit("Client:Workshop:prePublishCamera", {
    sessionId: 1793,
  });
};

const kick = () => {
  var userId = prompt("Enter userId");
  console.log("userId ", userId);
  if (userId) {
    socket.emit("Client:Workshop:kick", {
      sessionId: 1793,
      userId: parseInt(userId),
    });
  }
};

const mute = () => {
  var userId = prompt("Enter userId");
  console.log("userId ", userId);
  if (userId) {
    socket.emit("Client:Workshop:turnOfCamera", {
      sessionId: 1793,
      userId: parseInt(userId),
    });
  }
};

const joinMainState = () => {
  socket.emit("Client:MainStage:join", {
    sessionId: 2093,
  });
};

const outMainState = () => {
  socket.emit("Client:MainStage:out", {
    sessionId: 2093,
  });
};

const msPublishCamera = (status) => {
  if (status) {
    socket.emit("Client:MainStage:publishCamera", {
      sessionId: 2093,
    });
  } else {
    socket.emit("Client:MainStage:unPublishCamera", {
      sessionId: 2093,
    });
  }
}

const msKick = () => {
  var userId = prompt("Enter userId");
  console.log("userId ", userId);
  if (userId) {
    socket.emit("Client:MainStage:kick", {
      sessionId: 2093,
      userId: parseInt(userId),
    });
  }
};

const msMute = () => {
  var userId = prompt("Enter userId");
  console.log("userId ", userId);
  if (userId) {
    socket.emit("Client:MainStage:turnOfOtherCamera", {
      sessionId: 2093,
      userId: parseInt(userId),
    });
  }
};

const msBroadcast = () => {
  const streamId1 = "asia-east2#asia-east2-c.PNQbKR60.20210825.PSQUdO9P";
  const streamId2 = "asia-east2#asia-east2-b.uHTcmk44.20210825.PSsIYgOA"
  const streams = [
    {
      streamId: streamId1,
      offset: { anchor: 'TopLeft', x: 0, y: 0 },
      width: 640,
      height: 720
    },
    {
      streamId: streamId2,
      offset: { anchor: 'TopLeft', x: 0, y: 0 },
      width: 150,
      height: 150
    }
  ]

  // var userId = prompt("Who are you?");
  socket.emit("Client:MainStage:broadcast", {
    streams,
    sessionId: 2093,
    // userId: parseInt(userId),
  })
} 

const startRecording = () => {
  const streamId1 = "asia-east2#asia-east2-c.PNQbKR60.20210825.PSQUdO9P";
  const streamId2 = "asia-east2#asia-east2-b.uHTcmk44.20210825.PSsIYgOA"
  const streams = [
    {
      streamId: streamId1,
      offset: { anchor: 'TopLeft', x: 0, y: 0 },
      width: 640,
      height: 720
    },
    {
      streamId: streamId2,
      offset: { anchor: 'TopLeft', x: 0, y: 0 },
      width: 150,
      height: 150
    }
  ]

  socket.emit("Client:MainStage:broadcast", {
    streams,
    sessionId: 2093,
  })
}

const stopRecording = () => {
  
}

// Breakout session
const preJoinBreakoutSession = () => {
  socket.emit("Client:BreakoutSession:preJoin", {
    sessionId: 2170,
  });
}

const joinBreakoutSession = () => {
  socket.emit("Client:BreakoutSession:join", {
    sessionId: 2170,
  });
}

const outBreakoutSession = () => {
  socket.emit("Client:BreakoutSession:out", {
    sessionId: 2170,
  });
}
