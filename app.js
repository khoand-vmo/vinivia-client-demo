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
