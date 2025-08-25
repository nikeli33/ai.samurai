/**
 * AI SAMURAI - OPTIMIZED SCRIPT
 * Version: 2.0
 * Description: Optimized JavaScript for AI Samurai website
 */

(function($, window) {
    'use strict';
    
    // Configuration object
    const CONFIG = {
        slideInterval: 4000,
        playerHideDelay: 1500,
        transitionDuration: 600
    };
    
    // Main application object
    const AI_SAMURAI = {
        
        // Initialize all components
        init: function() {
            this.initGallery();
            this.initCarousel();
            this.initModal();
            this.initPlayerHover();
            this.bindEvents();
        },
        
        // Gallery initialization with improved performance
        initGallery: function() {
            const $flipContainers = $('.flip-container');
            
            if ($flipContainers.length === 0) return;
            
            // Debounced resize handler
            let resizeTimeout;
            const handleResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.reflowGallery();
                }, 250);
            };
            
            // Initial setup
            this.reflowGallery();
            
            // Bind resize event
            $(window).on('resize', handleResize);
            
            // Initialize flip effect
            $(".flipper").flip({
                trigger: 'hover',
                autoSize: false
            });
        },
        
        // Optimized gallery reflow
        reflowGallery: function() {
            const $pager = $('.pager');
            const $flipContainers = $('.flip-container');
            
            // Optimize pager layout
            if ($pager.length > 0) {
                $pager.css({height: 'auto', width: 'auto'});
                const pagerWidth = $pager.width();
                const pagerHeight = $pager.find('section:first-child').outerHeight() + 30;
                
                $pager.css({height: pagerHeight, width: pagerWidth});
                
                $pager.find('section').each(function(index) {
                    $(this).css({
                        top: 0,
                        left: (index * pagerWidth) + 'px',
                        position: 'absolute',
                        width: pagerWidth
                    });
                });
            }
            
            // Optimize flip containers
            $flipContainers.each(function() {
                const $container = $(this);
                const $detector = $('img.detector', $container.parent());
                
                if ($detector.length > 0) {
                    $detector.show();
                    const width = $detector.width();
                    $detector.hide();
                    
                    $container.css({width: width + 'px', height: width + 'px'});
                    $('.front, .back, .flipper', $container).css({
                        width: width + 'px', 
                        height: width + 'px', 
                        fontSize: (width / 20.1) + 'px'
                    });
                }
            });
        },
        
        // Carousel initialization
        initCarousel: function() {
            let slideIndex = 0;
            const slides = document.getElementsByClassName("mySlides");
            const dots = document.getElementsByClassName("dot");
            
            if (slides.length === 0) return;
            
            function showSlides() {
                // Hide all slides
                for (let i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                
                // Remove active class from all dots
                for (let i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                
                // Increment slide index
                slideIndex++;
                if (slideIndex > slides.length) {
                    slideIndex = 1;
                }
                
                // Show current slide and activate dot
                slides[slideIndex - 1].style.display = "block";
                dots[slideIndex - 1].className += " active";
                
                // Schedule next slide
                setTimeout(showSlides, CONFIG.slideInterval);
            }
            
            // Start carousel
            showSlides();
            
            // Add click handlers for dots
            for (let i = 0; i < dots.length; i++) {
                dots[i].addEventListener('click', function() {
                    slideIndex = i;
                    showSlides();
                });
            }
        },
        
        // Modal initialization
        initModal: function() {
            $('#myModal').on('shown.bs.modal', function() {
                const $input = $('#myInput');
                if ($input.length > 0) {
                    $input.focus();
                }
            });
        },
        
        // Player hover functionality
        initPlayerHover: function() {
            const playerContainer = document.getElementById('player-container');
            const playerHoverArea = document.querySelector('.player-hover-area');
            
            if (!playerContainer || !playerHoverArea) return;
            
            let hideTimeout;
            let isPlayerVisible = false;
            let isMouseOverPlayer = false;
            let isMouseOverHoverArea = false;
            
            // Show player function
            const showPlayer = () => {
                if (isPlayerVisible) return;
                
                clearTimeout(hideTimeout);
                playerContainer.style.transform = 'translateY(0)';
                playerContainer.style.opacity = '1';
                playerContainer.style.visibility = 'visible';
                isPlayerVisible = true;
            };
            
            // Hide player function
            const hidePlayer = () => {
                if (!isPlayerVisible) return;
                
                if (isMouseOverPlayer || isMouseOverHoverArea) {
                    return;
                }
                
                hideTimeout = setTimeout(() => {
                    if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                        playerContainer.style.transform = 'translateY(100%)';
                        playerContainer.style.opacity = '0';
                        playerContainer.style.visibility = 'hidden';
                        isPlayerVisible = false;
                    }
                }, CONFIG.playerHideDelay);
            };
            
            // Hover area events
            playerHoverArea.addEventListener('mouseenter', () => {
                isMouseOverHoverArea = true;
                showPlayer();
            });
            
            playerHoverArea.addEventListener('mouseleave', () => {
                isMouseOverHoverArea = false;
                setTimeout(() => {
                    if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                        hidePlayer();
                    }
                }, 100);
            });
            
            // Player events
            playerContainer.addEventListener('mouseenter', () => {
                isMouseOverPlayer = true;
                clearTimeout(hideTimeout);
                showPlayer();
            });
            
            playerContainer.addEventListener('mouseleave', () => {
                isMouseOverPlayer = false;
                setTimeout(() => {
                    if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                        hidePlayer();
                    }
                }, 100);
            });
            
            // Click to show player
            playerHoverArea.addEventListener('click', (e) => {
                e.preventDefault();
                showPlayer();
            });
            
            // Mouse move tracking for better UX
            document.addEventListener('mousemove', (e) => {
                const playerRect = playerContainer.getBoundingClientRect();
                const hoverAreaRect = playerHoverArea.getBoundingClientRect();
                
                const isOverPlayer = e.clientY >= playerRect.top && 
                                   e.clientY <= playerRect.bottom && 
                                   e.clientX >= playerRect.left && 
                                   e.clientX <= playerRect.right;
                
                const isOverHoverArea = e.clientY >= hoverAreaRect.top && 
                                      e.clientY <= hoverAreaRect.bottom && 
                                      e.clientX >= hoverAreaRect.left && 
                                      e.clientX <= hoverAreaRect.right;
                
                // Update player state
                if (isOverPlayer && !isMouseOverPlayer) {
                    isMouseOverPlayer = true;
                    clearTimeout(hideTimeout);
                    showPlayer();
                } else if (!isOverPlayer && isMouseOverPlayer) {
                    isMouseOverPlayer = false;
                    setTimeout(() => {
                        if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                            hidePlayer();
                        }
                    }, 100);
                }
                
                // Update hover area state
                if (isOverHoverArea && !isMouseOverHoverArea) {
                    isMouseOverHoverArea = true;
                    showPlayer();
                } else if (!isOverHoverArea && isMouseOverHoverArea) {
                    isMouseOverHoverArea = false;
                    setTimeout(() => {
                        if (!isMouseOverPlayer && !isMouseOverHoverArea) {
                            hidePlayer();
                        }
                    }, 100);
                }
            });
            
            // Initialize player as hidden
            setTimeout(() => {
                playerContainer.style.transform = 'translateY(100%)';
                playerContainer.style.opacity = '0';
                playerContainer.style.visibility = 'hidden';
                isPlayerVisible = false;
            }, 100);
        },
        
        // Bind additional events
        bindEvents: function() {
            // Smooth scrolling for anchor links
            $('a[href^="#"]').on('click', function(e) {
                const target = $(this.getAttribute('href'));
                if (target.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, CONFIG.transitionDuration);
                }
            });
            
            // Add loading states to buttons
            $('.btn').on('click', function() {
                const $btn = $(this);
                if (!$btn.hasClass('loading')) {
                    $btn.addClass('loading').prop('disabled', true);
                    setTimeout(() => {
                        $btn.removeClass('loading').prop('disabled', false);
                    }, 2000);
                }
            });
            
            // Optimize images loading
            this.lazyLoadImages();
        },
        
        // Lazy load images for better performance
        lazyLoadImages: function() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        },
        
        // Utility functions
        utils: {
            // Debounce function
            debounce: function(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },
            
            // Throttle function
            throttle: function(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            }
        }
    };
    
    // Initialize when DOM is ready
    $(document).ready(function() {
        AI_SAMURAI.init();
    });
    
    // Expose to global scope for debugging
    window.AI_SAMURAI = AI_SAMURAI;
    
})(jQuery, window);

// Global carousel function for backward compatibility
function currentSlide(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
}
