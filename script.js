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

// Service Detail Toggle Functionality
function toggleServiceDetails(serviceId) {
  const serviceElement = document.getElementById(serviceId);
  const serviceExpanded = serviceElement.parentElement;

  // Close other expanded services
  document.querySelectorAll('.service-expanded').forEach(service => {
    if (service !== serviceExpanded) {
      service.classList.remove('expanded');
    }
  });

  // Toggle current service
  serviceExpanded.classList.toggle('expanded');
}

// Scroll to Pricing Section
function scrollToPricing(category) {
  const pricingSection = document.querySelector('.pricing-section');
  pricingSection.scrollIntoView({ behavior: 'smooth' });

  // Filter to show specific category after scroll
  setTimeout(() => {
    filterPricing(category);
  }, 500);
}

// Pricing Filter System
function filterPricing(category) {
  const serviceCategories = document.querySelectorAll('.service-category');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Update active button
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(category) ||
        (category === 'all' && btn.textContent === 'All Services')) {
      btn.classList.add('active');
    }
  });

  // Show/hide categories
  serviceCategories.forEach(serviceCategory => {
    if (category === 'all') {
      serviceCategory.classList.remove('hidden');
    } else {
      const serviceCategoryData = serviceCategory.getAttribute('data-category');
      if (serviceCategoryData === category) {
        serviceCategory.classList.remove('hidden');
      } else {
        serviceCategory.classList.add('hidden');
      }
    }
  });
}

// Open Inquiry Form with Pre-filled Service
function openInquiryForm(serviceName) {
  const inquirySection = document.querySelector('.inquiry-section');
  const serviceSelect = document.getElementById('service');

  // Find and select the matching option
  for (let option of serviceSelect.options) {
    if (option.text === serviceName || option.value === serviceName) {
      option.selected = true;
      break;
    }
  }

  // Scroll to inquiry form
  inquirySection.scrollIntoView({ behavior: 'smooth' });

  // Highlight the form
  inquirySection.style.backgroundColor = '#fff3cd';
  setTimeout(() => {
    inquirySection.style.transition = 'background-color 2s ease';
    inquirySection.style.backgroundColor = 'white';
  }, 2000);
}

// Form Validation and Submission
function validateInquiryForm() {
  const form = document.getElementById('inquiryForm');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();

  let errors = [];

  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!phone) errors.push('Phone number is required');
  if (!service) errors.push('Please select a service');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation
  const phoneRegex = /^[0-9]{10}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.push('Please enter a valid 10-digit phone number');
  }

  return errors;
}

function submitInquiry(event) {
  event.preventDefault();

  const form = document.getElementById('inquiryForm');
  const formMessage = document.getElementById('formMessage');
  const submitBtn = form.querySelector('.submit-btn');

  // Clear previous messages
  formMessage.className = 'form-message';
  formMessage.textContent = '';

  // Validate form
  const errors = validateInquiryForm();

  if (errors.length > 0) {
    formMessage.className = 'form-message error';
    formMessage.textContent = errors.join(', ');
    return;
  }

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Simulate form submission (replace with actual submission logic)
  setTimeout(() => {
    // Show success message
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Thank you for your inquiry! We will contact you within 24 hours.';

    // Reset form
    form.reset();

    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Inquiry';

    // Clear success message after 5 seconds
    setTimeout(() => {
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }, 5000);
  }, 1500);
}

// Enhanced Scroll Reveal Animation
const elements = document.querySelectorAll('section, footer, .service-expanded');

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
  const serviceCards = document.querySelectorAll('.service-expanded');
  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
      card.style.transition = "all 0.6s ease-out";
    }, index * 150);
  });

  // Animate pricing categories
  const pricingCategories = document.querySelectorAll('.service-category');
  pricingCategories.forEach((category, index) => {
    setTimeout(() => {
      category.style.opacity = 1;
      category.style.transform = "translateY(0)";
      category.style.transition = "all 0.6s ease-out";
    }, 800 + (index * 100));
  });
});

// Add smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add back-to-top button functionality
function createBackToTopButton() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'back-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #0a3d62;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 1000;
  `;

  document.body.appendChild(button);

  // Show/hide button based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = '1';
      button.style.transform = 'translateY(0)';
    } else {
      button.style.opacity = '0';
      button.style.transform = 'translateY(100px)';
    }
  });

  // Scroll to top when clicked
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize back-to-top button
createBackToTopButton();
