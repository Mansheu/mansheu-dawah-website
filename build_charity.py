# -*- coding: utf-8 -*-
from pathlib import Path
import textwrap
from urllib.parse import quote_plus

BASE_URL = "https://mansheudawah.com/pages"

CAROUSEL_CARDS = [
    ("basics-of-islam", "basics-of-islam.html", "Basics of Islam", "Islam is a monotheistic faith founded on the belief in one God (Allah) and the teachings of Prophet Muhammad (peace be upon him). Muslims follow the Five Pillars of Islam and believe in the Quran as the final revelation from God."),
    ("hajj-umrah", "hajj-umrah.html", "Hajj and Umrah", "Hajj is the annual pilgrimage to Mecca that every able-bodied Muslim must perform at least once in their lifetime. Umrah is a shorter pilgrimage performed year-round for spiritual closeness to Allah."),
    ("ramadan", "ramadan.html", "Ramadan", "Ramadan is the ninth month of the Islamic calendar when Muslims fast from dawn to sunset. It is a time of spiritual reflection, prayer, charity, and community gathering, culminating in the celebration of Eid al-Fitr."),
    ("shariah", "shariah.html", "Shariah", "Shariah is Islamic law derived from the Quran and Sunnah. It provides guidance on worship, ethics, family life, and social justice. Shariah emphasizes compassion, fairness, and the protection of human dignity in all aspects of life."),
    ("health-wellness", "health-wellness.html", "Health &amp; Wellness", "Islam teaches that the body is a trust from Allah and must be cared for properly. Muslims are encouraged to maintain physical health through balanced nutrition, exercise, and cleanliness, while also nurturing mental and spiritual well-being."),
    ("charity", "charity.html", "Charity", "Charity is a fundamental principle in Islam. Zakat (obligatory charity) is one of the Five Pillars, while Sadaqah (voluntary charity) is highly encouraged. Giving purifies wealth and helps create a just and compassionate society."),
    ("peace-violence", "peace-violence.html", "Peace &amp; Violence", "Islam promotes peace, justice, and the sanctity of human life. The religion condemns terrorism and unjust violence. True jihad is primarily a spiritual struggle for self-improvement, while physical defense is only permitted in specific, limited circumstances."),
    ("women", "women.html", "Women", "Islam grants women rights to education, property ownership, and spiritual equality with men. Women are honored as mothers, daughters, wives, and professionals. Islamic teachings emphasize respect, dignity, and protection for women in all spheres of life."),
    ("men", "men.html", "Men", "Men in Islam are called to be protectors and maintainers of their families with justice and compassion. Islamic masculinity emphasizes responsibility, humility, emotional intelligence, and service to family and community while striving for personal spiritual growth."),
]

TOPIC_PAGES = [
    {
        "slug": "charity",
        "title": "Charity",
        "meta_desc": "Learn how zakat, sadaqah, and compassionate giving purify wealth, empower society, and attract Allah's mercy.",
        "share_text": "Charity Insights",
        "mail_subject": "Charity in Islam",
        "explore": [
            ("sincere-intention.html", "SPIRITUALITY", "Purifying Intention Before Giving", "Ust. Sheu Babakar"),
            ("money-shopping.html", "FINANCE", "Halal Earning and Spending Habits", "Team Mansheu"),
            ("social-interactions.html", "COMMUNITY", "Serving Neighbors &amp; Society", "Mohannad Abusarah"),
            ("sabr-shukr.html", "CHARACTER", "Balancing Patience and Gratitude", "Ust. Sheu Babakar"),
        ],
        "qas": [
            ("What does charity mean in Islam?", """<p><strong>Charity is an act of love, justice, and gratitude that proves everything we possess belongs to Allah.</strong> When Muslims give, they acknowledge that wealth is a test and a tool, not an identity, and that true prosperity lies in using it to please the Giver.</p><p>Giving is therefore a spiritual practice as much as it is an economic one. It softens the heart, cures greed, and invites divine mercy in both this life and the Hereafter.</p>"""),
            ("How are zakat and sadaqah different?", """<p><strong>Zakat is the obligatory annual charity that purifies eligible savings once they reach the nisab threshold and a lunar year passes.</strong> It carries precise rates and must be delivered to specific recipients listed in Surah at-Tawbah (9:60).</p><p><strong>Sadaqah is voluntary charity</strong> that can be given anytime, for any amount, and even through non-monetary acts such as a smile, teaching, or removing harm from a pathway. Both feed the soul, yet zakat carries the accountability of a pillar while sadaqah reflects the generosity of an eager heart.</p>"""),
            ("Why is zakat a pillar of Islam?", """<p><strong>Zakat literally means purification and growth.</strong> By giving a portion of our wealth we cleanse the remainder from selfishness and earn the blessing of increase. Allah promises, "Whatever you give in charity, He will replace" (Qur'an 34:39).</p><p>Zakat also institutionalizes compassion. It ensures resources circulate rather than stagnate, empowers the vulnerable, and keeps the prophetic community tied together in mutual care.</p>"""),
            ("Who is obligated to pay zakat?", """<p><strong>Every Muslim who owns wealth above the nisab amount for a full lunar year must pay zakat.</strong> Wealth includes cash, investments, business inventory, certain agricultural outputs, and precious metals.</p><p>Nisab is the minimum threshold roughly equivalent to the value of 85 grams of gold. Keeping organized records, tracking anniversaries of ownership, and seeking learned advice guards against negligence.</p>"""),
            ("Who can receive zakat funds?", """<p><strong>The Qur'an lists eight eligible categories:</strong> the poor, the needy, zakat administrators, new Muslims or allies whose hearts are to be reconciled, captives seeking freedom, those drowning in debt, efforts in the path of Allah, and stranded travelers.</p><p>Local scholars or trustworthy organizations can help verify eligibility. The aim is to uplift recipients with dignity, not simply to distribute money.</p>"""),
            ("When should zakat be paid?", """<p><strong>Many Muslims tie zakat to Ramadan for spiritual synergy, but it can be paid at any time once a lunar year elapses on the nisab amount.</strong></p><p>Setting calendar reminders, automating transfers, or splitting payments throughout the year keeps generosity consistent and reduces last-minute rush.</p>"""),
            ("How is zakat calculated on business assets?", """<p><strong>Business owners assess the value of cash on hand, receivables likely to be collected, inventory for sale, and investment holdings at their current market rate.</strong></p><p>They subtract short-term liabilities due within the same period and then apply the zakat rate to the net amount. Consulting Muslim accountants or reputable zakat calculators ensures accuracy.</p>"""),
            ("What is sadaqah jariyah?", """<p><strong>Sadaqah jariyah is ongoing charity whose reward continues long after the donor passes away.</strong> Examples include funding wells, schools, Qur'an printing, or digital learning platforms that keep benefiting people.</p><p>Many families establish waqf endowments or sponsor micro-projects in memory of loved ones, creating an endless investment in the afterlife.</p>"""),
            ("How important is intention when giving?", """<p><strong>The Prophet SAW taught that actions are rewarded by intentions.</strong> Before giving, believers pause to remember Allah, banish thoughts of self-promotion, and remind themselves that charity is ultimately about Him.</p><p>A sincere niyyah transforms even a small coin, while a corrupt niyyah empties outwardly impressive donations of any lasting reward.</p>"""),
            ("Is charity limited to money?", """<p><strong>No. Smiles, kind words, teaching skills, mentoring youth, donating time, or using influence for justice are all forms of sadaqah.</strong></p><p>This expansive definition ensures that every believer, regardless of income, can participate in building a compassionate society.</p>"""),
            ("Should charity be public or private?", """<p><strong>The Qur'an praises both discreet and public giving.</strong> Secret charity protects sincerity and the recipient's dignity, while public campaigns can inspire others and normalize generosity.</p><p>The key is to check one's ego: if publicity feeds pride, keep it private; if it fuels communal good, share it responsibly.</p>"""),
            ("How does charity respond to emergencies?", """<p><strong>In times of war, famine, or natural disasters, immediate aid can mean the difference between life and death.</strong> Islamic history is full of examples where caravans of aid crossed continents in response to a single distress call.</p><p>Modern Muslims partner with credible relief organizations, combine local fundraisers with digital campaigns, and remain engaged beyond the news cycle.</p>"""),
            ("How do we avoid fostering dependency?", """<p><strong>Islamic charity seeks to empower rather than perpetually sustain.</strong> Programs that provide education, job training, microfinance, and mentorship help recipients become donors themselves.</p><p>Checking in with beneficiaries, asking what they truly need, and respecting their agency prevents paternalism.</p>"""),
            ("What is the social impact of charity?", """<p><strong>Charity is an engine of social justice.</strong> It reduces inequality, diffuses resentment, and heals hearts that might otherwise feel abandoned.</p><p>Communities that normalize giving often enjoy lower crime, stronger masjid participation, and a culture of mutual reliance that no policy alone can create.</p>"""),
            ("How can families nurture generosity in children?", """<p><strong>Invite children to help count coins, deliver food baskets, or choose which cause to support.</strong> Let them witness gratitude from recipients and celebrate small acts of kindness.</p><p>Storytelling about the companions' generosity and keeping sadaqah jars in the home cultivate lasting habits.</p>"""),
            ("How has technology changed giving?", """<p><strong>Automation, crowdfunding, and transparent dashboards make it easier to give consistently and track impact.</strong></p><p>Still, Muslims are urged to vet organizations carefully, read annual reports, and prioritize groups with trustworthy governance.</p>"""),
            ("What if someone feels donor fatigue?", """<p><strong>It is normal to feel overwhelmed by constant appeals.</strong> Setting a realistic budget, diversifying causes, and remembering the eternal payoff renews motivation.</p><p>Rotate between monetary and non-monetary sadaqah, and take time to reflect on how Allah has already repaid your past giving.</p>"""),
            ("Which du'a can increase generosity?", """<p><strong>The Prophet SAW would supplicate, "O Allah, grant me a heart that is content and a tongue that remembers You."</strong> Many also recite, "Allahumma inni a'udhu bika minal hammi wal hazan..." to remove anxieties about provision.</p><p>Combining du'a with concrete budgeting and accountability partners keeps generosity alive all year.</p>"""),
        ],
    },
    {
        "slug": "peace-violence",
        "title": "Peace &amp; Violence",
        "meta_desc": "Explore how the Qur'an, Sunnah, and scholarship prioritize peace, restrict warfare, prevent extremism, and heal communal conflicts.",
        "share_text": "Islam on Peace and Justice",
        "mail_subject": "Peace & Violence in Islam",
        "explore": [
            ("following-sunnah.html", "SUNNAH", "Prophetic Mercy in Times of Tension", "Umm Hafsa Adedayo"),
            ("social-interactions.html", "COMMUNITY", "Etiquette of Reconciling Hearts", "Team Mansheu"),
            ("sabr-trials.html", "CHARACTER", "Patience During Turbulent Moments", "Ust. Sheu Babakar"),
            ("seeking-knowledge.html", "KNOWLEDGE", "Learning Before Speaking", "Mohannad Abusarah"),
        ],
        "qas": [
            ("What does Islam teach about the meaning of peace (salam)?", """<p><strong>Peace is the default state of Islamic life because Allah is As-Salam, "The Source of Peace," and every prayer ends with the greeting of salam.</strong> Believers are taught to calm their own hearts through dhikr, extend safety to neighbors, and use their words to soothe rather than provoke.</p><p>Qur'an 8:61 instructs the Prophet SAW to incline toward peace whenever the other party does so, showing that de-escalation is not weakness but prophetic strength.</p>"""),
            ("How does the Qur'an describe jihad?", """<p><strong>Jihad literally means exerting one's utmost effort, with the greatest struggle being the fight against ego, injustice, and ignorance.</strong> Armed combat is only one narrow subset of jihad and is surrounded by strict ethics, while the broader concept includes scholarship, social reform, and moral self-control.</p><p>The Prophet SAW called returning from battle "the lesser jihad" and pointed to steady self-improvement and service as the everlasting "greater jihad."</p>"""),
            ("When is armed struggle permitted?", """<p><strong>Armed struggle is only allowed in defense against aggression, persecution, or to protect the freedom of worship, and must be ordered by legitimate leadership.</strong> Qur'an 22:39-40 grants permission to fight when believers are expelled unjustly and when monasteries, churches, synagogues, and mosques are threatened.</p><p>Personal anger, revenge, or vigilantism have no place in Islamic law; accountability, lawful command, and proportional response are non-negotiable conditions.</p>"""),
            ("What ethical rules govern warfare in Islam?", """<p><strong>The Prophet SAW and classical jurists outlined binding rules of engagement.</strong></p><ul><li>Non-combatants—women, children, the elderly, scholars, and farmers—are inviolable.</li><li>Torture, mutilation, scorched-earth tactics, and desecrating the deceased are prohibited.</li><li>Property, crops, and animals cannot be harmed unnecessarily, and treaties must be honored.</li></ul><p>These guidelines predate modern humanitarian conventions and remain the benchmark for Muslim conduct.</p>"""),
            ("How does Islam protect civilians and sacred spaces?", """<p><strong>Islamic sources repeatedly emphasize safeguarding life, intellect, and houses of worship.</strong> Abu Bakr RA commanded armies to leave monks in monasteries unharmed, and the Prophet SAW forbade striking those who withdraw.</p><p>Any attack that purposely targets civilians, schools, hospitals, or places of worship is considered a major sin and a betrayal of the prophetic covenant.</p>"""),
            ("What role do treaties and diplomacy play?", """<p><strong>Treaties such as Hudaybiyyah illustrate that strategic patience and written agreements can unlock dramatic long-term victories.</strong> The Qur'an orders Muslims to fulfill covenants even when inconvenient, so long as the other party does not break them first.</p><p>Modern diplomacy, interfaith councils, ceasefires, and humanitarian corridors are extensions of that prophetic commitment to saving life and lowering tensions.</p>"""),
            ("How should Muslims respond to oppression before considering force?", """<p><strong>Islam teaches believers to exhaust peaceful tools—legal advocacy, community organizing, boycotts, education, and du'a—before any discussion of combat.</strong></p><p>Standing up in court, speaking truth to power, funding relief work, and building coalitions often yields change faster than violence and protects the moral high ground.</p>"""),
            ("How do scholars address extremism and vigilantism?", """<p><strong>Classical and contemporary scholars condemn self-appointed militias and lone-wolf violence because they bypass due process, kill innocents, and tarnish Islam's image.</strong></p><p>They urge Muslims to study fiqh of jihad with qualified teachers, keep grievances rooted in facts, and adopt prophetic methods: patience, wisdom, and lawful advocacy.</p>"""),
            ("How can communities prevent radicalization?", """<p><strong>Healthy communities provide dignified jobs, social belonging, and access to sound scholarship so frustration does not mutate into rage.</strong> Youth programs that mix worship, sports, mentorship, and civic service help channel zeal toward constructive projects.</p><p>Open conversations about grievances, media literacy workshops, and partnerships with counselors also close the door to manipulative recruiters.</p>"""),
            ("What is Islam's verdict on terrorism?", """<p><strong>Targeting civilians to create fear is categorically haram and violates every objective of Shariah.</strong> The Prophet SAW called the deliberate harming of non-combatants betrayal, and scholars unanimously classify modern terrorism as corruption on earth (fasad fil-ard).</p><p>No grievance justifies massacres, bombings, or hostage-taking; justice must be pursued through lawful, ethical means.</p>"""),
            ("How does Islam address domestic violence or abuse?", """<p><strong>Prophetic character leaves no room for domestic violence; the Prophet SAW never struck his family and said, "The best of you are those best to their wives."</strong></p><p>Survivors are encouraged to seek help from family, community leaders, and authorities, while communities must build shelters, counseling services, and accountability mechanisms for abusers.</p>"""),
            ("How do Muslims reconcile conflicts within families or communities?", """<p><strong>The Qur'an commands believers to reconcile fighting parties, appoint mediators, and restore justice.</strong> Techniques include sulh (restorative agreements), arbitration by trusted elders, and facilitated dialogues that let each side feel heard.</p><p>Documented agreements, follow-up check-ins, and forgiveness rituals help transform temporary truces into lasting healing.</p>"""),
            ("What is aman (safe-conduct) and asylum in Islam?", """<p><strong>Aman grants protection to individuals—even non-Muslims—who seek safety among Muslims.</strong> Offering asylum is considered a righteous act, and breaking such a promise is a grave violation.</p><p>Modern equivalents include honoring refugees, upholding visas, and ensuring that Muslim spaces are sanctuaries from hate.</p>"""),
            ("How do Muslims collaborate with other faith communities for peace?", """<p><strong>Qur'an 5:2 urges mutual cooperation in righteousness, not sin, allowing Muslims to partner with anyone pursuing justice.</strong> Examples include interfaith relief efforts, anti-violence coalitions, and neighborhood safety initiatives.</p><p>Shared service projects highlight common values and dismantle stereotypes, strengthening social harmony.</p>"""),
            ("Why is forgiveness central to restoring peace?", """<p><strong>Forgiveness liberates the wounded heart and halts cycles of retaliation.</strong> Qur'an 41:34 promises that enmity can turn into warm friendship when good drives out evil.</p><p>Forgiveness does not erase accountability; rather, it combines justice with mercy and creates room for offenders to reform.</p>"""),
            ("How should Muslims respond to insults or provocations?", """<p><strong>Believers emulate the servants of the Most Merciful who "walk humbly on the earth, and when the ignorant address them harshly, they reply with peace" (Qur'an 25:63).</strong></p><p>They may still pursue legal rights and correct misinformation, but they do so with dignity, measured speech, and unwavering adherence to prophetic etiquette.</p>"""),
            ("How can youth channel their passion for justice productively?", """<p><strong>Youth should pair enthusiasm with knowledge, mentorship, and practical service.</strong> Studying history, learning organizing skills, and joining relief drives or civic campaigns turns frustration into real change.</p><p>Imams, parents, and teachers should invite young people into planning tables, fund their initiatives, and celebrate ethical activism.</p>"""),
            ("Which supplications nurture personal and societal peace?", """<p><strong>Daily prayers include asking Allah, "Rabbana atina fid-dunya hasanah..." and concluding each salah with "Allahumma anta as-salam wa minka as-salam."</strong></p><p>Reciting the Asma'ul Husna, sending abundant salawat upon the Prophet SAW, and greeting others with "as-salamu alaykum" are simple practices that spread tranquility everywhere.</p>"""),
        ],
    },
    {
        "slug": "women",
        "title": "Women",
        "meta_desc": "Discover how Islam safeguards women's spiritual station, economic rights, education, leadership, and holistic wellbeing.",
        "share_text": "Women in Islam",
        "mail_subject": "Women in Islam Insights",
        "explore": [
            ("marriage-children.html", "FAMILY", "Prioritizing Mercy in Marriage", "Team Mansheu"),
            ("social-interactions.html", "COMMUNITY", "Building Sisterhood &amp; Service", "Umm Hafsa Adedayo"),
            ("seeking-knowledge.html", "KNOWLEDGE", "Study Circles for Women", "Mohannad Abusarah"),
            ("health-wellness.html", "WELLNESS", "Holistic Self-Care Tips", "Dr. Maryam Sule"),
        ],
        "qas": [
            ("What is the spiritual status of women in Islam?", """<p><strong>Women stand before Allah with the same spiritual potential, accountability, and access to reward as men.</strong> Qur'an 33:35 lists believing men and women side by side, proving that taqwa—not gender—is the measure of success.</p><p>The earliest Muslim women memorized Qur'an, transmitted hadith, and sacrificed for the faith, showing that righteousness is gender-inclusive.</p>"""),
            ("Do Muslim women control their own wealth?", """<p><strong>Yes. A woman's earnings, inheritance, and gifts remain exclusively hers unless she freely chooses to share.</strong> Islam granted women independent property rights 1,400 years ago, freeing them from financial dependence on fathers or husbands.</p><p>She may invest, donate, or start a business without needing spousal approval, and any dowry (mahr) she receives cannot be reclaimed.</p>"""),
            ("What does Islam teach about women's education?", """<p><strong>Seeking knowledge is obligatory for every Muslim.</strong> Women attended the Prophet's circles, asked detailed questions, and even scheduled special classes for themselves.</p><p>Today, Muslim women study Quranic sciences, medicine, tech, and public policy because their expertise uplifts families and the ummah.</p>"""),
            ("How does Islamic law safeguard consent in marriage?", """<p><strong>A valid marriage requires the bride's clear approval.</strong> The Prophet SAW annulled marriages arranged without a woman's permission and empowered women to set conditions.</p><p>Families should make proposals, not pressure; imams and registrars must verify that the bride understands her rights and is free of coercion.</p>"""),
            ("How are mothers honored?", """<p><strong>The Prophet SAW said, "Paradise lies at the feet of mothers," underscoring their incomparable sacrifice.</strong> Serving one's mother is considered superior to voluntary jihad, and kind words to parents are paired with worship in Qur'an 17:23.</p><p>Communities must build parental leave, childcare support, and emotional care structures that reflect this prophetic regard.</p>"""),
            ("Can Muslim women work or lead projects?", """<p><strong>Women may pursue careers, entrepreneurship, and leadership so long as they observe modesty and ethical guidelines.</strong> Khadijah RA managed trade caravans, Ash-Shifa' bint Abdullah supervised markets, and countless women run relief organizations today.</p><p>Families should collaborate on schedules, child care, and household duties so that work becomes a shared blessing rather than a burden.</p>"""),
            ("What does hijab represent?", """<p><strong>Hijab is a holistic code of modesty that includes dress, speech, and behavior.</strong> It reminds both men and women to lower their gaze and interact respectfully.</p><p>The exact style varies by culture, but coercing or mocking women about hijab contradicts prophetic gentleness; education and encouragement are the path.</p>"""),
            ("How does Islam address abuse and harassment?", """<p><strong>Any form of abuse violates the prophetic standard of mercy.</strong> Women are entitled to safety, and communities should publicize reporting channels, counseling, and legal support.</p><p>Blaming victims is forbidden; the Prophet SAW immediately believed and helped those who reported harm.</p>"""),
            ("Why do inheritance shares sometimes differ?", """<p><strong>Inheritance shares correspond to financial responsibilities, not value.</strong> Men are obligated to provide for households, while women retain their wealth.</p><p>In many scenarios women inherit equal or more, and if family circumstances require different arrangements, Islamic wills and gifts can address them within legal bounds.</p>"""),
            ("Can women be scholars and spiritual guides?", """<p><strong>Absolutely. Aisha RA narrated thousands of hadith, Fatimah bint Sa'd mentored caliphs, and modern female scholars hold ijazahs in every field.</strong></p><p>Women lead tajwid classes, write jurisprudence texts, and serve as university lecturers, ensuring that female perspectives enrich religious discourse.</p>"""),
            ("How can women balance worship with many responsibilities?", """<p><strong>Allah values consistency over quantity.</strong> Women can combine intentions—like turning childcare into ibadah through nurturing dhikr—and lean on shorter yet regular practices such as duha, witr, or Qur'an recitation while cooking.</p><p>Communities should offer child-friendly classes, flexible halaqahs, and online learning so women are not forced to choose between service and spirituality.</p>"""),
            ("What community roles can women fulfill?", """<p><strong>Women organize relief drives, mediate family disputes, teach converts, produce media, and serve on masjid boards.</strong></p><p>Having women's voices in decision-making spaces ensures programming reflects actual needs—maternal health, teen mentorship, safety, and accessibility.</p>"""),
            ("How do Muslims challenge harmful cultural practices?", """<p><strong>Knowledge is the first antidote to injustice done in religion's name.</strong> Women should study fiqh of rights, consult trusted scholars, and build alliances with men of principle.</p><p>Workshops, khutbahs, and storytelling about exemplary women help replace harmful customs with prophetic models.</p>"""),
            ("What guidance exists for women's travel and safety?", """<p><strong>Classical jurists differed on travel requirements, but all agreed that safety is the priority.</strong> Modern scholars permit travel with trustworthy companions, groups, or vetted arrangements that ensure protection.</p><p>Women should plan routes, share itineraries, and know local resources while communities provide escorts, helplines, and supportive policies.</p>"""),
            ("How are single, divorced, or widowed women supported?", """<p><strong>Islam commands dignified care for all women, regardless of marital status.</strong> The Prophet SAW regularly checked on widows and allocated charity to them first.</p><p>Masjids should build support groups, financial aid, skill-training, and childcare grants so every sister feels anchored.</p>"""),
            ("What does Islam say about women's health and mental wellbeing?", """<p><strong>The body is a trust; rest, therapy, and joyful recreation are acts of gratitude.</strong> Women should seek female physicians when possible, pursue counseling without stigma, and carve out time for hobbies.</p><p>Communities can host wellness fairs, postpartum support circles, and campaigns about early screening to normalize holistic care.</p>"""),
            ("What financial rights do wives have within marriage?", """<p><strong>Wives are entitled to mahr, housing, clothing, food, and emotional support.</strong> They may stipulate conditions in the contract, retain their surname, and request khula' if mistreated.</p><p>Household chores are a mutual kindness, not an obligation; families thrive when duties are shared.</p>"""),
            ("Which du'as empower Muslim women daily?", """<p><strong>Women can recite "Rabbana hablana min azwajina wa dhurriyyatina qurrata a'yun..." for loving families and "Rabbi zidni ilma" for knowledge.</strong></p><p>Sending salawat, repeating "Hasbiya Allah" during stress, and reflecting on the stories of Maryam, Asiya, and Khadijah keep courage alive.</p>"""),
        ],
    },
    {
        "slug": "men",
        "title": "Men",
        "meta_desc": "Gain clarity on responsible Muslim masculinity—anchored in worship, service, emotional intelligence, and family care.",
        "share_text": "Men in Islam",
        "mail_subject": "Men in Islam Guidance",
        "explore": [
            ("marriage-children.html", "FAMILY", "Fatherhood Lessons from the Sunnah", "Team Mansheu"),
            ("strong-character.html", "CHARACTER", "Building Strong Character", "Ust. Sheu Babakar"),
            ("seeking-knowledge.html", "KNOWLEDGE", "Men &amp; Lifelong Learning", "Mohannad Abusarah"),
            ("health-wellness.html", "WELLNESS", "Staying Healthy &amp; Energetic", "Dr. Maryam Sule"),
        ],
        "qas": [
            ("What does it mean that men are qawwamun (caretakers)?", """<p><strong>Qawwamun describes a role of service, protection, and provision—not domination.</strong> Qur'an 4:34 calls men to steward resources so families feel safe, fed, and spiritually nurtured.</p><p>The Prophet SAW washed his own clothes, mended shoes, and cooked, proving that leadership begins with helping at home.</p>"""),
            ("What financial responsibilities rest on Muslim men?", """<p><strong>Men must provide housing, food, clothing, and general welfare for those under their care.</strong> They pay mahr at marriage, maintain parents when needed, and settle debts promptly.</p><p>Budgeting, halal earnings, and transparent communication prevent strain and model integrity for children.</p>"""),
            ("How should Muslim men approach emotional intelligence?", """<p><strong>The Prophet SAW cried, expressed joy, and validated feelings, showing that vulnerability is prophetic.</strong> Men are encouraged to name emotions, seek counsel, and apologize quickly.</p><p>Active listening, journaling, and therapy strengthen resilience and keep hearts soft before Allah.</p>"""),
            ("What is a man's role in worship leadership at home?", """<p><strong>Men are urged to establish prayer in their households.</strong> Leading family salah, reciting Qur'an aloud, and making du'a with children create a nurturing spiritual culture.</p><p>Yet leadership also means facilitating opportunities for others—driving relatives to classes and ensuring everyone has time for ibadah.</p>"""),
            ("How can men balance ambition with humility?", """<p><strong>Islam encourages excellence fueled by sincere intention.</strong> Men should pursue careers and projects that serve humanity while remembering that success is from Allah.</p><p>Regular sadaqah, mentoring others, and saying "MashaAllah" extinguish arrogance.</p>"""),
            ("What does responsible fatherhood look like?", """<p><strong>Fathers are shepherds who will be questioned about their flocks.</strong> The Prophet SAW shortened prayers when hearing a child cry, raced with Aisha, and carried his grandsons on his back.</p><p>Modern fathers must schedule one-on-one time, attend school events, and teach life skills with patience.</p>"""),
            ("How should men treat women in their lives?", """<p><strong>The Prophet SAW declared, "The best of you are those best to their women."</strong> Respectful speech, partnership in chores, and gratitude for unseen labor are obligatory.</p><p>Men must intervene when relatives face harm and champion policies that protect women's rights.</p>"""),
            ("What guidance exists for controlling anger?", """<p><strong>Anger is natural but must be restrained.</strong> The Prophet SAW advised sitting, lying down, performing wudu, or stepping away when angry.</p><p>Breathing techniques, dhikr, physical exercise, and conflict mediation workshops help men respond thoughtfully instead of explosively.</p>"""),
            ("How important is brotherhood and community service?", """<p><strong>Brotherhood keeps men accountable and hopeful.</strong> Serving in soup kitchens, visiting the sick, and joining masjid projects cultivate humility and shared purpose.</p><p>Small groups for Qur'an, fitness, or parenting offer safe spaces to share struggles and grow.</p>"""),
            ("How can men maintain work-life-worship balance?", """<p><strong>Time management anchored in salah prevents burnout.</strong> Scheduling breaks for dhuhr and asr, delegating tasks, and protecting family dinners keep priorities straight.</p><p>Weekly digital detoxes and retreats revive the spirit and remind men that productivity is a means, not an idol.</p>"""),
            ("Why should men prioritize health and fitness?", """<p><strong>The body is an amanah; strength enables service.</strong> Regular exercise, nutritious meals, and adequate sleep empower men to protect and provide without exhaustion.</p><p>Annual checkups and mental health screenings catch problems early and model self-care for younger generations.</p>"""),
            ("How do men pursue knowledge throughout life?", """<p><strong>Seeking knowledge never ends.</strong> Men should attend halaqahs, enroll in online courses, and read on leadership, parenting, and finance.</p><p>Keeping a study circle or mentoring pair ensures ideas translate into action.</p>"""),
            ("How should men respond to doubts or spiritual dips?", """<p><strong>Faith fluctuates; the Prophet SAW acknowledged this reality.</strong> Men should surround themselves with righteous company, make du'a for steadfastness, and revisit lessons on tawhid.</p><p>Consulting scholars, reading Seerah, and limiting sinful content refill the heart with clarity.</p>"""),
            ("What are Islamic ethics for earning and spending?", """<p><strong>Halal income is a prerequisite for accepted worship.</strong> Men must avoid riba, fraud, and exploitation, while documenting contracts clearly.</p><p>Spending should prioritize necessities, family joy, debt relief, and sadaqah; reckless luxury leads to heedlessness.</p>"""),
            ("Why is mentoring younger men essential?", """<p><strong>Islamic history thrives on apprenticeship.</strong> Older men should invite youth into projects, teach craft, and correct mistakes gently.</p><p>Mentorship shields young men from isolation, provides role models, and prepares the next generation of leaders.</p>"""),
            ("How can men cope with failure or setbacks?", """<p><strong>Tawakkul means doing one's best and trusting Allah with results.</strong> When plans collapse, men seek lessons, repent if needed, and start anew.</p><p>Sharing struggles with brothers, exercising, and keeping gratitude journals prevent despair.</p>"""),
            ("What does self-care look like for men?", """<p><strong>Self-care includes quiet worship, hobbies, healthy friendships, and counseling.</strong> Joining a hiking group, learning a craft, or simply resting can recharge intention.</p><p>Islam rejects the myth that men must suffer in silence; asking for help is courageous.</p>"""),
            ("Which du'as support men in their roles?", """<p><strong>Men can recite "Rabbana hablana min azwajina wa dhurriyyatina qurrata a'yun..." for righteous families and "Rabbi awzi'ni an ashkura ni'mataka..." for gratitude.</strong></p><p>Morning and evening adhkar, salawat, and the du'a of Prophet Musa for confidence ("Rabbi shrah li sadri...") fortify hearts before daily challenges.</p>"""),
        ],
    },
]
CSS_LINKS = textwrap.dedent("""    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/responsive.css">
    <link rel="stylesheet" href="../assets/css/pages.css">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2"family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2"family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../assets/images/favicon.svg">
    <link rel="alternate icon" href="../assets/images/favicon.ico">""")

NAV = textwrap.dedent("""    <!-- Header -->
    <div class="menu__wrapper">
        <div class="menu__bar">
            <a href="../index.html" title="Mansheu Dawah">
                <div class="logo">
                    <img src="../assets/images/logo.png" alt="Mansheu Dawah Logo" width="150" height="auto">
                </div>
            </a>
            <ul class="navigation">
                <li><a href="articles.html">
                    <span class="nav-title">Read</span>
                    <span class="nav-desc">Articles & written features</span>
                </a></li>
                <li><a href="videos.html">
                    <span class="nav-title">Watch</span>
                    <span class="nav-desc">Talks, clips & films</span>
                </a></li>
                <li><a href="learn.html">
                    <span class="nav-title">Learn</span>
                    <span class="nav-desc">Guides, lessons & courses</span>
                </a></li>
                <li><a href="infographics.html">
                    <span class="nav-title">Infographics</span>
                    <span class="nav-desc">Visual explainers & briefs</span>
                </a></li>
                <li><a href="about.html">
                    <span class="nav-title">About</span>
                    <span class="nav-desc">Our mission & vision</span>
                </a></li>
                <li class="nav-cta"><a href="digital-counter.html" class="btn btn-primary">Digital Counter</a></li>
            </ul>
            <div class="nav-actions">
                <div class="nav-controls">
                    <button class="menu-icon" aria-label="Toggle menu" aria-expanded="false">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </button>
                </div>
                <div class="nav-cta">
                    <a href="digital-counter.html" class="btn btn-primary">Digital Counter</a>
                </div>
            </div>
        </div>
    </div>""")

SHARE_SCRIPT = textwrap.dedent("""    <!-- JS -->
    <script src="../assets/js/theme.js"></script>
    <script src="../assets/js/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const qaHeaders = document.querySelectorAll('.qa-header');
            qaHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    qaHeaders.forEach(h => h.setAttribute('aria-expanded', 'false'));
                    this.setAttribute('aria-expanded', (!isExpanded).toString());
                });
            });

            const carousel = document.querySelector('.islam-carousel');
            const prevBtn = document.querySelector('.carousel-btn-prev');
            const nextBtn = document.querySelector('.carousel-btn-next');
            if (carousel && prevBtn && nextBtn) {
                const scrollAmount = carousel.offsetWidth * 0.8;
                prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
                nextBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
            }

            const copyButtons = document.querySelectorAll('[data-copy-link]');
            copyButtons.forEach(btn => {
                btn.addEventListener('click', event => {
                    event.preventDefault();
                    const link = btn.getAttribute('data-copy-link');
                    if (!link) return;
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(link).then(() => {
                            btn.classList.add('copied');
                            setTimeout(() => btn.classList.remove('copied'), 2000);
                        });
                    } else {
                        const input = document.createElement('input');
                        input.value = link;
                        document.body.appendChild(input);
                        input.select();
                        document.execCommand('copy');
                        document.body.removeChild(input);
                    }
                });
            });
        });
    </script>
</body>
</html>
""")

def share_links(page_url: str, share_text: str, mail_subject: str, icon_class: str, indent: int) -> str:
    encoded_url = quote_plus(page_url)
    encoded_text = quote_plus(share_text)
    whatsapp_text = quote_plus(f"{share_text} - {page_url}")
    encoded_subject = quote_plus(mail_subject)
    mail_body = quote_plus(page_url)

    links = textwrap.dedent(f"""\
<a href=\"https://www.facebook.com/sharer/sharer.php?u={encoded_url}\" target=\"_blank\" rel=\"noopener\" class=\"{icon_class}\" aria-label=\"Share on Facebook\">
    <i class=\"fab fa-facebook-f\"></i>
</a>
<a href=\"https://twitter.com/intent/tweet?url={encoded_url}&text={encoded_text}\" target=\"_blank\" rel=\"noopener\" class=\"{icon_class}\" aria-label=\"Share on Twitter\">
    <i class=\"fab fa-twitter\"></i>
</a>
<a href=\"https://api.whatsapp.com/send?text={whatsapp_text}\" target=\"_blank\" rel=\"noopener\" class=\"{icon_class}\" aria-label=\"Share on WhatsApp\">
    <i class=\"fab fa-whatsapp\"></i>
</a>
<a href=\"mailto:?subject={encoded_subject}&body={mail_body}\" class=\"{icon_class}\" aria-label=\"Share via Email\">
    <i class=\"fas fa-envelope\"></i>
</a>
<a href=\"#\" class=\"{icon_class}\" data-copy-link=\"{page_url}\" aria-label=\"Copy Link\">
    <i class=\"fas fa-link\"></i>
</a>""")
    return textwrap.indent(links, " " * indent)


def build_share_header(page_url: str, share_text: str, mail_subject: str) -> str:
    icons = share_links(page_url, share_text, mail_subject, "share-icon", 20)
    return textwrap.dedent(f"""                <!-- Share Buttons -->
                <div class=\"topic-share\">
                    <span class=\"share-label\">Share:</span>
{icons}
                </div>""")


def build_share_footer(page_url: str, share_text: str, mail_subject: str) -> str:
    icons = share_links(page_url, share_text, mail_subject, "share-this-icon", 24)
    return textwrap.dedent(f"""                    <div class=\"share-this-icons\">
{icons}
                    </div>""")


def build_qas(qas: list[tuple[str, str]]) -> str:
    blocks = []
    for idx, (question, answer) in enumerate(qas, start=1):
        content = textwrap.indent(answer.strip(), " " * 24)
        blocks.append(
            textwrap.dedent(
                f"""                    <!-- Question {idx} -->
                    <div class=\"qa-item\">
                        <button class=\"qa-header\" aria-expanded=\"false\">
                            <span class=\"qa-question\">{question}</span>
                            <i class=\"fas fa-chevron-down qa-icon\"></i>
                        </button>
                        <div class=\"qa-content\">
{content}
                        </div>
                    </div>

"""
            )
        )
    return "".join(blocks)


def build_explore(cards: list[tuple[str, str, str, str]]) -> str:
    blocks = []
    for href, category, label, author in cards:
        blocks.append(
            textwrap.dedent(
                f"""                    <a href=\"{href}\" class=\"explore-card\">
                        <div class=\"explore-image\">
                            <img src=\"../assets/images/image_example.jpg\" alt=\"{label}\" loading=\"lazy\">
                        </div>
                        <span class=\"explore-category\">{category}</span>
                        <h3 class=\"explore-card-title\">{label}</h3>
                        <p class=\"explore-author\">{author}</p>
                    </a>

"""
            )
        )
    return "".join(blocks)


def build_carousel(current_slug: str) -> str:
    cards = []
    for slug, href, label, desc in CAROUSEL_CARDS:
        if slug == current_slug:
            continue
        cards.append(
            textwrap.dedent(
                f"""                        <a href=\"{href}\" class=\"islam-card\">
                            <h3 class=\"islam-card-title\">{label}</h3>
                            <div class=\"islam-card-divider\"></div>
                            <p class=\"islam-card-text\">
                                {desc}
                            </p>
                        </a>

"""
            )
        )
    return "".join(cards)


def render_page(data: dict) -> str:
    slug = data["slug"]
    title = data["title"]
    meta_desc = data["meta_desc"]
    share_text = data["share_text"]
    mail_subject = data["mail_subject"]
    page_url = f"{BASE_URL}/{slug}.html"

    share_header = build_share_header(page_url, share_text, mail_subject)
    share_footer = build_share_footer(page_url, share_text, mail_subject)
    qa_html = build_qas(data["qas"])
    explore_html = build_explore(data["explore"])
    carousel_html = build_carousel(slug)

    html = f"""<!DOCTYPE html>
<html lang=\"en\" dir=\"ltr\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <meta name=\"color-scheme\" content=\"light dark\">
    <meta name=\"theme-color\" media=\"(prefers-color-scheme: light)\" content=\"#ffffff\">
    <meta name=\"theme-color\" media=\"(prefers-color-scheme: dark)\" content=\"#000000\">
    <title>{title} - Mansheu Dawah | What Islam Says About</title>
    <meta name=\"description\" content=\"{meta_desc}\">
{CSS_LINKS}
</head>

<body class=\"islam-topic-page\">
{NAV}

    <main id=\"main-content\">
        <!-- Blue Header Section -->
        <section class=\"islam-topic-header\">
            <div class=\"container\">
                <p class=\"topic-category\">WHAT ISLAM SAYS ABOUT...</p>
                <h1 class=\"topic-title\">{title}</h1>
                <div class=\"topic-divider\"></div>
{share_header}
            </div>
        </section>

        <!-- Q&A Accordion Section -->
        <section class=\"topic-qa-section\">
            <div class=\"container\">
                <div class=\"qa-accordion\">
{qa_html}                </div>
            </div>
        </section>

        <!-- Explore More Section -->
        <section class=\"explore-more-section\">
            <div class=\"container\">
                <h2 class=\"explore-title\">Explore more on this topic</h2>
                <div class=\"explore-divider\"></div>
                <div class=\"explore-grid\">
{explore_html}                </div>
            </div>
        </section>

        <!-- What Islam Says About Section -->
        <section class=\"islam-topics-section related-topics\">
            <div class=\"container\">
                <h2 class=\"islam-topics-title\">What Islam Says About...</h2>
                
                <div class=\"islam-carousel-wrapper\">
                    <button class=\"carousel-btn carousel-btn-prev\" aria-label=\"Previous\">
                        <i class=\"fas fa-chevron-left\"></i>
                    </button>
                    
                    <div class=\"islam-carousel\">
{carousel_html}                    </div>
                    
                    <button class=\"carousel-btn carousel-btn-next\" aria-label=\"Next\">
                        <i class=\"fas fa-chevron-right\"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- Share This Section -->
        <section class=\"share-section\">
            <div class=\"container\">
                <div class=\"share-this\">
                    <h3 class=\"share-this-title\">Share this</h3>
                    <div class=\"share-this-divider\"></div>
{share_footer}                </div>
            </div>
        </section>
    </main>

    <!-- Back to Top -->
    <button class=\"back-to-top\" id=\"backToTop\" aria-label=\"Back to top\">
        <i class=\"fas fa-chevron-up\"></i>
    </button>

    <!-- Theme Toggle Button -->
    <button class=\"theme-toggle\" onclick=\"toggleTheme()\" aria-label=\"Toggle theme\">
        <svg class=\"sun-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
            <circle cx=\"12\" cy=\"12\" r=\"5\"/>
            <path d=\"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42\"/>
        </svg>
        <svg class=\"moon-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
            <path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"/>
        </svg>
    </button>
{SHARE_SCRIPT}"""
    return html


def main() -> None:
    output_dir = Path("pages")
    output_dir.mkdir(exist_ok=True)

    for data in TOPIC_PAGES:
        html = render_page(data)
        path = output_dir / f"{data['slug']}.html"
        path.write_text(html, encoding="utf-8")
        print(f"Wrote {path}")


if __name__ == "__main__":
    main()
