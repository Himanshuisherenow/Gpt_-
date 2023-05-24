// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const listenButton = document.getElementById('listenButton');
const userSpeech = document.getElementById('userSpeech');

recognition.continuous = false;
recognition.lang = 'en-US';

listenButton.addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechResult = event.results[0][0].transcript;
  userSpeech.textContent = `You said: "${speechResult}"`;
  recognition.stop();
};

// Chat GPT API
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const responseDiv = document.getElementById('response');

sendButton.addEventListener('click', () => {
  const message = userInput.value;
  userInput.value = '';
  userSpeech.textContent = '';
  sendMessage(message);
});

function sendMessage(message) {
  const url = 'YOUR_API_ENDPOINT_URL';
  const apiKey = 'YOUR_API_KEY';
  
  const data = {
    message: message
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    const generatedText = result.choices[0].message.content;
    displayResponse(generatedText);
    speakResponse(generatedText);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function displayResponse(response) {
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = response;
}

// Text-to-Speech
function speakResponse(response) {
  const utterance = new SpeechSynthesisUtterance(response);
  speechSynthesis.speak(utterance);
}