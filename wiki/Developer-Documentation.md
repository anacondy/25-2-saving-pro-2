# Developer Documentation

Technical documentation for developers working on the Subodh Exam Portal.

## Project Overview

### Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Design**: Glassmorphism, Flexbox, CSS Grid
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Hosting**: GitHub Pages
- **Version Control**: Git

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Architecture

### File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styles
├── app.js             # JavaScript functionality
├── README.md          # Project documentation
├── screenshots/       # UI screenshots
└── wiki/             # Documentation wiki
```

### Code Organization

#### HTML (`index.html`)

**Structure**:
```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta tags, CSP headers, fonts -->
  </head>
  <body>
    <!-- Background effects -->
    <!-- Carousel cards -->
    <!-- Admin modal -->
    <!-- Scripts -->
  </body>
</html>
```

**Key Elements**:
- `#bgGlow`: Dynamic background glow effect
- `#track`: Carousel track container
- `.glass-card`: Individual carousel cards
- `#adminModal`: Admin upload interface

#### CSS (`styles.css`)

**Structure**:
1. Global reset
2. Background and effects
3. Carousel components
4. Content styling
5. Search UI
6. Admin modal
7. Responsive media queries
8. Animations

**Key Classes**:
- `.glass-card`: Glassmorphism card style
- `.carousel-track`: Carousel container
- `.search-bar`: Search input styling
- `.modal-overlay`: Admin modal backdrop
- `.admin-card`: Admin panel styling

#### JavaScript (`app.js`)

**Structure**:
```javascript
// Configuration
const CONFIG = { /* constants */ };

// Security utilities
const SecurityUtils = { /* sanitization */ };

// Modules
const SearchModule = { /* search logic */ };
const CarouselModule = { /* navigation */ };
const AdminModule = { /* admin functions */ };

// Initialization
document.addEventListener('DOMContentLoaded', init);
```

## Core Modules

### 1. SearchModule

**Purpose**: Handle paper search functionality

**Methods**:

```javascript
init()
// Initialize search event listeners
// Called on DOM ready

handleSearch(event, resultsContainer)
// Process search input
// Filter papers database
// Display results

renderSearchResult(paper, container)
// Render individual search result
// Sanitize output
// Append to container
```

**Data Flow**:
```
User Input → Sanitize → Filter Database → Render Results
```

### 2. CarouselModule

**Purpose**: Handle card navigation and theming

**Methods**:

```javascript
init()
// Setup carousel and listeners
// Called on DOM ready

isMobile()
// Detect mobile devices
// Returns boolean

updateCarousel()
// Calculate card positions
// Apply transforms
// Update active states

setupEventListeners()
// Keyboard navigation
// Touch gestures
// Window resize
```

**Navigation Flow**:
```
User Action → Update Index → Calculate Position → Apply Transform → Update Theme
```

**Calculations**:
```javascript
// Card positioning
const centerOffset = (windowWidth - cardWidth) / 2;
const shift = currentIndex * (cardWidth + gap);
const translateX = centerOffset - shift;
```

### 3. AdminModule

**Purpose**: Manage admin authentication and uploads

**Methods**:

```javascript
init()
// Setup admin functionality
// Secret code listener

setupSecretCode()
// Listen for secret code
// Trigger admin modal

openModal()
// Display admin interface
// Focus on input

closeModal()
// Hide admin interface
// Reset form

verifyAdmin()
// Check credentials
// Grant or deny access

setupFileUpload()
// File input handlers
// Drag and drop
// Validation

validateFiles(files)
// Check file types
// Check file sizes
// Return valid files
```

**Authentication Flow**:
```
Secret Code → Modal → Enter Credentials → Verify → Grant Access
```

### 4. SecurityUtils

**Purpose**: Provide security functions

**Methods**:

```javascript
sanitizeHTML(str)
// Escape HTML entities
// Prevent XSS
// Return safe string

isValidFileType(filename)
// Check file extension
// Compare to allowed types
// Return boolean

isValidFileSize(size)
// Check file size
// Compare to max size
// Return boolean
```

## Database Structure

### Mock Database

```javascript
const papersDB = [
    {
        title: "Paper Title",
        code: "SUBJECT-XXX",
        sem: "III",
        subj: "Subject Name",
        cat: "Category",
        type: "Exam Type"
    },
    // More papers...
];
```

**Fields**:
- `title`: Full paper name
- `code`: Unique paper code
- `sem`: Semester (I-VI)
- `subj`: Subject abbreviation
- `cat`: Category (Subsidiary, GEC, etc.)
- `type`: Exam type (Main, CIA, Back)

**Future**: Replace with API endpoint

## Styling Guide

### CSS Variables

**Theme Colors**:
```css
--theme-color: #1db954;    /* Green */
--shadow-color: rgba(29, 185, 84, 0.3);
```

**Dynamic Assignment**:
```javascript
card.style.setProperty('--theme-color', themeColor);
```

### Glassmorphism Effect

```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

**Components**:
- Transparency: `rgba(255, 255, 255, 0.03)`
- Blur: `backdrop-filter: blur(20px)`
- Border: Semi-transparent white
- Shadow: Colored glow

### Responsive Design

**Breakpoint**: 768px

```css
@media (max-width: 768px) {
    .glass-card {
        flex: 0 0 85vw;
        height: 60vh;
    }
}
```

**Mobile Optimizations**:
- Smaller card width (85vw)
- Reduced height (60vh)
- Smaller gaps
- Touch-friendly targets

## API Reference

### Global Variables

```javascript
const track          // Carousel track element
const cards          // NodeList of cards
const bgGlow         // Background glow element
const swipeZone      // Touch interaction area
let currentIndex     // Current card index
const totalCards     // Total number of cards
```

### Configuration

```javascript
CONFIG = {
    SECRET_CODE: "upload",
    ADMIN_USERNAME: "alvido",
    SWIPE_THRESHOLD: 50,
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    ALLOWED_FILE_TYPES: ['.pdf']
}
```

### Events

**Keyboard Events**:
```javascript
'ArrowRight' → Next card
'ArrowLeft'  → Previous card
'upload'     → Admin modal (secret code)
'Enter'      → Submit admin auth
```

**Touch Events**:
```javascript
touchstart → Record start position
touchend   → Calculate swipe direction
```

**Mouse Events**:
```javascript
dragover  → Highlight drop zone
drop      → Handle file drop
click     → Open file browser
```

## Development Workflow

### Setup Development Environment

1. **Clone Repository**
   ```bash
   git clone https://github.com/anacondy/25-2-saving-pro-2.git
   cd 25-2-saving-pro-2
   ```

2. **Start Local Server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

3. **Open in Browser**
   ```
   http://localhost:8000
   ```

### Making Changes

1. **Edit Files**
   - `index.html` for structure
   - `styles.css` for styling
   - `app.js` for functionality

2. **Test Changes**
   - Refresh browser
   - Test all features
   - Check console for errors
   - Test on mobile (DevTools)

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

### Testing Checklist

- [ ] Search functionality works
- [ ] Carousel navigation smooth
- [ ] Admin panel accessible
- [ ] File upload validation works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] CSP violations checked
- [ ] Cross-browser tested

## Common Tasks

### Adding a New Card

1. **Add HTML in index.html**:
```html
<div class="glass-card" data-theme="#hexcolor">
    <div class="card-tab">Tab Name</div>
    <div class="grid-background"></div>
    <div class="content-wrapper">
        <!-- Your content -->
    </div>
    <div class="footer-info">
        <span>/// Footer</span>
        <span class="pagination">N of 7 >></span>
    </div>
</div>
```

2. **Update totalCards**: Automatic from DOM

3. **Choose theme color**: Add `data-theme` attribute

### Adding Papers to Database

**Edit `app.js`**:
```javascript
const papersDB = [
    // Existing papers...
    {
        title: "New Paper Title",
        code: "NEW-001",
        sem: "I",
        subj: "Subject",
        cat: "Subsidiary",
        type: "Main"
    }
];
```

### Changing Admin Credentials

**Edit `app.js`**:
```javascript
const CONFIG = {
    SECRET_CODE: "newcode",      // Change secret
    ADMIN_USERNAME: "newadmin",  // Change username
    // ...
};
```

**Security**: Use environment variables in production

### Modifying Search Algorithm

**Edit `app.js` SearchModule**:
```javascript
const filtered = papersDB.filter(p =>
    // Add your custom logic
    p.title.toLowerCase().includes(query) ||
    p.code.toLowerCase().includes(query) ||
    // Add more conditions
);
```

## Performance Optimization

### Current Optimizations

1. **CSS `will-change`**: Optimize animations
   ```css
   will-change: transform;
   ```

2. **`transform3d`**: Hardware acceleration
   ```javascript
   transform: `translate3d(${x}px, 0, 0)`
   ```

3. **Passive Event Listeners**: Smooth scrolling
   ```javascript
   { passive: true }
   ```

4. **Minimal Reflows**: Batch DOM operations

### Future Optimizations

- Lazy load cards
- Virtual scrolling
- Image optimization
- Code splitting
- Service workers
- Caching strategy

## Debugging

### Common Issues

**Search not working**:
```javascript
// Check console for errors
// Verify papersDB is loaded
console.log(papersDB);

// Test search function
SearchModule.handleSearch({target: {value: 'test'}}, container);
```

**Carousel stuck**:
```javascript
// Check current index
console.log(currentIndex, totalCards);

// Verify card elements
console.log(cards);

// Check transform
console.log(track.style.transform);
```

**Admin modal issues**:
```javascript
// Check if modal exists
console.log(document.getElementById('adminModal'));

// Verify secret code
console.log(AdminModule.keyBuffer);

// Test verification
AdminModule.verifyAdmin();
```

### Browser DevTools

**Useful Tools**:
- **Console**: Check errors and logs
- **Network**: Monitor resource loading
- **Application**: Check CSP violations
- **Performance**: Analyze bottlenecks
- **Mobile**: Test responsive design

## Contributing

### Code Style

**JavaScript**:
- Use `const` for constants
- Use `let` for variables
- Use arrow functions
- Comment complex logic
- Use meaningful names

**CSS**:
- BEM naming (optional)
- Group related styles
- Use CSS variables
- Mobile-first approach

**HTML**:
- Semantic elements
- Proper indentation
- Accessible markup
- Valid HTML5

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Update documentation
6. Submit PR with description
7. Address review comments

### Commit Messages

Format:
```
type: Short description

Longer description if needed

- Bullet point 1
- Bullet point 2
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `test`: Tests
- `chore`: Maintenance

## Resources

### External Libraries

Currently using:
- Google Fonts API

No other dependencies!

### Documentation

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript Info](https://javascript.info/)

### Tools

- VS Code: Code editor
- Chrome DevTools: Debugging
- GitHub Pages: Hosting
- Git: Version control

## Future Enhancements

### Planned Features

1. **Backend Integration**
   - REST API
   - Database (PostgreSQL/MongoDB)
   - File storage (AWS S3)

2. **Advanced Search**
   - Fuzzy matching
   - Filters
   - Sorting options

3. **User Accounts**
   - Student login
   - Bookmarks
   - Download history

4. **Analytics**
   - Usage statistics
   - Popular papers
   - Download tracking

5. **Notifications**
   - New paper alerts
   - Exam reminders

6. **Mobile App**
   - React Native
   - Offline support
   - Push notifications

## Contact

For development questions:
- GitHub Issues
- Pull Requests
- Email: dev@subodhcollege.edu

---

**Happy coding! 💻**
