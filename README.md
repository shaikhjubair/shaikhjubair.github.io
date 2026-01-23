# 👨‍💻 Shaikh Jubair - Personal Portfolio & Blog

![Website Status](https://img.shields.io/website?url=https%3A%2F%2Fshaikhjubair.me&style=flat-square&label=Live%20Status)
![GitHub top language](https://img.shields.io/github/languages/top/shaikhjubair/shaikhjubair.github.io?style=flat-square)
![License](https://img.shields.io/github/license/shaikhjubair/shaikhjubair.github.io?style=flat-square)

Welcome to the source code of my personal portfolio website. This project showcases my skills as an **AI Engineer** and **Data Scientist**, featuring a unique **"Serverless" Blog system** powered by the GitHub API.

🌐 **Live Website:** [shaikhjubair.me](https://shaikhjubair.me)

---

## 🚀 Key Features

* **⚡ Serverless Blog Engine:** The blog section is fully dynamic but uses **no database**. Instead, it fetches content from **GitHub Issues** via the REST API.
    * *How it works:* I write posts as GitHub Issues -> Tag them as `published` -> The site fetches and renders them using Markdown.
* **🎨 Modern UI/UX:** Designed with a neon/dark theme suitable for a developer portfolio.
* **📱 Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.
* **📈 Integrated Analytics:** Real-time visitor tracking with Google Analytics 4.
* **✉️ Contact Form:** Functional contact form powered by Formspree.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **CMS / Database:** GitHub Issues API
* **Markdown Parser:** [Marked.js](https://github.com/markedjs/marked)
* **Hosting:** GitHub Pages
* **Analytics:** Google Analytics

--- 

## 📂 Project Structure

```bash
├── index.html       # Main landing page (Portfolio)
├── blog.html        # Dynamic blog page
├── style.css        # Global styles and responsive design
├── main.js          # Logic for fetching GitHub Issues & rendering blogs
├── sitemap.xml      # SEO Sitemap
└── README.md        # Documentation
