document.addEventListener('DOMContentLoaded', () => {
    let colorLookup = {};

    // Load colors
    fetch('colors.json')
        .then(response => response.json())
        .then(data => {
            const colorContainer = document.getElementById('color-container');
            data.colors.forEach(color => {
                const card = createColorCard(color);
                colorContainer.appendChild(card);
                colorLookup[color.name] = color;
            });
            return fetch('pairs.json');
        })
        .then(response => response.json())
        .then(data => {
            const pairContainer = document.getElementById('pair-container');
            data.colorPairs.forEach((pairData, index) => {
                const card = createPairCard(index + 1, pairData.pair, colorLookup);
                pairContainer.appendChild(card);
            });
            return fetch('trios.json');
        })
        .then(response => response.json())
        .then(data => {
            const trioContainer = document.getElementById('trio-container');
            data.colorTrios.forEach((trioData, index) => {
                const card = createTrioCard(index + 1, trioData.trio, colorLookup);
                trioContainer.appendChild(card);
            });
            return fetch('quads.json');
        })
        .then(response => response.json())
        .then(data => {
            const quadContainer = document.getElementById('quad-container');
            data.colorQuads.forEach((quadData, index) => {
                const card = createQuadCard(index + 1, quadData.quad, colorLookup);
                quadContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading data:', error));
    // Tab functionality with persistence
    const tabs = document.querySelectorAll('.tabs a');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to set active tab
    function setActiveTab(tabId) {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        const activeTab = document.querySelector(`.tabs a[href="#${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        }
        
        localStorage.setItem('activeTab', tabId);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('href').substring(1);
            setActiveTab(targetId);
        });
    });

    // Check localStorage for saved tab on page load
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        setActiveTab(savedTab);
    } else {
        // If no saved tab, default to the first tab
        const firstTabId = tabs[0].getAttribute('href').substring(1);
        setActiveTab(firstTabId);
    }
});

function createColorCard(color) {
    const card = document.createElement('div');
    card.className = 'color-card';

    const colorSample = document.createElement('div');
    colorSample.className = 'color-sample';
    colorSample.style.backgroundColor = color.hex;

    const colorName = document.createElement('div');
    colorName.className = 'color-name';
    colorName.textContent = color.name;

    const colorInfo = document.createElement('div');
    colorInfo.className = 'color-info';
    colorInfo.innerHTML = `
        RGB: ${color.rgb}<br>
        Hex: ${color.hex}
    `;

    card.appendChild(colorSample);
    card.appendChild(colorName);
    card.appendChild(colorInfo);

    return card;
}

function createPairCard(index, colors, colorLookup) {
    const card = document.createElement('div');
    card.className = 'pair-card';

    const pairName = document.createElement('div');
    pairName.className = 'pair-name';
    pairName.textContent = `Combination ${index}`;
    card.appendChild(pairName);

    const pairContainer = document.createElement('div');
    pairContainer.className = 'pair-container';

    colors.forEach(colorName => {
        const colorInfo = colorLookup[colorName];
        if (colorInfo) {
            const colorHalf = document.createElement('div');
            colorHalf.className = 'color-half';

            const colorSample = document.createElement('div');
            colorSample.className = 'color-sample';
            colorSample.style.backgroundColor = colorInfo.hex;

            const colorName = document.createElement('div');
            colorName.className = 'color-name';
            colorName.textContent = colorInfo.name;

            const colorRgb = document.createElement('div');
            colorRgb.className = 'color-info';
            colorRgb.textContent = `RGB: ${colorInfo.rgb}`;

            colorHalf.appendChild(colorSample);
            colorHalf.appendChild(colorName);
            colorHalf.appendChild(colorRgb);

            pairContainer.appendChild(colorHalf);
        }
    });

    card.appendChild(pairContainer);
    return card;
}

function createTrioCard(index, colors, colorLookup) {
    const card = document.createElement('div');
    card.className = 'trio-card';

    const trioName = document.createElement('div');
    trioName.className = 'trio-name';
    trioName.textContent = `Combination ${index}`;
    card.appendChild(trioName);

    const trioContainer = document.createElement('div');
    trioContainer.className = 'trio-container';

    colors.forEach(colorName => {
        const colorInfo = colorLookup[colorName];
        if (colorInfo) {
            const colorThird = document.createElement('div');
            colorThird.className = 'color-third';

            const colorSample = document.createElement('div');
            colorSample.className = 'color-sample';
            colorSample.style.backgroundColor = colorInfo.hex;

            const colorName = document.createElement('div');
            colorName.className = 'color-name';
            colorName.textContent = colorInfo.name;

            const colorRgb = document.createElement('div');
            colorRgb.className = 'color-info';
            colorRgb.textContent = `RGB: ${colorInfo.rgb}`;

            colorThird.appendChild(colorSample);
            colorThird.appendChild(colorName);
            colorThird.appendChild(colorRgb);

            trioContainer.appendChild(colorThird);
        }
    });

    card.appendChild(trioContainer);
    return card;
}

function createQuadCard(index, colors, colorLookup) {
    const card = document.createElement('div');
    card.className = 'quad-card';

    const quadName = document.createElement('div');
    quadName.className = 'quad-name';
    quadName.textContent = `Combination ${index}`;
    card.appendChild(quadName);

    const quadContainer = document.createElement('div');
    quadContainer.className = 'quad-container';

    colors.forEach(colorName => {
        const colorInfo = colorLookup[colorName];
        if (colorInfo) {
            const colorQuarter = document.createElement('div');
            colorQuarter.className = 'color-quarter';

            const colorSample = document.createElement('div');
            colorSample.className = 'color-sample';
            colorSample.style.backgroundColor = colorInfo.hex;

            const colorName = document.createElement('div');
            colorName.className = 'color-name';
            colorName.textContent = colorInfo.name;

            const colorRgb = document.createElement('div');
            colorRgb.className = 'color-info';
            colorRgb.textContent = `RGB: ${colorInfo.rgb}`;

            colorQuarter.appendChild(colorSample);
            colorQuarter.appendChild(colorName);
            colorQuarter.appendChild(colorRgb);

            quadContainer.appendChild(colorQuarter);
        }
    });

    card.appendChild(quadContainer);
    return card;
}

