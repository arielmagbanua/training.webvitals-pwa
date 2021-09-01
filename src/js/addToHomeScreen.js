let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;

  // show add to homescreen button in mobile
  const installButton = document.getElementById('btn-install');
  installButton.classList.remove('d-none');

  installButton.addEventListener('click', () => {
    // Show the modal add to home screen dialog
    installPromptEvent.prompt();

    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        // hide the button
        installButton.classList.add('d-none');
        installButton.style.display = 'none';
      }

      // Clear the saved prompt since it can't be used again
      installPromptEvent = null;
    });
  });
});
