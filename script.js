// Continuous Live Clock Function (Updates every second)
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return;

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Format 12-hour clock
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  // Add leading zeros (e.g. 09 instead of 9)
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Render format: HH:MM:SS AM/PM
  clockElement.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Tab Switch Function
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

// GitHub Username
const username = 'sami21-lgtm';

async function fetchGitHubData() {
  try {
    // Fetch User Profile Info
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.ok) {
      const userData = await userRes.json();

      const nameEl = document.getElementById('user-name');
      const bioEl = document.getElementById('user-bio');
      const avatarEl = document.getElementById('user-avatar');
      const repoCountEl = document.getElementById('repo-count');

      if (nameEl && userData.name) nameEl.innerText = `${userData.name} (${userData.login})`;
      if (bioEl && userData.bio) bioEl.innerText = userData.bio;
      if (avatarEl && userData.avatar_url) avatarEl.src = userData.avatar_url;
      if (repoCountEl && userData.public_repos !== undefined) repoCountEl.innerText = userData.public_repos;
    }

    // Fetch Public Repositories
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    const projectsContainer = document.getElementById('projects-container');

    if (repoRes.ok && projectsContainer) {
      const repos = await repoRes.json();
      projectsContainer.innerHTML = '';

      if (repos.length === 0) {
        projectsContainer.innerHTML = '<p style="color:#aaa;">No public repositories found.</p>';
        return;
      }

      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3><i class="fa-solid fa-code-fork"></i> ${repo.name}</h3>
          <p>${repo.description ? repo.description : 'No description available for this project.'}</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:var(--gta-yellow);"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
            <a href="${repo.html_url}" target="_blank" style="color:var(--neon-cyan); text-decoration:none; font-weight:bold; font-size:13px;">VIEW CODE &rarr;</a>
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    } else if (projectsContainer) {
      projectsContainer.innerHTML = '<p style="color:#ff2a8d;">Unable to load GitHub projects automatically.</p>';
    }
  } catch (error) {
    console.error('Error fetching GitHub API:', error);
  }
}

// Initialize continuous execution when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateClock(); // Initial call immediately
  setInterval(updateClock, 1000); // Continuous tick every 1000ms (1 second)
  fetchGitHubData();
});
