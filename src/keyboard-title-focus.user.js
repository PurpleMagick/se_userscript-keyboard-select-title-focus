// ==UserScript==
// @name            Focus question title with keyboard selection
// @description     Focuses the title of a keyboard selected post. Allows for Ctrl+Click to open in new tab
// @author          VLAZ
// @grant           none
// @inject-into     page
// @match           https://stackoverflow.com/*
// @match           https://serverfault.com/*
// @match           https://superuser.com/*
// @match           https://*.stackexchange.com/*
// @match           https://askubuntu.com/*
// @match           https://stackapps.com/*
// @match           https://mathoverflow.net/*
// @match           https://pt.stackoverflow.com/*
// @match           https://ja.stackoverflow.com/*
// @match           https://ru.stackoverflow.com/*
// @match           https://es.stackoverflow.com/*
// @match           https://meta.stackoverflow.com/*
// @match           https://meta.serverfault.com/*
// @match           https://meta.superuser.com/*
// @match           https://meta.askubuntu.com/*
// @match           https://meta.mathoverflow.net/*
// @match           https://pt.meta.stackoverflow.com/*
// @match           https://ja.meta.stackoverflow.com/*
// @match           https://ru.meta.stackoverflow.com/*
// @match           https://es.meta.stackoverflow.com/*
// @match           https://stackoverflowteams.com/c/*
// @namespace       https://github.com/PurpleMagick/
// @run-at          document-end
// @version         1.0.0
// ==/UserScript==
(() => {
	"use strict";
	const findKeyboardSelectChange = mutation =>
		mutation.type === "attributes"
			&& mutation.attributeName === "class"
			&& mutation.target.classList.contains("keyboard-selected");

	const callback = (mutationList) => {
		const keyboardSelectedContainer = Array.prototype.find
			.call(mutationList, findKeyboardSelectChange)
			?.target;

		if (!keyboardSelectedContainer)
			return;

		keyboardSelectedContainer.querySelector("a.s-link, a.answer-hyperlink")?.focus();
	};

	const observer = new MutationObserver(callback);

	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ["class"],
		subtree: true
	});
})();
