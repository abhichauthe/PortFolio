// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
    }
});

// Active nav link
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Navigation
const navToggle1 = document.querySelector('.nav-toggle');
const navLinksContainer1 = document.querySelector('.nav-links');

navToggle1?.addEventListener('click', () => {
    navLinksContainer1.classList.toggle('active');
    navToggle1.classList.toggle('active');
    navToggle1.classList.contains('active') ? navToggle1.style.background = 'rgba(0, 0, 0, 0.1)' : navToggle1.style.background = 'transparent';
});

// Roles Animation
const roles = document.querySelectorAll('.role');
let currentRole = 0;

function changeRole() {
    roles[currentRole].classList.remove('active');
    currentRole = (currentRole + 1) % roles.length;
    roles[currentRole].classList.add('active');
}

if (roles.length > 0) {
    setInterval(changeRole, 3000);
    roles[0].classList.add('active');
}

// Skills Progress Animation
const progressBars = document.querySelectorAll('.progress-bar');

function animateProgress() {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
        bar.style.transition = 'width 1s ease-in-out'; // Adding transition for smoother animation
    });
}

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    try {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }
});

// Intersection Observer for Skills Animation
const skillsSection = document.querySelector('.skills');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgress();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Smooth Scroll for Safari
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

// Add hover effects for buttons
const ctaButtons = document.querySelectorAll('.cta-btn');
ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

navToggle?.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close dropdown when a link is clicked
const dropdownLinks = document.querySelectorAll('.dropdown-item');

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Handle dropdown toggle on click
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const dropdownMenu = toggle.nextElementSibling;
        dropdownMenu.classList.toggle('active');
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const roles = document.querySelectorAll("#roles .role");
    let currentIndex = 0;

    function showNextRole() {
        // Remove the active class from all roles
        roles.forEach(role => role.classList.remove("active"));

        // Add the active class to the current role
        roles[currentIndex].classList.add("active");

        // Update index for next role
        currentIndex = (currentIndex + 1) % roles.length;
    }

    // Run the showNextRole function every 3 seconds
    setInterval(showNextRole, 3000);
    showNextRole(); // Initial call to show the first role
});


