export function initTransitions() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const charsPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    
    // Check if we are arriving from a transition
    if (sessionStorage.getItem('transition-wipe') === 'true') {
        sessionStorage.removeItem('transition-wipe');
        
        // Run reverse wipe
        const wipeLayer = createWipeLayer();
        document.body.appendChild(wipeLayer);
        
        const cols = document.querySelectorAll('.wipe-col');
        
        // Initially they are fully visible
        cols.forEach((c) => {
            (c as HTMLElement).style.opacity = '1';
        });
        
        // Reverse wipe
        setTimeout(() => {
            cols.forEach((c, i) => {
                const el = c as HTMLElement;
                setTimeout(() => {
                    el.style.opacity = '0';
                }, i * 60);
            });
            
            setTimeout(() => {
                wipeLayer.remove();
            }, (cols.length * 60) + 200); // Wait for last plus transition
        }, 50);
    }

    document.querySelectorAll('a[data-transition]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const href = anchor.getAttribute('href');
            if (!href) return;
            
            const wipeLayer = createWipeLayer();
            document.body.appendChild(wipeLayer);
            
            const cols = document.querySelectorAll('.wipe-col');
            cols.forEach((c, i) => {
                const el = c as HTMLElement;
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, i * 60);
            });
            
            setTimeout(() => {
                sessionStorage.setItem('transition-wipe', 'true');
                window.location.href = href;
            }, (cols.length * 60) + 200);
        });
    });

    function createWipeLayer() {
        const wipeLayer = document.createElement('div');
        wipeLayer.className = 'transition-wipe fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none flex';
        
        for (let i = 0; i < 5; i++) {
            const col = document.createElement('div');
            col.className = 'wipe-col w-[20vw] h-full bg-black dm-mono text-primary flex flex-wrap overflow-hidden opacity-0 transition-opacity duration-200 break-all p-2';
            col.style.fontSize = '12px';
            col.style.lineHeight = '12px';
            
            // Fill with random characters
            let content = '';
            for (let j = 0; j < 1000; j++) {
                content += charsPool[Math.floor(Math.random() * charsPool.length)];
            }
            col.textContent = content;
            
            wipeLayer.appendChild(col);
        }
        return wipeLayer;
    }
}
