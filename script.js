
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Theme toggle with local storage
    const toggleTheme = (theme) => {
        document.body.classList.remove('dark-mode', 'blue-theme', 'green-theme');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        toggleTheme(savedTheme);
    }

    // Create theme toggle buttons
    const themeButtons = [
        { label: 'Dark Mode', theme: 'dark-mode', animation: 'slideIn' },
        { label: 'Blue Mode', theme: 'blue-theme', animation: 'scaleUp' },
    ];

    themeButtons.forEach((button, index) => {
        const themeButton = document.createElement('button');
        themeButton.textContent = button.label;
        themeButton.setAttribute('aria-label', `Toggle ${button.label}`);
        themeButton.classList.add('theme-button', button.theme);
        themeButton.style.position = 'fixed';
        themeButton.style.top = `${10 + index * 50}px`; // Adjust position for each button
        themeButton.style.right = '10px';
        themeButton.style.padding = '10px';
        themeButton.style.backgroundColor = 'var(--primary-color)';
        themeButton.style.color = 'var(--text-color)';
        themeButton.style.border = 'none';
        themeButton.style.borderRadius = '5px';
        themeButton.style.cursor = 'pointer';
        themeButton.style.zIndex = '2000';
        themeButton.onclick = () => toggleTheme(button.theme);
        document.body.appendChild(themeButton);
    });

    // Search filter functionality
    const searchInput = document.getElementById('searchInput');
    const topics = document.querySelectorAll('.topic');

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        topics.forEach(topic => {
            const title = topic.getAttribute('data-title').toLowerCase();
            if (title.includes(filter)) {
                topic.style.display = '';
            } else {
                topic.style.display = 'none';
            }
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(img => imageObserver.observe(img));
    }
