import '../css/tailwind.css';
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const navButtons = document.querySelectorAll('.nav-btn');

  const setActiveButton = (activeButton) => {
    navButtons.forEach(button => {
      button.classList.remove('text-green-600');
      button.classList.add('text-gray-500');
      button.removeAttribute('aria-current');
    });
    activeButton.classList.remove('text-gray-500');
    activeButton.classList.add('text-green-600');
    activeButton.setAttribute('aria-current', 'page');
  };

  const loadPage = async (page, button) => {
    try {
      const response = await fetch(`./pages/${page}.html`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      content.innerHTML = html;
      if (button) {
        setActiveButton(button);
      }
    } catch (error) {
      console.error('Error loading page:', error);
      content.innerHTML = '<p class="p-4 text-center text-red-500">Error loading page. Please try again later.</p>';
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
  if (homeButton) {
    loadPage('home', homeButton);
  } else {
    console.error('Default home button not found.');
    content.innerHTML = '<p class="p-4 text-center">Could not load the default page.</p>';
  }
});