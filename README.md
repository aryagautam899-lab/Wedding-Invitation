# Bhavini & Tanveer — Wedding Invitation

A responsive Emerald Royal wedding invitation website built with plain HTML, CSS and JavaScript.

## Files

- `index.html` — page content
- `style.css` — Emerald Royal design
- `script.js` — countdown, animations, music toggle and WhatsApp RSVP
- `assets/music.mp3` — add your own music file here
- `assets/` — add gallery images here

## Publish on GitHub Pages

1. Upload all files and the `assets` folder to your repository.
2. Open **Settings**.
3. Select **Pages** from the left sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**.
6. Click **Save**.
7. Wait a few minutes for your public link.

Your link should look similar to:

`https://aryagautam899-lab.github.io/Wedding-Invitation/`

## Adding your own photos

Put images inside the `assets` folder and replace the placeholder blocks in `index.html` with:

```html
<img src="assets/photo1.jpg" alt="Bhavini and Tanveer">
```

## Adding music

Rename your selected MP3 file to:

`music.mp3`

Then place it inside the `assets` folder.

## Changing RSVP number

Open `script.js` and find:

```js
const whatsappNumber = "917986503806";
```

Replace it with your preferred WhatsApp number, including country code but without `+`.
