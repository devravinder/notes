# Dev tools

## UI design

- Figma
  - https://blog.prototypr.io/figma-tips-tricks-superpower-your-workflow-%EF%B8%8F-d03f418d1db3
  - https://learnux.io/course/figma?autoplay=1
- pic to svg: https://picsvg.com/

## Accessing localhost from public ip

- ngrok: https://ngrok.com/
  - download & unzip
  - to run: `./ngrok http 8080` (port to forward)
- alternatives: localtunnel (npm package)

## Downloading one file from github

- ref: https://stackoverflow.com/questions/9159894/download-specific-files-from-github-in-command-line-not-clone-the-entire-repo
- ```bash
  curl \
    -H 'Authorization: token $YOUR_TOKEN' \
    -H 'Accept: application/vnd.github.v3.raw' \
    -O \
    -L 'https://api.github.com/repos/:owner/:repo/contents/:path'
  ```
- authorization token header required only for private repos
- location url should be the raw link, not the HTML view link

## Random image placeholder

- `export const imagePlaceholder = (id = 1) => \`https://picsum.photos/200/300?random=${id}\``
- https://picsum.photos/500/300
- https://randomuser.me/api/portraits/men/34.jpg
- https://randomuser.me/api/portraits/women/34.jpg

## Youtube video downloading

- youtube-dl
- if 403 error: remove cache with `youtube-dl --rm-cache-dir`, then retry

## File sharing

- https://filetransfer.io/
