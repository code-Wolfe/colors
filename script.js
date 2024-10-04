
let allCombinations = {
    pairs: [],
    trios: [],     
    quads: []
};
let colorLookup = {};


document.addEventListener('DOMContentLoaded', () => {
    

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
            allCombinations.pairs = data.colorPairs;
            const pairContainer = document.getElementById('pair-container');
            data.colorPairs.forEach((pairData, index) => {
                const card = createPairCard(index + 1, pairData.pair, colorLookup);
                pairContainer.appendChild(card);
            });
            return fetch('trios.json');
        })
        .then(response => response.json())
        .then(data => {
            allCombinations.trios = data.colorTrios;
            const trioContainer = document.getElementById('trio-container');
            data.colorTrios.forEach((trioData, index) => {
                const card = createTrioCard(index + 1, trioData.trio, colorLookup);
                trioContainer.appendChild(card);
            });
            return fetch('quads.json');
        })
        .then(response => response.json())
        .then(data => {
            allCombinations.quads = data.colorQuads;
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

    // Modal functionality
    const modal = document.getElementById('combination-modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
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

    card.addEventListener('click', () => showCombinations(color.name));

    return card;
}

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

    card.addEventListener('click', () => showCombinations(color.name));

    return card;
}

function createPairCard(index, colors, colorLookup) {
    const card = document.createElement('div');
    card.className = 'pair-card';

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

function showCombinations(colorName) {
    const modal = document.getElementById('combination-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCombinations = document.getElementById('modal-combinations');

    modalTitle.textContent = `Combinations including ${colorName}`;
    modalCombinations.innerHTML = '';

    const pairs = allCombinations.pairs.filter(pair => pair.pair.includes(colorName));
    const trios = allCombinations.trios.filter(trio => trio.trio.includes(colorName));
    const quads = allCombinations.quads.filter(quad => quad.quad.includes(colorName));

    if (pairs.length > 0) {
        const pairsSection = document.createElement('div');
        pairsSection.innerHTML = '<h3>Pairs</h3>';
        pairs.forEach(pair => {
            pairsSection.appendChild(createPairCard(null, pair.pair, colorLookup));
        });
        modalCombinations.appendChild(pairsSection);
    }

    if (trios.length > 0) {
        const triosSection = document.createElement('div');
        triosSection.innerHTML = '<h3>Trios</h3>';
        trios.forEach(trio => {
            triosSection.appendChild(createTrioCard(null, trio.trio, colorLookup));
        });
        modalCombinations.appendChild(triosSection);
    }

    if (quads.length > 0) {
        const quadsSection = document.createElement('div');
        quadsSection.innerHTML = '<h3>Quads</h3>';
        quads.forEach(quad => {
            quadsSection.appendChild(createQuadCard(null, quad.quad, colorLookup));
        });
        modalCombinations.appendChild(quadsSection);
    }

    modal.style.display = "block";
}