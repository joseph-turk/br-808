(function() {
  // Play sounds from keyboard
  function keyPlay(e) {
    const pad = document.querySelector(`div[data-key="${e.keyCode}"]`);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    
    if (!pad || !audio) return; // Make sure getting pad and audio was successful

    pad.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  // Play sounds by clicking pads
  function clickPlay(e) {
    const dataKey = this.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    
    if (!audio) return; // Make sure getting audio was successful

    this.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  // Return pad to normal state after playing
  function stopPlaying(e) {
    if (e.propertyName !== 'transform') return; // Wait for the transform transition
    this.classList.remove('playing');
  }

  // Hide the pads for switching to sequencer view
  function hidePads() {
    if (padView.classList.contains('hidden')) return; // Check that pads aren't already hidden
    padView.classList.add('hidden');
    sequencerView.classList.remove('hidden');
  }

  // Hide the sequencer for switching to pads view
  function hideSequencer() {
    if (sequencerView.classList.contains('hidden')) return; // Check that sequencer isn't already hidden
    sequencerView.classList.add('hidden');
    padView.classList.remove('hidden');
  }

  // Open the About modal
  function showAbout() {
    if (!aboutView.classList.contains('hidden')) return;
    aboutView.classList.remove('hidden');
  }

  // Close the About modal
  function hideAbout() {
    if (aboutView.classList.contains('hidden')) return;
    aboutView.classList.add('hidden');
  }

  // Set interface constants
  const pads = Array.from(document.querySelectorAll('.pad'));
  const padView = document.getElementById('pad-view');
  const sequencerView = document.getElementById('sequencer-view');
  const sequencerButton = document.getElementById('select-sequencer');
  const padButton = document.getElementById('select-pads');
  const aboutButton = document.getElementById('show-about');
  const aboutView = document.getElementById('about');
  const closeButton = document.getElementById('close-about');

  // Add listeners
  window.addEventListener('keydown', keyPlay);
  sequencerButton.addEventListener('click', hidePads);
  padButton.addEventListener('click', hideSequencer);
  aboutButton.addEventListener('click', showAbout);
  closeButton.addEventListener('click', hideAbout);
  pads.forEach(pad => { 
    pad.addEventListener('transitionend', stopPlaying);
    pad.addEventListener('click', clickPlay);
  });
})();
