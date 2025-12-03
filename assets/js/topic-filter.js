/**
 * Topic Page Filter Functionality
 * Handles filtering articles within topic pages (Faith, Sharia, Politics, etc.)
 */

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    initializeTopicFilters();
  });

  function initializeTopicFilters() {
    const filterButtons = document.querySelectorAll('.topic-tag[data-filter]');
    
    if (filterButtons.length === 0) return; // Not a topic page with filters

    // Store original topic name from the title
    const filterNameElement = document.querySelector('.filter-name');
    if (filterNameElement) {
      window.originalTopicName = filterNameElement.textContent.trim();
    }

    // Initialize count on page load
    updateInitialCount();

    // Wire up filter button clicks
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filter = this.getAttribute('data-filter');
        
        // Apply filter
        applyFilter(filter);
      });
    });
  }

  function updateInitialCount() {
    const latestCards = document.querySelectorAll('.latest-card');
    const featuredSpotlight = document.querySelector('.featured-spotlight');
    const articleCount = document.querySelector('.article-count');
    
    if (articleCount) {
      let totalCount = latestCards.length;
      if (featuredSpotlight) totalCount++;
      articleCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
    }
  }

  function applyFilter(filter) {
    const latestCards = document.querySelectorAll('.latest-card');
    const featuredSpotlight = document.querySelector('.featured-spotlight');
    const articleCount = document.querySelector('.article-count');
    const filterNameElement = document.querySelector('.filter-name');
    const filterSlash = document.querySelector('.filter-slash');
    const breadcrumbTopic = document.querySelector('.breadcrumb-topic');
    const topicDescription = document.querySelector('.topic-description');
    let visibleCount = 0;

    // Filter cards
    latestCards.forEach(card => {
      const tagElement = card.querySelector('.latest-tag');
      const cardTag = tagElement ? tagElement.textContent.trim().toLowerCase() : '';
      
      const matches = filter === 'all' || cardTag === filter;
      
      if (matches) {
        card.style.display = 'block';
        card.style.opacity = '1';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // Filter featured spotlight
    if (featuredSpotlight) {
      const spotlightTopic = featuredSpotlight.querySelector('.spotlight-topic');
      const spotlightTag = spotlightTopic ? spotlightTopic.textContent.trim().toLowerCase() : '';
      
      if (filter === 'all' || spotlightTag === filter) {
        featuredSpotlight.style.display = 'block';
        visibleCount++;
      } else {
        featuredSpotlight.style.display = 'none';
      }
    }

    // Update article count
    if (articleCount) {
      articleCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'item' : 'items'}`;
    }

    // Update breadcrumb, title, and description based on filter
    if (filter === 'all') {
      // Show topic name in title, hide breadcrumb topic and filter slash, show description
      if (filterSlash) filterSlash.classList.remove('active');
      if (breadcrumbTopic) breadcrumbTopic.classList.remove('active');
      if (filterNameElement) {
        filterNameElement.classList.remove('filtered');
        // Restore original topic name
        if (window.originalTopicName) {
          filterNameElement.textContent = window.originalTopicName;
        }
      }
      if (topicDescription) topicDescription.classList.remove('hidden');
    } else {
      // Show filter name as title, show breadcrumb topic and filter slash, hide description
      if (filterSlash) filterSlash.classList.add('active');
      if (breadcrumbTopic) breadcrumbTopic.classList.add('active');
      if (filterNameElement) {
        // Capitalize first letter of each word
        const formattedFilter = filter.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
        filterNameElement.textContent = formattedFilter;
        filterNameElement.classList.add('filtered');
      }
      if (topicDescription) topicDescription.classList.add('hidden');
    }
  }
})();
