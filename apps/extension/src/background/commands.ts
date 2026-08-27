export function setupCommandListeners(): void {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-focus') {
      console.log('[Commands] Toggle focus command triggered (Ctrl+Shift+F)');
    }
  });
}
