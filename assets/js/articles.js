// Articles page functionality: filters, sorting, and load more

(function() {
  let currentCategory = 'all';

  document.addEventListener('DOMContentLoaded', function() {
    initializeArticles();
  });

  function initializeArticles() {
    const filterButtons = document.querySelectorAll('.articles-filter .filter-btn');
    const sortSelect = document.querySelector('.articles-filter .sort-select');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Initialize category from URL if present
    const urlCategory = (new URLSearchParams(window.location.search).get('category') || '').toLowerCase();
    if (urlCategory) {
      currentCategory = urlCategory;
    }

    // Wire up filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-category') || 'all';
        applyCategoryFilter(currentCategory);
      });
    });

    // Set active filter from URL (or default to 'all')
    if (currentCategory !== 'all') {
      const activeBtn = Array.from(filterButtons).find(b => (b.getAttribute('data-category') || '').toLowerCase() === currentCategory);
      if (activeBtn) {
        activeBtn.click();
      } else {
        applyCategoryFilter('all');
      }
    } else {
      applyCategoryFilter('all');
    }

    // Sorting
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        sortArticles(this.value);
      });
    }

    // Load more
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        handleLoadMore(loadMoreBtn);
      });
    }
  }

  function applyCategoryFilter(category) {
    const container = document.getElementById('articlesContainer');
    if (!container) return;
    const cards = container.querySelectorAll('.article-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const matches = category === 'all' || (card.getAttribute('data-category') || '').toLowerCase() === category;
      if (matches) {
        card.style.display = 'block';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    notify(`Showing ${visibleCount} article${visibleCount === 1 ? '' : 's'}`);
  }

  function sortArticles(criteria) {
    const container = document.getElementById('articlesContainer');
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.article-card'));

    const getDate = (card) => {
      const el = card.querySelector('.article-date');
      if (!el) return 0;
      const d = new Date(el.textContent.trim());
      return isNaN(d.getTime()) ? 0 : d.getTime();
    };

    const getTitle = (card) => {
      const el = card.querySelector('.article-title');
      return (el ? el.textContent.trim() : '').toLowerCase();
    };

    const getPopularity = (card) => {
      const val = card.getAttribute('data-popularity');
      return val ? parseInt(val, 10) || 0 : 0;
    };

    switch ((criteria || '').toLowerCase()) {
      case 'newest':
        cards.sort((a, b) => getDate(b) - getDate(a));
        break;
      case 'oldest':
        cards.sort((a, b) => getDate(a) - getDate(b));
        break;
      case 'alphabetical':
        cards.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
        break;
      case 'popular':
        if (cards.some(c => c.hasAttribute('data-popularity'))) {
          cards.sort((a, b) => getPopularity(b) - getPopularity(a));
        } else {
          notify('Popularity data unavailable. Showing default order.', 'info', 2500);
          return; // keep current order
        }
        break;
      default:
        return; // do nothing
    }

    // Re-append in new order
    const frag = document.createDocumentFragment();
    cards.forEach(card => frag.appendChild(card));
    container.appendChild(frag);

    // Re-apply current filter after sorting
    applyCategoryFilter(currentCategory);
  }

  function handleLoadMore(button) {
    const spinner = button.querySelector('.fa-spinner');
    const label = button.querySelector('span');
    if (spinner) spinner.style.display = 'inline-block';
    if (label) label.textContent = 'Loading...';
    button.disabled = true;

    setTimeout(() => {
      appendMoreArticles();
      if (spinner) spinner.style.display = 'none';
      if (label) label.textContent = 'Load More Articles';
      button.disabled = false;
      notify('More articles loaded', 'success');
      // Keep current filter applied
      applyCategoryFilter(currentCategory);
    }, 1200);
  }

  function appendMoreArticles() {
    const container = document.getElementById('articlesContainer');
    if (!container) return;

    const more = [
      {
        category: 'faith',
        img: '../assets/images/image_example.jpg',
        title: 'Strengthening Tawheed in Daily Life',
        excerpt: 'Practical steps to keep your heart firm upon pure monotheism (tawheed) amidst daily distractions.',
        date: 'August 30, 2025',
        read: '6 min read'
      },
      {
        category: 'prayer',
        img: '../assets/images/image_example.jpg',
        title: 'Khushu in Salah: Cultivating Presence',
        excerpt: 'Simple techniques from the Quran and Sunnah to help you develop focus and humility in prayer.',
        date: 'August 28, 2025',
        read: '5 min read'
      },
      {
        category: 'quran',
        img: '../assets/images/image_example.jpg',
        title: 'Reflecting on Short Surahs',
        excerpt: 'Key themes and reflections from the last juz’ that transform daily living.',
        date: 'August 25, 2025',
        read: '7 min read'
      }
    ];

    const html = more.map(item => `
      <article class="article-card" data-category="${item.category}">
        <div class="article-image">
          <img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy">
          <div class="article-category">${capitalize(item.category)}</div>
        </div>
        <div class="article-content">
          <h3 class="article-title">
            <a href="article-detail.html">${escapeHtml(item.title)}</a>
          </h3>
          <p class="article-excerpt">${escapeHtml(item.excerpt)}</p>
          <div class="article-meta">
            <span class="article-date"><i class="fas fa-calendar"></i> ${item.date}</span>
            <span class="read-time"><i class="fas fa-clock"></i> ${item.read}</span>
          </div>
          <div class="article-author-profile">
            <img src="../assets/images/image_example.jpg" alt="Author: Sheu Babakar" width="28" height="28" loading="lazy">
            <span class="author-name">Sheu Babakar</span>
          </div>
        </div>
      </article>
    `).join('');

    container.insertAdjacentHTML('beforeend', html);
  }

  function capitalize(s) {
    return (s || '').charAt(0).toUpperCase() + (s || '').slice(1);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function notify(message, type = 'info', duration = 2000) {
    try {
      if (window.MansheudawahWebsite && typeof window.MansheudawahWebsite.showNotification === 'function') {
        window.MansheudawahWebsite.showNotification(message, type, duration);
        return;
      }
    } catch (_) {}
    // Fallback
    if (type === 'success') {
      console.log('✔ ' + message);
    } else if (type === 'warning') {
      console.warn(message);
    } else {
      console.info(message);
    }
  }

  // Expose for console debugging
  window.ArticlesApp = {
    applyCategoryFilter,
    sortArticles
  };
})();
