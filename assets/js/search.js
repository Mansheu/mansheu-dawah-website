// Search results page logic
(function() {
  const INDEX = [
    // Dhikr & Dua Pages
    {
      title: 'Morning Adhkar',
      url: 'morning-adhkar.html',
      description: 'Morning supplications (adhkar) to start your day with remembrance of Allah. Recite these duas after Fajr prayer.',
      tags: 'morning adhkar dhikr dua daily fajr sunrise supplications protection barakah blessings'
    },
    {
      title: 'Evening Adhkar',
      url: 'evening-adhkar.html',
      description: 'Evening adhkar to end your day with protection and barakah. Recite after Maghrib or before sleep.',
      tags: 'evening adhkar dhikr night protection maghrib sunset daily supplications'
    },
    {
      title: 'Dhikr & Du\'a Collection',
      url: 'dhikr-dua.html',
      description: 'Central hub for daily dhikr, duas, and prophetic supplications. Complete guide to remembrance.',
      tags: 'dhikr dua duas supplication adhkar collection remembrance daily prophetic sunnah'
    },
    {
      title: 'Before Sleep Adhkar',
      url: 'before-sleep-adhkar.html',
      description: 'Adhkar and duas to recite before going to sleep. Protection from nightmares and evil.',
      tags: 'sleep before sleep adhkar night protection bedtime rest duas'
    },
    {
      title: 'Waking Up Adhkar',
      url: 'waking-up.html',
      description: 'Duas and adhkar when waking up from sleep. Start your day with gratitude to Allah.',
      tags: 'waking up morning sleep awakening duas gratitude'
    },
    {
      title: 'After Salah Adhkar',
      url: 'after-salah.html',
      description: 'Remembrances and duas to say after the obligatory prayers. Post-prayer supplications.',
      tags: 'after salah prayer adhkar dhikr obligatory fard tasbih takbir'
    },
    {
      title: 'Adhan and Masjid Duas',
      url: 'adhan-masjid.html',
      description: 'Duas to recite when hearing the adhan and entering the masjid.',
      tags: 'adhan azan masjid mosque prayer call entering duas'
    },
    {
      title: 'Lavatory and Wudu Duas',
      url: 'lavatory-wudu.html',
      description: 'Duas for entering bathroom, relieving oneself, and making wudu (ablution).',
      tags: 'lavatory toilet bathroom wudu ablution cleanliness duas purification'
    },
    {
      title: 'Food and Drink Duas',
      url: 'food-drink.html',
      description: 'Duas before and after eating, drinking, and breaking fast.',
      tags: 'food drink eating meal iftar breakfast lunch dinner water duas basmala'
    },
    {
      title: 'Clothes Duas',
      url: 'clothes.html',
      description: 'Duas when wearing new clothes or getting dressed.',
      tags: 'clothes clothing dress wear garment new duas'
    },
    {
      title: 'Travel Duas',
      url: 'travel.html',
      description: 'Duas for traveling, boarding vehicles, and journey safety.',
      tags: 'travel journey trip car bus plane train vehicle safety duas safar'
    },
    {
      title: 'Social Interactions Duas',
      url: 'social-interactions.html',
      description: 'Duas for meeting people, visiting sick, condolences, and social occasions.',
      tags: 'social meeting people greetings sick visit condolences duas etiquette'
    },
    {
      title: 'Marriage and Children Duas',
      url: 'marriage-children.html',
      description: 'Duas related to marriage, intimacy, pregnancy, and raising children.',
      tags: 'marriage wedding nikah children kids pregnancy family duas'
    },
    {
      title: 'Money and Shopping Duas',
      url: 'money-shopping.html',
      description: 'Duas for financial matters, business, shopping, and marketplace.',
      tags: 'money shopping market business trade finance rizq provision duas'
    },
    {
      title: 'Gatherings Duas',
      url: 'gatherings.html',
      description: 'Duas for gatherings, meetings, and when leaving an assembly.',
      tags: 'gatherings meeting assembly majlis kaffaratul majlis duas social'
    },
    {
      title: 'Hajj and Umrah Duas',
      url: 'hajj-umrah.html',
      description: 'Duas and adhkar for Hajj and Umrah pilgrimage.',
      tags: 'hajj umrah pilgrimage makkah mecca tawaf safa marwa duas'
    },
    {
      title: 'Death and Janazah Duas',
      url: 'death.html',
      description: 'Duas for the dying, deceased, and funeral prayers.',
      tags: 'death dying deceased janazah funeral burial grave cemetery duas'
    },
    {
      title: 'Difficulties and Happiness Duas',
      url: 'difficulties-happiness.html',
      description: 'Duas for hardship, anxiety, gratitude, and moments of joy.',
      tags: 'difficulties hardship anxiety worry happiness joy gratitude shukr duas relief'
    },
    {
      title: 'Nature and Weather Duas',
      url: 'nature.html',
      description: 'Duas when seeing rain, thunder, lightning, and natural phenomena.',
      tags: 'nature weather rain thunder lightning wind storm duas natural'
    },
    {
      title: 'Nightmares and Bad Dreams',
      url: 'nightmares.html',
      description: 'What to do and say when experiencing nightmares or bad dreams.',
      tags: 'nightmares bad dreams sleep protection duas shaytan'
    },
    {
      title: 'Salah Duas',
      url: 'salah.html',
      description: 'Duas and adhkar related to the five daily prayers.',
      tags: 'salah prayer namaz fard obligatory sunnah duas qiyam ruku sujud'
    },
    {
      title: 'Istikharah Dua',
      url: 'istikharah.html',
      description: 'The prayer of seeking guidance from Allah when making decisions.',
      tags: 'istikharah guidance decision choice seeking allah help duas'
    },
    {
      title: 'Istighfar - Seeking Forgiveness',
      url: 'istighfar.html',
      description: 'Duas for seeking forgiveness and repentance from Allah.',
      tags: 'istighfar forgiveness repentance tawbah sins mercy duas astaghfirullah'
    },
    {
      title: 'Salawat on the Prophet',
      url: 'salawat.html',
      description: 'Sending blessings and peace upon Prophet Muhammad (peace be upon him).',
      tags: 'salawat durood blessings prophet muhammad peace sallallahu alayhi wasallam duas'
    },
    {
      title: 'Sunnah Duas Collection',
      url: 'sunnah-duas.html',
      description: 'Comprehensive collection of authentic prophetic duas from hadith.',
      tags: 'sunnah duas prophetic hadith authentic collection prophet duas'
    },
    {
      title: 'Quranic Duas',
      url: 'quranic-duas.html',
      description: 'Duas and supplications mentioned in the Quran.',
      tags: 'quran quranic duas ayat verses supplications allah book'
    },
    {
      title: 'Praises of Allah',
      url: 'praises.html',
      description: 'Words and phrases praising and glorifying Allah.',
      tags: 'praise glorification tasbih tahmid tahlil takbir subhanallah alhamdulillah'
    },
    // Educational Pages
    {
      title: 'What is Dua?',
      url: 'what-is-dua.html',
      description: 'Understanding the concept, importance, and essence of dua in Islam.',
      tags: 'what is dua supplication prayer concept importance worship'
    },
    {
      title: 'Virtues of Dhikr',
      url: 'virtues-of-dhikr.html',
      description: 'Benefits and virtues of remembering Allah frequently. Rewards of dhikr.',
      tags: 'virtues of dhikr remembrance benefits reward blessings hadith quran'
    },
    {
      title: 'Types of Dhikr',
      url: 'types-of-dhikr.html',
      description: 'Different forms of dhikr from Qur\'an and Sunnah. Categories of remembrance.',
      tags: 'types of dhikr tasbih tahmid tahlil takbir categories forms'
    },
    {
      title: 'Why Sunnah Adhkar Matter',
      url: 'why-sunnah-adhkar.html',
      description: 'Understanding the importance of prophetic daily adhkar in our lives.',
      tags: 'sunnah adhkar daily prophetic importance significance prophet'
    },
    {
      title: 'How to Do Dhikr',
      url: 'how-to-do-dhikr.html',
      description: 'Practical guidance on building a consistent dhikr routine and habit.',
      tags: 'how to dhikr guide practical routine habit consistency tips'
    },
    {
      title: 'Etiquette of Making Dua',
      url: 'etiquette-of-making-dua.html',
      description: 'Proper manners and etiquette when making dua to Allah.',
      tags: 'etiquette dua manners adab how to make proper conditions'
    },
    {
      title: 'Five Steps in Dua',
      url: 'five-steps-in-dua.html',
      description: 'A structured approach to making effective and accepted duas.',
      tags: 'five steps dua guide method approach structure how to'
    },
    {
      title: 'Occasions When Dua is Accepted',
      url: 'occasions-accepted.html',
      description: 'Times and situations when duas are most likely to be answered.',
      tags: 'occasions times accepted dua mustajab answer response best'
    },
    {
      title: 'Optimal Guide for Making Dua',
      url: 'optimal-guide-for-making-dua.html',
      description: 'Comprehensive guide to making the most effective duas.',
      tags: 'optimal guide dua making best effective accepted complete'
    },
    {
      title: 'Key to Contentment',
      url: 'key-to-contentment.html',
      description: 'Finding tranquility and peace of heart through remembrance of Allah.',
      tags: 'contentment tranquility heart dhikr peace satisfaction happiness'
    },
    {
      title: 'Protection of Iman',
      url: 'protection-of-iman.html',
      description: 'How dhikr and dua protect and strengthen your faith.',
      tags: 'protection iman faith belief strengthen shield guard duas'
    },
    {
      title: 'The Universe Glorifies Allah',
      url: 'universe-glorifies-allah.html',
      description: 'Reflections on how all creation remembers and glorifies Allah.',
      tags: 'universe glorifies allah creation nature dhikr tasbih heavens earth'
    },
    {
      title: 'Quran - The Best Dhikr',
      url: 'quran-best-dhikr.html',
      description: 'Why reciting and reflecting on the Quran is the best form of dhikr.',
      tags: 'quran best dhikr recitation tilawah reading reflection kalam allah'
    },
    {
      title: 'Ruqyah - Islamic Healing',
      url: 'ruqyah.html',
      description: 'Quranic verses and duas for spiritual healing and protection.',
      tags: 'ruqyah healing protection evil eye sihr magic black spiritual'
    },
    // Tools and Resources
    {
      title: 'Digital Dhikr Counter',
      url: 'digital-counter.html',
      description: 'Use a digital counter to keep track of your dhikr and tasbih. Count your remembrance.',
      tags: 'digital counter tasbih dhikr tool tracker counting subhanallah alhamdulillah'
    },
    {
      title: 'Islamic Articles',
      url: 'articles.html',
      description: 'Read articles on faith, prayer, character, and spiritual growth in Islam.',
      tags: 'articles knowledge blog iman salah character spirituality islam learning'
    },
    {
      title: 'Names of Allah (Asma ul-Husna)',
      url: 'names-of-allah-new.html',
      description: 'Explore and reflect on the 99 beautiful names of Allah with meanings.',
      tags: 'names of allah asmaul husna 99 names beautiful attributes qualities'
    },
    {
      title: 'Teaching Resources',
      url: 'resources.html',
      description: 'Resources and tools to support Islamic teaching and learning.',
      tags: 'resources teaching teacher course classroom education learning materials'
    },
    {
      title: 'Publications',
      url: 'publications.html',
      description: 'Books and publications from Mansheu Dawah.',
      tags: 'books publications pdf read download library islamic'
    },
    {
      title: 'Quotes & Reminders',
      url: 'quotes-reminders.html',
      description: 'Visual Islamic quotes and short reminders to share on social media.',
      tags: 'quotes reminders images social share instagram facebook twitter wisdom'
    },
    {
      title: 'About Mansheu Dawah',
      url: 'about.html',
      description: 'Learn about our story, mission, vision, and impact in spreading Islamic knowledge.',
      tags: 'about mission story vision team history organization foundation'
    },
    {
      title: 'Contact',
      url: 'contact.html',
      description: 'Get in touch for questions, feedback, or support. Send us a message.',
      tags: 'contact support help message email whatsapp communication'
    }
  ];

  function getQuery() {
    try {
      const params = new URLSearchParams(window.location.search);
      return (params.get('q') || '').trim();
    } catch (_) {
      return '';
    }
  }

  function normalise(str) {
    return (str || '').toLowerCase();
  }

  function filterResults(query) {
    if (!query) return [];
    const q = normalise(query);
    const parts = q.split(/\s+/).filter(Boolean);

    return INDEX.filter(item => {
      const haystack = normalise(
        item.title + ' ' + item.description + ' ' + (item.tags || '')
      );
      // Match if ANY word is present (more lenient search)
      return parts.some(word => haystack.includes(word));
    }).sort((a, b) => {
      // Sort by relevance: how many words match
      const aMatches = parts.filter(word => 
        normalise(a.title + ' ' + a.description + ' ' + (a.tags || '')).includes(word)
      ).length;
      const bMatches = parts.filter(word => 
        normalise(b.title + ' ' + b.description + ' ' + (b.tags || '')).includes(word)
      ).length;
      return bMatches - aMatches;
    });
  }

  function highlight(text, query) {
    const q = normalise(query);
    if (!q) return text;
    const parts = q.split(/\s+/).filter(Boolean);
    let result = text;
    
    parts.forEach(word => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(${escaped})`, 'ig');
      result = result.replace(re, '<mark>$1</mark>');
    });
    
    return result;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const query = getQuery();
    const resultsContainer = document.getElementById('searchResults');
    const summary = document.getElementById('searchSummary');
    const input = document.querySelector('.search-page .global-search-form .search-input');

    if (input && query) {
      input.value = query;
    }

    if (!resultsContainer || !summary) return;

    if (!query) {
      summary.textContent = 'Type a keyword to search across Mansheu Dawah.';
      resultsContainer.innerHTML = '';
      return;
    }

    const results = filterResults(query);

    summary.innerHTML = `Showing <strong>${results.length}</strong> result${results.length === 1 ? '' : 's'} for <strong>"${query}"</strong>`;

    if (!results.length) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
            <p>No results found containing "<strong>${query}</strong>".</p>
            <p>Try different keywords or a broader term.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = results.map(item => `
      <article class="search-result-card">
          <h2 class="search-result-title">
              <a href="${item.url}">${highlight(item.title, query)}</a>
          </h2>
          <p class="search-result-description">
              ${highlight(item.description, query)}
          </p>
          <a class="search-result-link" href="${item.url}">
              Open page
              <i class="fas fa-arrow-right"></i>
          </a>
      </article>
    `).join('');
  });
})();
