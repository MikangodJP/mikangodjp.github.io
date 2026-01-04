document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('distance');
    const distanceVal = document.getElementById('distance-val');
    const energySavings = document.getElementById('energy-savings');
    const wattsSaved = document.getElementById('watts-saved');

    function calculateSavings(distance) {
        // Base logic: 30% savings at 150cm.
        // Simplified linear drop-off for demo purposes.
        // Assuming 0% savings at 1500cm (15m) for simplicity in this curve, 
        // though spec says 15% at 20m for vehicles. Let's make a custom curve for bikes.

        // Let's model: Max 35% at very close range (50cm), dropping to 0% at 500cm.
        // y = mx + c approximation

        let savings = 0;

        if (distance <= 50) {
            savings = 38;
        } else if (distance >= 500) {
            savings = 0;
        } else {
            // Linear interpolation between (50, 38) and (500, 0)
            // Slope m = (0 - 38) / (500 - 50) = -38 / 450 = -0.0844
            savings = 38 + (-0.0844 * (distance - 50));
        }

        // Clamp just in case
        savings = Math.max(0, Math.min(40, savings));

        return savings;
    }

    function updateDisplay() {
        const val = parseInt(slider.value);
        distanceVal.textContent = val;

        const percent = calculateSavings(val);
        energySavings.textContent = percent.toFixed(1) + '%';

        // Assume rider puts out 300W baseline. Savings is reduction in required power to maintain speed.
        const watts = 300 * (percent / 100);
        wattsSaved.textContent = Math.round(watts) + 'W';
    }

    slider.addEventListener('input', updateDisplay);

    // Initialize
    updateDisplay();
});
