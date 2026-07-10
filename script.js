document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const hamburgerIcon = document.querySelector('.hamburger i');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (hamburgerIcon) {
                if (navLinks.classList.contains('active')) {
                    hamburgerIcon.classList.remove('fa-bars');
                    hamburgerIcon.classList.add('fa-times');
                } else {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (hamburgerIcon) {
                    hamburgerIcon.classList.remove('fa-times');
                    hamburgerIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Sticky Navbar and Active Link Highlighting on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky nav shadow
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset to trigger active state nicely
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to let the element stay visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Form Submission Handler (Submit data to FormSubmit.co via AJAX)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const isAr = document.documentElement.getAttribute('lang') === 'ar';

            // Show loading state
            btn.innerHTML = isAr ? 'جاري الإرسال... <i class="fas fa-spinner fa-spin ml-2"></i>' : 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';
            btn.disabled = true;
            
            // Send the request via FormSubmit AJAX endpoint
            fetch('https://formsubmit.co/ajax/sales@samkume.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === 'true' || data.success === true) {
                    // Show success state
                    btn.innerHTML = isAr ? 'تم إرسال الرسالة! <i class="fas fa-check ml-2"></i>' : 'Message Sent! <i class="fas fa-check ml-2"></i>';
                    btn.classList.replace('btn-primary', 'btn-secondary');
                    contactForm.reset();
                } else {
                    // Handle failure response
                    btn.innerHTML = isAr ? 'فشل الإرسال <i class="fas fa-exclamation-triangle ml-2"></i>' : 'Failed to Send <i class="fas fa-exclamation-triangle ml-2"></i>';
                    btn.classList.replace('btn-primary', 'btn-danger');
                }
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-secondary', 'btn-danger');
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                btn.innerHTML = isAr ? 'خطأ في الإرسال <i class="fas fa-wifi ml-2"></i>' : 'Error Sending <i class="fas fa-wifi ml-2"></i>';
                btn.classList.replace('btn-primary', 'btn-danger');
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('btn-secondary', 'btn-danger');
                    btn.classList.add('btn-primary');
                    btn.disabled = false;
                }, 3000);
            });
        });
    }

    // ==========================================================================
    // 5. SECURE IMAGE CUSTOMIZER & ADMIN SYSTEM LOGIC
    // ==========================================================================
    const defaultImages = {};
    const customData = {};

    // Load and apply custom configurations from localStorage
    function loadAndApplyCustomizer() {
        const cards = document.querySelectorAll('.service-card[data-service-id]');
        cards.forEach(card => {
            const id = card.getAttribute('data-service-id');
            const img = card.querySelector('.card-img img');
            if (!img) return;

            // Save original default image src if not already saved
            if (!defaultImages[id]) {
                defaultImages[id] = img.getAttribute('src');
            }

            const saved = localStorage.getItem(`samku_img_custom_${id}`);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    customData[id] = data;
                    
                    // Apply custom image
                    if (data.image) {
                        img.setAttribute('src', data.image);
                    }
                    
                    // Apply custom styling filters
                    if (data.filters) {
                        const f = data.filters;
                        img.style.filter = `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) grayscale(${f.grayscale}%) blur(${f.blur}px)`;
                        img.style.transform = `scale(${f.scale})`;
                        img.style.objectPosition = `${f.x}% ${f.y}%`;
                        img.style.objectFit = 'cover';
                    }
                } catch (e) {
                    console.error(`Error loading custom data for ${id}`, e);
                }
            } else {
                // Revert to default values
                img.setAttribute('src', defaultImages[id]);
                img.style.filter = '';
                img.style.transform = '';
                img.style.objectPosition = '';
                customData[id] = null;
            }
        });
    }

    // Trigger on load
    loadAndApplyCustomizer();

    // Determine context (Is it admin visual edit mode?)
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminMode = urlParams.get('admin') === 'true';
    const isLoginPage = window.location.pathname.endsWith('admin.html');

    const modal = document.getElementById('imageCustomizerModal');

    if (!isAdminMode && !isLoginPage) {
        // Safe mode: clean the DOM of any customizer editors
        if (modal) {
            modal.remove();
        }
    } else if (isAdminMode) {
        // Visual Admin Editor mode enabled
        
        // Dynamically inject the "Edit Mode" toggle inside navbar links
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const isAr = document.documentElement.getAttribute('lang') === 'ar';
            const editBtn = document.createElement('a');
            editBtn.href = '#';
            editBtn.className = 'nav-link edit-mode-btn';
            editBtn.id = 'editModeToggle';
            editBtn.innerHTML = isAr ? '<i class="fas fa-cog"></i> وضع التعديل' : '<i class="fas fa-cog"></i> Edit Mode';
            
            // Insert before the last item (language toggle link)
            navLinks.insertBefore(editBtn, navLinks.lastElementChild);
            
            // Re-setup Hamburger menu links reference to include our new button
            const updatedLinks = document.querySelectorAll('.nav-link');
            const hamburgerIcon = document.querySelector('.hamburger i');
            updatedLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('fa-times');
                        hamburgerIcon.classList.add('fa-bars');
                    }
                });
            });

            // Set up Edit Mode Toggling event
            let editModeActive = false;
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                editModeActive = !editModeActive;
                document.body.classList.toggle('edit-mode-active', editModeActive);
                if (editModeActive) {
                    editBtn.innerHTML = isAr ? '<i class="fas fa-times"></i> إغلاق التعديل' : '<i class="fas fa-times"></i> Exit Edit';
                } else {
                    editBtn.innerHTML = isAr ? '<i class="fas fa-cog"></i> وضع التعديل' : '<i class="fas fa-cog"></i> Edit Mode';
                }
            });
        }

        // Customizer Modal references
        const modalCloseBtn = document.getElementById('btn-customizer-close');
        const modalCancelBtn = document.getElementById('btn-customizer-cancel');
        const modalSaveBtn = document.getElementById('btn-customizer-save');
        const modalResetBtn = document.getElementById('btn-customizer-reset');
        const previewImg = document.getElementById('customizer-img-preview');
        
        let currentEditId = null;
        let currentTempData = null;

        // Open Modal when clicking service card in edit mode
        document.addEventListener('click', (e) => {
            const cardImg = e.target.closest('.service-card .card-img');
            if (cardImg && document.body.classList.contains('edit-mode-active')) {
                const card = cardImg.closest('.service-card');
                if (card) {
                    const id = card.getAttribute('data-service-id');
                    if (id) {
                        openCustomizerModal(id);
                    }
                }
            }
        });

        function openCustomizerModal(id) {
            currentEditId = id;
            
            const img = document.querySelector(`.service-card[data-service-id="${id}"] .card-img img`);
            const currentSrc = img ? img.getAttribute('src') : '';
            
            const saved = localStorage.getItem(`samku_img_custom_${id}`);
            if (saved) {
                currentTempData = JSON.parse(saved);
            } else {
                currentTempData = {
                    image: currentSrc,
                    filters: { scale: 1, x: 50, y: 50, brightness: 100, contrast: 100, saturate: 100, grayscale: 0, blur: 0 }
                };
            }

            // Reset text boxes
            document.getElementById('customizer-image-url').value = currentTempData.image.startsWith('data:') ? '' : currentTempData.image;
            
            // Bind preview source
            previewImg.src = currentTempData.image;

            // Synchronize Slider controls UI
            const f = currentTempData.filters;
            setSlider('customizer-scale', f.scale, 'customizer-val-scale', 'x');
            setSlider('customizer-x', f.x, 'customizer-val-x', '%');
            setSlider('customizer-y', f.y, 'customizer-val-y', '%');
            setSlider('customizer-brightness', f.brightness, 'customizer-val-brightness', '%');
            setSlider('customizer-contrast', f.contrast, 'customizer-val-contrast', '%');
            setSlider('customizer-saturate', f.saturate, 'customizer-val-saturate', '%');
            setSlider('customizer-grayscale', f.grayscale, 'customizer-val-grayscale', '%');
            setSlider('customizer-blur', f.blur, 'customizer-val-blur', 'px');

            applyPreviewFilters();
            updatePresetHighlight();

            // Show Modal overlay
            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
            document.body.style.overflow = 'hidden';
        }

        function closeCustomizerModal() {
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
            document.body.style.overflow = '';
            currentEditId = null;
            currentTempData = null;
        }

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCustomizerModal);
        if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeCustomizerModal);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeCustomizerModal();
            });
        }

        function setSlider(id, val, labelId, suffix) {
            const slider = document.getElementById(id);
            const label = document.getElementById(labelId);
            if (slider) slider.value = val;
            if (label) label.textContent = `${val}${suffix}`;
        }

        function applyPreviewFilters() {
            if (!previewImg || !currentTempData) return;
            const f = currentTempData.filters;
            previewImg.style.filter = `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturate}%) grayscale(${f.grayscale}%) blur(${f.blur}px)`;
            previewImg.style.transform = `scale(${f.scale})`;
            previewImg.style.objectPosition = `${f.x}% ${f.y}%`;
            previewImg.style.objectFit = 'cover';
        }

        // CSS filter preset templates
        const customPresets = {
            none: { brightness: 100, contrast: 100, saturate: 100, grayscale: 0, blur: 0 },
            warm: { brightness: 105, contrast: 100, saturate: 135, grayscale: 0, blur: 0 },
            cool: { brightness: 95, contrast: 105, saturate: 75, grayscale: 10, blur: 0 },
            cyber: { brightness: 110, contrast: 120, saturate: 175, grayscale: 0, blur: 0 },
            vintage: { brightness: 90, contrast: 90, saturate: 120, grayscale: 15, blur: 0.5 },
            mono: { brightness: 100, contrast: 115, saturate: 0, grayscale: 100, blur: 0 }
        };

        function updatePresetHighlight() {
            if (!currentTempData || !modal) return;
            const f = currentTempData.filters;
            const buttons = modal.querySelectorAll('.preset-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            for (const [name, values] of Object.entries(customPresets)) {
                const matches = f.brightness === values.brightness &&
                                f.contrast === values.contrast &&
                                f.saturate === values.saturate &&
                                f.grayscale === values.grayscale &&
                                f.blur === values.blur;
                if (matches) {
                    const btn = modal.querySelector(`.preset-btn[data-preset="${name}"]`);
                    if (btn) btn.classList.add('active');
                    break;
                }
            }
        }

        if (modal) {
            modal.querySelectorAll('.preset-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = e.target.getAttribute('data-preset');
                    const values = customPresets[name];
                    if (values && currentTempData) {
                        Object.assign(currentTempData.filters, values);
                        const f = currentTempData.filters;
                        setSlider('customizer-brightness', f.brightness, 'customizer-val-brightness', '%');
                        setSlider('customizer-contrast', f.contrast, 'customizer-val-contrast', '%');
                        setSlider('customizer-saturate', f.saturate, 'customizer-val-saturate', '%');
                        setSlider('customizer-grayscale', f.grayscale, 'customizer-val-grayscale', '%');
                        setSlider('customizer-blur', f.blur, 'customizer-val-blur', 'px');
                        applyPreviewFilters();
                        updatePresetHighlight();
                    }
                });
            });
        }

        // Range slider input listeners
        const sliderMappings = [
            { id: 'customizer-scale', key: 'scale', display: 'customizer-val-scale', suffix: 'x' },
            { id: 'customizer-x', key: 'x', display: 'customizer-val-x', suffix: '%' },
            { id: 'customizer-y', key: 'y', display: 'customizer-val-y', suffix: '%' },
            { id: 'customizer-brightness', key: 'brightness', display: 'customizer-val-brightness', suffix: '%' },
            { id: 'customizer-contrast', key: 'contrast', display: 'customizer-val-contrast', suffix: '%' },
            { id: 'customizer-saturate', key: 'saturate', display: 'customizer-val-saturate', suffix: '%' },
            { id: 'customizer-grayscale', key: 'grayscale', display: 'customizer-val-grayscale', suffix: '%' },
            { id: 'customizer-blur', key: 'blur', display: 'customizer-val-blur', suffix: 'px' }
        ];

        sliderMappings.forEach(mapping => {
            const slider = document.getElementById(mapping.id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    if (!currentTempData) return;
                    const val = parseFloat(e.target.value);
                    currentTempData.filters[mapping.key] = val;
                    document.getElementById(mapping.display).textContent = `${val}${mapping.suffix}`;
                    applyPreviewFilters();
                    updatePresetHighlight();
                });
            }
        });

        // Drag and Drop Upload logic
        const dropZone = document.getElementById('customizer-drop-zone');
        const fileUploader = document.getElementById('customizer-file-uploader');

        if (dropZone && fileUploader) {
            dropZone.addEventListener('click', () => fileUploader.click());
            fileUploader.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    processFile(e.target.files[0]);
                }
            });
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('dragover');
            });
            dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                if (e.dataTransfer.files.length > 0) {
                    processFile(e.dataTransfer.files[0]);
                }
            });
        }

        function processFile(file) {
            if (!file || !file.type.startsWith('image/')) {
                alert('Please drop/select a valid image file.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                if (currentTempData) {
                    currentTempData.image = e.target.result;
                    previewImg.src = e.target.result;
                    document.getElementById('customizer-image-url').value = '';
                }
            };
            reader.readAsDataURL(file);
        }

        // URL Apply Action button
        const applyUrlBtn = document.getElementById('btn-customizer-apply-url');
        if (applyUrlBtn) {
            applyUrlBtn.addEventListener('click', () => {
                const url = document.getElementById('customizer-image-url').value.trim();
                if (!url) {
                    alert('Please paste a valid image URL first.');
                    return;
                }
                const tempImg = new Image();
                tempImg.onload = () => {
                    if (currentTempData) {
                        currentTempData.image = url;
                        previewImg.src = url;
                        if (fileUploader) fileUploader.value = '';
                    }
                };
                tempImg.onerror = () => {
                    alert('Unable to load image from URL. Please check the URL.');
                };
                tempImg.src = url;
            });
        }

        // Save changes to localStorage
        if (modalSaveBtn) {
            modalSaveBtn.addEventListener('click', () => {
                if (currentEditId && currentTempData) {
                    localStorage.setItem(`samku_img_custom_${currentEditId}`, JSON.stringify(currentTempData));
                    loadAndApplyCustomizer();
                    closeCustomizerModal();
                }
            });
        }

        // Reset card button
        if (modalResetBtn) {
            modalResetBtn.addEventListener('click', () => {
                if (currentEditId) {
                    const isAr = document.documentElement.getAttribute('lang') === 'ar';
                    const confirmText = isAr ? 'هل أنت متأكد من رغبتك في إعادة تعيين هذه الصورة؟' : 'Are you sure you want to reset this service card image to default?';
                    if (confirm(confirmText)) {
                        localStorage.removeItem(`samku_img_custom_${currentEditId}`);
                        loadAndApplyCustomizer();
                        closeCustomizerModal();
                    }
                }
            });
        }
    }

    // ==========================================================================
    // 6. ADMIN PORTAL (admin.html) LOGIC
    // ==========================================================================
    if (isLoginPage) {
        const loginPanel = document.getElementById('login-panel');
        const dashboardPanel = document.getElementById('dashboard-panel');
        const loginForm = document.getElementById('adminLoginForm');
        const errorDiv = document.getElementById('login-error');
        const btnLogout = document.getElementById('btnLogout');
        const btnResetSystem = document.getElementById('btnResetSystem');

        function checkAuth() {
            const isAuth = sessionStorage.getItem('samku_admin_auth') === 'true';
            if (isAuth) {
                loginPanel.style.display = 'none';
                dashboardPanel.style.display = 'block';
                updateAdminDashboardStats();
            } else {
                loginPanel.style.display = 'block';
                dashboardPanel.style.display = 'none';
            }
        }

        function updateAdminDashboardStats() {
            let customCount = 0;
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).startsWith('samku_img_custom_')) {
                    customCount++;
                }
            }
            const statCustom = document.getElementById('stat-custom');
            if (statCustom) statCustom.textContent = customCount;
        }

        // Handle Login Submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const user = document.getElementById('admin-username').value.trim();
                const pass = document.getElementById('admin-password').value.trim();

                if (user === 'admin' && pass === 'samkuadmin') {
                    sessionStorage.setItem('samku_admin_auth', 'true');
                    errorDiv.style.display = 'none';
                    loginForm.reset();
                    checkAuth();
                } else {
                    errorDiv.style.display = 'block';
                }
            });
        }

        // Handle Logout
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                sessionStorage.removeItem('samku_admin_auth');
                checkAuth();
            });
        }

        // Handle Global System Reset
        if (btnResetSystem) {
            btnResetSystem.addEventListener('click', () => {
                if (confirm('Are you sure you want to revert all custom images and visual filters across the entire website? This action cannot be undone.')) {
                    // Loop backwards and delete custom image keys
                    const keysToRemove = [];
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        if (key.startsWith('samku_img_custom_')) {
                            keysToRemove.push(key);
                        }
                    }
                    keysToRemove.forEach(k => localStorage.removeItem(k));
                    
                    updateAdminDashboardStats();
                    alert('System reset complete. All cards are restored to defaults.');
                }
            });
        }

        // Initial check
        checkAuth();
    }
});

