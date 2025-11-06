# Scroll Cards - Medication Administration Showcase

A modern, interactive web page featuring animated scroll-triggered cards showcasing medication administration features with GSAP animations.

## Features

- **Scroll-triggered animations**: Cards animate as you scroll through the page
- **Responsive design**: Optimized for desktop, tablet, and mobile devices
- **Video integration**: Automatic video playback when the third card is in focus
- **Smooth transitions**: Cascading card animations with opacity and position changes
- **Customizable configurations**: Showcases 26+ customizable medication pack configurations

## Project Structure

```
meditab/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── readme.md           # This file
└── assets/
    ├── Desktop/       # Desktop-specific assets
    │   ├── USP-scannable-QR-code.png
    │   ├── USP-Section-26+customizable-configurations.png
    │   └── USP-tearable-pkg.mp4
    └── Mobile/        # Mobile-specific assets
        ├── USP-scannable-QR-code.png
        ├── USP-Section-26+customizable-configurations.png
        └── USP Section- tearable Dose Cups.mp4
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, flexbox, responsive design
- **JavaScript (ES6+)**: Modern JavaScript features
- **GSAP (GreenSock Animation Platform)**: Version 3.12.2
  - Core GSAP library
  - ScrollTrigger plugin

## Dependencies

The project uses the following CDN resources:

- GSAP Core: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- GSAP ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js`
- General Sans Font: `https://fonts.cdnfonts.com/css/general-sans`

## Usage

1. Open `index.html` in a modern web browser
2. Scroll down to see the animated card transitions
3. The cards will automatically animate as you scroll
4. The video in the third card will play when that card is in focus

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features Showcased

1. **Scannable QR Codes**: Every dose cup includes a scannable QR code for verification and eMAR automation
2. **26+ Customizable Configurations**: Tailor-made compliance packs for weekly, biweekly, or monthly dose cycles
3. **Tearable Dose Cups**: Travel-friendly tearaway dose cups for convenient medication intake

## Customization

### Colors

Colors can be customized via CSS variables in `styles.css`:

```css
:root {
    --accent: #08559F;
    --text-header: #01101D;
    --text-body: #666666;
    --border: #C2C2C2;
    --shadow: 0px 3px 20px 0px #0000001A;
    --card-bg-light: #FBFBFB;
}
```

### Animation Settings

Animation timing and behavior can be adjusted in `script.js` within the ScrollTrigger configuration.

## License

This project is for demonstration purposes.

