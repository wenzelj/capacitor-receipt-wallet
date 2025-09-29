const content = document.getElementById('content');
const navButtons = document.querySelectorAll('.nav-btn');

const setActiveButton = (activeButton) => {
  navButtons.forEach(button => {
    button.classList.remove('text-blue-600');
    button.classList.add('text-gray-500');
  });
  activeButton.classList.remove('text-gray-500');
  activeButton.classList.add('text-blue-600');
};

const loadPage = async (page, button) => {
  try {
    const response = await fetch(`./pages/${page}.html`);
    const html = await response.text();
    content.innerHTML = html;
    if (button) {
      setActiveButton(button);
    }
  } catch (error) {
    console.error('Error loading page:', error);
    content.innerHTML = '<p>Error loading page.</p>';
  }
};

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const page = button.dataset.page;
    loadPage(page, button);
  });
});

// Load the home page by default
const homeButton = document.querySelector('[data-page="home"]');
loadPage('home', homeButton);