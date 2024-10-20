JSuggestags
================

JSuggestags is a **vanilla JavaScript** plugin for input tags with auto-complete suggestions.
based on the jQuery plugin by [Amsify42](https://github.com/amsify42) **jquery.amsify.suggestags**

`const jSuggestags = new JSuggestags('input');
jSuggestags._init();`

Installation
------------

Include the `JSuggestags` script in your project:


`<script src="path/to/jsuggestags.js"></script>`

Or, if using modules:

`import JSuggestags from 'path/to/jsuggestags.js';`
**Remember to export the class if using import**

* * *

Table of Contents
=================

1.  [Simple Tags](#simple-tags)
2.  [Default Value](#default-value)
3.  [Suggestions](#suggestions)
4.  [Suggestions Through Ajax](#suggestions-through-ajax)
5.  [White List](#white-list)
6.  [Custom Stylings](#custom-stylings)
7.  [Callbacks and Events](#callbacks-and-events)
8.  [Tag Limit](#tag-limit)
9.  [Refresh and Destroy](#refresh-and-destroy)
10.  [More Settings](#more-settings)
    *   [selectOnHover](#selectonhover)
    *   [noSuggestionMsg](#nosuggestionmsg)
    *   [showAllSuggestions](#showallsuggestions)
    *   [keepLastOnHoverTag](#keeplastonhovertag)
    *   [printValues](#printvalues)
    *   [showPlusAfter](#showplusafter)
    *   [suggestMatch](#suggestmatch)
11.  [Instantiating](#instantiating)
    *   [Initialization](#initialization)
    *   [Settings](#settings)
    *   [Add/Remove Tag](#addremove-tag)
    *   [Refresh and Destroy](#refresh-and-destroy-1)

* * *

Simple Tags
-----------

For simple initialization:


`<input type="text" class="form-control" name="country"/>`


`const jSuggestags = new JSuggestags('input[name="country"]');
jSuggestags._init();`

* * *

Default Value
-------------

If the input already has a value separated by commas, it will load the tags by default.


`<input type="text" class="form-control" name="country" value="India,UAE,Nepal"/>`


`const jSuggestags = new JSuggestags('input[name="country"]'); jSuggestags._init();`

* * *

Suggestions
-----------

A list of values can be passed to get suggestions.


`<input type="text" class="form-control" name="country"/>`


`const jSuggestags = new JSuggestags('input[name="country"]');
jSuggestags._settings({
    suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh']
});
jSuggestags._init();`

A list of objects can also be set to have tag/value pairs.


`<input type="text" class="form-control" name="color"/>`


`const jSuggestags = new JSuggestags('input[name="color"]');
jSuggestags._settings({
    suggestions: [{
        tag: 'Black',
        value: 1
    }, {
        tag: 'White',
        value: 2
    }, {
        tag: 'Red',
        value: 3
    }, {
        tag: 'Blue',
        value: 4
    }, {
        tag: 'Green',
        value: 5
    }, {
        tag: 'Orange',
        value: 6
    }]
});
jSuggestags._init();`

The input will store `value` separated by commas like this:


`<input type="text" class="form-control" name="color" value="1,2,3,4,5,6"/>`

**Note:** While setting the default value for the input, set actual values separated by commas, not tag names.

* * *

Suggestions Through Ajax
------------------------

You can also get suggestions through Ajax.


`<input type="text" class="form-control" name="country"/>`


`const jSuggestags = new JSuggestags('input[name="country"]');
jSuggestags._settings({
    suggestionsAction: {
        url: 'http://www.site.com/suggestions'
    }
});
jSuggestags._init();`

The Ajax method type will be **GET** by default. The request data you will receive is structured as:



`{
    "existingTags": ["tag1", "tag2"],
    "existing": ["suggestion1", "suggestion2"],
    "term": "search term"
}`

*   **existingTags**: An array of already selected tag values.
*   **existing**: An array of current suggestions.
*   **term**: The string you are trying to search.

The success response should at least contain a **suggestions** key, and its value should be an array:



`{
    "suggestions": ["newSuggestion1", "newSuggestion2", "newSuggestion3"]
}`

You can also add these settings and callbacks to this option:


`jSuggestags._settings({
    suggestionsAction: {
        timeout: -1,
        minChars: 2,
        minChange: -1,
        delay: 100,
        type: 'GET',
        url: 'http://www.site.com/suggestions',
        dataType: null,
        beforeSend: function() {
            console.info('beforeSend');
        },
        success: function(data) {
            console.info('success', data);
        },
        error: function(error) {
            console.error('error', error);
        },
        complete: function() {
            console.info('complete');
        }
    }
});
jSuggestags._init();`

*   **timeout**: Time in milliseconds to cancel the request, default is -1 (no timeout).
*   **minChars**: Minimum characters typed before the first Ajax hit, default is 2.
*   **minChange**: Recall the Ajax based on the minimum percentage of characters changed compared to the string passed in the last Ajax call, default is -1.
*   **delay**: Milliseconds delay to call Ajax or whitelist suggestions after typing, default is 100.
*   **type**: HTTP method type, default is 'GET'.
*   **dataType**: Expected data type of the response, default is null.

**Note**: **success** and **complete** callbacks do not directly override the original Ajax callbacks; they get called after the original ones are executed.

* * *

White List
----------

This option does not allow any inputs other than from suggestions.


`<input type="text" class="form-control" name="country"/>`


`jSuggestags._settings({
    suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
    whiteList: true
});
jSuggestags._init();`

* * *

Custom Stylings
---------------

For setting a default class for tags, you can pass this setting:


`jSuggestags._settings({
    suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
    whiteList: true,
    defaultTagClass: 'badge'
});
jSuggestags._init();`

You can pass a list of classes, colors, or backgrounds through settings:


`jSuggestags._settings({
    suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
    whiteList: true,
    classes: ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info']
});
jSuggestags._init();`

Each class will apply to each suggestion tag through their corresponding keys. You can also pass backgrounds and colors.


`jSuggestags._settings({
    suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
    whiteList: true,
    backgrounds: ['blue', 'green', 'red', 'orange', '#424242'],
    colors: ['white', 'black', 'white', 'black', 'white']
});
jSuggestags._init();`

You can also set class, color, and background for each suggestion item if the suggestion items are objects.


`jSuggestags._settings({
    suggestions: [{
        tag: 'Black',
        value: 1,
        background: 'black',
        color: 'white'
    }, {
        tag: 'White',
        value: 2,
        background: 'white',
        color: 'black'
    }, {
        tag: 'Red',
        value: 3,
        background: 'red',
        color: 'white'
    }, {
        tag: 'Blue',
        value: 4,
        background: 'blue',
        color: 'white'
    }, {
        tag: 'Green',
        value: 5,
        background: 'green',
        color: 'white'
    }, {
        tag: 'Orange',
        value: 6,
        background: 'orange',
        color: 'white'
    }]
});
jSuggestags._init();`

The same suggestions can also be passed in the Ajax response to get these stylings working.



`{
    "suggestions": [{
        "tag": "Black",
        "value": 1,
        "background": "black",
        "color": "white"
    }, {
        "tag": "White",
        "value": 2,
        "background": "white",
        "color": "black"
    }]
}`

* * *

Callbacks and Events
--------------------

You can set callbacks on add/remove tag elements.


`jSuggestags._settings({
    afterAdd: function(value) {
        console.info('Tag added:', value);
    },
    afterRemove: function(value) {
        console.info('Tag removed:', value);
    }
});
jSuggestags._init();`

Or you can subscribe to custom events.


`const inputElement = document.querySelector('input[name="country"]');
inputElement.addEventListener('suggestags.add', function(e) {
    console.info('Tag added:', e.detail);
});
inputElement.addEventListener('suggestags.change', function() {
    console.info('Tags changed');
});
inputElement.addEventListener('suggestags.remove', function(e) {
    console.info('Tag removed:', e.detail);
});`

* * *

Tag Limit
---------

You can set a limit on the number of tags.


`jSuggestags._settings({     tagLimit: 5 }); jSuggestags._init();`

* * *

Refresh and Destroy
-------------------

For refreshing the values, you can use:


`jSuggestags.refresh();`

For destroying the instance, you can do:


`jSuggestags.destroy();`

* * *

More Settings
-------------

### selectOnHover

By default, `selectOnHover` is `true`. You can set it to `false` to disable selecting the suggested tag value when the mouse hovers over a suggestion item.


`jSuggestags._settings({
    selectOnHover: false
});
jSuggestags._init();`

### noSuggestionMsg

This will show a message when there is no suggested item matching the input.


`jSuggestags._settings({
    noSuggestionMsg: 'Enter to generate new tag'
});
jSuggestags._init();`

### showAllSuggestions

This will show all the suggestion items on input focus. By default, this is `true`.


`jSuggestags._settings({
    showAllSuggestions: true
});
jSuggestags._init();`

### keepLastOnHoverTag

This will keep the last suggestion item in the input text field, even when moving away from the suggestion list. By default, this is `false`.


`jSuggestags._settings({
    keepLastOnHoverTag: false
});
jSuggestags._init();`

### printValues

By default, input value and its tag names get printed in the console. You can set it to `false` to prevent this.


`jSuggestags._settings({
    printValues: false
});
jSuggestags._init();`

### showPlusAfter

This setting is for hiding proceeding tags when focus is out of the tags section and showing the **\+ number** instead. By default, it is `0`. You can set the number to hide the tags after the given number when focus is out.


`jSuggestags._settings({
    showPlusAfter: 2
});
jSuggestags._init();`

### suggestMatch

A callback function can be passed to match the user-entered text with suggestion items for custom matching.


`jSuggestags._settings({
    suggestions: ['India', 'Pakistan', 'Nepal', 'UAE', 'Iran', 'Bangladesh'],
    suggestMatch: function(suggestionItem, value) {
        return suggestionItem.toLowerCase().includes(value.toLowerCase());
    }
});
jSuggestags._init();`

This callback receives two parameters: the suggestion item value and the text value entered by the user. Both parameters can be used to perform custom matching and return a boolean to determine if that suggestion should appear in the suggestions list.

* * *

Instantiating
-------------

You can initialize the plugin by creating an instance of `JSuggestags` and passing a selector to it.


`const jSuggestags = new JSuggestags('input[name="country"]');
jSuggestags._init();`

### Initialization

You need to set settings before initialization, and you can use all the setting options shown in previous examples.


`jSuggestags._settings({
    suggestions: ['Black', 'White', 'Red', 'Blue', 'Green', 'Orange']
});
jSuggestags._init();`

### Add/Remove Tag

You can call these methods to add or remove a tag with the instance of `JSuggestags`.


`jSuggestags.addTag('Purple');
jSuggestags.removeTag('Red');`

### Refresh and Destroy

You can call these methods to refresh or destroy the instance.


`jSuggestags.refresh();
jSuggestags.destroy();`

**Note:** This approach works for single selector elements. For multiple elements with the same selector, you can do something like this:


`document.querySelectorAll('.tags-input').forEach(function(element) {
    const jSuggestags = new JSuggestags(element);
    jSuggestags._init();
});`

* * *

All credits to [Amsify42](https://github.com/amsify42) for the **jquery.amsify.suggestags**