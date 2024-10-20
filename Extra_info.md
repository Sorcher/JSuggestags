


> [!TIP]
> Here is a list of the function names and a short description of the functions.


- - -

1.  **constructor(selector)**

    
    ```/**  * Initializes the jstagsSuggestags instance with default settings and properties.  * @param {string|HTMLElement} selector - The input element or selector for which the plugin is initialized.  */ constructor(selector) { ... }```
    
2.  **\_settings(settings)**

    
    ```/**  * Merges user-defined settings with the default settings.  * @param {Object} settings - The settings provided by the user.  */ _settings(settings) { ... }```
    
3.  **\_setMethod(method)**

    
    ```/**  * Sets the method for the plugin (e.g., 'refresh', 'destroy').  * @param {string} method - The method to set.  */ _setMethod(method) { ... }```
    
4.  **\_init()**

    
    ```/**  * Initializes the plugin by creating HTML structure, setting up events, and loading default tags.  */ _init() { ... }```
    
5.  **checkMethod()**

    
    ```/**  * Checks if the plugin should proceed based on the method set (e.g., 'destroy' will stop initialization).  * @returns {boolean} - Returns true if initialization should proceed.  */ checkMethod() { ... }```
    
6.  **createHTML()**

    
    ```/**  * Creates the necessary HTML elements for the plugin, including tags area, input area, and suggestions list.  */ createHTML() { ... }```
    
7.  **setEvents()**

    
    ```/**  * Sets up all the event listeners required for the plugin.  */ setEvents() { ... }```
    
8.  **setTagEvents()**

    
    ```/**  * Sets up event listeners related to the tag input field, such as focus, blur, keyup, and click events.  */ setTagEvents() { ... }```
    
9.  **setSuggestionsEvents()**

    
    ```/**  * Sets up event listeners for the suggestion items in the suggestions list.  */ setSuggestionsEvents() { ... }```
    
10.  **setRemoveEvent()**

    
    ```/**  * Sets up the event listener for removing tags when the remove icon is clicked.  */ setRemoveEvent() { ... }```
    
11.  **fixCSS()**

    
    ```/**  * Adjusts CSS classes and styles based on the plugin type (e.g., 'bootstrap', 'materialize').  */ fixCSS() { ... }```
    
12.  **setDefault()**

    
    ```/**  * Loads default tags from the input value if any are present.  */ setDefault() { ... }```
    
13.  **updateIsRequired()**

    
    ```/**  * Updates the 'required' attribute of the input based on whether tags are present.  */ updateIsRequired() { ... }```
    
14.  **setInputValue()**

    
    ```/**  * Updates the original input's value with the current list of tag names.  */ setInputValue() { ... }```
    
15.  **processWhiteList(keycode, value)**

    
    ```/**  * Processes the whitelist suggestions based on user input and key events.  * @param {number} keycode - The keycode of the pressed key.  * @param {string} value - The current value of the input field.  */ processWhiteList(keycode, value) { ... }```
    
16.  **suggestWhiteList(value, keycode, showAll = false)**

    
    ```/**  * Filters and displays suggestions based on user input and whether to show all suggestions.  * @param {string} value - The current value of the input field.  * @param {number} keycode - The keycode of the pressed key.  * @param {boolean} showAll - Whether to show all suggestions.  */ suggestWhiteList(value, keycode, showAll = false) { ... }```
    
17.  **processAjaxSuggestion(value, keycode)**

    
    ```/**  * Handles fetching suggestions from an Ajax request based on user input.  * @param {string} value - The current value of the input field.  * @param {number} keycode - The keycode of the pressed key.  */ processAjaxSuggestion(value, keycode) { ... }```
    
18.  **getActionURL(urlString)**

    
    ```/**  * Constructs the full URL for Ajax requests, handling relative and absolute URLs.  * @param {string} urlString - The URL string provided in settings.  * @returns {string} - The full URL for the Ajax request.  */ getActionURL(urlString) { ... }```
    
19.  **isAbsoluteURL(urlString)**

    
    ```/**  * Checks if a given URL is an absolute URL.  * @param {string} urlString - The URL string to check.  * @returns {boolean} - True if the URL is absolute.  */ isAbsoluteURL(urlString) { ... }```
    
20.  **upDownSuggestion(value, type)**

    
    ```/**  * Navigates through the suggestions list using up and down arrow keys.  * @param {string} value - The current value of the input field.  * @param {string} type - The direction ('up' or 'down') to navigate.  */ upDownSuggestion(value, type) { ... }```
    
21.  **getTag(value)**

    
    ```/**  * Retrieves the display tag corresponding to a value from the suggestions list.  * @param {string} value - The value for which to get the tag.  * @returns {string} - The tag associated with the value.  */ getTag(value) { ... }```
    
22.  **getValue(tag)**

    
    ```/**  * Retrieves the value corresponding to a display tag from the suggestions list.  * @param {string} tag - The tag for which to get the value.  * @returns {string} - The value associated with the tag.  */ getValue(tag) { ... }```
    
23.  **addTag(value, animate = true)**

    
    ```/**  * Adds a new tag to the tags area and updates the input value.  * @param {string} value - The value of the tag to add.  * @param {boolean} animate - Whether to animate the addition of the tag.  */ addTag(value, animate = true) { ... }```
    
24.  **getItemKey(value)**

    
    ```/**  * Retrieves the index/key of a value in the suggestions list.  * @param {string} value - The value to search for.  * @returns {number} - The index of the value in the suggestions array or -1 if not found.  */ getItemKey(value) { ... }```
    
25.  **isPresent(value)**

    
    ```/**  * Checks if a tag value is already present in the current tags.  * @param {string} value - The value to check.  * @returns {boolean} - True if the value is present.  */ isPresent(value) { ... }```
    
26.  **customStylings(item, key)**

    
    ```/**  * Applies custom styling to a tag item based on classes, backgrounds, or colors from settings.  * @param {HTMLElement} item - The tag element to style.  * @param {number} key - The index/key corresponding to the tag in the suggestions list.  */ customStylings(item, key) { ... }```
    
27.  **removeTag(value, animate = true)**

    
    ```/**  * Removes a tag from the tags area by its value.  * @param {string} value - The value of the tag to remove.  * @param {boolean} animate - Whether to animate the removal of the tag.  */ removeTag(value, animate = true) { ... }```
    
28.  **removeTagByItem(item, animate)**

    
    ```/**  * Removes a tag from the tags area by its HTML element.  * @param {HTMLElement} item - The tag element to remove.  * @param {boolean} animate - Whether to animate the removal of the tag.  */ removeTagByItem(item, animate) { ... }```
    
29.  **animateRemove(item, animate)**

    
    ```/**  * Animates the removal of a tag element.  * @param {HTMLElement} item - The tag element to remove.  * @param {boolean} animate - Whether to animate the removal.  */ animateRemove(item, animate) { ... }```
    
30.  **flashItem(value, itemKey)**

    
    ```/**  * Highlights a tag to indicate it already exists or is invalid.  * @param {string} value - The value of the tag to flash.  * @param {number} itemKey - The index/key corresponding to the tag in the suggestions list.  */ flashItem(value, itemKey) { ... }```
    
31.  **setIcon()**

    
    ```/**  * Sets the HTML for the remove icon on each tag.  * @returns {string} - The HTML string for the remove icon.  */ setIcon() { ... }```
    
32.  **createList()**

    
    ```/**  * Creates the HTML list of suggestions based on the suggestions array.  * @returns {string} - The HTML string for the suggestions list.  */ createList() { ... }```
    
33.  **unique(list)**

    
    ```/**  * Removes duplicate items from a list.  * @param {Array} list - The array to make unique.  * @returns {Array} - The array with duplicates removed.  */ unique(list) { ... }```
    
34.  **objectInArray(element, result)**

    
    ```/**  * Checks if an object with a specific value exists in an array.  * @param {Object} element - The object to search for.  * @param {Array} result - The array to search within.  * @returns {boolean} - True if the object is found.  */ objectInArray(element, result) { ... }```
    
35.  **isSimilarText(str1, str2, perc)**

    
    ```/**  * Checks if two strings are similar based on a percentage threshold.  * @param {string} str1 - The first string.  * @param {string} str2 - The second string.  * @param {number} perc - The percentage threshold for similarity.  * @returns {boolean} - True if the strings are similar beyond the threshold.  */ isSimilarText(str1, str2, perc) { ... }```
    
36.  **similarity(s1, s2)**

    
    ```/**  * Calculates the similarity between two strings using the Levenshtein distance.  * @param {string} s1 - The first string.  * @param {string} s2 - The second string.  * @returns {number} - The similarity ratio between 0 and 1.  */ similarity(s1, s2) { ... }```
    
37.  **editDistance(s1, s2)**

    
    ```/**  * Calculates the Levenshtein distance between two strings.  * @param {string} s1 - The first string.  * @param {string} s2 - The second string.  * @returns {number} - The edit distance between the two strings.  */ editDistance(s1, s2) { ... }```
    
38.  **checkPlusAfter(fromBlur = false)**

    
    ```/**  * Handles the display of the '+ number' indicator when tags exceed the showPlusAfter limit.  * @param {boolean} fromBlur - Indicates if the function is called from a blur event.  */ checkPlusAfter(fromBlur = false) { ... }```
    
39.  **refresh()**

    
    ```/**  * Refreshes the plugin instance, reinitializing it with the current settings.  */ refresh() { ... }```
    
40.  **destroy()**

    
    ```/**  * Destroys the plugin instance, removing all event listeners and DOM elements added by the plugin.  */ destroy() { ... }```
    

- - -