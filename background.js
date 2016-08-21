// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      urlsequence.init(request.urls, request.exam_url, sender.tab.id);
      urlsequence.open();
    }
  }
);

chrome.tabs.onUpdated.addListener(function(tabId , info) {
    if (urlsequence.needToClose(tabId) && info.status) {
    	urlsequence.close(tabId);
    }
});

var urlsequence = function(){
	var senderTabId;
	var tabsToClose = {};
	var urlsToOpen = [];
	var urlExam;
	var init = function(urls, url, tabId){
		senderTabId = tabId;
		urlExam = url;
		for (i = 0; i < urls.length; i++) { 
			console.log(urls[i]);
			urlsToOpen.push(urls[i]);
		}
	};
	var open = function(){
		url = urlsToOpen.shift();
		console.log("Opening: " + url + '('+urlsToOpen.length+')');
		if (url) {
			chrome.tabs.create({"url": url, "active": false}, function(tab) {
				chrome.tabs.sendMessage(senderTabId, {"message": "tab_href_opened", "url": url});
			    tabsToClose[tab.id] = 1;
			});
    	}
	};
	var close = function(tabId){
		delete tabsToClose[tabId];
		chrome.tabs.remove(tabId, function (){
			if (urlsToOpen.length == 0) {
				console.log('All DONE!');
				console.log('senderTabId:'+senderTabId+' urlExam:'+''+urlExam);
				chrome.tabs.update(senderTabId, {url: urlExam});
			} else {
				urlsequence.open();
			}
		});
	}
	var isEmpty = function(){
		return urlsToOpen.length == 0 && Object.keys(tabsToClose).length === 0 && tabsToClose.constructor === Object
	}
	var needToClose = function(tabId){
		if (tabsToClose[tabId]) {
			return true;
		};
		return false;
	}
   return{init:init, open:open, close:close, isEmpty:isEmpty, needToClose:needToClose}
}();

