gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const cards = gsap.utils.toArray('.card');
    const video = document.querySelector('.card-3 video');
    const videoSource = document.querySelector('#video-source');

    // Function to update video source based on screen size
    function updateVideoSource() {
        if (videoSource && video) {
            const isMobile = window.innerWidth <= 768;
            const newSource = isMobile
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

    // Update video source on load and resize
    window.addEventListener('resize', () => {
        updateVideoSource();
        ScrollTrigger.refresh();

        // Reset card positions
        cards.forEach((card, index) => {
            const initialY = index * 24;
            const initialOpacity = 1 - (index * 0.35);
            gsap.set(card, {
                left: '50%',
                top: '50%',
                xPercent: -50,
                yPercent: -50,
                y: initialY,
                opacity: initialOpacity,
                width: index === 0 ? '100%' : `${100 - (index * 5)}%`,
                x: 0,
            });
        });
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.cards-container',
            start: 'top 50px',
            end: `+=${window.innerHeight * (cards.length + 1)}`,
            scrub: 0.5,
            pin: true,
            markers: true,
            snap: {
                snapTo: 1 / (cards.length - 1),
                duration: 0.5,
                delay: 0.1,
                ease: 'power1.inOut'
            },
            anticipatePin: 1,
            pinSpacing: true,
            onUpdate: (self) => {
                // Calculate which card is currently focused based on scroll progress
                const progress = self.progress;
                const totalCards = cards.length;
                const progressPerCard = 1 / (totalCards - 1);

                // Determine the current active card index
                const currentCardIndex = Math.min(
                    Math.floor(progress / progressPerCard),
                    totalCards - 1
                );

                // Play video when card 3 (index 2) is focused
                if (currentCardIndex === 2 && video) {
                    video.play().catch(err => console.log('Video play failed:', err));
                } else if (video) {
                    video.pause();
                }
            }
        }
    });

    // Set initial stacked states
    cards.forEach((card, index) => {
        const initialY = index * 24;
        const initialOpacity = 1 - (index * 0.35);

        gsap.set(card, {
            left: '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,
            y: initialY,
            x: 0,
            opacity: initialOpacity,
        });
    });

    // Pause video initially
    if (video) {
        video.pause();
    }

    // Animate cards with cascading property inheritance
    cards.forEach((card, index) => {
        // Phase 1: Current card fades in and expands
        tl.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            width: '100%',
            duration: 3,
            ease: 'none',
        });

        // Phase 2: Current card fades out AND all subsequent cards shift properties
        if (index < cards.length - 1) {
            // Fade out current card
            tl.to(card, {
                opacity: 0,
                y: -500,
                x: 0,
                duration: 1,
                ease: 'none',
            });

            // At the SAME TIME, animate ALL remaining cards to shift up one position
            for (let i = index + 1; i < cards.length; i++) {
                const targetCard = cards[i];
                const inheritedY = (i - index - 1) * 24;
                const inheritedOpacity = 1 - ((i - index - 1) * 0.35);

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
                    duration: 1,
                    x: 0,
                    ease: 'none',
                }, '<');
            }
        }
    });
});

