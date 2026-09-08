enum button {
    plus = 'plus',
    minus = 'minus',
}
const counterVal = document.getElementById('counter') as HTMLDivElement | null;
async function updateDisplay(): Promise<void> {
    if (counterVal) {
        const response = await fetch('http://localhost:3000/api/counter', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        const dataCount = await response.json();
        counterVal.textContent = String(dataCount.countPlus - dataCount.countMinus);
    }
}

async function sendChanges(pressedButton: button) {
    if (!counterVal) {
        return 'error';
    }
    const data = {
        button: pressedButton,
    }
    const response = await fetch('http://localhost:3000/api/counter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }
}
document.addEventListener('DOMContentLoaded', () => {

    const plusBtn = document.getElementById('plus') as HTMLButtonElement | null;
    const minusBtn = document.getElementById('minus') as HTMLButtonElement | null;

    plusBtn?.addEventListener('click', async () => {
        await sendChanges(button.plus);
        await updateDisplay();
        console.log('plus button');
    });

    minusBtn?.addEventListener('click', async () => {
        await sendChanges(button.minus);
        await updateDisplay();
        console.log('minus button pressed');
    })
});
 updateDisplay();