// Live Continuous Clock Function (HH:MM:SS AM/PM)
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return;

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  clockElement.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Tab Switcher
function switchTab(tabId, element) {
  document.querySelectorAll('.content-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  if (element) {
    element.classList.add('active');
  }
}

// GitHub Username Sync
const username = 'sami21-lgtm';

async function fetchGitHubData() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.ok) {
      const userData = await userRes.json();

      const avatarEl = document.getElementById('user-avatar');
      const repoCountEl = document.getElementById('repo-count');

      if (avatarEl && userData.avatar_url) avatarEl.src = userData.avatar_url;
      if (repoCountEl && userData.public_repos !== undefined) repoCountEl.innerText = `${userData.public_repos} REPOS`;
    }
  } catch (error) {
    console.error('Error fetching GitHub API:', error);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000); // Continuous live tick every second
  fetchGitHubData();
});
