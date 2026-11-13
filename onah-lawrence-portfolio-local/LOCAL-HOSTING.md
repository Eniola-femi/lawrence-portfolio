# Local hosting instructions

1. Extract the ZIP without flattening its folders.
2. Keep `index.html`, `css/style.css`, and `js/script.js` in their current locations.
3. Put the three MOV files beside `index.html` using the exact filenames currently configured in `js/script.js`, or update the paths in the `portfolioVideos` array.
4. Keep the portrait file `IMG-20261110-WA0026.jpg` beside `index.html`, or change the `profileImage` value in `js/script.js`.
5. Open `index.html` directly, or run `python3 -m http.server 3000` from the extracted folder and visit `http://localhost:3000`.

The CSS and JavaScript are linked with relative paths:

- `css/style.css`
- `js/script.js`
