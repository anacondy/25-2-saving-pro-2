# Admin Guide

Complete guide for administrators and faculty managing the Subodh Exam Portal.

## Prerequisites

Before you begin, ensure you have:
- Valid admin credentials
- PDF files to upload (max 10MB each)
- Paper metadata information
- Authorized access from college administration

## Accessing Admin Panel

### Step 1: Trigger Admin Mode

1. Open the portal in your browser
2. **Type the secret code**: `upload` (case-sensitive)
   - Type this anywhere on the page
   - No need to click any button first
   - The modal will appear automatically

### Step 2: Authentication

1. A security modal will appear
2. Enter your **admin username** in the password field
   - Default: `alvido`
   - Username is case-sensitive
3. Click **"Authenticate"** or press Enter
4. If credentials are correct, you'll see the upload interface
5. If incorrect, you'll see "Access Denied: Unknown Entity"

## Upload Interface Overview

Once authenticated, you'll see the admin console with several sections:

### 1. Batch Mode Toggle
- **ON (Default)**: Upload multiple files with same metadata
- **OFF**: Upload files one at a time with individual metadata

### 2. Metadata Form

Fill in all required information:

#### Subject Stream
Select the subject category:
- Physics
- Statistics
- Computer Application
- Mathematics
- Chemistry
- Economics
- History
- Political Science
- Public Administration
- Geography
- Hindi Literature
- English Literature
- Sociology
- Philosophy

#### Session Year
Academic year of the exam:
- 2025, 2024, 2023, 2022, 2021, 2020, 2019

#### Semester
Select semester level:
- Semester I through VI

#### Exam Type
Choose examination category:
- **Main Semester Exam**: Regular end-semester exams
- **CIA (Internal)**: Continuous Internal Assessment
- **Back / Due**: Supplementary or re-appear exams
- **Re-Evaluation**: Re-evaluated papers

#### Category
Subject category in curriculum:
- **Subsidiary (Core)**: Main core subjects
- **Generic Elective (GEC)**: Optional electives
- **Ability Enhancement (AEC)**: Skill development
- **Skill Enhancement (SEC)**: Practical skills
- **Value Added (VAC)**: Additional courses

#### Medium
Language of the paper:
- English
- Hindi
- Bilingual

#### Paper Code
Unique identifier (e.g., PHY-302, HIS-101):
- Format: `SUBJECT-NUMBER`
- Max 20 characters
- Use standard college codes

#### Max Marks
Total marks for the paper:
- Enter numeric value (e.g., 100, 75, 50)
- Range: 0-1000

#### Paper Number
Select all applicable:
- Paper I
- Paper II
- Paper III
- Practical

### 3. File Upload Section

Two methods to upload files:

#### Method A: Drag & Drop
1. Prepare your PDF files
2. Drag files over the drop zone
3. Zone turns green when ready
4. Release to drop files
5. Files are validated automatically

#### Method B: Browse Files
1. Click on the drop zone
2. File browser opens
3. Select PDF file(s)
4. Click "Open"
5. Files are added

## Uploading Papers

### Single File Upload

1. **Turn OFF batch mode**
   - Toggle the switch at top
   - "Apply details to all files?" should be OFF

2. **Fill metadata for first paper**
   - Complete all form fields
   - Be accurate with paper code and details

3. **Select file**
   - Drag & drop or browse
   - Only one file accepted in this mode

4. **Upload**
   - Click "Upload to Database"
   - Wait for confirmation

5. **Repeat for next paper**
   - Form stays filled
   - Change necessary details
   - Upload next file

### Batch Upload (Multiple Files)

1. **Turn ON batch mode** (default)
   - Toggle should be ON
   - "Apply details to all files?" should be checked

2. **Fill common metadata**
   - Subject, Semester, Year, etc.
   - These details apply to ALL files

3. **Select multiple files**
   - Drag & drop multiple PDFs
   - Or browse and select multiple files
   - All files shown in count

4. **Upload batch**
   - Click "Upload to Database"
   - All files uploaded with same metadata

### Best Practices for Batch Upload

Use batch mode when:
- Uploading multiple papers from same exam
- Same semester and subject
- Same year and category

**Example**: Upload all Semester III Physics papers from 2025
- Subject: Physics
- Semester: III
- Year: 2025
- Upload all 5 PDFs at once

## File Validation

### Automatic Checks

The system validates:

1. **File Type**
   - Only PDF files accepted
   - Other formats rejected

2. **File Size**
   - Maximum: 10MB per file
   - Larger files rejected

3. **File Count**
   - Batch mode: Multiple files
   - Single mode: One file only

### Validation Errors

If validation fails:
- Drop zone turns red
- Error message displayed
- Invalid files not uploaded

**Common Errors**:
- "Invalid file type" → Not a PDF
- "File too large" → Exceeds 10MB
- "No valid files" → All files rejected

### Solutions

1. **Convert to PDF**: Use PDF converter for non-PDF files
2. **Compress PDF**: Reduce file size using online tools
3. **Split large PDFs**: Divide into smaller files
4. **Check file extension**: Ensure `.pdf` extension

## Security Guidelines

### Password Management

1. **Keep credentials secure**
   - Don't share admin password
   - Change password regularly
   - Use strong, unique password

2. **Logout after use**
   - Click "Cancel" to close modal
   - Clear browser history if on shared computer
   - Don't save password in browser on public PCs

### Upload Responsibility

1. **Verify content before upload**
   - Ensure correct paper
   - Check for completeness
   - Verify no sensitive information

2. **Accurate metadata**
   - Double-check paper codes
   - Verify semester and year
   - Confirm subject details

3. **Copyright compliance**
   - Only upload authorized papers
   - Follow college guidelines
   - Respect copyright laws

## Troubleshooting

### Can't Access Admin Panel

**Problem**: Secret code doesn't work
**Solutions**:
1. Type exactly: `upload` (lowercase)
2. Make sure no modal is already open
3. Refresh page and try again
4. Check keyboard language settings

### Authentication Failed

**Problem**: "Access Denied" message
**Solutions**:
1. Verify username spelling
2. Check for extra spaces
3. Ensure caps lock is off
4. Contact admin if password changed

### Files Not Uploading

**Problem**: Upload button doesn't work
**Solutions**:
1. Check file format (PDF only)
2. Verify file size (<10MB)
3. Fill all required fields
4. Check internet connection
5. Try one file at a time

### Form Not Submitting

**Problem**: Can't click upload button
**Solutions**:
1. Complete all form fields
2. Select at least one file
3. Check for JavaScript errors (F12)
4. Try different browser

## Tips for Efficient Management

### Organizing Uploads

1. **Batch by semester**
   - Upload all Semester I papers together
   - Then Semester II, and so on

2. **Group by subject**
   - Complete one subject before moving to next
   - Maintains consistency

3. **Use naming convention**
   - Name PDFs clearly before upload
   - Example: `PHY302_SemIII_2025.pdf`

### Time-Saving Tips

1. **Use batch mode** for multiple similar papers
2. **Prepare metadata** in advance
3. **Organize files** in folders before upload
4. **Validate files** before accessing admin panel

### Quality Control

1. **Preview PDFs** before upload
2. **Verify metadata** accuracy
3. **Check paper completeness**
4. **Test downloads** after upload

## Activity Logging

All admin actions are logged in the Contribution Log:
- Who uploaded (admin username)
- What was uploaded (paper code)
- When it was uploaded (timestamp)

This ensures:
- **Transparency**: All uploads tracked
- **Accountability**: Admin actions recorded
- **Audit Trail**: History of changes

## FAQ for Admins

### Can I edit uploaded papers?
Currently, editing is not supported. Upload a new version if needed.

### What happens if I upload duplicate?
The system may allow duplicates. Verify before uploading.

### Can I delete papers?
Deletion requires backend access. Contact system administrator.

### Is there an upload limit?
No limit on number of papers, but each file must be <10MB.

### Can multiple admins work simultaneously?
Yes, but coordinate to avoid duplicate uploads.

### How do I change admin password?
Contact system administrator for password changes.

## Support

For admin-related issues:

1. **Technical Issues**: Report on GitHub Issues
2. **Access Problems**: Contact IT department
3. **Training**: Request from Student Cell
4. **Feature Requests**: Submit via GitHub

Contact: admin@subodhcollege.edu

---

**Upload responsibly and keep the archive updated! 📤**
