gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const cards = gsap.utils.toArray('.card');
    const video = document.querySelector('.card-3 video');
    const videoSource = document.querySelector('#video-source');
    const isMobile = window.innerWidth <= 768;

    // Enable GPU acceleration for all cards
    cards.forEach(card => {
        gsap.set(card, {
            force3D: true,
            transformPerspective: 1000
        });
    });

    // Function to update video source based on screen size
    function updateVideoSource() {
        if (videoSource && video) {
            const isMobileNow = window.innerWidth <= 768;
            const newSource = isMobileNow
                ? 'assets/Mobile/USP Section- tearable Dose Cups.mp4'
                : 'assets/Desktop/USP-tearable-pkg.mp4';

            // Check if source needs to be updated
            const currentSrc = videoSource.getAttribute('src');
            if (currentSrc !== newSource) {
                const wasPlaying = !video.paused;
                const currentTime = video.currentTime;
                videoSource.setAttribute('src', newSource);
                video.load();
                if (wasPlaying) {
                    video.currentTime = currentTime;
                    video.play().catch(err => console.log('Video play failed:', err));
                }
            }
        }
    }

    // Initial video source setup
    updateVideoSource();

    // Debounced resize handler for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateVideoSource();
            ScrollTrigger.refresh();

            // Reset card positions with width
            cards.forEach((card, index) => {
                const initialY = index * 24;
                const initialOpacity = 1 - (index * 0.35);
                const initialZIndex = cards.length - index;

                gsap.set(card, {
                    left: '50%',
                    top: '50%',
                    xPercent: -50,
                    yPercent: -50,
                    y: initialY,
                    opacity: initialOpacity,
                    width: index === 0 ? '100%' : `${100 - (index * 5)}%`,
                    zIndex: initialZIndex,
                    x: 0,
                    force3D: true
                });
            });
        }, 150);
    });

    // Mobile-optimized settings
    const scrubValue = isMobile ? 1 : 0.5;
    const snapSettings = isMobile ? false : {
        snapTo: 1 / (cards.length - 1),
        duration: 0.5,
        delay: 0.1,
        ease: 'power1.inOut'
    };

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.cards-container',
            start: isMobile ? 'top 100px' : 'top 50px',
            end: `+=${window.innerHeight * (cards.length + 1)}`,
            scrub: scrubValue,
            pin: true,
            markers: false,
            snap: snapSettings,
            anticipatePin: 1,
            pinSpacing: true,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            onUpdate: (self) => {
                // Use requestAnimationFrame for smoother updates
                requestAnimationFrame(() => {
                    const progress = self.progress;
                    const totalCards = cards.length;
                    const progressPerCard = 1 / (totalCards - 1);
                    const currentCardIndex = Math.min(
                        Math.floor(progress / progressPerCard),
                        totalCards - 1
                    );

                    // Play video when card 3 (index 2) is focused
                    if (currentCardIndex === 2 && video) {
                        video.play().catch(() => { });
                    } else if (video) {
                        video.pause();
                    }
                });
            }
        }
    });

    // Set initial stacked states with width
    cards.forEach((card, index) => {
        const initialY = index * 24;
        const initialOpacity = 1 - (index * 0.35);
        // Z-index: higher index = lower z-index (card-1 should be on top)
        const initialZIndex = cards.length - index;

        gsap.set(card, {
            left: '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,
            y: initialY,
            x: 0,
            opacity: initialOpacity,
            width: index === 0 ? '100%' : `${100 - (index * 5)}%`,
            zIndex: initialZIndex,
            force3D: true,
            transformPerspective: 1000
        });
    });

    // Pause video initially
    if (video) {
        video.pause();
    }

    // Animate cards with width
    cards.forEach((card, index) => {
        // Phase 1: Current card fades in and expands (bring to front)
        tl.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            width: '100%',
            zIndex: cards.length + 1, // Bring active card to front
            duration: 3,
            ease: 'none',
            force3D: true
        });

        // Phase 2: Current card fades out AND all subsequent cards shift properties
        if (index < cards.length - 1) {
            // Fade out current card
            tl.to(card, {
                opacity: 0,
                y: -500,
                x: 0,
                zIndex: 0, // Send to back when fading out
                duration: 1,
                ease: 'none',
                force3D: true
            });

            // At the SAME TIME, animate ALL remaining cards to shift up one position
            for (let i = index + 1; i < cards.length; i++) {
                const targetCard = cards[i];
                const inheritedY = (i - index - 1) * 24;
                const inheritedOpacity = 1 - ((i - index - 1) * 0.35);
                const inheritedZIndex = cards.length - (i - index - 1);

                let targetCardWidth;
                if (i === index + 1) {
                    targetCardWidth = '100%';
                } else {
                    targetCardWidth = getComputedStyle(cards[i - 1]).width;
                }

                tl.to(targetCard, {
                    y: inheritedY,
                    opacity: inheritedOpacity,
                    width: targetCardWidth,
                    zIndex: inheritedZIndex,
                    duration: 1,
                    x: 0,
                    ease: 'none',
                    force3D: true
                }, '<');
            }
        }
    });
});

