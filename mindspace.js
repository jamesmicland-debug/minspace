function login() {
    const name = document.getElementById('username').value.trim();
    const avatarFile = document.getElementById('avatarUpload').files[0];
    if (!name) return;
  
    localStorage.setItem("mindspaceUser", name);
  
    if (avatarFile) {
      const reader = new FileReader();
      reader.onload = function () {
        localStorage.setItem("mindspaceAvatar", reader.result);
        showDiary(name, reader.result);
      };
      reader.readAsDataURL(avatarFile);
    } else {
      showDiary(name, localStorage.getItem("mindspaceAvatar"));
    }
  }
  
  function showDiary(name, avatarSrc) {
    document.getElementById('loginScreen').style.display = "none";
    document.getElementById('diaryScreen').style.display = "block";
    document.getElementById('welcomeMessage').innerText = `Welcome back, ${name}`;
    if (avatarSrc) document.getElementById('avatar').src = avatarSrc;
    displayEntries();
  }
  
  function logout() {
    localStorage.removeItem("mindspaceUser");
    document.getElementById('diaryScreen').style.display = "none";
    document.getElementById('loginScreen').style.display = "block";
  }
  
  function toggleTheme() {
    document.body.classList.toggle("light-mode");
  }
  
  function saveEntry() {
    const mood = document.getElementById('mood').value;
    const entry = document.getElementById('entry').value.trim();
    const readLater = document.getElementById('readLater').checked;
    const confirmation = document.getElementById('confirmation');
  
    if (!entry) {
      confirmation.innerText = "Please write something before saving.";
      confirmation.style.color = "red";
      return;
    }
  
    const timestamp = new Date().toLocaleString();
    const diaryEntry = { mood, text: entry, time: timestamp, readLater };
  
    let entries = JSON.parse(localStorage.getItem("mindspaceEntries")) || [];
    entries.push(diaryEntry);
    localStorage.setItem("mindspaceEntries", JSON.stringify(entries));
  
    confirmation.innerText = `Entry saved at ${timestamp} with mood: ${mood}`;
    confirmation.style.color = "lightgreen";
    document.getElementById('entry').value = "";
    document.getElementById('readLater').checked = false;
  
    displayEntries();
  }
  
  function displayEntries() {
    const entries = JSON.parse(localStorage.getItem("mindspaceEntries")) || [];
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const entriesDiv = document.getElementById("entries");
    entriesDiv.innerHTML = "";
  
    entries.reverse().forEach((entry, index) => {
      if (
        entry.text.toLowerCase().includes(searchTerm) ||
        entry.mood.toLowerCase().includes(searchTerm)
      ) {
        const entryBox = document.createElement("div");
        entryBox.className = "entry-box";
        entryBox.innerHTML = `
          <p><strong>${entry.time}</strong> – Mood: ${entry.mood}</p>
          <p>${entry.text}</p>
          ${entry.readLater ? '<p style="color: gold;">Marked to read later</p>' : ''}
          <button onclick="deleteEntry(${entries.length - 1 - index})">Delete</button>
          <hr>
        `;
        entriesDiv.appendChild(entryBox);
      }
    });
  }
  
  function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("mindspaceEntries")) || [];
    entries.splice(index, 1);
    localStorage}