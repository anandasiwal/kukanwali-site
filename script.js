// Sab links yahin bharo. Khali chhodne par button disable ho jata hai.
const CONFIG = {
  whatsappGroup: "https://chat.whatsapp.com/HzbrWaiLSrY7ErFzOdDgWq",
  whatsappNumber: "919660000367",  // country code ke saath, bina + ke
  callNumber: "919660000367",      // calling number, country code ke saath, bina +
  social: {            // jinka link ho wahi bharo (Facebook, Instagram, YouTube)
    Facebook: "https://www.facebook.com/AnandKAsiwal",
    Instagram: "https://www.instagram.com/anandkasiwal/",
    YouTube: ""
  },
  voteStart: "2026-11-16T07:00:00",  // matdan shuru (phone ke local time se)
  voteEnd: "2026-11-16T18:00:00",    // matdan samapt
  goatcounter: "anandasiwal"  // GoatCounter site code (goatcounter.com par bana hua), khali = analytics band
};

const ICONS = {
  Facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  YouTube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.4 3.1-5.4 3.1z"/></svg>',
  WhatsApp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7a11 11 0 0 1-4.8-4.2c-.4-.6-1.200-1.600-1.200-3s.7-2 1-2.300c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.300 1.800 2.100 1.200 1.100 2.300 1.400 2.600 1.600.3.1.5.1.6-.1l.9-1.100c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.300z"/></svg>'
};

// ---- links ----
const links = {
  group: CONFIG.whatsappGroup,
  dm: CONFIG.whatsappNumber ? `https://wa.me/${CONFIG.whatsappNumber}` : "",
  call: CONFIG.callNumber ? `tel:+${CONFIG.callNumber}` : ""
};

document.querySelectorAll("[data-link]").forEach(a => {
  const url = links[a.dataset.link];
  if (url) {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.setAttribute("aria-disabled", "true");
  }
});

document.getElementById("fab").innerHTML = ICONS.WhatsApp;

const socialBox = document.getElementById("social");
Object.entries(CONFIG.social).forEach(([name, url]) => {
  if (!url) return;
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  a.title = name;
  a.setAttribute("aria-label", name);
  a.innerHTML = ICONS[name] || name[0];
  socialBox.appendChild(a);
});

// ---- scroll reveal ----
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("in"));
}

// ---- countdown ----
const start = new Date(CONFIG.voteStart).getTime();
const end = new Date(CONFIG.voteEnd).getTime();
const cdD = document.getElementById("cd-d");
const cdH = document.getElementById("cd-h");
const cdM = document.getElementById("cd-m");
const cdRow = document.getElementById("cd-row");
const cdTitle = document.getElementById("cd-title");

function tick() {
  const now = Date.now();
  const left = start - now;
  if (left <= 0) {
    cdRow.hidden = true;
    cdTitle.className = "cd-msg";
    cdTitle.textContent = now < end
      ? "आज मतदान दिवस है। अपना वोट ज़रूर डालें 🙏"
      : "मतदान संपन्न। आप सभी का धन्यवाद 🙏";
    return;
  }
  const mins = Math.floor(left / 60000);
  cdD.textContent = Math.floor(mins / 1440);
  cdH.textContent = Math.floor((mins % 1440) / 60);
  cdM.textContent = mins % 60;
}
tick();
setInterval(tick, 30000);

// ---- analytics (GoatCounter): page visits + button clicks ----
if (CONFIG.goatcounter) {
  const gc = document.createElement("script");
  gc.async = true;
  gc.src = "//gc.zgo.at/count.js";
  gc.dataset.goatcounter = `https://${CONFIG.goatcounter}.goatcounter.com/count`;
  document.head.appendChild(gc);

  const clickName = a => {
    if (a.closest("#social")) return (a.title || "social").toLowerCase();
    const base = { group: "whatsapp-group", dm: "whatsapp-dm", call: "call" }[a.dataset.link];
    if (!base) return null;
    const where = a.id === "fab" ? "floating"
      : a.closest(".hero") ? "hero"
      : a.closest("footer") ? "footer"
      : "bottom";
    return `${base}-${where}`;
  };

  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a || a.getAttribute("aria-disabled") === "true") return;
    const name = clickName(a);
    if (name && window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: `click/${name}`, title: name, event: true });
    }
  });
}
