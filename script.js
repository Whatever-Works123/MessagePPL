const chats = [
  {
    id: "math-squad",
    name: "Math Squad",
    subtitle: "Algebra review at 7?",
    members: "You, Aria, Cam, Zane",
    messages: [
      { from: "other", text: "Anyone understand #14 from the worksheet?", time: "3:42 PM" },
      { from: "self", text: "Yeah, isolate x first and then plug into the second equation.", time: "3:44 PM" },
      { from: "other", text: "Legend. I owe you cafeteria fries tomorrow.", time: "3:45 PM" }
    ]
  },
  {
    id: "history-project",
    name: "History Project",
    subtitle: "Slides are almost done",
    members: "You, Nia, Mateo",
    messages: [
      { from: "other", text: "I added the civil rights timeline section.", time: "2:11 PM" },
      { from: "self", text: "Looks good. I'll do citations + images.", time: "2:19 PM" }
    ]
  },
  {
    id: "homeroom",
    name: "Homeroom 2B",
    subtitle: "Quiz moved to Friday",
    members: "Class channel",
    messages: [{ from: "other", text: "Reminder: bring calculators tomorrow.", time: "8:06 AM" }]
  }
];

const chatList = document.getElementById("chatList");
const messageThread = document.getElementById("messageThread");
const activeChatName = document.getElementById("activeChatName");
const activeChatMeta = document.getElementById("activeChatMeta");
const activeAvatar = document.getElementById("activeAvatar");
const composer = document.getElementById("composer");
const messageInput = document.getElementById("messageInput");

let activeChatId = chats[0].id;

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function renderChatList() {
  chatList.innerHTML = "";

  chats.forEach((chat) => {
    const li = document.createElement("li");
    li.className = `chat-item${chat.id === activeChatId ? " active" : ""}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = initials(chat.name);

    const chatText = document.createElement("div");
    chatText.className = "chat-text";

    const title = document.createElement("h3");
    title.textContent = chat.name;

    const subtitle = document.createElement("p");
    subtitle.textContent = chat.subtitle;

    chatText.append(title, subtitle);
    li.append(avatar, chatText);

    li.addEventListener("click", () => {
      activeChatId = chat.id;
      render();
    });

    chatList.appendChild(li);
  });
}

function renderMessages(activeChat) {
  messageThread.innerHTML = "";

  activeChat.messages.forEach((entry) => {
    const article = document.createElement("article");
    article.className = `message ${entry.from}`;

    const body = document.createElement("p");
    body.textContent = entry.text;

    const time = document.createElement("small");
    time.textContent = entry.time;

    article.append(body, time);
    messageThread.appendChild(article);
  });

  messageThread.scrollTop = messageThread.scrollHeight;
}

function render() {
  const activeChat = chats.find((chat) => chat.id === activeChatId);
  if (!activeChat) return;

  activeChatName.textContent = activeChat.name;
  activeChatMeta.textContent = activeChat.members;
  activeAvatar.textContent = initials(activeChat.name);

  renderChatList();
  renderMessages(activeChat);
}

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = messageInput.value.trim();
  if (!value) return;

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  if (!activeChat) return;

  activeChat.messages.push({
    from: "self",
    text: value,
    time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  });

  activeChat.subtitle = value;
  messageInput.value = "";
  render();
});

render();
