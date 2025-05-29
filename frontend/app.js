const apiUrl = "/api/chat";
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

function sendMessage() {
    const message = chatInput.value;
    if (!message) return;
    chatMessages.innerHTML += `<div class='msg user'>${message}</div>`;
    fetch(apiUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message})
    })
    .then(res => res.json())
    .then(data => {
        chatMessages.innerHTML += `<div class='msg bot'>${data.response}</div>`;
        chatInput.value = "";
    });
}

function startVoiceInput() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice input not supported in this browser.");
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = function(event) {
        chatInput.value = event.results[0][0].transcript;
        sendMessage();
    };
}
