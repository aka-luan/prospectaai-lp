import Lenis from '@studio-freight/lenis';

export function initLenis() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const lenis = new Lenis({
        duration: reducedMotion ? 0 : 1.4,
        easing: function(t: number) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        lerp: 0.08,
        smoothWheel: true, 
    });

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return lenis;
}
