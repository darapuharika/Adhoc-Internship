const CORRECT_PIN = "1234";

function verifyPin() {
    const pinInput = document.getElementById("pin-input").value;
    const errorMsg = document.getElementById("pin-error");

    if (pinInput === CORRECT_PIN) {
        document.getElementById("pin-screen").style.display = "none";
        document.getElementById("diary-screen").style.display = "block";
        document.getElementById("pin-input").value = "";
        errorMsg.innerText = "";
        displayEntries();
    } else {
        errorMsg.innerText = "❌ Incorrect PIN!";
    }
}

function lockDiary() {
    document.getElementById("diary-screen").style.display = "none";
    document.getElementById("pin-screen").style.display = "block";
}

function saveEntry() {
    const title = document.getElementById("note-title").value.trim();
    const content = document.getElementById("note-content").value.trim();

    if (!title || !content) { return alert("Please fill everything!"); }

    const newEntry = { title, content, date: new Date().toLocaleDateString() };
    let entries = JSON.parse(localStorage.getItem("diary_entries")) || [];
    entries.push(newEntry);
    localStorage.setItem("diary_entries", JSON.stringify(entries));

    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
    displayEntries();
}

function displayEntries() {
    const listDiv = document.getElementById("entries-list");
    let entries = JSON.parse(localStorage.getItem("diary_entries")) || [];
    listDiv.innerHTML = "";

    if (entries.length === 0) {
        listDiv.innerHTML = `<p style="color: #94a3b8; font-size: 14px;">Empty Diary.</p>`;
        return;
    }

    entries.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("diary-item");
        itemDiv.onclick = () => alert(`Title: ${item.title}\n\nContent:\n${item.content}`);
        itemDiv.innerHTML = `<h4>${item.title}</h4><small>${item.date}</small>`;
        listDiv.appendChild(itemDiv);
    });
}