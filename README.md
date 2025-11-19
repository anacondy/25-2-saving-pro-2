# Subodh Exam Portal 📚

A modern, secure, and user-friendly exam paper archive portal for SS Jain Subodh College. Built with glassmorphism design, responsive carousel interface, and robust security features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

### Student Features
- **🔍 Advanced Search**: Real-time search functionality to find exam papers by subject, code, or name
- **📱 Mobile Responsive**: Fully optimized for mobile, tablet, and desktop devices
- **🎨 Glassmorphism UI**: Modern, beautiful interface with smooth animations
- **⌨️ Keyboard Navigation**: Use arrow keys to navigate through different sections
- **👆 Touch Gestures**: Swipe left/right on mobile devices for easy navigation
- **🎯 Categorized Papers**: Papers organized by semester, subject, and type

### Admin Features
- **🔐 Secure Authentication**: Password-protected admin access
- **📤 Batch Upload**: Upload multiple PDF files at once
- **📋 Metadata Management**: Comprehensive form for paper details
- **🎛️ Toggle Modes**: Switch between batch and individual upload modes
- **✅ File Validation**: Automatic validation of file type and size

### Security Features
- **🛡️ XSS Protection**: Input sanitization to prevent cross-site scripting
- **🔒 Content Security Policy**: CSP headers to control resource loading
- **📝 Input Validation**: Client-side validation for all user inputs
- **🚫 File Type Restrictions**: Only PDF files allowed (max 10MB)
- **🔐 Secure Headers**: X-Frame-Options, X-Content-Type-Options, and more

## 🚀 Live Demo

Visit the live portal: [https://anacondy.github.io/25-2-saving-pro-2/](https://anacondy.github.io/25-2-saving-pro-2/)

## 📸 Screenshots

### Main Search Interface
![Search Interface](screenshots/search-interface.png)
*Real-time search with categorized results and semester tags*

### Admin Upload Panel
![Admin Panel](screenshots/admin-panel.png)
*Secure admin interface for uploading exam papers*

### Mobile View
![Mobile View](screenshots/mobile-view.png)
*Fully responsive design optimized for mobile devices*

### Carousel Navigation
![Carousel](screenshots/carousel-navigation.png)
*Smooth carousel navigation with theme changes*

## 🛠️ Installation & Setup

### Option 1: GitHub Pages (Recommended)
This project is already configured for GitHub Pages. Just enable it in repository settings:

1. Go to **Settings** → **Pages**
2. Select **Branch: main** (or your default branch)
3. Click **Save**
4. Your site will be live at `https://[username].github.io/[repository-name]/`

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/anacondy/25-2-saving-pro-2.git
   cd 25-2-saving-pro-2
   ```

2. **Open in browser**
   ```bash
   # Option A: Using Python
   python -m http.server 8000
   
   # Option B: Using Node.js
   npx http-server
   
   # Option C: Simply open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Access the portal**
   - Open your browser and navigate to `http://localhost:8000`

## 📖 Usage Guide

### For Students

1. **Search for Papers**
   - Type subject name, code, or keywords in the search bar
   - Results appear instantly with color-coded categories
   - Click on any result to download the paper

2. **Navigate Sections**
   - Use **Arrow Keys** (Left/Right) or **Swipe** on mobile
   - Explore different subjects and resources
   - Each section has a unique color theme

### For Administrators

1. **Access Admin Panel**
   - Type the secret code: `upload` (anywhere on the page)
   - Enter admin credentials when prompted
   - Default username: `alvido`

2. **Upload Papers**
   - Toggle batch mode ON to upload multiple files
   - Fill in paper metadata (subject, semester, code, etc.)
   - Drag & drop PDF files or click to browse
   - Click "Upload to Database"

3. **Validation Rules**
   - Only PDF files are accepted
   - Maximum file size: 10MB per file
   - All metadata fields are required

## 🏗️ Project Structure

```
25-2-saving-pro-2/
├── index.html              # Main HTML file
├── styles.css              # Separated stylesheet
├── app.js                  # Separated JavaScript with security features
├── README.md               # This file
├── screenshots/            # UI screenshots
│   ├── search-interface.png
│   ├── admin-panel.png
│   ├── mobile-view.png
│   └── carousel-navigation.png
└── wiki/                   # Documentation
    ├── Home.md
    ├── User-Guide.md
    ├── Admin-Guide.md
    ├── Developer-Documentation.md
    └── Security-Features.md
```

## 🔒 Security Considerations

### Implemented Security Measures

1. **Content Security Policy (CSP)**
   - Restricts resource loading to trusted sources
   - Prevents inline script execution (except necessary ones)
   - Blocks mixed content

2. **Input Sanitization**
   - All user inputs are sanitized before display
   - HTML entities are escaped to prevent XSS
   - Search queries are cleaned before processing

3. **File Upload Validation**
   - File type checking (PDF only)
   - File size limits (10MB max)
   - MIME type validation

4. **Authentication**
   - Password-protected admin access
   - No credentials stored in localStorage
   - Session-based access control

5. **HTTP Security Headers**
   - X-Frame-Options: SAMEORIGIN
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin

### Future Security Enhancements
- [ ] Server-side validation
- [ ] CSRF token implementation
- [ ] Rate limiting for admin login
- [ ] Encrypted credential storage
- [ ] Two-factor authentication
- [ ] Activity logging and monitoring

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Use meaningful variable names
- Comment complex logic
- Follow existing code style
- Test on multiple browsers
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Acknowledgments

- **Development Team**: SS Jain Subodh College Student Cell
- **Design**: Modern glassmorphism with crimson red accents
- **Security Review**: Implemented industry-standard security practices

## 📞 Support

For support, email [support@subodhcollege.edu](mailto:support@subodhcollege.edu) or create an issue in the GitHub repository.

## 🗺️ Roadmap

- [x] Basic search functionality
- [x] Admin upload interface
- [x] Mobile responsive design
- [x] Security hardening
- [x] Documentation and wiki
- [ ] Backend integration
- [ ] User authentication system
- [ ] Download statistics
- [ ] Advanced filtering options
- [ ] API for mobile apps
- [ ] PDF preview functionality
- [ ] Bookmark favorite papers

## 📊 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | Latest  | ✅ Fully Supported |
| Firefox | Latest  | ✅ Fully Supported |
| Safari  | Latest  | ✅ Fully Supported |
| Edge    | Latest  | ✅ Fully Supported |
| Opera   | Latest  | ✅ Fully Supported |

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with glassmorphism, flexbox, and grid
- **JavaScript (ES6+)**: Modular, secure code
- **Google Fonts**: Inter & JetBrains Mono
- **SVG**: Custom noise texture and graphics

## 📚 Additional Resources

- [Wiki Home](wiki/Home.md)
- [User Guide](wiki/User-Guide.md)
- [Admin Guide](wiki/Admin-Guide.md)
- [Developer Documentation](wiki/Developer-Documentation.md)
- [Security Features](wiki/Security-Features.md)

---

**Built with ❤️ for SS Jain Subodh College**

*Last Updated: November 2025*
