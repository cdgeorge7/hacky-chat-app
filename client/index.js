const WEBSOCKET_URL =
  "wss://o8uxzzekq7.execute-api.us-east-2.amazonaws.com/Prod";

var ws;

const connectButton = document.getElementById("connect");
const sendButton = document.getElementById("send");
const disconnectButton = document.getElementById("disconnect");
const messageArea = document.getElementById("message");
const chatDisplay = document.getElementById("chat");
const nameInput = document.getElementById("name");

const displayMessage = () => {};

connectButton.addEventListener("click", (e) => {
  ws = new WebSocket(WEBSOCKET_URL);
  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        action: "sendmessage",
        data: `${nameInput.value} has entered the chat...`,
      })
    );
  });
  ws.addEventListener("message", (message) => {
    const messageSpan = document.createElement("span");
    messageSpan.innerHTML = message.data;
    chatDisplay.appendChild(messageSpan);
  });
  connectButton.disabled = true;
  sendButton.disabled = false;
  disconnectButton.disabled = false;
  nameInput.disabled = true;
});

sendButton.addEventListener("click", (e) => {
  //console.log(messageArea.value);
  ws.send(
    JSON.stringify({
      action: "sendmessage",
      data: `${nameInput.value}: ${messageArea.value}`,
    })
  );
  messageArea.value = "";
});

messageArea.addEventListener("keypress", (e) => {
  let key = e.key;
  if (key === "Enter") {
    ws.send(
      JSON.stringify({
        action: "sendmessage",
        data: `${nameInput.value}: ${messageArea.value}`,
      })
    );
    messageArea.value = "";
    e.preventDefault();
  }
});

disconnectButton.addEventListener("click", (e) => {
  ws.send(
    JSON.stringify({
      action: "sendmessage",
      data: `${nameInput.value} has left the chat!`,
    })
  );
  ws.close();
  connectButton.disabled = false;
  sendButton.disabled = true;
  disconnectButton.disabled = true;
  nameInput.disabled = false;
});

// connectButton.onclick = (e) => {
// };
