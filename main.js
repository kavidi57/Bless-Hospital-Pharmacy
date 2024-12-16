
    // Select the hamburger and navigation bar
    const hamburger = document.getElementById('hamburger');
    const navBar = document.getElementById('nav_bar');

    // Toggle the 'active' class on the navigation bar when the hamburger is clicked
    hamburger.addEventListener('click', () => {
        navBar.classList.toggle('active');
    });

