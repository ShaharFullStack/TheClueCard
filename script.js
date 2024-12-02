document.addEventListener('DOMContentLoaded', () => {
    const categories = ['suspect', 'toy', 'furniture', 'time'];
    const categorySelections = {
        suspect: [],
        toy: [],
        furniture: [],
        time: []
    };

    // Group items by category
    const categoryGroups = {};
    categories.forEach(category => {
        categoryGroups[category] = document.querySelectorAll(`.game-item[data-category="${category}"]`);
    });

    // Add click event to all game items
    categories.forEach(category => {
        categoryGroups[category].forEach(item => {
            item.addEventListener('click', () => {
                // Toggle selection
                item.classList.toggle('selected');

                // Update selections for this category
                const selections = categorySelections[category];
                const itemIndex = selections.indexOf(item);
                
                if (itemIndex > -1) {
                    // Remove if already selected
                    selections.splice(itemIndex, 1);
                } else {
                    // Add to selections
                    selections.push(item);
                }

                // Check if game can end
                checkGameEnd();
            });
        });
    });

    function checkGameEnd() {
        // Check if each category has only one item left unselected
        const categoryRemainingUnselected = categories.map(category => {
            const allItems = categoryGroups[category];
            const unselectedItems = [...allItems].filter(item => !item.classList.contains('selected'));
            return unselectedItems;
        });

        // Game ends when each category has exactly one unselected item
        const isGameOver = categoryRemainingUnselected.every(categoryItems => categoryItems.length === 1);

        if (isGameOver) {
            // Get the last unselected item from each category
            const solution = categories.map(category => {
                const unselectedItem = [...categoryGroups[category]].find(item => !item.classList.contains('selected'));
                return {
                    category: category,
                    name: unselectedItem.dataset.name || unselectedItem.dataset.time
                };
            });

            // Prepare alert message
            const message = `הפתרון:\n` + 
                `חשוד: ${solution.find(s => s.category === 'suspect').name}\n` +
                `צעצוע: ${solution.find(s => s.category === 'toy').name}\n` +
                `רהיט: ${solution.find(s => s.category === 'furniture').name}\n` +
                `זמן: ${solution.find(s => s.category === 'time').name}`;

            // Show solution
            alert(message);
        }
    }
});