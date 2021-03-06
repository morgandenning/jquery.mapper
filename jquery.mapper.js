(function($) {

	$.fn.mapper = function(opts) {
		
		var settings = $.extend({
				'linkTitle' : false,
				'cssClasses' : '',
			}, opts),
			_ua = window.navigator.userAgent.toLowerCase(),
			_uaMatch = /(msie) ([\w.]+)/.exec( _ua ) ||
				/(edge)\/([\w.]+)/.exec( _ua ) ||
				/(opr)[\/]([\w.]+)/.exec( _ua ) ||
				/(chrome)[ \/]([\w.]+)/.exec( _ua ) ||
				/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( _ua ) ||
				/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( _ua ) ||
				/(webkit)[ \/]([\w.]+)/.exec( _ua ) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( _ua ) ||
				_ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( _ua ) ||
				_ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( _ua ) ||
				[],
			_platformMatch = /(windows phone)/.exec( _ua ) ||
				/(ipad)/.exec( _ua ) ||
				/(ipod)/.exec( _ua ) ||
				/(iphone)/.exec( _ua ) ||
				/(kindle)/.exec( _ua ) ||
				/(silk)/.exec( _ua ) ||
				/(android)/.exec( _ua ) ||
				/(win)/.exec( _ua ) ||
				/(mac)/.exec( _ua ) ||
				/(linux)/.exec( _ua ) ||
				/(cros)/.exec( _ua ) ||
				/(playbook)/.exec( _ua ) ||
				/(bb)/.exec( _ua ) ||
				/(blackberry)/.exec( _ua ) ||
				[],
			$.browser = {
				ua : _uaMatch[5] || _uaMatch[3] || _uaMatch[1] || "",
				platform : _platformMatch[0] || ""
			};
				
			if ($.browser.ua)
				$.browser[$.browser.ua] = true;
			
			if ($.browser.platform)
				$.browser[$.browser.platform] = true;
		}
	
		return this.each(function() {
			var _address = $(this).html(),
				_href = encodeURIComponent($(this).text());
			
			if ($.browser.android) {
				_href = 'http://maps.google.com/?saddr=Current%20Location&daddr=' + _href;
			} else if ($.browser.safari) {
				_href = 'http://maps.apple.com/?saddr=current_location&daddr=' + _href;
			} else if ($.browser.platform == 'windows phone') {
				_href = 'maps:' + _href;
			} else {
				return;
			}
			
			$(this).replaceWith($("<a/>", {"class" : settings.cssClasses, "href" : _href}).html(settings.linkTitle ? settings.linkTitle : _address));
		
		});
		
	}

}(jQuery));