# Two Way — Website

Standard multi-page responsive site (no 3D/WebGL) for Two Way —
General Contractor & Water Works Construction. Plain HTML/CSS/JS,
no build step, no dependencies.

## Structure

```
index.html            Home
about.html              About — company history timeline
services.html            Services — General Construction & Water Works Construction
contact.html              Contact — info + form + embedded map
css/styles.css             All styling (brand tokens, layout, responsive rules)
js/main.js                  Nav toggle, scroll reveal, contact form handling
assets/images/logo.png        Wordmark-only crop of the supplied logo (transparent), used in header/footer
assets/images/logo-full.png     Full lockup (mark + tagline lines), used on the About page
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Brand

- Navy `#1D2A4F`, Orange `#F47019` — sampled directly from the supplied logo.
- Header tagline copy: "GENERAL CONTRACTOR & WATER WORKS CONSTRUCTION".
