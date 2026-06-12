// Tab Switching Logic
function switchTab(e, tabId) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    e.target.classList.add('active');
    if(tabId === 'currency') runCurrency();
}

// Swap Button Logic
function swapUnits(fromId, toId, callback) {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    const temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;
    callback();
}

// Length Conversion Logic
function runLength() {
    const val = parseFloat(document.getElementById('len-val').value) || 0;
    const from = document.getElementById('len-from').value;
    const to = document.getElementById('len-to').value;
    let meters = val;
    
    if (from === 'km') meters = val * 1000;
    if (from === 'mi') meters = val * 1609.34;

    let res = meters;
    if (to === 'km') res = meters / 1000;
    if (to === 'mi') res = meters / 1609.34;

    document.getElementById('len-out').innerText = `${val} ${from} = ${res.toFixed(4)} ${to}`;
}

// Live Currency Conversion Logic using Fetch API
async function runCurrency() {
    const val = parseFloat(document.getElementById('cur-val').value) || 0;
    const from = document.getElementById('cur-from').value;
    const to = document.getElementById('cur-to').value;
    const out = document.getElementById('cur-out');

    if(from === to) { out.innerText = `${val} ${from} = ${val} ${to}`; return; }
    out.innerText = "Fetching Rates...";

    try {
        // Fetching live data from free API
        const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await res.json();
        if(data.result === "success") {
            const rate = data.rates[to];
            out.innerText = `${val} ${from} = ${(val * rate).toFixed(2)} ${to}`;
        } else { out.innerText = "API Error."; }
    } catch { out.innerText = "Network Error."; }
}

// Temperature Conversion Logic
function runTemp() {
    const val = parseFloat(document.getElementById('temp-val').value) || 0;
    const from = document.getElementById('temp-from').value;
    const to = document.getElementById('temp-to').value;
    let res;

    if(from === to) { res = val; }
    else if(from === 'C' && to === 'F') { res = (val * 9/5) + 32; }
    else { res = (val - 32) * 5/9; }

    document.getElementById('temp-out').innerText = `${val} °${from} = ${res.toFixed(2)} °${to}`;
}
