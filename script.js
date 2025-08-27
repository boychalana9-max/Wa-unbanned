function generateMessage() {
  const number = document.getElementById('number').value.trim();
  const banType = document.getElementById('banType').value;
  const reason = document.getElementById('reason').value;
  const script = document.getElementById('scriptVersion').value;

  if (!number || !banType || !reason || !script) {
    alert("Please fill all fields!");
    return;
  }

  const scripts = {
    v1: `My WhatsApp account ${number} was mistakenly banned. This account is important for ${reason}. Please review and unblock it.`,
    v2: `Dear WhatsApp Support, my account ${number} has been disabled. I rely on it for ${reason}. Kindly lift the ban.`,
    v3: `I cannot access my WhatsApp account ${number} which I use for ${reason}. Please help me restore it as soon as possible.`,
    v4: `Hello, my account ${number} seems to be banned. This is my primary account for ${reason}. Please unblock it.`,
    v5: `My account ${number} has been disabled unexpectedly. I need it for ${reason}. Requesting immediate unban.`,
    v6: `I am unable to access my WhatsApp account ${number} related to ${reason}. Please review and remove the ban so I can continue my work.`,
    v7: `WhatsApp team, my account ${number} is banned. I need it for ${reason}. Please unblock my account urgently.`,
    v8: `I rely on my WhatsApp account ${number} for ${reason}. The ban is affecting my tasks. Kindly help me recover it.`,
    v9: `My account ${number} is currently banned, and it is crucial for ${reason}. I request the support team to unblock it immediately.`,
    v10: `Dear WhatsApp Support, my WhatsApp account ${number} has been disabled. This account contains all my ${reason}. Please unblock it at the earliest.`
  };

  document.getElementById('generatedMessage').value = scripts[script];
}

function sendEmail() {
  const number = document.getElementById('number').value.trim();
  const banType = document.getElementById('banType').value;
  const reason = document.getElementById('reason').value;
  const script = document.getElementById('scriptVersion').value;
  const message = document.getElementById('generatedMessage').value;

  if (!number || !banType || !reason || !script) {
    alert("Please fill all fields before sending email!");
    return;
  }

  // For backend (Node.js)
  fetch('http://localhost:5000/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(data.success);
    } else {
      alert("Failed to send email");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error sending email");
  });
}
