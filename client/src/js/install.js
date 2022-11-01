const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add  event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Click event hanlder for the 'butInstall' element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Handle for when the application is 'appinstalled'
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    console.log('the app has been installed!');
});
