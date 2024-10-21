/* 
    https://github.com/Sorcher/JSuggestags
*/

class JSuggestags {
    constructor(selector) {
        this.selector = typeof selector === 'string' ? document.querySelector(selector) : selector;
        this.settings = {
            type: 'bootstrap',
            tagLimit: -1,
            suggestions: [],
            suggestMatch: null,
            suggestionsAction: {
                anyFirstCharForAjax:true,//true:always call with ajax | <char> i.ex: "@" to also check with Ajax request
                timeout: -1,
                minChars: 3,
                minChange: -1,
                delay: 100,
                type: 'GET',
                url: null,
                dataType: null,
                beforeSend: null,
                success: null,
                error: null,
                complete: null,
                callbacks: null,
            },
            defaultTagClass: '',
            classes: [],
            backgrounds: [],
            colors: [],
            whiteList: false,
            afterAdd: null,
            afterRemove: null,
            trimValue: true,
            dashspaces: false,
            lowercase: false,
            selectOnHover: true,
            triggerChange: false,
            noSuggestionMsg: '',
            showAllSuggestions: true,
            keepLastOnHoverTag: false,
            printValues: false,
            checkSimilar: true,
            delimiters: [',', ' '],
            showPlusAfter: 0,
        };
        this.method = undefined;
        this.name = null;
        this.defaultLabel = 'Opprett tag';
        this.classes = {
            sTagsArea: 'j-suggestags-area',
            inputArea: 'j-suggestags-input-area',
            inputAreaDef: 'j-suggestags-input-area-default',
            focus: 'j-focus',
            sTagsInput: 'j-suggestags-input',
            listArea: 'j-suggestags-list',
            list: 'j-list',
            listItem: 'j-list-item',
            itemPad: 'j-item-pad',
            inputType: 'j-select-input',
            tagItem: 'j-select-tag',
            plusItem: 'j-plus-tag',
            colBg: 'col-bg',
            removeTag: 'j-remove-tag',
            readyToRemove: 'ready-to-remove',
            noSuggestion: 'j-no-suggestion',
            showPlusBg: 'show-plus-bg',
        };
        this.selectors = {
            sTagsArea: null,
            inputArea: null,
            inputAreaDef: null,
            sTagsInput: null,
            listArea: null,
            list: null,
            listGroup: null,
            listItem: null,
            itemPad: null,
            inputType: null,
            plusTag: null,
        };
        this.isRequired = false;
        this.ajaxActive = false;
        this.tagNames = [];
        this.delayTimer = 0;
        this.blurTgItems = null;
    }

    _settings(settings) {
        this.settings = {
            ...this.settings,
            ...settings
        };
    }

    _setMethod(method) {
        this.method = method;
    }

    _init() {
        if (this.checkMethod()) {
            this.name = this.selector.getAttribute('name') ?
                `${this.selector.getAttribute('name')}_j-suggestags` :
                'j-suggestags_suggestags';
            this.createHTML();
            this.setEvents();
            this.selector.style.display = 'none';
            this.setDefault();
        }
    }

    createHTML() {
        // Create tags area
        this.selectors.sTagsArea = document.createElement('div');
        this.selectors.sTagsArea.classList.add(this.classes.sTagsArea);
        this.selector.insertAdjacentElement('afterend', this.selectors.sTagsArea);

        // Create input area
        this.selectors.inputArea = document.createElement('div');
        this.selectors.inputArea.classList.add(this.classes.inputArea);
        this.selectors.sTagsArea.appendChild(this.selectors.inputArea);

        // Set default label
        this.defaultLabel = this.selector.getAttribute('placeholder') || this.defaultLabel;

        // Create tags input
        this.selectors.sTagsInput = document.createElement('input');
        this.selectors.sTagsInput.type = 'text';
        this.selectors.sTagsInput.classList.add(this.classes.sTagsInput);
        this.selectors.sTagsInput.placeholder = this.defaultLabel;
        this.selectors.sTagsInput.autocomplete = 'off';
        this.selectors.inputArea.appendChild(this.selectors.sTagsInput);

        // Handle required attribute
        if (this.selector.hasAttribute('required')) {
            this.selector.removeAttribute('required');
            this.isRequired = true;
            this.updateIsRequired();
        }

        // Create suggestion list area
        this.selectors.listArea = document.createElement('div');
        this.selectors.listArea.classList.add(this.classes.listArea);
        this.selectors.sTagsArea.appendChild(this.selectors.listArea);
        this.selectors.listArea.style.width = `${this.selectors.sTagsArea.offsetWidth - 3}px`;

        // Create suggestion list
        this.selectors.list = document.createElement('ul');
        this.selectors.list.classList.add(this.classes.list);
        this.selectors.listArea.appendChild(this.selectors.list);

        this.updateSuggestionList();
        this.fixCSS();
    }

    updateIsRequired() {
        if (this.isRequired) {
            if (this.tagNames.length) {
                this.selectors.sTagsInput.removeAttribute('required');
            } else {
                this.selectors.sTagsInput.setAttribute('required', 'required');
            }
        }
    }

    updateSuggestionList() {
        this.selectors.list.innerHTML = this.createList();
    }

    setEvents() {
        // Copy styles and classes
        this.selectors.inputArea.style.cssText = this.selector.style.cssText;
        this.selector.classList.forEach((cls) => this.selectors.inputArea.classList.add(cls));

        this.setTagEvents();
        window.addEventListener('resize', () => {
            this.selectors.listArea.style.width = `${this.selectors.sTagsArea.offsetWidth - 3}px`;
        });
        this.setSuggestionsEvents();
        this.setRemoveEvent();
    }

    setTagEvents() {
        this.selectors.sTagsInput.addEventListener('focus', () => {
            if (this.settings.showAllSuggestions) {
                this.suggestWhiteList('', 0, true);
            }
            this.selectors.inputArea.classList.add(this.classes.focus);
            if (this.settings.type === 'materialize') {
                this.selectors.sTagsInput.style.borderBottom = 'none';
                this.selectors.sTagsInput.style.boxShadow = 'none';
            }
            this.checkPlusAfter();
        });

        this.selectors.sTagsInput.addEventListener('blur', () => {
            this.selectors.inputArea.classList.remove(this.classes.focus);
            if (!this.selectors.sTagsInput.value) {
                this.selectors.listArea.style.display = 'none';
            }
            this.checkPlusAfter(true);
        });

        this.selectors.sTagsInput.addEventListener('keyup', (e) => {
            const keycode = e.keyCode || e.which;
            let key = e.key || '';

            const isDelimiter = this.settings.delimiters.includes(key);

            if (key === 'Enter' || key === ',' || isDelimiter) {
                let value = this.selectors.sTagsInput.value.replace(/,/g, '');
                if (isDelimiter) {
                    this.settings.delimiters.forEach((delimiter) => {
                        value = value.replace(delimiter, '');
                    });
                }
                value = value.trim();
                this.selectors.sTagsInput.value = '';
                this.addTag(this.getValue(value));
                if (this.settings.showAllSuggestions) {
                    this.suggestWhiteList('', 0, true);
                }
            } else if (keycode === 8 && !this.selectors.sTagsInput.value) {
                const removeClass = this.classes.readyToRemove;
                if (this.selectors.sTagsInput.classList.contains(removeClass)) {
                    const items = this.selectors.inputArea.querySelectorAll(`.${this.classes.tagItem}`);
                    const lastItem = items[items.length - 1];
                    this.removeTagByItem(lastItem, false);
                } else {
                    this.selectors.sTagsInput.classList.add(removeClass);
                }
                this.selectors.listArea.style.display = 'none';
                if (this.settings.showAllSuggestions) {
                    this.suggestWhiteList('', 0, true);
                }
            } else if (
                (this.settings.suggestions.length || this.isSuggestAction()) &&
                (this.selectors.sTagsInput.value || this.settings.showAllSuggestions)
            ) {
                this.selectors.sTagsInput.classList.remove(this.classes.readyToRemove);
                this.processWhiteList(keycode, this.selectors.sTagsInput.value);
            }
        });

        this.selectors.sTagsInput.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
        });

        this.selectors.sTagsArea.addEventListener('click', () => {
            this.selectors.sTagsInput.focus();
        });
    }

    setSuggestionsEvents() {
        if (this.settings.selectOnHover) {
            const listItems = this.selectors.listArea.querySelectorAll(`.${this.classes.listItem}`);
            listItems.forEach((item) => {
                item.addEventListener('mouseover', () => {
                    listItems.forEach((li) => li.classList.remove('active'));
                    item.classList.add('active');
                    this.selectors.sTagsInput.value = item.textContent;
                });

                item.addEventListener('mouseout', () => {
                    item.classList.remove('active');
                    if (!this.settings.keepLastOnHoverTag) {
                        this.selectors.sTagsInput.value = '';
                    }
                });
            });
        }

        const listItems = this.selectors.listArea.querySelectorAll(`.${this.classes.listItem}`);
        listItems.forEach((item) => {
            item.addEventListener('click', () => {
                this.addTag(item.getAttribute('data-val'));
                this.selectors.sTagsInput.value = '';
                this.selectors.sTagsInput.focus();
            });
        });
    }

    isSuggestAction() {
        return this.settings.suggestionsAction && this.settings.suggestionsAction.url;
    }

    getTag(value) {
        if (this.settings.suggestions.length) {
            let tag = value;
            for (const item of this.settings.suggestions) {
                if (typeof item === 'object' && item.value == value) {
                    tag = item.tag;
                    break;
                } else if (item == value) {
                    break;
                }
            }
            return tag;
        }
        return value;
    }

    getValue(tag) {
        if (this.settings.suggestions.length) {
            let value = tag;
            const lower = tag.toString().toLowerCase();
            for (const item of this.settings.suggestions) {
                if (typeof item === 'object' && item.tag.toString().toLowerCase() == lower) {
                    value = item.value;
                    break;
                } else if (item.toString().toLowerCase() == lower) {
                    break;
                }
            }
            return value;
        }
        return tag;
    }

    processAjaxSuggestion(value, keycode) {
        let actionURL = this.getActionURL(this.settings.suggestionsAction.url);
        const params = {
            existingTags: this.tagNames,
            existing: this.settings.suggestions,
            term: value,
        };

        let ajaxParams = {
            method: this.settings.suggestionsAction.type || 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (this.settings.suggestionsAction.type === 'GET') {
            const urlParams = new URLSearchParams(params);
            actionURL += `?${urlParams.toString()}`;
        } else {
            ajaxParams.body = JSON.stringify(params);
        }

        if (typeof this.settings.suggestionsAction.beforeSend === 'function') {
            this.settings.suggestionsAction.beforeSend();
        }

        // Implement timeout using AbortController
        const controller = new AbortController();
        const signal = controller.signal;
        ajaxParams.signal = signal;

        if (this.settings.suggestionsAction.timeout && this.settings.suggestionsAction.timeout !== -1) {
            setTimeout(() => controller.abort(), this.settings.suggestionsAction.timeout);
        }

        fetch(actionURL, ajaxParams)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok (${response.statusText})`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.suggestions) {
                    this.settings.suggestions = [...this.settings.suggestions, ...data.suggestions];
                    this.settings.suggestions = this.unique(this.settings.suggestions);
                    this.updateSuggestionList();
                    this.setSuggestionsEvents();
                    this.suggestWhiteList(value, keycode);
                }
                if (typeof this.settings.suggestionsAction.success === 'function') {
                    this.settings.suggestionsAction.success(data);
                }
            })
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.warn('Fetch aborted due to timeout');
                }
                if (typeof this.settings.suggestionsAction.error === 'function') {
                    this.settings.suggestionsAction.error(error);
                }
            })
            .finally(() => {
                if (typeof this.settings.suggestionsAction.complete === 'function') {
                    this.settings.suggestionsAction.complete();
                }
                this.ajaxActive = false;
            });
    }

    processWhiteList(keycode, value) {
        if (keycode === 40 || keycode === 38) {
            const type = keycode === 40 ? 'down' : 'up';
            this.upDownSuggestion(value, type);
        } else {
            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(() => {
                if (this.isSuggestAction() && !this.ajaxActive) {
                    const minChars = this.settings.suggestionsAction.minChars;
                    const minChange = this.settings.suggestionsAction.minChange;
                    const lastSearch = this.selectors.sTagsInput.getAttribute('last-search');
                    const anyFirstChar = value.startsWith(this.settings.suggestionsAction.anyFirstCharForAjax) || this.settings.suggestionsAction.anyFirstCharForAjax;
                    if (
                        value.length >= minChars &&
                        (minChange === -1 ||
                            !lastSearch ||
                            this.similarity(lastSearch, value) * 100 <= minChange)
                        && anyFirstChar
                    ) {
                        this.selectors.sTagsInput.setAttribute('last-search', value);
                        this.ajaxActive = true;
                        this.processAjaxSuggestion(value, keycode);
                    }
                } else {
                    this.suggestWhiteList(value, keycode);
                }
            }, this.settings.suggestionsAction.delay);
        }
    }

    upDownSuggestion(value, type) {
        const listItems = this.selectors.listArea.querySelectorAll(`.${this.classes.listItem}:not([style*="display: none"])`);
        let activeFound = false;
        listItems.forEach((item, index) => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                let newIndex = type === 'up' ? index - 1 : index + 1;
                if (newIndex >= 0 && newIndex < listItems.length) {
                    listItems[newIndex].classList.add('active');
                    this.selectors.sTagsInput.value = listItems[newIndex].textContent;
                    activeFound = true;
                }
            }
        });
        if (!activeFound && listItems.length > 0) {
            const defaultItem = type === 'down' ? listItems[0] : listItems[listItems.length - 1];
            defaultItem.classList.add('active');
            this.selectors.sTagsInput.value = defaultItem.textContent;
        }
    }

    suggestWhiteList(value, keycode, showAll = false) {
        let found = false;
        const lower = value.toString().toLowerCase();
        const listItems = this.selectors.listArea.querySelectorAll(`.${this.classes.listItem}`);
        const noSuggestion = this.selectors.listArea.querySelector(`.${this.classes.noSuggestion}`);

        if (noSuggestion) {
            noSuggestion.style.display = 'none';
        }

        listItems.forEach((item) => {
            const dataVal = item.getAttribute('data-val');
            const isInTagNames = this.tagNames.includes(dataVal);

            let suggestItemResult = false;
            if (typeof this.settings.suggestMatch === 'function') {
                suggestItemResult = this.settings.suggestMatch(item.textContent, value);
            } else {
                suggestItemResult = item.textContent.toLowerCase().includes(lower);
            }

            if ((showAll || suggestItemResult) && !isInTagNames) {
                item.style.display = '';
                found = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (found) {
            const visibleItems = this.selectors.listArea.querySelectorAll(`.${this.classes.listItem}:not([style*="display: none"])`);
            if (visibleItems.length === 1 && keycode !== 8) {
                const itemText = visibleItems[0].textContent.toLowerCase();
                if (
                    (this.settings.whiteList && this.isSimilarText(value.toLowerCase(), itemText, 40)) ||
                    this.isSimilarText(value.toLowerCase(), itemText, 60)
                ) {
                    visibleItems[0].classList.add('active');
                    this.selectors.sTagsInput.value = visibleItems[0].textContent;
                }
            } else {
                visibleItems.forEach((item) => item.classList.remove('active'));
            }
            this.selectors.listArea.style.display = 'block';
        } else {
            if (value && this.settings.noSuggestionMsg) {
                listItems.forEach((item) => (item.style.display = 'none'));
                if (noSuggestion) {
                    noSuggestion.style.display = 'block';
                }
            } else {
                this.selectors.listArea.style.display = 'none';
            }
        }
    }

    setDefault() {
        const items = this.selector.value.split(',');
        items.forEach((item) => {
            this.addTag(item.trim());
        });
    }

    setRemoveEvent() {
        const removeTags = this.selectors.inputArea.querySelectorAll(`.${this.classes.removeTag}`);
        removeTags.forEach((removeTag) => {
            removeTag.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                const tagItem = removeTag.closest(`.${this.classes.tagItem}`);
                this.removeTagByItem(tagItem, false);
            });
        });
    }

    createList() {
        let listHTML = '';
        this.settings.suggestions.forEach((item) => {
            let value = '';
            let tag = '';
            if (typeof item === 'object') {
                value = item.value;
                tag = item.tag;
            } else {
                value = item;
                tag = item;
            }
            listHTML += `<li class="${this.classes.listItem}" data-val="${value}">${tag}</li>`;
        });
        if (this.settings.noSuggestionMsg) {
            listHTML += `<li class="${this.classes.noSuggestion}">${this.settings.noSuggestionMsg}</li>`;
        }
        return listHTML;
    }

    addTag(value, animate = true) {
        if (!value) {
            return;
        }

        if (typeof value === 'string' && this.settings.trimValue) {
            value = value.trim();
        }

        if (typeof value === 'string' && this.settings.lowercase) {
            value = value.toLowerCase();
        }

        if (typeof value === 'string' && this.settings.dashspaces) {
            value = value.replace(/\s+/g, '-');
        }

        const tagHTML = document.createElement('span');
        tagHTML.classList.add(this.classes.tagItem);
        tagHTML.setAttribute('data-val', value);
        tagHTML.innerHTML = `${this.getTag(value)} ${this.setIcon()}`;
        this.selectors.inputArea.insertBefore(tagHTML, this.selectors.sTagsInput);

        if (this.settings.defaultTagClass) {
            tagHTML.classList.add(this.settings.defaultTagClass);
        }

        if (
            this.settings.tagLimit !== -1 &&
            this.settings.tagLimit > 0 &&
            this.tagNames.length >= this.settings.tagLimit
        ) {
            this.animateRemove(tagHTML, animate);
            if (animate) {
                this.flashItem(value);
            }
            return false;
        }

        const itemKey = this.getItemKey(value);

        if (this.settings.whiteList && itemKey === -1) {
            this.animateRemove(tagHTML, animate);
            if (animate) {
                this.flashItem(value, itemKey);
            }
            return false;
        }

        if (this.isPresent(value)) {
            this.animateRemove(tagHTML, animate);
            if (animate) {
                this.flashItem(value, itemKey);
            }
        } else {
            this.customStylings(tagHTML, itemKey);
            this.tagNames.push(value);
            this.setRemoveEvent();
            this.setInputValue();
            if (typeof this.settings.afterAdd === 'function') {
                this.settings.afterAdd(value);
            }
        }

        this.selector.dispatchEvent(new CustomEvent('suggestags.add', {
            detail: value
        }));
        this.selector.dispatchEvent(new Event('suggestags.change'));
        if (this.settings.triggerChange) {
            this.selector.dispatchEvent(new Event('change'));
        }
        this.selectors.listArea.style.display = 'none';
        this.selectors.sTagsInput.classList.remove(this.classes.readyToRemove);
        this.checkPlusAfter();
    }

    getItemKey(value) {
        let itemKey = -1;
        if (this.settings.suggestions.length) {
            const lower = value.toString().toLowerCase();
            this.settings.suggestions.forEach((item, key) => {
                if (typeof item === 'object') {
                    if (item.value.toString().toLowerCase() === lower) {
                        itemKey = key;
                        if (item.class && !this.settings.classes[key]) {
                            this.settings.classes[key] = item.class;
                        }
                        if (item.background && !this.settings.backgrounds[key]) {
                            this.settings.backgrounds[key] = item.background;
                        }
                        if (item.color && !this.settings.colors[key]) {
                            this.settings.colors[key] = item.color;
                        }
                    }
                } else if (item.toString().toLowerCase() === lower) {
                    itemKey = key;
                }
            });
        }
        return itemKey;
    }

    isPresent(value) {
        return this.tagNames.some((tag) => tag.toLowerCase() === value.toLowerCase());
    }

    customStylings(item, key) {
        let isCustom = false;
        if (this.settings.classes[key]) {
            isCustom = true;
            item.classList.add(this.settings.classes[key]);
        }
        if (this.settings.backgrounds[key]) {
            isCustom = true;
            item.style.background = this.settings.backgrounds[key];
        }
        if (this.settings.colors[key]) {
            isCustom = true;
            item.style.color = this.settings.colors[key];
        }
        if (!isCustom) {
            item.classList.add(this.classes.colBg);
        }
    }

    removeTag(value, animate = true) {
        const tags = this.selectors.inputArea.querySelectorAll(`[data-val="${value}"]`);
        if (tags.length) {
            tags.forEach((tag) => this.removeTagByItem(tag, animate));
        }
    }

    removeTagByItem(item, animate) {
        const index = this.tagNames.indexOf(item.getAttribute('data-val'));
        if (index !== -1) {
            this.tagNames.splice(index, 1);
        }
        this.animateRemove(item, animate);
        this.setInputValue();
        this.selector.dispatchEvent(new CustomEvent('suggestags.remove', {
            detail: item.getAttribute('data-val')
        }));
        this.selector.dispatchEvent(new Event('suggestags.change'));
        if (this.settings.triggerChange) {
            this.selector.dispatchEvent(new Event('change'));
        }
        if (typeof this.settings.afterRemove === 'function') {
            this.settings.afterRemove(item.getAttribute('data-val'));
        }
        this.selectors.sTagsInput.classList.remove(this.classes.readyToRemove);
        this.checkPlusAfter();
    }

    animateRemove(item, animate) {
        item.classList.add('disabled');
        if (animate) {
            setTimeout(() => {
                item.style.display = 'none';
                setTimeout(() => {
                    item.remove();
                }, 500);
            }, 500);
        } else {
            item.remove();
        }
    }

    flashItem(value, itemKey) {
        let tagItem = null;
        const lowerValue = value.toLowerCase();
        const tagItems = this.selectors.sTagsArea.querySelectorAll(`.${this.classes.tagItem}`);
        tagItems.forEach((item) => {
            const tagName = item.getAttribute('data-val').trim();
            if (lowerValue === tagName.toLowerCase()) {
                tagItem = item;
            }
        });

        if (tagItem) {
            const background = this.settings.backgrounds[itemKey] || null;
            if (background) {
                tagItem.style.background = '';
            }
            tagItem.classList.add('flash');
            setTimeout(() => {
                tagItem.classList.remove('flash');
                if (background) {
                    tagItem.style.background = background;
                }
            }, 1500);
        }
    }

    setIcon() {
        const removeClass = this.classes.removeTag;
        if (this.settings.type === 'bootstrap') {
            return `<span class="bi bi-x ${removeClass}"></span>`;
        } else if (this.settings.type === 'materialize') {
            return `<i class="material-icons right ${removeClass}">clear</i>`;
        } else {
            return `<b class="${removeClass}">&#10006;</b>`;
        }
    }

    setInputValue() {
        this.updateIsRequired();
        this.selector.value = this.tagNames.join(',');
        if (this.settings.printValues) {
            console.info(this.tagNames, this.selector.value);
        }
    }

    fixCSS() {
        if (this.settings.type === 'j-suggestags') {
            this.selectors.inputArea.classList.add(this.classes.inputAreaDef);
            this.selectors.inputArea.style.padding = '5px 5px';
        } else if (this.settings.type === 'materialize') {
            this.selectors.inputArea.classList.add(this.classes.inputAreaDef);
            this.selectors.inputArea.style.height = 'auto';
            this.selectors.inputArea.style.padding = '5px 5px';
            this.selectors.sTagsInput.style.margin = '0';
            this.selectors.sTagsInput.style.height = 'auto';
        }
    }

    checkMethod() {
        const existingArea = this.selector.nextElementSibling;
        if (existingArea && existingArea.classList.contains(this.classes.sTagsArea)) {
            existingArea.remove();
        }
        this.selector.style.display = '';
        if (this.method && this.method === 'destroy') {
            return false;
        }
        return true;
    }

    refresh() {
        this._setMethod('refresh');
        this._init();
    }

    destroy() {
        this._setMethod('destroy');
        this._init();
    }

    getActionURL(urlString) {
        let URL = '';
        if (window) {
            URL = `${window.location.protocol}//${window.location.host}`;
        }
        if (this.isAbsoluteURL(urlString)) {
            URL = urlString;
        } else {
            URL += `/${urlString.replace(/^\/|\/$/g, '')}`;
        }
        return URL;
    }

    isAbsoluteURL(urlString) {
        const regexURL = new RegExp('^(?:[a-z]+:)?//', 'i');
        return regexURL.test(urlString);
    }

    unique(list) {
        const result = [];
        list.forEach((e) => {
            if (typeof e === 'object') {
                if (!this.objectInArray(e, result)) {
                    result.push(e);
                }
            } else {
                if (!result.includes(e)) {
                    result.push(e);
                }
            }
        });
        return result;
    }

    objectInArray(element, result) {
        if (result.length) {
            for (const e of result) {
                if (typeof e === 'object') {
                    if (e.value === element.value) {
                        return true;
                    }
                } else {
                    if (e === element.value) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isSimilarText(str1, str2, perc) {
        if (!this.settings.checkSimilar) {
            return false;
        }
        const percent = this.similarity(str1, str2);
        return percent * 100 >= perc;
    }

    similarity(s1, s2) {
        let longer = s1;
        let shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        const longerLength = longer.length;
        if (longerLength === 0) {
            return 1.0;
        }
        return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    }

    editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        const costs = new Array();
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0) {
                    costs[j] = j;
                } else {
                    if (j > 0) {
                        let newValue = costs[j - 1];
                        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0) {
                costs[s2.length] = lastValue;
            }
        }
        return costs[s2.length];
    }

    checkPlusAfter(fromBlur = false) {
        if (this.settings.showPlusAfter > 0) {
            if (this.tagNames.length > this.settings.showPlusAfter) {
                const plusNumber = this.tagNames.length - this.settings.showPlusAfter;
                if (!this.selectors.plusTag) {
                    this.selectors.plusTag = document.createElement('span');
                    this.selectors.plusTag.classList.add(this.classes.plusItem);
                    this.selectors.plusTag.classList.add(this.classes.showPlusBg);
                    this.selectors.inputArea.appendChild(this.selectors.plusTag);

                    this.selectors.inputArea.addEventListener('click', () => {
                        this.selectors.sTagsInput.style.display = '';
                    });
                }
                this.selectors.plusTag.textContent = `+ ${plusNumber}`;
                const tagItems = this.selectors.inputArea.querySelectorAll(`.${this.classes.tagItem}`);
                tagItems.forEach((item) => (item.style.display = ''));

                if (this.selectors.inputArea.classList.contains(this.classes.focus)) {
                    this.selectors.plusTag.style.display = 'none';
                } else {
                    if (fromBlur && !this.blurTgItems) {
                        this.blurTgItems = tagItems;
                        setTimeout(() => {
                            if (this.blurTgItems) {
                                this.blurTgItems.forEach((item, index) => {
                                    if (index >= this.settings.showPlusAfter) {
                                        item.style.display = 'none';
                                    }
                                });
                            }
                        }, 200);
                    } else {
                        this.blurTgItems = null;
                        tagItems.forEach((item, index) => {
                            if (index >= this.settings.showPlusAfter) {
                                item.style.display = 'none';
                            }
                        });
                    }
                    this.selectors.sTagsInput.style.display = 'none';
                    this.selectors.plusTag.style.display = '';
                }
            } else if (this.selectors.plusTag) {
                const tagItems = this.selectors.inputArea.querySelectorAll(`.${this.classes.tagItem}`);
                tagItems.forEach((item) => (item.style.display = ''));
                this.selectors.plusTag.style.display = 'none';
            }
        }
    }
}

// Export the class if using modules
// export default JSuggestags;
