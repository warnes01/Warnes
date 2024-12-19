// Kar animasyonunu başlat
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflakes() {
    for (let i = 0; i < 100; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 1 + 0.5
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();

    for (let i = 0; i < snowflakes.length; i++) {
        let flake = snowflakes[i];
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    }

    ctx.fill();
}

function updateSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
        let flake = snowflakes[i];
        flake.x += flake.speedX;
        flake.y += flake.speedY;

        if (flake.y > canvas.height) {
            flake.y = -flake.radius;
        }
        if (flake.x > canvas.width) {
            flake.x = 0;
        } else if (flake.x < 0) {
            flake.x = canvas.width;
        }
    }
}

// Mesaj Gönderme Fonksiyonu
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<span class="username">User:</span> ${messageText} ❄️`;
        messagesContainer.appendChild(messageElement);

        // Mesajı yazdıktan sonra inputu temizle
        messageInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // En son mesaja kaydır
    }
}

// Kar animasyonunu sürekli güncelle
createSnowflakes();
function animateSnowflakes() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animateSnowflakes);
}

animateSnowflakes();
