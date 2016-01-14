System.register('flarum/utils/string1',[] , function (_export) {
    /**
     * Truncate a string to the given length, appending ellipses if necessary.
     *
     * @param {String} string
     * @param {Number} length
     * @param {Number} [start=0]
     * @return {String}
     */
    'use strict';

    /**
     * Create a slug out of the given string. Non-alphanumeric characters are
     * converted to hyphens.
     *
     * @param {String} string
     * @return {String}
     */

    _export('truncate', truncate);

    /**
     * Strip HTML tags and quotes out of the given string, replacing them with
     * meaningful punctuation.
     *
     * @param {String} string
     * @return {String}
     */

    _export('slug', slug);

    /**
     * An array of DOM selectors to remove when getting plain content.
     *
     * @type {Array}
     */

    _export('getPlainContent', getPlainContent);

    _export('ucfirst', ucfirst);

    function truncate(string, length) {
        var start = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        return (start > 0 ? '...' : '') + string.substring(start, start + length) + (string.length > start + length ? '...' : '');
    }

    function bodauTiengViet(str) {
        str= str.toLowerCase();
        str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
        str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
        str= str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
        str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
        str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
        str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
        str= str.replace(/đ/g,"d");
        return str;
    }

    function slug(string) {
        string = bodauTiengViet(string);
        return string.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/-$|^-/g, '') || '-';
    }

    function getPlainContent(string) {
        var dom = $('<div/>').html(string.replace(/(<\/p>|<br>)/g, '$1 &nbsp;'));

        dom.find(getPlainContent.removeSelectors.join(',')).remove();

        return dom.text();
    }

    /**
     * Make a string's first character uppercase.
     *
     * @param {String} string
     * @return {String}
     */

    function ucfirst(string) {
        return string.substr(0, 1).toUpperCase() + string.substr(1);
    }

    return {
        setters: [],
        execute: function () {
            getPlainContent.removeSelectors = ['blockquote', 'script'];
        }
    };
});
System.set('flarum/utils/string', System.get('flarum/utils/string1'));