// REAL-TIME AUTO UPDATING HUD CLOCK (WITH SECONDS)
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // 12-hour format conversion
  hours = hours % 12;
  hours = hours ? hours : 12; 

  // Format single digits with leading zero
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  // Render continuous live ticking time
  const clockElement = document.getElementById('hud-clock');
  if (clockElement) {
    clockElement.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
  }
}

// Update clock every 1 second (1000 ms) automatically
setInterval(updateClock, 1000);
updateClock(); // Initial call

// GTA Menu Beep Sound Synthesizer (Web Audio API)
function playBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (e) {
    // Browser autoplay policy handling
  }
}

// Switch Tabs Navigation
function switchTab(tabId, element) {
  playBeep();

  // Update Buttons Highlight State
  const buttons = document.querySelectorAll('.menu-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  // Update Display Panel Content
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
}
