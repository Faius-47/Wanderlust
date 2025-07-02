# Travel Website Landing Page

## Adding Background Images

To complete the setup of your travel website with background images:

### 1. Save the Main Hero Image
- Save your travel landmarks image (the one with world landmarks like Eiffel Tower, Statue of Liberty, etc.) as `slider.jpg` in the `images/` folder
- The image should be high quality (at least 1920x1080) for best results

### 2. Optional Additional Images
You can add more destination images in the `images/` folder:
- `tokyo.jpg` - For Tokyo destination card
- `paris.jpg` - For Paris destination card  
- `bali.jpg` - For Bali destination card

### 3. File Structure
```
Travel Website Landing Page/
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── slider.jpg (main hero background)
│   ├── tokyo.jpg (optional)
│   ├── paris.jpg (optional)
│   └── bali.jpg (optional)
└── README.md
```

### 4. Current Background Features
The CSS has been updated with:
- **Hero Section**: Uses your main image as background with overlay
- **Features Section**: Subtle grid pattern background
- **Destinations Section**: Dotted pattern background  
- **CTA Section**: Animated geometric background
- **Responsive Design**: Background images adapt to mobile screens

### 5. Image Requirements
- **Format**: JPG or PNG
- **Hero Image Size**: Recommended 1920x1080 or larger
- **Destination Images**: Recommended 800x600 or larger
- **File Size**: Optimize images to under 1MB for web performance

### 6. Customization
To change background images, update the CSS file:
- Line ~98: Hero background image path
- Destination card backgrounds can be customized in the CSS around line ~340

The website is now ready with beautiful background integration!
