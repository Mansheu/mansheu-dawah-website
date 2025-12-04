from pathlib import Path
import textwrap

base_url = "https://mansheudawah.com/pages"

cards = [
    {
        "slug": "basics-of-islam",
        "title": "Basics of Islam",
        "desc": "Islam is a monotheistic faith founded on the belief in one God (Allah) and the teachings of Prophet Muhammad (peace be upon him). Muslims follow the Five Pillars of Islam and believe in the Quran as the final revelation from God.",
        "href": "basics-of-islam.html",
    },
    {
        "slug": "hajj-umrah",
        "title": "Hajj and Umrah",
        "desc": "Hajj is the annual pilgrimage to Mecca that every able-bodied Muslim must perform at least once in their lifetime. Umrah is a shorter pilgrimage performed year-round for spiritual closeness to Allah.",
        "href": "hajj-umrah.html",
    },
    {
        "slug": "ramadan",
        "title": "Ramadan",
        "desc": "Ramadan is the ninth month of the Islamic calendar when Muslims fast from dawn to sunset. It is a time of spiritual reflection, prayer, charity, and community gathering, culminating in the celebration of Eid al-Fitr.",
        "href": "ramadan.html",
    },
    {
        "slug": "shariah",
        "title": "Shariah",
        "desc": "Shariah is Islamic law derived from the Quran and Sunnah. It provides guidance on worship, ethics, family life, and social justice. Shariah emphasizes compassion, fairness, and the protection of human dignity in all aspects of life.",
        "href": "shariah.html",
    },
    {
        "slug": "health-wellness",
        "title": "Health & Wellness",
        "desc": "Islam teaches that the body is a trust from Allah and must be cared for properly. Muslims are encouraged to maintain physical health through balanced nutrition, exercise, and cleanliness, while also nurturing mental and spiritual well-being.",
        "href": "health-wellness.html",
    },
    {
        "slug": "charity",
        "title": "Charity",
        "desc": "Charity is a fundamental principle in Islam. Zakat (obligatory charity) is one of the Five Pillars, while Sadaqah (voluntary charity) is highly encouraged. Giving purifies wealth and helps create a just and compassionate society.",
        "href": "charity.html",
    },
    {
        "slug": "peace-violence",
        "title": "Peace & Violence",
        "desc": "Islam promotes peace, justice, and the sanctity of human life. The religion condemns terrorism and unjust violence. True jihad is primarily a spiritual struggle for self-improvement, while physical defense is only permitted in specific, limited circumstances.",
        "href": "peace-violence.html",
    },
    {
        "slug": "women",
        "title": "Women",
        "desc": "Islam grants women rights to education, property ownership, and spiritual equality with men. Women are honored as mothers, daughters, wives, and professionals. Islamic teachings emphasize respect, dignity, and protection for women in all spheres of life.",
        "href": "women.html",
    },
    {
        "slug": "men",
        "title": "Men",
        "desc": "Men in Islam are called to be protectors and maintainers of their families with justice and compassion. Islamic masculinity emphasizes responsibility, humility, emotional intelligence, and service to family and community while striving for personal spiritual growth.",
        "href": "men.html",
    },
]

pages = [
