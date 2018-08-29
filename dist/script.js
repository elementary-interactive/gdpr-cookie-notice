// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent; // expose definition to window
}

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

//HEAD 
window["gdpr-cookie-notice-templates"] = {};

window["gdpr-cookie-notice-templates"]["bar.html"] = "<div class=\"gdpr-cookie-notice\">\n" +
    "  <p class=\"gdpr-cookie-notice-description\">{description}</p>\n" +
    "  <nav class=\"gdpr-cookie-notice-nav\">\n" +
    "    <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings\">{settings}</a>\n" +
    "    <a href=\"#\" class=\"gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn\">{accept}</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    ""; 

window["gdpr-cookie-notice-templates"]["category.html"] = "<li class=\"gdpr-cookie-notice-modal-cookie\">\n" +
    "  <div class=\"gdpr-cookie-notice-modal-cookie-row\">\n" +
    "    <h3 class=\"gdpr-cookie-notice-modal-cookie-title\">{title}</h3>\n" +
    "    <input type=\"checkbox\" name=\"gdpr-cookie-notice-{prefix}\" id=\"gdpr-cookie-notice-{prefix}\" class=\"gdpr-cookie-notice-modal-cookie-input\">\n" +
    "    <label class=\"gdpr-cookie-notice-modal-cookie-input-switch\" for=\"gdpr-cookie-notice-{prefix}\"></label>\n" +
    "  </div>\n" +
    "  <p class=\"gdpr-cookie-notice-modal-cookie-info\">{desc}</p>\n" +
    "</li>\n" +
    ""; 

window["gdpr-cookie-notice-templates"]["modal.html"] = "<div class=\"gdpr-cookie-notice-modal\">\n" +
    "  <div class=\"gdpr-cookie-notice-modal-content\">\n" +
    "    <div class=\"gdpr-cookie-notice-modal-header\">\n" +
    "      <h2 class=\"gdpr-cookie-notice-modal-title\">{settings}</h2>\n" +
    "      <button type=\"button\" class=\"gdpr-cookie-notice-modal-close\"></button>\n" +
    "    </div>\n" +
    "    <ul class=\"gdpr-cookie-notice-modal-cookies\"></ul>\n" +
    "    <div class=\"gdpr-cookie-notice-modal-footer\">\n" +
    "      <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement\">{statement}</a>\n" +
    "      <a href=\"#\" class=\"gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn\"><span>{save}</span></a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    ""; 
// END 
// Load locales
var gdprCookieNoticeLocales = {};

function gdprCookieNotice(config) {
  var namespace = 'gdprcookienotice';
  var pluginPrefix = 'gdpr-cookie-notice';
  var templates = window[pluginPrefix+'-templates'];
  var gdprCookies = Cookies.noConflict();
  var modalLoaded = false;
  var noticeLoaded = false;
  var cookiesAccepted = false;
  var defaultChecked = false;
  var categories = [];//['performance', 'analytics', 'marketing'];
  if(config.performance != false && config.performance.length) {
    categories.push('performance');
  }
  if(config.analytics != false && config.analytics.length) {
    categories.push('analytics');
    //categories['analytics'] = config.analytics;
  }
  if(config.marketing != false && config.marketing.length) {
    categories.push('marketing');
  //  categories['marketing'] = config.marketing;
  }
  if(config.defaultChecked) {
    defaultChecked = true;
  }

  // Default config options
  if(!config.locale) config.locale = 'en';
  if(!config.timeout) config.timeout = 500;
  if(!config.domain) config.domain = window.location.hostname;
  if(!config.expiration) config.expiration = 30;

  // Get the users current cookie selection
  var currentCookieSelection = getCookie();
  var cookiesAcceptedEvent = new CustomEvent('gdprCookiesEnabled', {detail: currentCookieSelection});

  // Show cookie bar if needed
  if(!currentCookieSelection) {
    showNotice();

    // Accept cookies on page scroll
    if(config.implicit) {
      acceptOnScroll();
    }
  } else {
    deleteCookies(currentCookieSelection);
    document.dispatchEvent(cookiesAcceptedEvent);
  }

  // Get gdpr cookie notice stored value
  function getCookie() {
    return gdprCookies.getJSON(namespace);
  }

  // Delete cookies if needed
  function deleteCookies(savedCookies) {
    var notAllEnabled = false;
    for (var i = 0; i < categories.length; i++) {
      if(config[categories[i]] && !savedCookies[categories[i]]) {
        for (var ii = 0; ii < config[categories[i]].length; ii++) {
          gdprCookies.remove(config[categories[i]][ii]);
          notAllEnabled = true;
        }
      }
    }
    if(!savedCookies && !gdprCookies) {
      showNotice();
    } else {
      hideNotice();
    }

    // Show the notice if not all categories are enabled
/*    if(notAllEnabled) {
      showNotice();
    } else {
      hideNotice();
    }*/
  }

  // Hide cookie notice bar
  function hideNotice() {
    if(document.documentElement.classList.parentNode) {
      document.documentElement.classList.parentNode.removeChild(pluginPrefix+'-loaded');
    }
  //  document.documentElement.classList.remove(pluginPrefix+'-loaded');
  }

  // Write gdpr cookie notice's cookies when user accepts cookies
  function acceptCookies(save) {
    var value = {
      date: new Date(),
      necessary: true,
    };
    categories.forEach(function(cat) {
      value[cat] = true;
    });
    // If request was coming from the modal, check for the settings
    if(save) {
      for (var i = 0; i < categories.length; i++) {
        value[categories[i]] = document.getElementById(pluginPrefix+'-cookie_'+categories[i]).checked;
      }
    }
    gdprCookies.set(namespace, value, { expires: config.expiration, domain: config.domain });
    deleteCookies(value);

    // Load marketing scripts that only works when cookies are accepted
    cookiesAcceptedEvent = new CustomEvent('gdprCookiesEnabled', {detail: value});
    document.dispatchEvent(cookiesAcceptedEvent);

  }

  // Show the cookie bar
  function buildNotice() {
    if(noticeLoaded) {
      return false;
    }

    var noticeHtml = localizeTemplate('bar.html', null);
    document.body.insertAdjacentHTML('beforeend', noticeHtml);

    // Load click functions
    setNoticeEventListeners();

    // Make sure its only loaded once
    noticeLoaded = true;
  }

  // Show the cookie notice
  function showNotice() {
    buildNotice();

    // Show the notice with a little timeout
    setTimeout(function(){
      document.documentElement.classList.add(pluginPrefix+'-loaded');
    }, config.timeout);
  }

  // Localize templates
  function localizeTemplate(template, prefix) {
    var str = templates[template];
    var data = gdprCookieNoticeLocales[config.locale];

    if(prefix) {
      prefix = prefix+'_';
    } else {
      prefix = '';
    }

    if (typeof str === 'string' && (data instanceof Object)) {
      for (var key in data) {
        return str.replace(/({([^}]+)})/g, function(i) {
          var key = i.replace(/{/, '').replace(/}/, '');

          if(key == 'prefix') {
            return prefix.slice(0, -1);
          }

          if(data[key]) {
            return data[key];
          } else if(data[prefix+key]) {
            return data[prefix+key];
          } else {
            return i;
          }
        });
      }
    } else {
      return false;
    }
  }

  // Build modal window
  function buildModal() {
    if(modalLoaded) {
      return false;
    }

    // Load modal template
    var modalHtml = localizeTemplate('modal.html', null);

    // Append modal into body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Get empty category list
    var categoryList = document.querySelector('.'+pluginPrefix+'-modal-cookies');

    //Load essential cookies
    categoryList.innerHTML += localizeTemplate('category.html', 'cookie_essential');
    var input = document.querySelector('.'+pluginPrefix+'-modal-cookie-input');
    var label = document.querySelector('.'+pluginPrefix+'-modal-cookie-input-switch');
    label.innerHTML = gdprCookieNoticeLocales[config.locale]['always_on'];
    label.classList.add(pluginPrefix+'-modal-cookie-state');
    if(label.classList.parentNode) {
      label.classList.parentNode.removeChild(pluginPrefix+'-modal-cookie-input-switch');
    }
    if(input.parentNode) {
      input.parentNode.removeChild(input);
    }


    // Load other categories if needed
    if(config.performance) categoryList.innerHTML += localizeTemplate('category.html', 'cookie_performance');
    if(config.analytics) categoryList.innerHTML += localizeTemplate('category.html', 'cookie_analytics');
    if(config.marketing) categoryList.innerHTML += localizeTemplate('category.html', 'cookie_marketing');

    // Load click functions
    setModalEventListeners();

    // Update checkboxes based on stored info(if any)
    if(currentCookieSelection) {
      if(config.performance) document.getElementById(pluginPrefix+'-cookie_performance').checked = currentCookieSelection.performance;
      if(config.analytics) document.getElementById(pluginPrefix+'-cookie_analytics').checked = currentCookieSelection.analytics;
      if(config.marketing) document.getElementById(pluginPrefix+'-cookie_marketing').checked = currentCookieSelection.marketing;
    } else {
      if(config.performance) document.getElementById(pluginPrefix+'-cookie_performance').checked = config.defaultChecked;
      if(config.analytics) document.getElementById(pluginPrefix+'-cookie_analytics').checked = config.defaultChecked;
      if(config.marketing) document.getElementById(pluginPrefix+'-cookie_marketing').checked = config.defaultChecked;
    }

    // Make sure modal is only loaded once
    modalLoaded = true;
  }

  // Show modal window
  function showModal() {
    buildModal();
    document.documentElement.classList.add(pluginPrefix+'-show-modal');
  }

  // Hide modal window
  function hideModal() {
    if(document.documentElement.classList.parentNode) {
      document.documentElement.classList.parentNode.removeChild(pluginPrefix+'-show-modal');
    }
    //document.documentElement.classList.remove(pluginPrefix+'-show-modal');
  }

  // Click functions in the notice
  function setNoticeEventListeners() {
    var settingsButton = document.querySelectorAll('.'+pluginPrefix+'-nav-item-settings')[0];
    var acceptButton = document.querySelectorAll('.'+pluginPrefix+'-nav-item-accept')[0];

    settingsButton.addEventListener('click', function(e) {
      e.preventDefault();
      showModal();
    });

    acceptButton.addEventListener('click', function(e) {
      e.preventDefault();
      acceptCookies();
    });

  }

  // Click functions in the modal
  function setModalEventListeners() {
    var closeButton = document.querySelectorAll('.'+pluginPrefix+'-modal-close')[0];
    var statementButton = document.querySelectorAll('.'+pluginPrefix+'-modal-footer-item-statement')[0];
    var categoryTitles = document.querySelectorAll('.'+pluginPrefix+'-modal-cookie-title');
    var saveButton = document.querySelectorAll('.'+pluginPrefix+'-modal-footer-item-save')[0];

    closeButton.addEventListener('click', function() {
      hideModal();
      return false;
    });

    statementButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(
        config.statement,
        '_blank'
      );
      //window.location.href = config.statement;
    });

    for (var i = 0; i < categoryTitles.length; i++) {
      categoryTitles[i].addEventListener('click', function() {
        this.parentNode.parentNode.classList.toggle('open');
        return false;
      });
    }

    saveButton.addEventListener('click', function(e) {
      e.preventDefault();
      saveButton.classList.add('saved');
      setTimeout(function(){
        saveButton.classList.parentNode.removeChild('saved');
      }, 1000);
      acceptCookies(true);
      setTimeout(function(){
        hideModal();
      }, 1000);
    });

  }

  // Settings button on the page somewhere
  var globalSettingsButton = document.querySelectorAll('.'+pluginPrefix+'-settings-button');
  if(globalSettingsButton) {
    for (var i = 0; i < globalSettingsButton.length; i++) {
      globalSettingsButton[i].addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
      });
    }
  }


  // Get document height
  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  // Check if at least page is 25% scrolled down
  function amountScrolled(){
    var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
    var docheight = getDocHeight();
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var trackLength = docheight - winheight;
    var pctScrolled = Math.floor(scrollTop/trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    if(pctScrolled > 25 && !cookiesAccepted) {
      cookiesAccepted = true;
      return true;
    } else {
      return false;
    }
  }

  // Accept cookies on scroll
  function acceptOnScroll() {
    window.addEventListener('scroll', function _listener() {
      if(amountScrolled()) {
        acceptCookies();
        window.removeEventListener('click', _listener);
      }
    });
  }

}

//Add strings
gdprCookieNoticeLocales.hu = {
  description: 'Ez a weboldal sütiket(cookie-kat) használ azért, hogy a weboldal működjön és jobb felhasználió élményt nyújtson. A Süti beállítások gombra kattintva több információt is megtudhat erről. Az oldal további használatával beleegyezik a sütik használatába.',
  settings: 'Süti beállítások',
  accept: 'Elfogadom',
  statement: 'Süti nyilatkozatunk',
  save: 'Mentés',
  always_on: 'Mindig betölt',
  cookie_essential_title: 'Szükséges sütik',
  cookie_essential_desc: 'Ezek a weboldal megfelelő megjelenéséhez szükséges sütik, amelyek nélkül nem működne a weboldal.',
  cookie_performance_title: 'Teljesítmény sütik',
  cookie_performance_desc: 'Ezek a sütik kiegészítő funkciókat támogatnak az oldalon, például eltárolja, hogy milyen nyelven böngészi a weboldalt. Ezek nélkül nem biztos, hogy minden megfelelően fog működni.',
  cookie_analytics_title: 'Statisztika sütik',
  cookie_analytics_desc: 'Ezeket azért használjuk, hogy tájékozódni tudjunk arról, mikor, hányan és hogyan használják a weboldalunkat. Ezekkel az adatokkal tudjuk később optimalizálni a weboldalunkat a megfelelő felhasználói élményért.',
  cookie_marketing_title: 'Marketing sütik',
  cookie_marketing_desc: 'Ezek a sütik segítenek nekünk a hirdetések kezelésében, célzásában.'
}
