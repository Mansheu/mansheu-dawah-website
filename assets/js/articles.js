// Articles page functionality: filters, sorting, and load more

(function() {
  let currentCategory = 'all';
  let availableArticles = []; // Pool of articles that haven't been loaded yet

  document.addEventListener('DOMContentLoaded', function() {
    initializeArticles();
  });

  function initializeArticles() {
    // Use topic-tag buttons for filtering
    const filterButtons = document.querySelectorAll('.topic-tag');
    const sortSelect = document.querySelector('.articles-filter .sort-select');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Initialize the pool of available articles
    initializeAvailableArticles();

    // Make all article cards clickable
    initializeArticleCardClicks();

    // Initialize category from URL if present
    const urlCategory = (new URLSearchParams(window.location.search).get('category') || '').toLowerCase();
    if (urlCategory) {
      currentCategory = urlCategory;
    }

    // Wire up topic filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const topic = this.getAttribute('data-topic') || 'all';
        currentCategory = topic;
        applyTopicFilter(topic);
      });
    });

    // Set active filter to 'all' by default
    if (currentCategory !== 'all') {
      const activeBtn = Array.from(filterButtons).find(b => (b.getAttribute('data-topic') || '').toLowerCase() === currentCategory);
      if (activeBtn) {
        activeBtn.click();
      } else {
        applyTopicFilter('all');
      }
    } else {
      applyTopicFilter('all');
    }

    // Sorting
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        sortArticles(this.value);
      });
    }

    // Load more/less
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        handleLoadMoreOrLess(loadMoreBtn);
      });
    }
  }

  function initializeArticleCardClicks() {
    // Make entire article card clickable (delegate to handle dynamically loaded cards)
    document.addEventListener('click', function(e) {
      const articleCard = e.target.closest('.article-card');
      if (!articleCard) return;
      
      // Don't trigger if clicking on a link directly (let the link handle it)
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      
      // Find the main article link
      const articleLink = articleCard.querySelector('.article-title a');
      if (articleLink) {
        articleLink.click();
      }
    });

    // Add cursor pointer style to article cards
    const style = document.createElement('style');
    style.textContent = '.article-card { cursor: pointer; }';
    document.head.appendChild(style);
  }

  function initializeAvailableArticles() {
    // Define all available articles that can be loaded
    availableArticles = [
      {
        category: 'faith',
        img: '../assets/images/image_example.jpg',
        title: 'Strengthening Tawheed in Daily Life',
        excerpt: 'Practical steps to keep your heart firm upon pure monotheism (tawheed) amidst daily distractions.',
        date: 'August 30, 2025',
        read: '6 min read',
        id: 'tawheed-daily'
      },
      {
        category: 'prayer',
        img: '../assets/images/image_example.jpg',
        title: 'Khushu in Salah: Cultivating Presence',
        excerpt: 'Simple techniques from the Quran and Sunnah to help you develop focus and humility in prayer.',
        date: 'August 28, 2025',
        read: '5 min read',
        id: 'khushu-salah'
      },
      {
        category: 'quran',
        img: '../assets/images/image_example.jpg',
        title: 'Reflecting on Short Surahs',
        excerpt: 'Key themes and reflections from the last juz that transform daily living.',
        date: 'August 25, 2025',
        read: '7 min read',
        id: 'short-surahs'
      },
      {
        category: 'character',
        img: '../assets/images/image_example.jpg',
        title: 'Humility: The Heart of Good Character',
        excerpt: 'How developing humility (tawadu) transforms our relationships and brings us closer to Allah.',
        date: 'August 22, 2025',
        read: '6 min read',
        id: 'humility-character'
      },
      {
        category: 'spirituality',
        img: '../assets/images/image_example.jpg',
        title: 'Dhikr: Remembering Allah Throughout the Day',
        excerpt: 'Discover the transformative power of consistent remembrance and its impact on your spiritual state.',
        date: 'August 20, 2025',
        read: '5 min read',
        id: 'dhikr-remembrance'
      },
      {
        category: 'sunnah',
        img: '../assets/images/image_example.jpg',
        title: 'The Prophet\'s Mercy to All Creation',
        excerpt: 'Learn about the boundless mercy of Prophet Muhammad (ﷺ) and how to embody it in our lives.',
        date: 'August 18, 2025',
        read: '7 min read',
        id: 'prophets-mercy'
      }
    ];
  }

  function applyTopicFilter(topic) {
    // Get all article cards from both sections
    const latestCards = document.querySelectorAll('.latest-card');
    const featuredSpotlight = document.querySelector('.featured-spotlight');
    let visibleCount = 0;

    console.log(`Filtering for topic: ${topic}`);
    console.log(`Total cards found: ${latestCards.length}`);

    // Filter latest cards by matching the tag text
    latestCards.forEach(card => {
      const tagElement = card.querySelector('.latest-tag');
      const cardTopic = tagElement ? tagElement.textContent.trim().toLowerCase() : '';
      
      const matches = topic === 'all' || cardTopic === topic;
      
      console.log(`Card topic: "${cardTopic}", matches: ${matches}`);
      
      if (matches) {
        card.style.display = 'block';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // Handle featured spotlight visibility
    if (featuredSpotlight) {
      const spotlightTopic = featuredSpotlight.querySelector('.spotlight-topic');
      const spotlightTopicText = spotlightTopic ? spotlightTopic.textContent.trim().toLowerCase() : '';
      
      if (topic === 'all' || spotlightTopicText === topic) {
        featuredSpotlight.style.display = 'block';
        visibleCount++;
      } else {
        featuredSpotlight.style.display = 'none';
      }
    }

    console.log(`Visible count: ${visibleCount}`);
    notify(`Showing ${visibleCount} article${visibleCount === 1 ? '' : 's'}`);
  }

  function showAllArticles() {
    // Show all article cards
    const latestCards = document.querySelectorAll('.latest-card');
    const featuredSpotlight = document.querySelector('.featured-spotlight');
    
    latestCards.forEach(card => {
      card.style.display = 'block';
      card.style.opacity = '1';
    });
    
    if (featuredSpotlight) {
      featuredSpotlight.style.display = 'block';
    }
    
    currentCategory = 'all';
  }

  function applyCategoryFilter(category) {
    // Redirect to new function
    applyTopicFilter(category);
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

  function handleLoadMoreOrLess(button) {
    const container = document.getElementById('articlesContainer');
    if (!container) return;

    const label = button.querySelector('span');
    const isLoadMore = label && label.textContent.includes('Load More');

    if (isLoadMore) {
      // Load more articles
      const spinner = button.querySelector('.fa-spinner');
      if (spinner) spinner.style.display = 'inline-block';
      if (label) label.textContent = 'Loading...';
      button.disabled = true;

      setTimeout(() => {
        const articlesToLoad = loadMoreArticles();
        if (spinner) spinner.style.display = 'none';
        button.disabled = false;
        
        // Check if all articles are loaded
        if (availableArticles.length === 0) {
          if (label) label.textContent = 'Load Less Articles';
          notify(`Loaded ${articlesToLoad} more article${articlesToLoad === 1 ? '' : 's'}. All articles loaded!`, 'success');
        } else {
          if (label) label.textContent = 'Load More Articles';
          notify(`Loaded ${articlesToLoad} more article${articlesToLoad === 1 ? '' : 's'}`, 'success');
        }
        
        // Keep current filter applied
        applyCategoryFilter(currentCategory);
      }, 1200);
    } else {
      // Load less articles (remove 3 at a time)
      unloadArticles(button);
    }
  }

  function loadMoreArticles() {
    const container = document.getElementById('articlesContainer');
    if (!container) return 0;

    // Load 3 articles at a time (or whatever is left)
    const articlesToAdd = availableArticles.splice(0, 3);
    
    if (articlesToAdd.length === 0) {
      return 0;
    }

    const html = articlesToAdd.map(item => `
      <article class="article-card" data-category="${item.category}" data-loaded="true" data-article-id="${item.id}">
        <div class="article-image">
          <img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy">
          <div class="article-category">${capitalize(item.category)}</div>
        </div>
        <div class="article-content">
          <h3 class="article-title">
            <a href="article-detail.html?id=${item.id}">${escapeHtml(item.title)}</a>
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
    return articlesToAdd.length;
  }

  function unloadArticles(button) {
    const container = document.getElementById('articlesContainer');
    if (!container) return;

    const loadedArticles = Array.from(container.querySelectorAll('.article-card[data-loaded="true"]'));
    const label = button.querySelector('span');
    
    if (loadedArticles.length === 0) {
      notify('No additional articles to remove', 'info');
      if (label) label.textContent = 'Load More Articles';
      return;
    }

    // Remove 3 articles at a time (or whatever is left)
    const articlesToRemove = loadedArticles.slice(-3);
    
    articlesToRemove.forEach(article => {
      const articleId = article.getAttribute('data-article-id');
      const category = article.getAttribute('data-category');
      const title = article.querySelector('.article-title a')?.textContent || '';
      const excerpt = article.querySelector('.article-excerpt')?.textContent || '';
      const date = article.querySelector('.article-date')?.textContent?.replace(/.*\s+/, '') || '';
      const read = article.querySelector('.read-time')?.textContent?.replace(/.*\s+/, '') || '';
      
      // Add back to available articles pool (at the beginning to maintain order)
      availableArticles.unshift({
        category: category,
        img: '../assets/images/image_example.jpg',
        title: title,
        excerpt: excerpt,
        date: date,
        read: read,
        id: articleId
      });
      
      // Remove from DOM
      article.remove();
    });

    // Update button text
    const remainingLoaded = container.querySelectorAll('.article-card[data-loaded="true"]').length;
    
    if (remainingLoaded === 0) {
      if (label) label.textContent = 'Load More Articles';
      notify(`Removed ${articlesToRemove.length} article${articlesToRemove.length === 1 ? '' : 's'}`, 'success');
    } else {
      if (label) label.textContent = 'Load Less Articles';
      notify(`Removed ${articlesToRemove.length} article${articlesToRemove.length === 1 ? '' : 's'}`, 'success');
    }

    // Keep current filter applied
    applyCategoryFilter(currentCategory);
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
