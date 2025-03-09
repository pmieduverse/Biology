<script>
    // Smooth scrolling with error handling
    try {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error setting up smooth scrolling:', error);
    }

    // Theme toggle with local storage and validation
    const toggleTheme = (theme) => {
        const validThemes = ['dark-mode', 'blue-theme', 'green-theme'];
        if (validThemes.includes(theme)) {
            document.body.classList.remove(...validThemes);
            document.body.classList.add(theme);
            localStorage.setItem('theme', theme);
        } else {
            console.warn('Invalid theme:', theme);
        }
    };

    // Check for saved theme preference
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            toggleTheme(savedTheme);
        }
    } catch (error) {
        console.error('Error accessing local storage:', error);
    }

    // Create theme toggle buttons with accessibility improvements
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

    // Debounced search filter functionality
    const searchInput = document.getElementById('searchInput');
    const topics = document.querySelectorAll('.topic');

    let debounceTimer;
    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const filter = searchInput.value.toLowerCase();
            topics.forEach(topic => {
                const title = topic.getAttribute('data-title').toLowerCase();
                topic.style.display = title.includes(filter) ? '' : 'none';
            });
        }, 300); // Adjust debounce delay as needed
    });

    // Lazy load images with error handling
    try {
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
    } catch (error) {
        console.error('Error setting up lazy loading:', error);
    }
</script>
