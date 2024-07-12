document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.grid-container');
    const tileSize = 32;
    const padding = 16;

    // Calculate the number of rows and columns to fit within the viewport with padding
    const numRows = Math.floor((window.innerHeight - 2 * padding) / tileSize);
    const numCols = Math.floor((window.innerWidth - 2 * padding) / tileSize);

    // Set the width and height of the grid container based on the number of rows and columns
    container.style.width = `${numCols * tileSize}px`;
    container.style.height = `${numRows * tileSize}px`;

    // Create and append tiles to the grid
    for (let i = 0; i < numRows * numCols; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        container.appendChild(tile);
    }

    // Add series of animations to the bottom-right tile
    const lastTile = container.lastElementChild;
    if (lastTile) {
        lastTile.classList.add('bottom-right');
        lastTile.addEventListener('click', function() {
            window.location.href = 'https://sandwichswap.io/';
        });
        
        setTimeout(() => {
            lastTile.classList.add('flash');
        }, 3000);
        
        setTimeout(() => {
            lastTile.classList.remove('flash');
            lastTile.classList.add('vibrate');
        }, 5000);

        setTimeout(() => {
            lastTile.classList.remove('vibrate');
            lastTile.classList.add('intense-vibrate');
        }, 7000);

        setTimeout(() => {
            lastTile.classList.remove('intense-vibrate');
            lastTile.classList.add('intense-vibrate-glow');
        }, 9000);
    }

    // Select all tiles except the bottom-right one
    const tiles = document.querySelectorAll('.tile:not(.bottom-right)');

    // Add click event and hover effect to all tiles except the bottom-right one
    tiles.forEach(tile => {
        tile.classList.add('link');
        tile.addEventListener('click', function() {
            window.location.href = 'https://shitmos.wtf/';
        });
    });

    // Function to calculate the distance between the cursor and the top-left tile
    function calculateDistance(tile, mouseX, mouseY) {
        const tileRect = tile.getBoundingClientRect();
        const tileCenterX = tileRect.left + tileRect.width / 2;
        const tileCenterY = tileRect.top + tileRect.height / 2;
        return Math.sqrt(Math.pow(tileCenterX - mouseX, 2) + Math.pow(tileCenterY - mouseY, 2));
    }

    // Event listener to detect cursor movement and update tile rotation and morphing effect
    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const topLeftTile = container.firstElementChild;
        const distance = calculateDistance(topLeftTile, mouseX, mouseY);
        const maxDistance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
        const morphFactor = Math.min(distance / maxDistance, 1);

        // Adjust the morphing effect based on the distance
        topLeftTile.style.setProperty('--morph-factor', 1 - morphFactor);

        // Function to calculate if a tile is within a 3x3 grid around the cursor
        function withinThreeByThreeGrid(tile, mouseX, mouseY) {
            const tileRect = tile.getBoundingClientRect();
            const tileCenterX = tileRect.left + tileRect.width / 2;
            const tileCenterY = tileRect.top + tileRect.height / 2;
            const withinX = Math.abs(tileCenterX - mouseX) <= tileSize * 1.5;
            const withinY = Math.abs(tileCenterY - mouseY) <= tileSize * 1.5;
            return withinX && withinY;
        }

        tiles.forEach(tile => {
            if (withinThreeByThreeGrid(tile, mouseX, mouseY)) {
                const tileRect = tile.getBoundingClientRect();
                const angle = Math.atan2(mouseY - tileRect.top - tileRect.height / 2, mouseX - tileRect.left - tileRect.width / 2) * (180 / Math.PI) + 45;
                tile.style.animation = 'none'; // Disable rotation animation
                tile.style.transition = 'transform 0.5s ease-in-out'; // Add smooth transition
                tile.style.transform = `rotate(${angle}deg)`; // Point towards the cursor with emphasis on top-left
            } else {
                tile.style.animation = ''; // Re-enable rotation animation
                tile.style.transition = 'transform 0.5s ease-in-out'; // Add smooth transition
                tile.style.transform = ''; // Reset rotation
            }
        });
    });
});