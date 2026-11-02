# GitHub Pages Deployment Guide

This project uses React + Vite. GitHub Pages must publish the Vite production build (`dist/`), not the source project files (`src/`, `index.html` before build, etc.).

## Repository URL

The configured project-site path is `/Self_Discovery_Personality/`.

Expected website URL:

`https://nyilwinhtun.github.io/Self_Discovery_Personality/`

If the GitHub repository is renamed, update `base` in `vite.config.js` to match the new repository path.

## One-time GitHub setting

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Save the setting if GitHub shows a Save button.

Do not select “Deploy from a branch” with the repository root (`/`) for this Vite source project.

## Deploy

The workflow at `.github/workflows/deploy.yml` runs when changes are pushed to `main`, and can also be run manually from **Actions → Deploy Self Discovery to GitHub Pages → Run workflow**.

It installs dependencies, runs `npm run validate:all`, builds the production site with `npm run build`, then deploys only the generated `dist/` folder.

## Verify after deployment

1. Open the repository's **Actions** tab and confirm the latest deployment run is green.
2. Open the website URL above in a private/incognito window or hard-refresh the browser.
3. Check that the page renders and that images, styles, and icons load.
4. Open the browser developer console if it is still blank. Check the Console and Network tabs for failed JavaScript/CSS requests.

## Data note

Assessment data remains in each user's own browser LocalStorage. This deployment does not add an account system, server database, or cloud synchronization. Users should export a JSON backup before clearing browser data or changing devices.
