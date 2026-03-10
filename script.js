/* --- CONFIGURACIÓN --- */
const BOT_ID = "TU_CLIENT_ID_AQUI"; // REEMPLAZA ESTO
const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${BOT_ID}&permissions=8&scope=bot`;

/* --- BOT INVITE BUTTON --- */
document.querySelectorAll(".invite, .hero-btn").forEach(btn => {
    btn.addEventListener("click", () => window.open(INVITE_URL, "_blank"));
});

/* --- ANIMATED STATS (CON INTERSECTION OBSERVER) --- */
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// Esto detecta cuando la sección de stats aparece en pantalla
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateValue("servers", 0, 1250, 2000);
        animateValue("users", 0, 45800, 2000);
        animateValue("commands", 0, 890432, 2000);
        statsObserver.unobserve(statsSection); // Solo se anima una vez
    }
}, { threshold: 0.5 }); // Se activa cuando se ve el 50% de la sección

if (statsSection) statsObserver.observe(statsSection);

/* --- TYPEWRITER EFFECT (FIXED) --- */
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const textToType = "Mejora tu servidor con TGXBot, un bot que ofrece moderación inteligente, niveles y roles automáticos para tu comunidad.";
    typewriterElement.innerHTML = '';
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            // Verificamos si lo que sigue es el nombre del bot
            if (textToType.substring(i, i + 6) === "TGXBot") {
                typewriterElement.innerHTML += `<span class="highlight">TGXBot</span>`;
                i += 6;
            } else {
                typewriterElement.innerHTML += textToType.charAt(i);
                i++;
            }
            setTimeout(typeWriter, 40); // Error corregido aquí (estaba 40:)
        } else {
            typewriterElement.style.borderRight = 'none';
        }
    }
    setTimeout(typeWriter, 1000);
}

/* --- FAQ ACCORDION (SMOOTH) --- */
document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isVisible = answer.style.display === "block";
        
        // Cerramos todos
        document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
        
        // Abrimos el actual si no estaba visible
        answer.style.display = isVisible ? "none" : "block";
    });
});

/* --- SCROLL REVEAL --- */
const revealConfig = {
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
    delay: 200,
    reset: true, // <--- CAMBIO CLAVE: Esto hace que la animación se repita siempre
    viewFactor: 0.2, // El elemento empieza a aparecer cuando se ve el 20%
    mobile: true     // Asegura que funcione en celulares
};

if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.hero', revealConfig);
    
    // Para las funciones, usamos un intervalo para que aparezcan en cascada
    ScrollReveal().reveal('.card', { 
        ...revealConfig, 
        interval: 200,
        cleanup: true // Ayuda al rendimiento si vas a usar reset: true
    });

    ScrollReveal().reveal('.stat', { 
        ...revealConfig, 
        interval: 150 
    });

    ScrollReveal().reveal('.features, .about, .commands, .preview, .faq', {
        ...revealConfig,
        delay: 300
    });
}

// Inicializamos si la librería existe
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.hero', revealConfig);
    ScrollReveal().reveal('.features', { ...revealConfig, delay: 300 });
    ScrollReveal().reveal('.about', { ...revealConfig, delay: 400 });
    ScrollReveal().reveal('.card', { ...revealConfig, interval: 200 });
    ScrollReveal().reveal('.stat', { ...revealConfig, interval: 150 });
}


// backToTop
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function checkSystemStatus() {
    const statusText = document.querySelector('.status-text');
    const statusDot = document.querySelector('.status-dot');

    // Aquí podrías hacer un fetch a tu bot en el futuro
    // Por ahora, simulamos una "conexión" exitosa
    setTimeout(() => {
        statusText.innerText = "Sistema Online";
        statusDot.style.backgroundColor = "#22c55e";
        statusDot.style.boxShadow = "0 0 10px #22c55e";
    }, 1500); 
}

// Llama a la función dentro de window.onload
window.addEventListener('load', () => {
    checkSystemStatus();
    // ... tus otras funciones (loadStats, etc)
});