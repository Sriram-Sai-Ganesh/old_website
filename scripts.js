function loadContent(section) {
    const mainContent = document.getElementById('main-content');
    fetch(`content/${section}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not fetch content/${section}.html`);
            }
            return response.text();
        })
        .then(data => {
            mainContent.innerHTML = data;

            // If the section is 'home', append 'projects' and 'coursework' sections
            if (section === 'home') {
                // Load 'projects' content and append
                fetch('content/projects.html')
                    .then(response => response.text())
                    .then(projectsData => {
                        mainContent.innerHTML += projectsData;

                        // Load 'coursework' content and append
                        fetch('content/coursework.html')
                            .then(response => response.text())
                            .then(courseworkData => {
                                mainContent.innerHTML += courseworkData;
                            })
                            .catch(error => {
                                console.error('Error loading coursework content:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error loading projects content:', error);
                    });
            }
        })
        .catch(error => {
            mainContent.innerHTML = `<p>Error loading content.</p>`;
            console.error('Error loading content:', error);
        });
}

// Load the home content by default when the page loads
window.onload = function() {
    loadContent('home');
};

function toggleCard(link) {
    const card = link.closest('.course-card');
    const isExpanded = card.classList.toggle('expanded');
    link.textContent = isExpanded ? 'See Less' : 'See More';
}