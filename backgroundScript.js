chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ size: { width: 40, height: 90 } })
})

chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId)
  const isPlurk = tab.url.indexOf('www.plurk.')
  isPlurk > 0
    ? chrome.action.enable(tab.tabId)
    : chrome.action.disable(tab.tabId)
})
