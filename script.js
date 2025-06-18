// Typing Effect for Header Subheading
const subHeading = document.querySelector('header p');
const text = "Chartered Accountant | Tax Consultant | Financial Advisor";
let idx = 0;

function typeText() {
  if (idx < text.length) {
    subHeading.textContent += text[idx];
    idx++;
    setTimeout(typeText, 50);
  }
}
subHeading.textContent = "";
typeText();

// Scroll Reveal Animation
const elements = document.querySelectorAll('section, footer');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "all 1s ease-out";
    }
  });
}, { threshold: 0.1 });

elements.forEach(el => {
  observer.observe(el);
});

// Staggered Animation for Service Cards
window.addEventListener("load", () => {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
      card.style.transition = "all 0.6s ease-out";
    }, index * 200);
  });
});
