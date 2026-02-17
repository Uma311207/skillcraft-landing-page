// Tailwind Script (in head already)
tailwind.config = { content: ["./**/*.{html,js}"], theme: { extend: {} } };

// Theme Toggle
let isDark = true;
function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle("bg-zinc-950", isDark);
  document.body.classList.toggle("bg-white", !isDark);
  document.body.classList.toggle("text-white", isDark);
  document.body.classList.toggle("text-zinc-900", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load Theme
window.onload = () => {
  if (localStorage.getItem("theme") === "light") toggleTheme();
  initCanvas();
  animateCounters();
  initCarousel();
  scrollSpy();
};

// Canvas Skill Particles (Unique!)
function initCanvas() {
  const canvas = document.getElementById("skill-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y += this.speed;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = "#22d3ee";
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Scroll Spy for Active Nav
function scrollSpy() {
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (window.scrollY > 100) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");

    // Highlight links
    document.querySelectorAll(".nav-link").forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        link.classList.add("text-emerald-400", "font-bold");
      } else {
        link.classList.remove("text-emerald-400", "font-bold");
      }
    });
  });
}

// Animated Counters
function animateCounters() {
  const counters = [
    { id: "counter1", target: 15000, duration: 2000 },
    // Add more
  ];
  counters.forEach(({ id, target, duration }) => {
    const el = document.getElementById(id);
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      el.textContent = Math.floor(start).toLocaleString();
      if (start >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      }
    }, 16);
  });
}

// Carousel (Testimonials)
const testimonials = [
  {
    name: "Priya S.",
    text: "Transformed my web skills in 4 weeks!",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  // Add 4-5 more from real interns
];
function initCarousel() {
  const container = document.getElementById("carousel");
  testimonials.forEach((t) => {
    container.innerHTML += `
      <div class="min-w-[320px] bg-zinc-800 p-8 rounded-3xl snap-center">
        <img src="${t.img}" class="w-12 h-12 rounded-full mb-4">
        <p class="italic">"${t.text}"</p>
        <div class="mt-6 text-emerald-400">- ${t.name}</div>
      </div>
    `;
  });
  // Auto slide (simple)
  let scrollPos = 0;
  setInterval(() => {
    scrollPos += 340;
    if (scrollPos > container.scrollWidth) scrollPos = 0;
    container.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, 4000);
}

// Modal Form
function showModal() {
  const modal = document.getElementById("apply-modal");
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div class="bg-zinc-900 p-10 rounded-3xl max-w-md w-full mx-4">
      <h3 class="text-2xl font-bold mb-6">Apply to SkillCraft</h3>
      <form onsubmit="submitForm(event)" class="space-y-6">
        <input type="text" placeholder="Full Name" class="w-full bg-zinc-800 p-4 rounded-xl" required>
        <input type="email" placeholder="Email" class="w-full bg-zinc-800 p-4 rounded-xl" required>
        <select class="w-full bg-zinc-800 p-4 rounded-xl">
          <option>Web Development</option>
          <!-- More options -->
        </select>
        <button type="submit" class="w-full bg-emerald-500 py-4 rounded-2xl font-semibold">Submit Application</button>
      </form>
      <button onclick="closeModal()" class="mt-4 text-zinc-400">Close</button>
    </div>
  `;
}
function closeModal() {
  document.getElementById("apply-modal").classList.add("hidden");
}
function submitForm(e) {
  e.preventDefault();
  alert("🎉 Application sent! (In real: POST to SkillCraft API)");
  closeModal();
}

// Mobile Menu (Add your toggle logic)
document.getElementById("mobile-menu").addEventListener("click", () => {
  /* Toggle mobile ul */
});
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu");
const mobileNav = document.getElementById("mobile-nav");

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });
}

// Highlight active page in nav (nice touch!)
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Your existing code: scroll effect, theme toggle, canvas, counters, etc.
function animateCounters() {
  const counters = [
    { id: "stat1", target: 15000, duration: 2500 },
    { id: "stat2", target: 500, duration: 2200 },
    { id: "stat3", target: 12000, duration: 2800 },
    { id: "stat4", target: 99, duration: 1500 }, // static but can animate if wanted
  ];

  counters.forEach(({ id, target, duration }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      el.textContent = Math.floor(start).toLocaleString();
      if (start >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      }
    }, 16);
  });
}