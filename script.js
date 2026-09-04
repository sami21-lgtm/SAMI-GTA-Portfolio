// Real-time Clock Function
function updateClock() {
  const clockEl = document.getElementById('clock');
  if (!clockEl) return;

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  clockEl.innerText = `${hours}:${minutes}:${seconds}`;
}

// Tab Switching & Objective Text Sync
function switchTab(tabId, btnElement, locationName) {
  // Hide all contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  // Remove active state from all buttons
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab content
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // Activate button
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // Update top HUD location tag
  const locationTag = document.getElementById('location-tag');
  if (locationTag && locationName) {
    locationTag.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${locationName}`;
  }

  // Dynamic Objective Text
  const objText = document.getElementById('objective-text');
  if (objText) {
    const objectives = {
      'start': 'BUILD NEXT LEVEL DIGITAL EXPERIENCES',
      'about': 'DISCOVER DEVELOPER BACKGROUND',
      'skills': 'REVIEW UNLOCKED ABILITIES',
      'projects': 'INSPECT THE COMPLETED BUILDS',
      'experience': 'TRACE THE FULL CAREER PATH',
      'achievements': 'COLLECT EVERY UNLOCKED TROPHY',
      'academy': 'RECRUIT THE NEXT GENERATION',
      'contact': 'OPEN A SECURED LINE OF CONTACT'
    };
    objText.innerText = objectives[tabId] || 'EXPLORE VICE CITY';
  }
}

// Exit Game Trigger (Mission Complete Overlay)
function triggerExitGame() {
  const exitModal = document.getElementById('exit-modal');
  if (exitModal) {
    exitModal.classList.add('active');
  }
}

// Reset Back to Home
function resetGame() {
  const exitModal = document.getElementById('exit-modal');
  if (exitModal) {
    exitModal.classList.remove('active');
  }
  const startBtn = document.querySelector('.side-menu .menu-btn');
  switchTab('start', startBtn, 'VICE BEACH');
}

// Dynamic GitHub Avatar Fetch
async function loadGitHubAvatar() {
  try {
    const res = await fetch('https://api.github.com/users/sami21-lgtm');
    if (res.ok) {
      const data = await res.json();
      const imgEl = document.getElementById('avatar-img');
      if (imgEl && data.avatar_url) {
        imgEl.src = data.avatar_url;
      }
    }
  } catch (err) {
    console.log('GitHub API Load Fallback:', err);
  }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
  loadGitHubAvatar();
});
