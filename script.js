document.addEventListener('DOMContentLoaded',()=>{
    fetch('colors.json')
        .then(response => response.json())
        .then(data=>{
            const colorContainer = document.getElementById('color-container');
            data.colors.forEach(color=>{
                const card = createColorCard(color);
                colorContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading colors:', error));
})

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