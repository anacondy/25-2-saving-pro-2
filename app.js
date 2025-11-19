// --- [CONFIGURATION & CONSTANTS] ---
const CONFIG = {
    SECRET_CODE: "upload",
    ADMIN_USERNAME: "alvido",
    SWIPE_THRESHOLD: 50,
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['.pdf'],
};

// --- [SECURITY UTILITIES] ---
const SecurityUtils = {
    // Sanitize HTML to prevent XSS
    sanitizeHTML: function(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },
    
    // Validate file type
    isValidFileType: function(filename) {
        const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
        return CONFIG.ALLOWED_FILE_TYPES.includes(ext);
    },
    
    // Validate file size
    isValidFileSize: function(size) {
        return size <= CONFIG.MAX_FILE_SIZE;
    }
};

// --- [GLOBAL VARIABLES] ---
const track = document.getElementById('track');
const cards = document.querySelectorAll('.glass-card');
const bgGlow = document.getElementById('bgGlow');
const swipeZone = document.getElementById('swipeZone');
let currentIndex = 0;
const totalCards = cards.length;

// --- [MOCK DATABASE] ---
const papersDB = [
    // Physics
    { title: "Quantum Mechanics", code: "PHY-302", sem: "III", subj: "Physics", cat: "Subsidiary", type: "Main" },
    { title: "Electromagnetism", code: "PHY-201", sem: "II", subj: "Physics", cat: "Subsidiary", type: "Back" },
    // History
    { title: "History of India (Beginning to 1200 A.D.)", code: "HIS-101", sem: "I", subj: "History", cat: "Subsidiary", type: "Main" },
    { title: "History of Medieval India (1200-1526)", code: "HIS-201", sem: "III", subj: "History", cat: "Subsidiary", type: "Main" },
    { title: "History of Modern World", code: "HIS-302", sem: "V", subj: "History", cat: "Subsidiary", type: "Main" },
    // Statistics
    { title: "Applied Statistics-I", code: "STAT-301", sem: "III", subj: "Statistics", cat: "Subsidiary", type: "Main" },
    { title: "Sample Survey-I", code: "STAT-501", sem: "V", subj: "Statistics", cat: "Subsidiary", type: "Main" },
    // Computer Science
    { title: "Java Programming", code: "CSC-301", sem: "III", subj: "Comp App", cat: "Subsidiary", type: "Main" },
    { title: "Data Structures", code: "CSC-401", sem: "IV", subj: "Comp App", cat: "Subsidiary", type: "Main" },
    // Languages
    { title: "General Hindi", code: "HIN-AEC", sem: "I", subj: "Hindi", cat: "AEC", type: "Main" },
    { title: "English Communication", code: "ENG-AEC", sem: "II", subj: "English", cat: "AEC", type: "Main" },
    // Others
    { title: "Public Administration Institutions", code: "PUB-101", sem: "I", subj: "Pub Adm", cat: "Subsidiary", type: "Main" },
    { title: "Business Communication Skills", code: "SEC-101", sem: "III", subj: "General", cat: "SEC", type: "CIA" },
];

// --- [SEARCH FUNCTIONALITY] ---
const SearchModule = {
    init: function() {
        const searchInput = document.getElementById('paperSearch');
        const resultsContainer = document.getElementById('searchResults');
        
        if (searchInput && resultsContainer) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e, resultsContainer));
        }
    },
    
    handleSearch: function(e, resultsContainer) {
        const query = SecurityUtils.sanitizeHTML(e.target.value.toLowerCase());
        resultsContainer.innerHTML = "";
        
        if (query.length === 0) {
            resultsContainer.innerHTML = '<div style="color:#666; margin-top:20px; font-size:0.9rem;">Start typing to search...</div>';
            return;
        }
        
        const filtered = papersDB.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.code.toLowerCase().includes(query) ||
            p.subj.toLowerCase().includes(query)
        );
        
        if (filtered.length === 0) {
            resultsContainer.innerHTML = '<div style="color:#ff4444; margin-top:20px; font-size:0.9rem;">No papers found.</div>';
        } else {
            filtered.forEach(p => this.renderSearchResult(p, resultsContainer));
        }
    },
    
    renderSearchResult: function(paper, container) {
        const item = document.createElement('div');
        item.className = 'result-item';
        
        let tagClass = "tag main";
        if (paper.cat === "Subsidiary") tagClass = "tag sub";
        if (paper.cat === "GEC" || paper.cat === "SEC") tagClass = "tag gec";
        if (paper.type === "Back" || paper.type === "CIA") tagClass = "tag cia";
        
        // Sanitize all output
        const safeTitle = SecurityUtils.sanitizeHTML(paper.title);
        const safeCode = SecurityUtils.sanitizeHTML(paper.code);
        const safeCat = SecurityUtils.sanitizeHTML(paper.cat);
        const safeSubj = SecurityUtils.sanitizeHTML(paper.subj);
        const safeSem = SecurityUtils.sanitizeHTML(paper.sem);
        
        item.innerHTML = `
            <div>
                <div class="result-title">${safeTitle}</div>
                <div class="result-meta">
                    <span class="${tagClass}">${safeCat}</span>
                    <span>${safeCode}</span>
                    <span style="color:#ccc">• ${safeSubj}</span>
                </div>
            </div>
            <div class="sem-tag">${safeSem}</div>
        `;
        container.appendChild(item);
    }
};

// --- [CAROUSEL FUNCTIONALITY] ---
const CarouselModule = {
    init: function() {
        this.setupEventListeners();
        this.updateCarousel();
    },
    
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    updateCarousel: function() {
        let cardWidth, gap;
        if (this.isMobile()) {
            cardWidth = window.innerWidth * 0.85;
            gap = 30;
        } else {
            cardWidth = 700;
            gap = 80;
        }
        
        const windowWidth = window.innerWidth;
        const centerOffset = (windowWidth - cardWidth) / 2;
        const shift = currentIndex * (cardWidth + gap);
        const translateX = centerOffset - shift;
        
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
        
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
                const themeColor = card.getAttribute('data-theme');
                bgGlow.style.setProperty('--theme-color', themeColor);
                card.style.setProperty('--theme-color', themeColor);
                card.style.setProperty('--shadow-color', themeColor);
            } else {
                card.classList.remove('active');
            }
        });
    },
    
    setupEventListeners: function() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('adminModal').classList.contains('open')) {
                if (e.key === 'ArrowRight' && currentIndex < totalCards - 1) {
                    currentIndex++;
                    this.updateCarousel();
                }
                if (e.key === 'ArrowLeft' && currentIndex > 0) {
                    currentIndex--;
                    this.updateCarousel();
                }
            }
        });
        
        // Touch navigation
        let touchStartX = 0;
        let touchEndX = 0;
        
        swipeZone.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        swipeZone.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > CONFIG.SWIPE_THRESHOLD && currentIndex < totalCards - 1) {
                currentIndex++;
                this.updateCarousel();
            }
            if (touchEndX - touchStartX > CONFIG.SWIPE_THRESHOLD && currentIndex > 0) {
                currentIndex--;
                this.updateCarousel();
            }
        }, { passive: true });
        
        // Window resize
        window.addEventListener('resize', () => this.updateCarousel());
    }
};

// --- [ADMIN MODAL FUNCTIONALITY] ---
const AdminModule = {
    keyBuffer: "",
    
    init: function() {
        this.setupSecretCode();
        this.setupModalElements();
        this.setupFileUpload();
    },
    
    setupSecretCode: function() {
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('adminModal').classList.contains('open')) return;
            
            this.keyBuffer += e.key.toLowerCase();
            if (this.keyBuffer.length > CONFIG.SECRET_CODE.length) {
                this.keyBuffer = this.keyBuffer.slice(-CONFIG.SECRET_CODE.length);
            }
            if (this.keyBuffer === CONFIG.SECRET_CODE) {
                this.openModal();
                this.keyBuffer = "";
            }
        });
    },
    
    setupModalElements: function() {
        const adminNameInput = document.getElementById('adminNameInput');
        
        if (adminNameInput) {
            adminNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.verifyAdmin();
                }
            });
        }
    },
    
    openModal: function() {
        const adminModal = document.getElementById('adminModal');
        const adminNameInput = document.getElementById('adminNameInput');
        
        adminModal.classList.add('open');
        if (adminNameInput) {
            adminNameInput.focus();
        }
    },
    
    closeModal: function() {
        const adminModal = document.getElementById('adminModal');
        const authStage = document.getElementById('authStage');
        const uploadStage = document.getElementById('uploadStage');
        const adminNameInput = document.getElementById('adminNameInput');
        const authError = document.getElementById('authError');
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        
        adminModal.classList.remove('open');
        
        setTimeout(() => {
            authStage.classList.remove('hidden-stage');
            uploadStage.classList.add('hidden-stage');
            if (adminNameInput) adminNameInput.value = "";
            if (authError) authError.style.display = 'none';
            if (dropZone) {
                dropZone.innerText = "Drag & Drop Multiple PDFs here";
                dropZone.classList.remove('drag-over');
            }
            if (fileInput) fileInput.value = "";
        }, 500);
    },
    
    verifyAdmin: function() {
        const adminNameInput = document.getElementById('adminNameInput');
        const authStage = document.getElementById('authStage');
        const uploadStage = document.getElementById('uploadStage');
        const authError = document.getElementById('authError');
        
        // Sanitize input
        const username = SecurityUtils.sanitizeHTML(adminNameInput.value.trim().toLowerCase());
        
        if (username === CONFIG.ADMIN_USERNAME) {
            authStage.classList.add('hidden-stage');
            uploadStage.classList.remove('hidden-stage');
        } else {
            authError.style.display = 'block';
        }
    },
    
    setupFileUpload: function() {
        const batchToggle = document.getElementById('batchToggle');
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        
        if (!batchToggle || !dropZone || !fileInput) return;
        
        // Batch toggle
        batchToggle.addEventListener('change', function() {
            if (this.checked) {
                fileInput.multiple = true;
                dropZone.innerText = "Drag & Drop Multiple PDFs here (Batch Mode)";
            } else {
                fileInput.multiple = false;
                dropZone.innerText = "Drag & Drop Single PDF here (Individual Mode)";
            }
        });
        
        // Click to upload
        dropZone.addEventListener('click', () => fileInput.click());
        
        // File selection
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const validFiles = this.validateFiles(fileInput.files);
                if (validFiles.length > 0) {
                    dropZone.innerText = validFiles.length + " Valid File(s) Selected";
                    dropZone.style.borderColor = "#1db954";
                    dropZone.style.color = "#1db954";
                } else {
                    dropZone.innerText = "No valid files selected";
                    dropZone.style.borderColor = "#ff4444";
                    dropZone.style.color = "#ff4444";
                }
            }
        });
        
        // Drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
            dropZone.innerText = "Release to Drop";
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
            dropZone.innerText = batchToggle.checked ? 
                "Drag & Drop Multiple PDFs here" : 
                "Drag & Drop Single PDF here";
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                const validFiles = this.validateFiles(e.dataTransfer.files);
                
                if (validFiles.length > 0) {
                    // If batch is OFF, only take the first file
                    if (!batchToggle.checked) {
                        const dt = new DataTransfer();
                        dt.items.add(validFiles[0]);
                        fileInput.files = dt.files;
                    } else {
                        const dt = new DataTransfer();
                        validFiles.forEach(file => dt.items.add(file));
                        fileInput.files = dt.files;
                    }
                    
                    dropZone.innerText = fileInput.files.length + " Valid File(s) Selected";
                    dropZone.style.borderColor = "#1db954";
                    dropZone.style.color = "#1db954";
                } else {
                    dropZone.innerText = "No valid PDF files dropped";
                    dropZone.style.borderColor = "#ff4444";
                    dropZone.style.color = "#ff4444";
                }
            }
        });
    },
    
    validateFiles: function(files) {
        const validFiles = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Check file type
            if (!SecurityUtils.isValidFileType(file.name)) {
                console.warn(`Invalid file type: ${file.name}`);
                continue;
            }
            
            // Check file size
            if (!SecurityUtils.isValidFileSize(file.size)) {
                console.warn(`File too large: ${file.name} (${file.size} bytes)`);
                continue;
            }
            
            validFiles.push(file);
        }
        
        return validFiles;
    }
};

// --- [INITIALIZATION] ---
document.addEventListener('DOMContentLoaded', function() {
    SearchModule.init();
    CarouselModule.init();
    AdminModule.init();
});

// --- [EXPOSE FUNCTIONS TO GLOBAL SCOPE FOR ONCLICK HANDLERS] ---
window.closeModal = function() {
    AdminModule.closeModal();
};

window.verifyAdmin = function() {
    AdminModule.verifyAdmin();
};
