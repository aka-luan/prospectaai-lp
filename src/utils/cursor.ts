export function initCursor() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    document.body.style.cursor = 'none';
    
    const cursorLayer = document.createElement('div');
    cursorLayer.id = 'cursor-layer';
    cursorLayer.style.position = 'fixed';
    cursorLayer.style.top = '0';
    cursorLayer.style.left = '0';
    cursorLayer.style.width = '100vw';
    cursorLayer.style.height = '100vh';
    cursorLayer.style.pointerEvents = 'none';
    cursorLayer.style.zIndex = '9999';
    document.body.appendChild(cursorLayer);

    const crosshair = document.createElement('div');
    crosshair.style.position = 'absolute';
    crosshair.style.width = '10px';
    crosshair.style.height = '10px';
    crosshair.style.pointerEvents = 'none';
    crosshair.innerHTML = `
        <div style="position: absolute; top: 4.5px; left: 0; width: 10px; height: 1px; background: #00FF87;"></div>
        <div style="position: absolute; top: 0; left: 4.5px; width: 1px; height: 10px; background: #00FF87;"></div>
    `;
    cursorLayer.appendChild(crosshair);

    const dataPool = ["recife·pa", "sem-site", "restaurante", "lead#4821", "maps·scrape", "124-b-sp", "outdated"];
    let lastSpawnTime = 0;
    
    const activeFragments = new Set();
    
    document.addEventListener('mousemove', (e) => {
        crosshair.style.left = `${e.clientX - 5}px`;
        crosshair.style.top = `${e.clientY - 5}px`;

        const now = performance.now();
        if (now - lastSpawnTime > 120 && activeFragments.size < 6) {
            lastSpawnTime = now;
            
            const text = dataPool[Math.floor(Math.random() * dataPool.length)];
            const fragment = document.createElement('div');
            fragment.className = 'dm-mono text-[10px] text-secondary absolute whitespace-nowrap';
            fragment.textContent = text;
            fragment.style.left = `${e.clientX + 10}px`;
            fragment.style.top = `${e.clientY + 10}px`;
            fragment.style.opacity = '1';
            fragment.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
            fragment.style.transform = 'translateY(0)';
            
            cursorLayer.appendChild(fragment);
            activeFragments.add(fragment);
            
            void fragment.offsetWidth;
            
            fragment.style.opacity = '0';
            fragment.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                fragment.remove();
                activeFragments.delete(fragment);
            }, 600);
        }
    });

    document.querySelectorAll('button, a, [data-transition], .faq-header').forEach(el => {
        el.addEventListener('mouseenter', () => {
            crosshair.style.transform = 'scale(1.5)';
            crosshair.style.transition = 'transform 0.2s';
        });
        el.addEventListener('mouseleave', () => {
            crosshair.style.transform = 'scale(1)';
        });
    });
}
