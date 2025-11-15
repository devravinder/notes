# Development and Programming Notes

This section contains a collection of notes, guides, and resources related to various programming languages and development tools.

## Table of Contents

-   [**Git**](./git/README.md): Notes and commands related to the Git version control system.
-   [**Java**](./java/README.md): Guides for Java development, including SDK management with SDKMAN.
-   [**JavaScript & Node.js**](./js_node/README.md): Notes, commands, and recommended libraries for the JavaScript/Node.js ecosystem.
-   [**TypeScript**](./ts/README.md): Learning topics and notes for TypeScript.

---

## General Development Tools & Resources

### UI Design

-   **Figma**: A collaborative interface design tool.
    -   [Figma Tips & Tricks](https://blog.prototypr.io/figma-tips-tricks-superpower-your-workflow-%EF%B8%8F-d03f418d1db3)
    -   [Figma Course on LearnUX](https://learnux.io/course/figma?autoplay=1)

### Localhost Tunneling

Expose your local development server to the internet.

-   **ngrok**: A popular tool for creating secure tunnels to localhost.
    -   Download and unzip `ngrok`.
    -   Run: `./ngrok http 8080` (forwards to your local port 8080).
-   **localtunnel**: An npm package alternative to ngrok.

### Image & Asset Tools

-   **Pic to Svg**: A web-based tool to convert images to SVG format: [picsvg.com](https://picsvg.com/)
-   **Random Placeholder Images**:
    -   Picsum Photos: `https://picsum.photos/500/300`
    -   Random User: `https://randomuser.me/api/portraits/men/34.jpg`

### File Sharing

-   **filetransfer.io**: A simple service for sharing files.

### Video Downloading

-   **youtube-dl**: A command-line program to download videos from YouTube and other sites.
    -   If you encounter a 403 error, try clearing the cache: `youtube-dl --rm-cache-dir`

## Miscellaneous Commands & Snippets

### Downloading a Single File from GitHub

You can use `curl` with the GitHub API to download a single file without cloning the entire repository.

```bash
# Replace :owner, :repo, and :path with your details
# The -O flag saves the file with its original name
curl \
  -H 'Authorization: token YOUR_PERSONAL_ACCESS_TOKEN' \
  -H 'Accept: application/vnd.github.v3.raw' \
  -O \
  -L 'https://api.github.com/repos/:owner/:repo/contents/:path_to_file'
```

-   The `Authorization` header is only required for private repositories.
-   Ensure the URL points to the `raw` content.
