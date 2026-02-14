# 📘 Notes

This repository contains personal notes and blogs written in Markdown.  
It is hosted using GitHub Pages with a customized Jekyll setup.

---

## 🚀 How It Works

This site is powered by:

- GitHub Pages  
  - Hosts the website directly from this repository  

- Jekyll  
  - Converts Markdown (`.md`) files into static HTML  

- Theme Customization  
  - Uses a Jekyll theme with custom CSS overrides  

When code is pushed to the `main` branch:

1. GitHub Pages runs Jekyll automatically  
2. All `.md` files are converted to HTML  
3. The selected theme is applied  
4. Custom styles override default theme styles  
5. The generated static site is deployed automatically  

No manual build or server setup is required.

---

## 📂 Project Structure

```bash

.
├── _config.yml          # GitHub Pages + Jekyll configuration
├── README.md            # Home page
├── git.md               # Example note page
├── ssl/
│   └── help.md          # Example note page
├── assets/
│   └── main.scss        # Theme + custom style loader


```

---

## ⚙️ Configuration

The `_config.yml` file controls:

- Site title  
- Description  
- Theme  

Example:

```yaml
    title: Notes
    description: My notes & blogs from markdown files
    theme: minima
```

---

## 🎨 Customization

Custom styles are added using: `assets/main.scss`

- imported basic `minima` styles
- showing hamburger menu always
- hided the double title
