// Article Detail Page Logic
(function() {
  const ARTICLES = [
    { id: 'sincere-repentance', title: 'The Power of Sincere Repentance (Tawbah)', category: 'faith', date: 'September 20, 2025', read: '8 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'ikhlas', title: 'Sincere Intention (Ikhlas) in Worship', category: 'spirituality', date: 'September 19, 2025', read: '6 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'asma-ul-husna', title: "Understanding Allah's 99 Beautiful Names (Asma ul-Husna)", category: 'faith', date: 'September 18, 2025', read: '6 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'strong-character', title: 'Building Strong Character Through Islamic Values', category: 'character', date: 'September 16, 2025', read: '7 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'tahajjud-beauty', title: 'The Beauty of Night Prayer (Tahajjud)', category: 'prayer', date: 'September 14, 2025', read: '5 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'quran-miracle', title: 'The Miracle of the Quran: Scientific and Linguistic Wonders', category: 'quran', date: 'September 12, 2025', read: '9 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'rizq-concept', title: 'Understanding the Concept of Rizq in Islam', category: 'spirituality', date: 'September 10, 2025', read: '6 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'following-sunnah', title: 'Following the Sunnah in Daily Life', category: 'sunnah', date: 'September 8, 2025', read: '7 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'seeking-knowledge', title: 'The Importance of Seeking Knowledge in Islam', category: 'prayer', date: 'September 6, 2025', read: '8 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'sabr-shukr', title: 'Patience (Sabr) and Gratitude (Shukr) in Islam', category: 'character', date: 'September 4, 2025', read: '6 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'five-pillars', title: 'The Five Pillars of Islam: A Comprehensive Guide', category: 'faith', date: 'September 2, 2025', read: '10 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' },
    { id: 'hope-fear-balance', title: 'Balancing Hope and Fear in Islam', category: 'latest', date: 'September 17, 2025', read: '6 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg', contentHtml: `
        <p>In the name of Allah, the Most Merciful, the Most Compassionate.</p>
        <p>One of the defining traits of a believer is the balance between <strong>rajaa’</strong> (hope) in Allah’s mercy and <strong>khawf</strong> (fear) of standing before Him. This balance nurtures humility without despair, and ambition without arrogance.</p>

        <h2>Why Balance Matters</h2>
        <p>Excessive hope can lead to laziness and neglect, while excessive fear can lead to despair. The Prophet (peace be upon him) taught moderation: hope motivates repentance and action; fear prevents transgression and complacency.</p>

        <h2>Qur’anic Guidance</h2>
        <p>Allah says: “Inform My servants that I am indeed the Oft-Forgiving, Most Merciful; and that My punishment is the most painful punishment.” (Al-Hijr 15:49–50). These two verses together remind us to carry both realities in our hearts.</p>

        <h3>Signs of a Healthy Balance</h3>
        <ul>
          <li>You hasten to good deeds without self-righteousness.</li>
          <li>You avoid sins and excuses, yet never despair after a mistake.</li>
          <li>You make sincere tawbah, then plan how to improve.</li>
        </ul>

        <h2>Practical Steps</h2>
        <ul>
          <li><strong>Daily Reflection:</strong> End your day with muhasabah (self-evaluation) and istighfar.</li>
          <li><strong>Alternate Fuel:</strong> When you feel lax, read verses of Allah’s punishment; when you feel crushed, read verses of His mercy.</li>
          <li><strong>Company:</strong> Keep the company of those who remind you of Allah with wisdom and compassion.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Hope and fear together produce love, gratitude, and perseverance. May Allah grant us hearts that hope for His Mercy and fear His displeasure, leading us to consistent obedience.</p>
      ` },
    { id: 'guarding-tongue', title: 'Guarding the Tongue: Speech Etiquette', category: 'latest', date: 'September 15, 2025', read: '5 min read', author: 'Sheu Babakar', image: '../assets/images/image_example.jpg' }
  ];

  function byId(id) { return document.getElementById(id); }

  function getParamId() {
    try { return new URLSearchParams(window.location.search).get('id'); } catch (_) { return null; }
  }

  function pickArticle(id) {
    return ARTICLES.find(a => a.id === id) || ARTICLES[0];
  }

  function renderArticle(a) {
    byId('articleHero').src = a.image;
    byId('articleHero').alt = a.title;
    byId('articleTitle').textContent = a.title;
    try { document.title = `${a.title} - Mansheu Dawah`; } catch (_) {}
    byId('articleDate').innerHTML = `<i class="fas fa-calendar"></i> ${a.date}`;
    byId('articleRead').innerHTML = `<i class="fas fa-clock"></i> ${a.read}`;
    byId('articleAuthor').textContent = a.author || 'Sheu Babakar';
    byId('articleAuthorAvatar').src = '../assets/images/image_example.jpg';

    const body = byId('articleBody');
    body.innerHTML = a.contentHtml ? a.contentHtml : `
      <p>In the name of Allah, the Most Merciful, the Most Compassionate.</p>
      <h2>Introduction</h2>
      <p>This article explores <strong>${a.title}</strong> with practical insights grounded in the Quran and Sunnah.</p>
      <h2>Key Principles</h2>
      <p>We outline key principles and provide actionable guidance for day-to-day implementation.</p>
      <h3>Practical Steps</h3>
      <ul>
        <li>Begin with sincere intention (ikhlas).</li>
        <li>Follow the Sunnah consistently.</li>
        <li>Reflect on relevant Quranic verses.</li>
      </ul>
      <h2>Conclusion</h2>
      <p>May Allah grant us beneficial knowledge and righteous action.</p>
    `;

    setupShare(a);
    renderSuggested(a.id);
  }

  function setupShare(a) {
    const url = window.location.href.split('#')[0];
    const text = `${a.title} — via Mansheu Dawah`;
    const shareBtn = byId('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
          try { await navigator.share({ title: a.title, text, url }); } catch(_) {}
        } else {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,'_blank');
        }
      });
    }
    const tw = byId('shareTwitter');
    const fb = byId('shareFacebook');
    const wa = byId('shareWhatsApp');
    const em = byId('shareEmail');
    if (tw) tw.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    if (wa) wa.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
    if (em) em.href = `mailto:?subject=${encodeURIComponent(a.title)}&body=${encodeURIComponent(text + '\n' + url)}`;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function renderSuggested(currentId) {
    const grid = document.getElementById('suggestedGrid');
    if (!grid) return;
    const pool = ARTICLES.filter(a => a.id !== currentId);
    const picks = shuffle(pool).slice(0, 4);
    grid.innerHTML = picks.map(a => `
      <article class="article-card" data-category="${a.category}">
        <div class="article-image">
          <img src="${a.image}" alt="${a.title}" loading="lazy">
          <div class="article-category">${a.category.charAt(0).toUpperCase() + a.category.slice(1)}</div>
        </div>
        <div class="article-content">
          <h3 class="article-title"><a href="article-detail.html?id=${a.id}">${a.title}</a></h3>
          <div class="article-meta">
            <span class="article-date"><i class="fas fa-calendar"></i> ${a.date}</span>
            <span class="read-time"><i class="fas fa-clock"></i> ${a.read}</span>
          </div>
          <div class="article-author-profile">
            <img src="../assets/images/image_example.jpg" alt="Author: ${a.author}" width="28" height="28" loading="lazy">
            <span class="author-name">${a.author}</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const id = getParamId();
    const article = pickArticle(id);
    renderArticle(article);
  });
})();
