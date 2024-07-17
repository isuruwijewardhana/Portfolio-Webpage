document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight the middle project card on scroll
    const projectWrapper = document.querySelector('.project-wrapper');
    const projectCards = document.querySelectorAll('.project-card');

    function highlightMiddleCard() {
        projectCards.forEach(card => {
            card.classList.remove('highlight');
        });

        const middleIndex = Math.round((projectWrapper.scrollLeft + projectWrapper.clientWidth / 2) / (projectCards[0].offsetWidth + 20));
        if (projectCards[middleIndex]) {
            projectCards[middleIndex].classList.add('highlight');
        }
    }

    projectWrapper.addEventListener('scroll', highlightMiddleCard);
    window.addEventListener('resize', highlightMiddleCard);

    // Initial highlight on load
    highlightMiddleCard();

    // Fetching projects from GitHub API
    fetch('https://api.github.com/users/YOUR_GITHUB_USERNAME/repos')
        .then(response => response.json())
        .then(data => {
            const projectCards = document.getElementById('project-cards');
            data.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${repo.name}</h5>
                            <p class="card-text">${repo.description}</p>
                            <a href="${repo.html_url}" target="_blank" class="btn btn-primary">View Project</a>
                        </div>
                    </div>
                `;
                projectCards.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching repos:', error));
});
