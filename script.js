// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const bitsContainer = document.getElementById('bitsContainer');

// Initialize theme based on user preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  themeToggle.checked = true;
  updateBitsColor();
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
  updateBitsColor();
});

// Time-based greeting
function updateGreeting() {
  const greeting = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText = '';
  
  if (hour >= 5 && hour < 12) {
    greetingText = 'Good morning!';
  } else if (hour >= 12 && hour < 18) {
    greetingText = 'Good afternoon!';
  } else {
    greetingText = 'Good evening!';
  }
  
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  greeting.innerHTML = `${greetingText} It's ${currentTime} on ${currentDate}`;
}

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Falling bits animation
function createBits() {
  bitsContainer.innerHTML = '';
  const numberOfBits = Math.floor(window.innerWidth / 25);
  
  for (let i = 0; i < numberOfBits; i++) {
    const bit = document.createElement('div');
    bit.className = 'bit';
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.animationDuration = `${Math.random() * 10 + 5}s`;
    bit.style.animationDelay = `${Math.random() * 5}s`;
    bit.textContent = Math.random() > 0.5 ? '0' : '1';
    bitsContainer.appendChild(bit);
  }
}

function updateBitsColor() {
  const bits = document.querySelectorAll('.bit');
  const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  bits.forEach(bit => {
    bit.style.color = color;
  });
}

// Skills Animation
function animateSkills() {
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Add this check to ensure we have skill bars on the page
  if (skillBars.length === 0) return;
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Reset all skills when they're not in viewport
  function resetSkills() {
    if (!isInViewport(skillsSection)) {
      skillsSection.classList.add('animate-skills');
    }
  }
  
  // Animate skills when they come into viewport
  function checkSkills() {
    if (isInViewport(skillsSection) && skillsSection.classList.contains('animate-skills')) {
      skillsSection.classList.remove('animate-skills');
    }
  }
  
  // Initial reset
  resetSkills();
  
  // Check on scroll
  window.addEventListener('scroll', checkSkills);
  window.addEventListener('scroll', resetSkills);
}

// Initialize
createBits();
updateGreeting();
animateSkills();

// Update greeting every minute
setInterval(updateGreeting, 60000);

// Recreate bits on window resize
window.addEventListener('resize', createBits);

// Reload animation when page is fully loaded
window.addEventListener('load', () => {
  // Force recalculation of skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
});
