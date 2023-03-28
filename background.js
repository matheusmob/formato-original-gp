chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});


// Comeco da extensao
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith('https://globoplay.globo.com/')) {
    // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {

      const novo = `
        #c32 {
          position: absolute;
          height: 100%;
          width: 75%;
          display: block;
          top: 50%;
          left: 50%;
          /* margin-right: 50%; */
          object-fit: fill;
          transform: translate(-50%, -50%);
  }
`;

      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        css: novo
      });
    } else if (nextState === 'OFF') {

      const original = `
        #c32 {
          position: absolute;
          height: 100%;
          width: 100%;
          display: block; }
  }
`;
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id, allFrames: true },
        css : original,
      });
    }
  }
});
