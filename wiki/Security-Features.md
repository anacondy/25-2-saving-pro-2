# Security Features

Comprehensive documentation of security measures implemented in the Subodh Exam Portal.

## Overview

Security is a top priority for the Subodh Exam Portal. This document outlines all security features, their purpose, and implementation details.

## Security Architecture

### Defense in Depth

The portal implements multiple layers of security:

1. **Client-Side Security**: Input validation, sanitization
2. **Transport Security**: HTTPS, secure headers
3. **Authentication**: Access control for admin functions
4. **Data Validation**: File type and size checks

## Implemented Security Features

### 1. Content Security Policy (CSP)

**Purpose**: Prevent XSS attacks and unauthorized resource loading

**Implementation**:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               script-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

**What it does**:
- Restricts scripts to same origin only
- Allows styles from Google Fonts
- Blocks external image loading (except data URIs)
- Prevents inline event handlers (except allowed)
- Mitigates XSS attack vectors

**Limitations**:
- `unsafe-inline` is used for necessary inline scripts
- Consider nonce-based CSP for production

### 2. HTTP Security Headers

#### X-Content-Type-Options

**Purpose**: Prevent MIME type sniffing

**Implementation**:
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```

**Protection**: Prevents browsers from interpreting files as different MIME types

#### X-Frame-Options

**Purpose**: Prevent clickjacking attacks

**Implementation**:
```html
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
```

**Protection**: Prevents portal from being embedded in iframes on other domains

#### Referrer Policy

**Purpose**: Control referrer information

**Implementation**:
```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

**Protection**: Limits referrer information sent to external sites

### 3. Input Sanitization

**Purpose**: Prevent XSS through user input

**Implementation**:
```javascript
sanitizeHTML: function(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}
```

**Applied to**:
- Search queries
- Admin username input
- All user-provided text
- Search results display

**How it works**:
1. Creates temporary DOM element
2. Sets text content (auto-escapes HTML)
3. Returns escaped HTML
4. Prevents script execution

**Example**:
```javascript
Input:  "<script>alert('XSS')</script>"
Output: "&lt;script&gt;alert('XSS')&lt;/script&gt;"
```

### 4. File Upload Validation

**Purpose**: Prevent malicious file uploads

#### Type Validation

**Implementation**:
```javascript
isValidFileType: function(filename) {
    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    return CONFIG.ALLOWED_FILE_TYPES.includes(ext);
}
```

**Allowed Types**:
- PDF files only (`.pdf`)

**Rejected Types**:
- Executables (`.exe`, `.bat`, `.sh`)
- Scripts (`.js`, `.php`, `.py`)
- Documents (`.doc`, `.docx`)
- Images (`.jpg`, `.png`, `.gif`)

#### Size Validation

**Implementation**:
```javascript
isValidFileSize: function(size) {
    return size <= CONFIG.MAX_FILE_SIZE; // 10MB
}
```

**Limits**:
- Maximum: 10MB per file
- Prevents large file uploads
- Protects server resources

#### Validation Process

1. **Client-Side Check**: Immediate feedback
2. **Type Check**: Verify `.pdf` extension
3. **Size Check**: Ensure <10MB
4. **MIME Type**: Validate PDF MIME type
5. **Rejection**: Invalid files not uploaded

### 5. Authentication Security

#### Admin Access Control

**Features**:
- Secret code to reveal admin panel
- Username/password authentication
- No automatic login
- Session-based access

**Implementation**:
```javascript
verifyAdmin: function() {
    const username = SecurityUtils.sanitizeHTML(
        adminNameInput.value.trim().toLowerCase()
    );
    
    if (username === CONFIG.ADMIN_USERNAME) {
        // Grant access
    } else {
        // Deny access
    }
}
```

**Security Measures**:
1. **Sanitized Input**: XSS prevention
2. **Exact Match**: Case-insensitive comparison
3. **No Hints**: Generic error message
4. **No Autocomplete**: Form attribute set

#### Secret Code Mechanism

**Purpose**: Obscurity layer for admin access

**Implementation**:
```javascript
keyBuffer: "",
secretCode: "upload",

document.addEventListener('keydown', (e) => {
    this.keyBuffer += e.key.toLowerCase();
    if (this.keyBuffer.length > this.secretCode.length) {
        this.keyBuffer = this.keyBuffer.slice(-this.secretCode.length);
    }
    if (this.keyBuffer === this.secretCode) {
        this.openModal();
    }
});
```

**How it works**:
1. Tracks last N keypresses
2. Compares to secret code
3. Opens modal if match
4. No visible indicator

**Security by Obscurity**:
- Not a primary security measure
- Reduces casual unauthorized access
- Should be combined with authentication

### 6. Form Security

#### Input Validation

All form inputs have validation:

**Text Inputs**:
```html
<input type="text" maxlength="20" placeholder="e.g. PHY-302">
```
- Character limits prevent overflow
- Prevents excessive data

**Number Inputs**:
```html
<input type="number" min="0" max="1000" placeholder="Total (e.g. 100)">
```
- Range validation
- Prevents negative or extreme values

**Select Dropdowns**:
- Predefined options only
- No free-text injection
- Server-side validation needed

#### Autocomplete Disabled

**Purpose**: Prevent credential storage

**Implementation**:
```html
<input type="password" autocomplete="off">
<input type="search" autocomplete="off">
```

**Protection**: Prevents browsers from storing sensitive data

### 7. Data Handling

#### No Local Storage

**Security Measure**:
- No credentials stored in localStorage
- No session tokens in cookies
- No sensitive data persisted

**Benefits**:
- Cannot be accessed by XSS
- No data leakage on shared computers
- Clean logout

#### Minimal Data Collection

**Collected Data**:
- Search queries (temporary, in-memory)
- Upload metadata (sent to server)
- Admin username (for authentication only)

**Not Collected**:
- Personal information
- Tracking data
- Usage analytics
- IP addresses

### 8. Secure Coding Practices

#### Modular Code Structure

**Benefits**:
- Easier security audits
- Isolated functionality
- Reduced attack surface

**Structure**:
```javascript
const SecurityUtils = { /* security functions */ };
const SearchModule = { /* search functionality */ };
const CarouselModule = { /* UI navigation */ };
const AdminModule = { /* admin functions */ };
```

#### Strict Mode

**Implementation**:
```javascript
'use strict';
```

**Benefits**:
- Prevents accidental globals
- Catches common errors
- Safer eval() usage

#### Error Handling

**Implementation**:
```javascript
try {
    // Risky operation
} catch (error) {
    console.error('Error:', error);
    // User-friendly error message
    // Don't expose stack traces
}
```

**Security**:
- No sensitive error details to user
- Logs for debugging
- Graceful degradation

## Known Limitations

### Current Security Gaps

1. **No Server-Side Validation**
   - Client-side only
   - Can be bypassed
   - Need backend validation

2. **No CSRF Protection**
   - No token-based protection
   - Vulnerable to CSRF attacks
   - Requires server implementation

3. **No Rate Limiting**
   - Unlimited login attempts
   - Potential brute force vulnerability
   - Need server-side rate limiting

4. **Hardcoded Credentials**
   - Admin username in JavaScript
   - Not secure for production
   - Should use server authentication

5. **No HTTPS Enforcement**
   - Depends on hosting
   - Should redirect HTTP to HTTPS
   - GitHub Pages provides HTTPS

6. **Inline Styles/Scripts**
   - CSP uses `unsafe-inline`
   - Should use nonce or hash
   - Reduces CSP effectiveness

## Recommendations for Production

### High Priority

1. **Server-Side Authentication**
   - Implement proper auth system
   - Use JWT or session tokens
   - Hash passwords with bcrypt

2. **CSRF Protection**
   - Add CSRF tokens
   - Validate on server
   - Use SameSite cookies

3. **Rate Limiting**
   - Limit login attempts
   - Prevent brute force
   - Block after N failures

4. **Input Validation**
   - Server-side validation
   - Schema validation
   - Reject malformed requests

### Medium Priority

5. **Improved CSP**
   - Remove `unsafe-inline`
   - Use nonce-based CSP
   - Strict policy

6. **Security Headers**
   - Add HSTS header
   - Add Permissions-Policy
   - Add Expect-CT

7. **Audit Logging**
   - Log all admin actions
   - Track failed logins
   - Monitor suspicious activity

8. **Two-Factor Authentication**
   - Add 2FA for admins
   - SMS or authenticator app
   - Backup codes

### Low Priority

9. **Subresource Integrity**
   - Add SRI for external resources
   - Verify Google Fonts integrity
   - Hash-based verification

10. **Security Monitoring**
    - Implement monitoring
    - Alert on anomalies
    - Regular security audits

## Security Testing

### Recommended Tests

1. **XSS Testing**
   - Try injecting scripts in search
   - Test all input fields
   - Verify sanitization

2. **CSRF Testing**
   - Attempt cross-site requests
   - Verify protection (once implemented)

3. **File Upload Testing**
   - Try uploading non-PDF files
   - Test large files
   - Check validation

4. **Authentication Testing**
   - Try brute force login
   - Test rate limiting
   - Verify access control

5. **CSP Testing**
   - Verify CSP headers
   - Test blocked resources
   - Check for violations

### Tools for Testing

- **OWASP ZAP**: Automated security scanner
- **Burp Suite**: Manual penetration testing
- **Browser DevTools**: Check headers, CSP
- **Mozilla Observatory**: Security analysis
- **CSP Evaluator**: CSP policy checker

## Security Incident Response

### If Security Issue Found

1. **Report Immediately**
   - Email: security@subodhcollege.edu
   - GitHub: Private security advisory
   - Don't disclose publicly yet

2. **Provide Details**
   - Description of issue
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

3. **Wait for Response**
   - Team will investigate
   - Fix will be developed
   - Public disclosure after fix

### Responsible Disclosure

We appreciate responsible disclosure:
- 90-day disclosure deadline
- Credit in security advisory
- Hall of Fame recognition

## Compliance

### Data Protection

- GDPR considerations (if applicable)
- No personal data collected
- Right to access/delete
- Privacy by design

### Best Practices Followed

- OWASP Top 10 awareness
- Secure coding guidelines
- Regular security updates
- Security-first approach

## Security Checklist

Before deploying updates:

- [ ] All inputs validated
- [ ] XSS protection verified
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] File uploads validated
- [ ] No credentials in code
- [ ] Error messages sanitized
- [ ] Security headers present
- [ ] Dependencies updated
- [ ] Code reviewed

## Resources

### Security References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [CSP Guide](https://content-security-policy.com/)
- [Secure Headers](https://securityheaders.com/)

### Contact

Security Team: security@subodhcollege.edu

---

**Security is everyone's responsibility! 🔒**
