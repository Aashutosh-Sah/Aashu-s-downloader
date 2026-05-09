# Aashutosh's Downloader

A futuristic next-generation media downloading software designed with a premium 3D cyberpunk-inspired UI/UX. The application allows users to paste a YouTube video link and instantly download:

- High-quality audio in .WAV format
- Full HD video in .MP4 format

## Setup

1. Open a terminal in `c:\Users\Public\Documents\test_geminicli`
2. Run `npm install`
3. Run `npm start`

## How to use

- Paste a YouTube link into the field.
- Click `Choose output folder` if you want to save files somewhere specific.
- Click `Download WAV` to save audio in `.wav`.
- Click `Download MP4` to save the full video in `.mp4`.

## Notes

- The app uses `yt-dlp` via the `yt-dlp-exec` package.
- If the app cannot locate the default folder, it saves files to the system Downloads directory.
- The UI is built with CSS 3D transforms and gradients for a more immersive feel.
