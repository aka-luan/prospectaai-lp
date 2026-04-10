export function createSlotMachineEffect(element: HTMLElement, duration: number = 1400, stagger: number = 80, initialDelay: number = 0) {
    const text = element.textContent?.trim() || '';
    element.textContent = '';
    
    text.split('').forEach((char, i) => {
        const wrapper = document.createElement('span');
        if (/[0-9]/.test(char)) {
            wrapper.style.display = 'inline-block';
            wrapper.style.overflow = 'hidden';
            wrapper.style.height = '1.2em';
            wrapper.style.lineHeight = '1.2em';
            wrapper.style.verticalAlign = 'bottom';
            
            const inner = document.createElement('span');
            inner.style.display = 'inline-flex';
            inner.style.flexDirection = 'column';
            inner.style.transition = `transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
            
            let colHTML = '';
            for(let d=0; d<=9; d++) { colHTML += `<span style="height: 1.2em">${d}</span>`; }
            colHTML += `<span style="height: 1.2em">${char}</span>`;
            inner.innerHTML = colHTML;
            
            inner.style.transform = `translateY(0)`; 
            wrapper.appendChild(inner);
            element.appendChild(wrapper);
            
            setTimeout(() => {
                inner.style.transform = `translateY(-${(10/11)*100}%)`;
            }, initialDelay + (stagger * i));
        } else {
            wrapper.textContent = char;
            if (char === ' ') wrapper.innerHTML = '&nbsp;';
            element.appendChild(wrapper);
        }
    });
}
