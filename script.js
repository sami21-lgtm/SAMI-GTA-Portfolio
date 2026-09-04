// REAL-TIME ACCURATE CLOCK (AUTO UPDATING EVERY 1 SECOND)
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
  const hh = hours < 10 ? '0' + hours : hours;
  const mm = minutes < 10 ? '0' + minutes : minutes;
  const ss = seconds < 10 ? '0' + seconds : seconds;

  // Render to DOM
  const clockElement = document.getElementById('hud-clock');
  if (clockElement) {
    clockElement.innerText = `${hh}:${mm}:${ss} ${ampm}`;
  }
}

// 1000ms (1 second) interval for live updating
setInterval(updateClock, 1000);
updateClock();

// GTA MENU BEEP SOUND SYNTHESIZER
function playBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, audioCtx.currentTime + 0.07);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.07);
  } catch (e) {
    // Autoplay restrictions handle
  }
}

// MENU TAB SWITCHING
function switchTab(tabId, element) {
  playBeep();

  // Highlight selected menu item
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  // Display active content panel
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) {
    target.classList.add('active');
  }
}
