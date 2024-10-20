


> [!TIP]
> Here is a list of the function names and a short description of the functions.


- - -



| Function | Description |
| --- | --- |
| **constructor(selector)** | Initializes the `JSuggestags` instance with default settings and properties.<br/>**Parameters:**<br/>`selector` - The input element or selector for which the plugin is initialized. |
| **\_settings(settings)** | Merges user-defined settings with the default settings.<br/>**Parameters:**<br/>`settings` - The settings provided by the user. |
| **\_setMethod(method)** | Sets the method for the plugin (e.g., 'refresh', 'destroy').<br/>**Parameters:**<br/>`method` - The method to set. |
| **\_init()** | Initializes the plugin by creating HTML structure, setting up events, and loading default tags. |
| **checkMethod()** | Checks if the plugin should proceed based on the method set (e.g., 'destroy' will stop initialization).<br/>**Returns:**<br/>`boolean` - Returns `true` if initialization should proceed. |
| **createHTML()** | Creates the necessary HTML elements for the plugin, including tags area, input area, and suggestions list. |
| **setEvents()** | Sets up all the event listeners required for the plugin. |
| **setTagEvents()** | Sets up event listeners related to the tag input field, such as focus, blur, keyup, and click events. |
| **setSuggestionsEvents()** | Sets up event listeners for the suggestion items in the suggestions list. |
| **setRemoveEvent()** | Sets up the event listener for removing tags when the remove icon is clicked. |
| **fixCSS()** | Adjusts CSS classes and styles based on the plugin type (e.g., 'bootstrap', 'materialize'). |
| **setDefault()** | Loads default tags from the input value if any are present. |
| **updateIsRequired()** | Updates the `required` attribute of the input based on whether tags are present. |
| **setInputValue()** | Updates the original input's value with the current list of tag names. |
| **processWhiteList(keycode, value)** | Processes the whitelist suggestions based on user input and key events.<br/>**Parameters:**<br/>`keycode` - The keycode of the pressed key.<br/>`value` - The current value of the input field. |
| **suggestWhiteList(value, keycode, showAll = false)** | Filters and displays suggestions based on user input and whether to show all suggestions.<br/>**Parameters:**<br/>`value` - The current value of the input field.<br/>`keycode` - The keycode of the pressed key.<br/>`showAll` - Whether to show all suggestions. |
| **processAjaxSuggestion(value, keycode)** | Handles fetching suggestions from an Ajax request based on user input.<br/>**Parameters:**<br/>`value` - The current value of the input field.<br/>`keycode` - The keycode of the pressed key. |
| **getActionURL(urlString)** | Constructs the full URL for Ajax requests, handling relative and absolute URLs.<br/>**Parameters:**<br/>`urlString` - The URL string provided in settings.<br/>**Returns:**<br/>`string` - The full URL for the Ajax request. |
| **isAbsoluteURL(urlString)** | Checks if a given URL is an absolute URL.<br/>**Parameters:**<br/>`urlString` - The URL string to check.<br/>**Returns:**<br/>`boolean` - `true` if the URL is absolute. |
| **upDownSuggestion(value, type)** | Navigates through the suggestions list using up and down arrow keys.<br/>**Parameters:**<br/>`value` - The current value of the input field.<br/>`type` - The direction ('up' or 'down') to navigate. |
| **getTag(value)** | Retrieves the display tag corresponding to a value from the suggestions list.<br/>**Parameters:**<br/>`value` - The value for which to get the tag.<br/>**Returns:**<br/>`string` - The tag associated with the value. |
| **getValue(tag)** | Retrieves the value corresponding to a display tag from the suggestions list.<br/>**Parameters:**<br/>`tag` - The tag for which to get the value.<br/>**Returns:**<br/>`string` - The value associated with the tag. |
| **addTag(value, animate = true)** | Adds a new tag to the tags area and updates the input value.<br/>**Parameters:**<br/>`value` - The value of the tag to add.<br/>`animate` - Whether to animate the addition of the tag. |
| **getItemKey(value)** | Retrieves the index/key of a value in the suggestions list.<br/>**Parameters:**<br/>`value` - The value to search for.<br/>**Returns:**<br/>`number` - The index of the value in the suggestions array or `-1` if not found. |
| **isPresent(value)** | Checks if a tag value is already present in the current tags.<br/>**Parameters:**<br/>`value` - The value to check.<br/>**Returns:**<br/>`boolean` - `true` if the value is present. |
| **customStylings(item, key)** | Applies custom styling to a tag item based on classes, backgrounds, or colors from settings.<br/>**Parameters:**<br/>`item` - The tag element to style.<br/>`key` - The index/key corresponding to the tag in the suggestions list. |
| **removeTag(value, animate = true)** | Removes a tag from the tags area by its value.<br/>**Parameters:**<br/>`value` - The value of the tag to remove.<br/>`animate` - Whether to animate the removal of the tag. |
| **removeTagByItem(item, animate)** | Removes a tag from the tags area by its HTML element.<br/>**Parameters:**<br/>`item` - The tag element to remove.<br/>`animate` - Whether to animate the removal of the tag. |
| **animateRemove(item, animate)** | Animates the removal of a tag element.<br/>**Parameters:**<br/>`item` - The tag element to remove.<br/>`animate` - Whether to animate the removal. |
| **flashItem(value, itemKey)** | Highlights a tag to indicate it already exists or is invalid.<br/>**Parameters:**<br/>`value` - The value of the tag to flash.<br/>`itemKey` - The index/key corresponding to the tag in the suggestions list. |
| **setIcon()** | Sets the HTML for the remove icon on each tag.<br/>**Returns:**<br/>`string` - The HTML string for the remove icon. |
| **createList()** | Creates the HTML list of suggestions based on the suggestions array.<br/>**Returns:**<br/>`string` - The HTML string for the suggestions list. |
| **unique(list)** | Removes duplicate items from a list.<br/>**Parameters:**<br/>`list` - The array to make unique.<br/>**Returns:**<br/>`Array` - The array with duplicates removed. |
| **objectInArray(element, result)** | Checks if an object with a specific value exists in an array.<br/>**Parameters:**<br/>`element` - The object to search for.<br/>`result` - The array to search within.<br/>**Returns:**<br/>`boolean` - `true` if the object is found. |
| **isSimilarText(str1, str2, perc)** | Checks if two strings are similar based on a percentage threshold.<br/>**Parameters:**<br/>`str1` - The first string.<br/>`str2` - The second string.<br/>`perc` - The percentage threshold for similarity.<br/>**Returns:**<br/>`boolean` - `true` if the strings are similar beyond the threshold. |
| **similarity(s1, s2)** | Calculates the similarity between two strings using the Levenshtein distance.<br/>**Parameters:**<br/>`s1` - The first string.<br/>`s2` - The second string.<br/>**Returns:**<br/>`number` - The similarity ratio between 0 and 1. |
| **editDistance(s1, s2)** | Calculates the Levenshtein distance between two strings.<br/>**Parameters:**<br/>`s1` - The first string.<br/>`s2` - The second string.<br/>**Returns:**<br/>`number` - The edit distance between the two strings. |
| **checkPlusAfter(fromBlur = false)** | Handles the display of the '+ number' indicator when tags exceed the `showPlusAfter` limit.<br/>**Parameters:**<br/>`fromBlur` - Indicates if the function is called from a blur event. |
| **refresh()** | Refreshes the plugin instance, reinitializing it with the current settings. |
| **destroy()** | Destroys the plugin instance, removing all event listeners and DOM elements added by the plugin. |

- - -
