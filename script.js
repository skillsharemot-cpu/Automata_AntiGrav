// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    observer.observe(element);
});

// Immediately trigger fade in for hero if visible
setTimeout(() => {
    document.querySelectorAll('.hero.fade-in').forEach(el => el.classList.add('visible'));
}, 100);

// Product Data for Modal
const products = {
    'colibri': {
        subtitle: 'AVANTGARDE ACOUSTIC · NÉMETORSZÁG',
        title: 'Colibri C2',
        image: './assets/colibri-c2_black_01_small-website-scaled.webp',
        description: 'A német Avantgarde Acoustic 30 éves kürtős technológiáját sűríti kompakt méretbe. 98 dB hatásfok, 117 dB maximális hangnyomás — szférikus kürttel és ultrakönnyű meghajtókkal. Az érzelem és a dinamika megtestesítője.',
        specs: '2 utas kürtös rendszer · 70–19 000 Hz · 98 dB hatásfok · 117 dB max SPL · 18,5 kg'
    },
    'amphion': {
        subtitle: 'AMPHION · FINNORSZÁG',
        title: 'Krypton3X',
        image: './assets/Krypton3X-Standard-White-Front-diagonally-shadow.png',
        description: 'A finn Amphion hangfalak páratlan tisztaságukról és természetes terükről ismertek. Skandináv eleganciájukkal bármely modern nappali díszeivé válnak, miközben felesleges színezés nélkül adják vissza a zene eredeti lelkét.',
        specs: '3 utas rendszer · 21–25 000 Hz · 89 dB hatásfok · Kardioid hangzásképzés · 72 kg'
    },
    'dls': {
        subtitle: 'DLS · SVÉDORSZÁG',
        title: 'Flatbox XL',
        image: './assets/FlatboxXLSvartMiljo_1to1_nogrill.jpg',
        description: 'Falra szerelhető, minimalista dizájnú hangszóró — szinte láthatatlanul simul az otthonába. Kettő darab 4 colos mélyközép meghajtó és 30 mm-es szövet magassugárzó biztosítja a gazdag, részletgazdag hangzást zenéhez és házimozi rendszerekhez egyaránt.',
        specs: '2x4" meghajtó · 30mm tweeter · 65-25 000 Hz · 89 dB · Falra szerelhető'
    }
};

// Modal Logic
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img-src');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalDesc = document.getElementById('modal-desc');
const modalSpecs = document.getElementById('modal-specs');

function openProductModal(productId) {
    const data = products[productId];
    if(data) {
        modalImg.src = data.image;
        modalSubtitle.textContent = data.subtitle;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;
        modalSpecs.textContent = data.specs;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeProductModal();
    }
}

// AI Chat Logic
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

let chatStep = 0;

function toggleChat() {
    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        // Scroll to bottom if opened
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

function handleChatEnter(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Add user message
    addMessage(text, 'user');
    chatInput.value = '';
    
    // Simulate AI thinking and replying
    setTimeout(() => {
        handleAiResponse(text);
    }, 1000);
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.classList.add(sender === 'user' ? 'md-user' : 'md-bot');
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleAiResponse(userText) {
    let response = "Köszönöm érdeklődését! Munkatársunk hamarosan keresni fogja. Szeretne addig egy időpontot egyeztetni a bemutatóterembe?";
    
    // Simple state machine mimicking the sketch: Cél: Érdeklődés, Árajánlat, Helység nagysága -> Javaslat -> Időpont
    if (chatStep === 0) {
        response = "Értem. Mielőtt pontos javaslatot és árajánlatot tudnék adni, megkérdezhetem, körülbelül mekkora az a helyiség (nappali, zene szoba), ahová a rendszert tervezi?";
        chatStep++;
    } else if (chatStep === 1) {
        response = "Köszönöm! Ehhez a mérethez nagyszerűen illene az Avantgarde Colibri vagy egy megfelelő teljesítményű Amphion rendszer. Szeretné meghallgatni budapesti showroomunkban? Kérem, adjon meg egy Önnek alkalmas időpontot és egy e-mail címet a véglegesítéshez.";
        chatStep++;
    } else {
        response = "Köszönöm az információkat! A megadott adatokat továbbítottam prémium tanácsadónknak, aki hamarosan felveszi Önnel a kapcsolatot.";
    }
    
    addMessage(response, 'bot');
}
