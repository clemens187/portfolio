document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('DOMContentLoaded', () => {
        const videoItems = document.querySelectorAll('.video-item');
        
        if (videoItems.length < 2) return;
    
        // Hide all videos initially using the hidden-video class
        videoItems.forEach(item => {
            item.classList.add('hidden-video');
        });
    
        // Pick two different random indices
        let firstIndex = Math.floor(Math.random() * videoItems.length);
        let secondIndex;
        do {
            secondIndex = Math.floor(Math.random() * videoItems.length);
        } while (secondIndex === firstIndex);
    
        // Show the selected videos by removing the hidden-video class and adding visible-video class
        videoItems[firstIndex].classList.remove('hidden-video');
        videoItems[firstIndex].classList.add('visible-video');
        
        videoItems[secondIndex].classList.remove('hidden-video');
        videoItems[secondIndex].classList.add('visible-video');
    });
    
    
    // Links hover effect
    const links = document.querySelectorAll('a, button, .hover-scale');
    
    

    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(108, 92, 231, 0.5)';
            cursor.style.borderColor = 'transparent';
        });
        
        link.addEventListener('mouseout', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li'); // This was missing!
    
    // Toggle nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Lightbox for both photos and videos
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.querySelector('.lightbox-content-container');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Photo Gallery Lightbox
    const galleryBoxes = document.querySelectorAll('.gallery-item');
    galleryBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const imgUrl = this.style.backgroundImage.slice(5, -2);
            const caption = this.querySelector('.gallery-overlay h3').textContent;
            
            // Clear previous content
            lightboxContainer.innerHTML = '';
            
            // Create image element
            const img = document.createElement('img');
            img.className = 'lightbox-content';
            img.src = imgUrl;
            img.alt = caption;
            
            lightboxContainer.appendChild(img);
            lightbox.style.display = 'block';
            lightboxCaption.textContent = caption;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Video Lightbox
    const videoBoxes = document.querySelectorAll('.video-item');
    videoBoxes.forEach(box => {
        const playButton = box.querySelector('.play-button');
        
        // Click on entire box or play button
        [box, playButton].forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const videoSrc = box.getAttribute('data-video-src');
                const caption = box.querySelector('h3').textContent;
                
                // Clear previous content
                lightboxContainer.innerHTML = '';
                
                // Create video element
                const video = document.createElement('video');
                video.className = 'lightbox-video';
                video.controls = true;
                video.autoplay = true;
                
                const source = document.createElement('source');
                source.src = videoSrc;
                source.type = 'video/mp4';
                
                video.appendChild(source);
                lightboxContainer.appendChild(video);
                lightbox.style.display = 'block';
                lightboxCaption.textContent = caption;
                document.body.style.overflow = 'hidden';
            });
        });
    });
    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Pause any playing video
        const video = lightboxContainer.querySelector('video');
        if (video) {
            video.pause();
        }
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pause any playing video
            const video = lightboxContainer.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
    
    window.addEventListener("DOMContentLoaded", () => {
        const videoItems = Array.from(document.querySelectorAll(".video-item"));
    
        // Shuffle the video items
        for (let i = videoItems.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [videoItems[i], videoItems[j]] = [videoItems[j], videoItems[i]];
        }
    
        // Show only the first 2
        videoItems.slice(0, 2).forEach(item => {
          item.style.display = "block"; // or "flex" depending on your layout
        });
      });

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("Element #current-year not found!");
    }
    // Scroll Animation
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});