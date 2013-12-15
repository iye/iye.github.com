/*
 *  Project: gifOnClick
 *  Description: A simple Jquery plugin that will display a gif animation on the mouse position when you click inside the chosen element.
 *  Usage: $('#element').gifOnClick({gifUrl: "img/image.gif", time: 9000, event: "click"}); //time in miliseconds.
 *  Author: iye.github.io
 *  License: GPL
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
                var pluginName = "gifOnClick",
                                defaults = {
                                gifUrl: "image.gif",
                                time: 800,
                                event: "click"
                };

    // The actual plugin constructor
    function Plugin( element, options ) {

        this.$element = $(element);

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }


        Plugin.prototype = {
                        init: function () {
                            this._imagePreload([
                                this.settings.imgUrl
                            ]);
                            this.$element.on(this.settings.event + "." + pluginName, this, this._showGifFunction);
                        },


                        //Private Methods
                        _imagePreload: function (imgArray) {
                            $(imgArray).each(function(){
                                (new Image()).src = this;
                            });
                        },

                        _showGifFunction: function(e) {
                                that=e.data;
                                var imgEl = that._createImgElement();
                                imgEl = that._setImgCss(imgEl, e);
                                that.$element.prepend(imgEl);
                                setTimeout(function() { $(imgEl).remove();}, that.settings.time);
                        },

                        _createImgElement: function() {
                                var imgEl = document.createElement("img");
                                imgEl.classList.add(pluginName + "_img");
                                imgEl.src = this.settings.gifUrl;
                                return imgEl;
                        },

                        _setImgCss: function(imgEl, e) {
                                imgEl.style.position="fixed";
                                var top = e.clientY - (imgEl.height/2);
                                var left = e.clientX - (imgEl.width/2);
                                imgEl.style.top=top+"px";
                                imgEl.style.left=left+"px";
                                return imgEl;
                        }

        };




    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {

                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));