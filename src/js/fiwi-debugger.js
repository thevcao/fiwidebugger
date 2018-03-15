(function () {
  var uaInfo = {
    ua: '',
    is: function (t) {
      return RegExp(t, "i").test(uaInfo.ua);
    },
    version: function (p, n) {
      n = n.replace(".", "_");
      var i = n.indexOf('_'),
        ver = "";
      while (i > 0) {
        ver += " " + p + n.substring(0, i);
        i = n.indexOf('_', i + 1);
      }
      ver += " " + p + n;
      return ver;
    },
    getBrowser: function () {
      var g = 'gecko',
        w = 'webkit',
        c = 'chrome',
        f = 'firefox',
        s = 'safari',
        o = 'opera',

        ua = uaInfo.ua,
        is = uaInfo.is;

      return [
        (!(/opera|webtv/i.test(ua)) && /msie\s(\d+)/.test(ua)) ? ('ie ie' + (/trident\/4\.0/.test(ua) ? '8' : RegExp.$1))
        : is('edge\/') ? 'edge ie' + (/edge\/(\d+)\.(\d+)/.test(ua) ? RegExp.$1 + ' ie' + RegExp.$1 + '_' + RegExp.$2 : '') // IE Edge
        : is('trident\/') ? 'ie ie' + (/trident\/.+rv:(\d+)/i.test(ua) ? RegExp.$1 : '') //ie11+
        : is('firefox/') ? g + " " + f + (/firefox\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + f + RegExp.$2 + ' ' + f + RegExp.$2 + "_" + RegExp.$4 : '')
        : is('gecko/') ? g
        : is('opera') ? o + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + o + RegExp.$2 + ' ' + o + RegExp.$2 + "_" + RegExp.$4 : (/opera(\s|\/)(\d+)\.(\d+)/.test(ua) ? ' ' + o + RegExp.$2 + " " + o + RegExp.$2 + "_" + RegExp.$3 : ''))
        : is('konqueror') ? 'konqueror'
        : is('chrome') ? w + ' ' + c + (/chrome\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + c + RegExp.$2 + ((RegExp.$4 > 0) ? ' ' + c + RegExp.$2 + "_" + RegExp.$4 : '') : '')
        : is('iron') ? w + ' iron'
        : is('applewebkit/') ? (w + ' ' + s + (/version\/((\d+)(\.(\d+))(\.\d+)*)/.test(ua) ? ' ' + s + RegExp.$2 + " " + s + RegExp.$2 + RegExp.$3.replace('.', '_') : (/ Safari\/(\d+)/i.test(ua) ? ((RegExp.$1 == "419" || RegExp.$1 == "417" || RegExp.$1 == "416" || RegExp.$1 == "412") ? ' ' + s + '2_0' : RegExp.$1 == "312" ? ' ' + s + '1_3' : RegExp.$1 == "125" ? ' ' + s + '1_2' : RegExp.$1 == "85" ? ' ' + s + '1_0' : '') : ''))) //applewebkit
        : is('mozilla/') ? g : ''
    ];
    },
    getPlatform: function () {
      var wp = 'winphone',
        a = 'android',
        bb = 'blackberry',
        dv = 'device_',

        ua = uaInfo.ua,
        version = uaInfo.version,
        is = uaInfo.is;

      return [
      is('j2me') ? 'j2me'
      : is('windows phone') ? (wp + (/Windows Phone (\d+)(\.(\d+))+/i.test(ua) ? " " + wp + RegExp.$1 + " " + wp + RegExp.$1 + RegExp.$2.replace('.', '_') : (/Windows Phone OS (\d+)(\.(\d+))+/i.test(ua) ? " " + wp + RegExp.$1 + " " + wp + RegExp.$1 + RegExp.$2.replace('.', '_') : ''))) // Windows Phone
      : is('blackberry') ? (bb + (/Version\/(\d+)(\.(\d+)+)/i.test(ua) ? " " + bb + RegExp.$1 + " " + bb + RegExp.$1 + RegExp.$2.replace('.', '_') : (/Blackberry ?(([0-9]+)([a-z]?))[\/|;]/gi.test(ua) ? ' ' + bb + RegExp.$2 + (RegExp.$3 ? ' ' + bb + RegExp.$2 + RegExp.$3 : '') : ''))) // blackberry
      : is('android') ? (a + (/Version\/(\d+)(\.(\d+))+/i.test(ua) ? " " + a + RegExp.$1 + " " + a + RegExp.$1 + RegExp.$2.replace('.', '_') : '') + (/Android (.+); (.+) Build/i.test(ua) ? ' ' + dv + ((RegExp.$2).replace(/ /g, "_")).replace(/-/g, "_") : '')) //android
      : is('ipad|ipod|iphone') ? (
          (/CPU( iPhone)? OS (\d+[_|\.]\d+([_|\.]\d+)*)/i.test(ua) ? 'ios' + version('ios', RegExp.$2) : '') + ' ' + (/(ip(ad|od|hone))/gi.test(ua) ? RegExp.$1 : "")) //'iphone'
      //:is('ipod')?'ipod'
      //:is('ipad')?'ipad'
      : is('playbook') ? 'playbook'
      : is('kindle|silk') ? 'kindle'
      : is('playbook') ? 'playbook'
      : is('mac') ? 'mac' + (/mac os x ((\d+)[.|_](\d+))/.test(ua) ? (' mac' + (RegExp.$2) + ' mac' + (RegExp.$1).replace('.', "_")) : '')
      : is('win') ? 'win' + (is('windows nt 10.0') ? ' win10' : is('windows nt 6.3') ? ' win8_1' : is('windows nt 6.2') ? ' win8' : is('windows nt 6.1') ? ' win7' : is('windows nt 6.0') ? ' vista' : is('windows nt 5.2') || is('windows nt 5.1') ? ' win_xp' : is('windows nt 5.0') ? ' win_2k' : is('windows nt 4.0') || is('WinNT4.0') ? ' win_nt' : '')
      : is('freebsd') ? 'freebsd'
      : is('x11|linux') ? 'linux' : ''
    ];
    },
    getMobile: function () {
      var is = uaInfo.is;
      return [
      is("android|mobi|mobile|j2me|iphone|ipod|ipad|blackberry|winphone|playbook|kindle|silk") ? 'mobile' : ''
    ];
    },
    getIpadApp: function () {
      var is = uaInfo.is;
      return [
        (is('ipad|iphone|ipod') && !is('safari')) ? 'ipad_app' : ''
    ];
    },
    getLang: function () {
      var ua = uaInfo.ua;

      return [
      /[; |\[](([a-z]{2})(\-[a-z]{2})?)[)|;|\]]/i.test(ua) ? ('lang_' + RegExp.$2).replace("-", "_") + (RegExp.$3 != '' ? (' ' + 'lang_' + RegExp.$1).replace("-", "_") : '') : ''
    ];
    }
  }

  if (typeof html == 'undefined') {
    html = document.documentElement;
  }

  var screenInfo = {
    width: (window.outerWidth || html.clientWidth) - 15,
    height: window.outerHeight || html.clientHeight,
    screens: [0, 768, 980, 1200],

    screenSize: function () {
      screenInfo.width = (window.outerWidth || html.clientWidth) - 15;
      screenInfo.height = window.outerHeight || html.clientHeight;

      var screens = screenInfo.screens,
        i = screens.length,
        arr = [],
        maxw,
        minw;

      while (i--) {
        if (screenInfo.width >= screens[i]) {
          if (i) {
            arr.push("minw_" + screens[(i)]);
          }
          if (i <= 2) {
            arr.push("maxw_" + (screens[(i) + 1] - 1));
          }
          break;
        }
      }
      return arr;
    },
    getOrientation: function () {
      return screenInfo.width < screenInfo.height ? ["orientation_portrait"] : ["orientation_landscape"];
    },
    getInfo: function () {
      var arr = [];
      arr = arr.concat(screenInfo.screenSize());
      arr = arr.concat(screenInfo.getOrientation());
      return arr;
    },
    getPixelRatio: function () {
      var arr = [],
        pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;

      if (pixelRatio > 1) {
        arr.push('retina_' + parseInt(pixelRatio) + 'x');
        arr.push('hidpi');
      } else {
        arr.push('no-hidpi');
      }
      return arr;
    }
  }

  var dataUriInfo = {
    data: new Image(),
    div: document.createElement("div"),
    isIeLessThan9: false,
    getImg: function () {

      dataUriInfo.data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      dataUriInfo.div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
      dataUriInfo.isIeLessThan9 = dataUriInfo.div.getElementsByTagName("i").length == 1;

      return dataUriInfo.data;
    },
    checkSupport: function () {
      if (dataUriInfo.data.width != 1 || dataUriInfo.data.height != 1 || dataUriInfo.isIeLessThan9) {
        return ["no-datauri"];
      } else {
        return ["datauri"];
      }
    }

  }

  function css_browser_selector(u, ns) {
    var html = document.documentElement,
      b = []
    ns = ns ? ns : "";

    /* ua */
    uaInfo.ua = u.toLowerCase();
    b = b.concat(uaInfo.getBrowser());
    b = b.concat(uaInfo.getPlatform());
    b = b.concat(uaInfo.getMobile());
    b = b.concat(uaInfo.getIpadApp());
    b = b.concat(uaInfo.getLang());


    /* js */
    b = b.concat(['js']);

    /* pixel ratio */
    b = b.concat(screenInfo.getPixelRatio());

    /* screen */
    b = b.concat(screenInfo.getInfo());

    var updateScreen = function () {
      html.className = html.className.replace(/ ?orientation_\w+/g, "").replace(/ [min|max|cl]+[w|h]_\d+/g, "");
      html.className = html.className + ' ' + screenInfo.getInfo().join(' ');
    }

    if (window.addEventListener) {
      window.addEventListener('resize', updateScreen);
      window.addEventListener('orientationchange', updateScreen);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', updateScreen);
    }

    /* dataURI */
    var data = dataUriInfo.getImg();
    data.onload = data.onerror = function () {
      html.className += ' ' + dataUriInfo.checkSupport().join(' ');
    }


    /* save & add existing html classes */
    var classes = html.className;
    var classesArray = classes.split(/ /);

    /* merge existing classes on html tag */
    b = b.concat(classesArray);

    /* removendo itens invalidos do array */
    /* add filter function polyfill for IE8 */
    if (!Array.prototype.filter) {
      Array.prototype.filter = function (fun /*, thisArg*/ ) {
        'use strict';

        if (this === void 0 || this === null) {
          throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
          throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t) {
            var val = t[i];

            // NOTE: Technically this should Object.defineProperty at
            //			 the next index, as push can be affected by
            //			 properties on Object.prototype and Array.prototype.
            //			 But that method's new, and collisions should be
            //			 rare, so use the more-compatible alternative.
            if (fun.call(thisArg, val, i, t)) {
              res.push(val);
            }
          }
        }

        return res;
      };
    }

    b = b.filter(function (e) {
      /* if no-js class exists, remove it */
      if (e === 'no-js') {
        return false;
      }
      return e;
    });

    /* prefixo do namespace */
    b[0] = ns ? ns + b[0] : b[0];
    html.className = b.join(' ' + ns);
    return html.className;
  }

  // Add css_browser_selector as a global object.
  window.css_browser_selector = css_browser_selector;
})();

// define css_browser_selector_ns before loading this script to assign a namespace

if (css_browser_selector_ns != "") {


  var css_browser_selector_ns = css_browser_selector_ns || "";
  // init
  css_browser_selector(navigator.userAgent, css_browser_selector_ns);

}




(function () {


  var env = document.URL;

  if (env.includes("staging") || env.includes("local")) {


    var css = '@import "https://s3.amazonaws.com/fw-devtools/fiwi-debugger/css/style.min.css"; .fiwi-debugger {position: fixed; opacity: 0};',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    function create(htmlStr) {
      var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
      temp.innerHTML = htmlStr;
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      return frag;
    }

    var url = document.URL;

    var fiwiDebugger = create('<div class="prep-overlay" data-html2canvas-ignore></div><div class="fiwi-debugger" data-html2canvas-ignore><div class="debug-notice"><p><a href="#" class="notice-close"><i class="fa fa-close"></i></a>Things not looking right? <a href="#" onClick="window.location.reload(true)">Click here to Hard Refresh.</a></p></div><a href="#" title="Send System Information" class="info-toggle"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="467.356px" height="467.608px" viewBox="0 0 467.356 467.608" style="enable-background:new 0 0 467.356 467.608;" xml:space="preserve"><style type="text/css">.st0{fill:#EB3A24;}.st1{fill:#FFFFFF;}.st2{opacity:0;fill:#FFFFFF;}</style><g><path class="st0" d="M445.916,235.378c0-117.226-95.022-212.24-212.234-212.24c-117.218,0-212.241,95.015-212.241,212.24c0,117.208,95.023,212.23,212.241,212.23C350.893,447.608,445.916,352.586,445.916,235.378z"/><path class="st1" d="M233.681,23.138c117.212,0,212.234,95.015,212.234,212.24c0,117.208-95.022,212.23-212.234,212.23c-117.218,0-212.241-95.022-212.241-212.23C21.44,118.152,116.463,23.138,233.681,23.138 M233.681,3.138c-31.344,0-61.76,6.143-90.405,18.257c-27.658,11.698-52.493,28.439-73.815,49.761C48.14,92.478,31.397,117.312,19.699,144.97C7.583,173.615,1.44,204.033,1.44,235.378c0,31.341,6.143,61.756,18.259,90.399c11.698,27.656,28.441,52.49,49.763,73.811c21.322,21.321,46.157,38.064,73.814,49.761c28.645,12.115,59.061,18.258,90.405,18.258c31.342,0,61.758-6.143,90.402-18.259c27.656-11.698,52.491-28.44,73.812-49.761c21.322-21.321,38.064-46.155,49.762-73.811c12.116-28.643,18.259-59.058,18.259-90.399c0-31.345-6.143-61.763-18.259-90.408c-11.698-27.658-28.44-52.492-49.762-73.814c-21.321-21.321-46.156-38.063-73.812-49.761C295.439,9.28,265.024,3.138,233.681,3.138L233.681,3.138z"/></g><g id="info"><path class="st1" d="M291.143,330.743c-1.187-1.738-3.463-2.357-5.364-1.456c-21.031,9.956-44.9,20.481-49.585,21.401c-0.118-0.105-0.305-0.298-0.551-0.63c-0.635-0.86-0.944-1.983-0.944-3.435c0-11.896,8.979-48.085,26.686-107.556c14.93-49.968,16.656-60.314,16.656-63.749c0-5.303-2.03-9.783-5.873-12.958c-3.651-3.011-8.751-4.536-15.159-4.536c-10.659,0-23.013,4.047-37.768,12.372c-14.298,8.07-30.245,21.739-47.393,40.626c-1.342,1.479-1.483,3.691-0.338,5.328c1.146,1.638,3.272,2.262,5.121,1.509c6.02-2.457,36.276-14.851,40.686-17.621c3.611-2.264,6.737-3.413,9.292-3.413c0.092,0,0.17,0.003,0.236,0.009c0.031,0.169,0.06,0.428,0.06,0.798c0,2.607-0.536,5.693-1.588,9.157c-25.782,83.534-38.315,134.743-38.315,156.556c0,7.698,2.14,13.895,6.358,18.418c4.299,4.614,10.098,6.953,17.235,6.953c7.606,0,16.864-3.177,28.301-9.714c11.067-6.324,27.959-20.236,51.642-42.534C292.074,334.825,292.33,332.482,291.143,330.743z"/><path class="st1" d="M290.316,88.73c-4.213-4.313-9.605-6.499-16.023-6.499c-7.991,0-14.95,3.158-20.683,9.386c-5.641,6.126-8.502,13.642-8.502,22.34c0,6.872,2.107,12.568,6.262,16.927c4.211,4.425,9.53,6.668,15.807,6.668c7.664,0,14.586-3.335,20.573-9.912c5.883-6.462,8.866-14.059,8.866-22.58C296.616,98.511,294.497,93.018,290.316,88.73z"/></g><path id="close" class="st2" d="M341.377,176.701c2.112-2.816,3.168-5.983,3.168-9.503c0-3.52-1.056-6.336-3.168-8.448l-24.285-24.285c-2.112-2.112-4.928-3.168-8.448-3.168c-3.52,0-6.687,1.056-9.503,3.168l-65.464,65.464l-65.464-65.464c-2.816-2.112-5.983-3.168-9.503-3.168c-3.52,0-6.336,1.056-8.448,3.168l-24.285,24.285c-2.112,2.112-3.168,4.928-3.168,8.448c0,3.52,1.056,6.687,3.168,9.503l65.464,65.464l-65.464,65.464c-2.112,2.816-3.168,5.983-3.168,9.503s1.056,6.336,3.168,8.448l24.285,24.285c2.112,2.112,4.928,3.169,8.448,3.169c3.52,0,6.687-1.057,9.503-3.169l65.464-65.464l65.464,65.464c2.816,2.112,5.983,3.169,9.503,3.169c3.52,0,6.336-1.057,8.448-3.169l24.285-24.285c2.112-2.112,3.168-4.928,3.168-8.448s-1.056-6.687-3.168-9.503l-65.464-65.464L341.377,176.701z"/></svg></a><div class="form-container"><p>System Info</p><input class="debug-info" value="" onclick="this.select()" disabled=""><p>Screen Size</p><input class="screen" value="" disabled><p>Window Size</p><input class="window" value="" disabled><p>Scroll Position</p><input class="position" value="" disabled><p>Send to: </p><input id="pm" placeholder="Your Project Manager @findsomewinmore.com" onclick="this.select()"><br><a id="prepareScreen" href="#"><i class="fa fa-image"></i> Prepare Screenshot</a><a id="downloadLnk" download="' + url + '.jpeg" href="#" style="display:none;"><i class="fa fa-download"></i> Download Screenshot</a><a href="#" class="send"><i class="fa fa-paper-plane"></i>Send System Info</a></div></div>');
    document.body.insertBefore(fiwiDebugger, document.body.childNodes[0]);





    var version = document.getElementsByTagName("html")[0].getAttribute("class");
    var screenSize = screen.width + ' x ' + screen.height;
    var windowSize = window.innerWidth + ' x ' + window.innerHeight;
    var position = '0';
    var img = ''

    function getScreenshot() {


//      html2pdf(element, {
//          margin: 0,
//          filename: 'attachme.pdf',
//          image: {
//              type: 'jpeg',
//              quality: 0.75
//          },
//          html2canvas: {
//              dpi: 192,
//              letterRendering: false,
////              type: 'view'
//          },
//          jsPDF: {
//              unit: 'in',
//              format: 'letter',
//              orientation: 'portrait'
//          }
//      });




    }

      function prep(e) {


      e.preventDefault();

        var position = document.querySelector('.position').value;

        document.getElementsByTagName("html")[0].classList.add('prepare-screenshot');

        console.log('Start screenshot at: ' + position);
        var crop = eval(document.querySelector('.position').value) + window.innerHeight;
        console.log('End at screenshot at: ' + crop);

        html2canvas( document.getElementsByTagName("html")[0], {
//          allowTaint: true,
//          type: 'view',
//          removeContainer: true,
          logging: false,
//          scale: 1,
          y: eval(document.querySelector('.position').value),
//          scrollY: ,
          backgroundColor: '#ffffff',
          height: window.innerHeight
        }).then(function (canvas) {

        var elm = canvas;
        var wrapper = document.createElement('div');
        wrapper.classList.add('screenshot');
//        elm.parentNode.insertBefore(wrapper, el);
        document.body.appendChild(wrapper, elm);
        wrapper.appendChild(elm);
        document.getElementsByTagName("html")[0].classList.add('finished-screenshot');

        setTimeout(function(){
          document.getElementsByTagName("html")[0].classList.add('finished-finished');
        }, 750);
        document.getElementById('prepareScreen').style.display="none";
        document.getElementById('downloadLnk').style.display="block";
      });





      }


      window.addEventListener('scroll', function() {
             var position = window.pageYOffset;
             document.querySelector('.position').value = position;

      });

      function download() {

//      e.preventDefault();

        var dt = document.querySelector('.screenshot canvas').toDataURL('image/jpeg', 0.75);
        this.href = dt;

        document.getElementsByTagName("html")[0].classList.remove('prepare-screenshot');
        document.getElementsByTagName("html")[0].classList.remove('finished-screenshot');
        document.getElementsByTagName("html")[0].classList.remove('finished-finished');
        document.getElementById('prepareScreen').style.display="block";
        document.getElementById('downloadLnk').style.display="none";
        document.querySelector('.screenshot').parentNode.removeChild(document.querySelector('.screenshot'));



      }

      document.getElementById('prepareScreen').addEventListener('click', prep);
      document.getElementById('downloadLnk').addEventListener('click', download, false);

    //    html2canvas(document.body, { type: 'view' }).then(function(canvas) {
    //        var img = canvas.toDataURL("image/png");
    //        var data = canvas.toDataURL();
    //        var img  = document.createElement('img');
    //        img.setAttribute('download','myImage.png');
    //        img.src  = 'data:image/png;base64,' + data;
    //    });

    getInfo();

    function getInfo() {

      var version = document.getElementsByTagName("html")[0].getAttribute("class");
      var screenSize = screen.width + ' x ' + screen.height;
      var windowSize = window.innerWidth + ' x ' + window.innerHeight;
      var position = window.pageYOffset;
      document.querySelector('.debug-info').value = version;
      document.querySelector('.window').value = windowSize;
      document.querySelector('.screen').value = screenSize;
      document.querySelector('.position').value = position;



    }

    var toggle = document.querySelector('.info-toggle');
    toggle.addEventListener("click", toggleInfo);

    function toggleInfo(e) {
      e.preventDefault();

      getInfo();

      var info = document.querySelector('.fiwi-debugger') // Using a class instead, see note below.
      info.classList.toggle('active');
      document.getElementsByTagName("html")[0].classList.remove('prepare-screenshot');
      document.getElementsByTagName("html")[0].classList.remove('finished-screenshot');

    }

    //        var entered = '';
    var pmInput = document.querySelector('#pm');
    pmInput.onkeydown = function (evt) {
      evt = evt || window.event;
      keyPress(evt);
    };

    pmInput.onkeyup = function (evt) {
      evt = evt || window.event;
      keyPress(evt);
    };

    function keyPress() {

      var inp = String.fromCharCode(event.keyCode);
      if (/[a-zA-Z0-9-_ ]/.test(inp)) {

        var entered = document.querySelector('#pm').value;
        var entered = entered.replace('@findsomewinmore.com', '');
        document.querySelector('#pm').value = entered + '@findsomewinmore.com';

        if (entered.length >= 4) {

          document.querySelector('.fiwi-debugger .send').classList.remove('disabled')

        } else {

          document.querySelector('.fiwi-debugger .send').classList.add('disabled')

        }

      }

    }

//    var infolink = document.querySelector('.fiwi-debugger .pop');
//    infolink.addEventListener('click', windowPop);
//
//    function windowPop(e) {
//      e.preventDefault();
//
//      var poplink = infolink.getAttribute("href");
//      newwindow = window.open(poplink, 'name', 'height=1800,width=1200');
//      if (window.focus) {
//        newwindow.focus()
//      }
//
//
//
//    }
    var noticeClose = document.querySelector('.notice-close');
    document.querySelector('.notice-close').addEventListener('click', debugDismiss);

    function debugDismiss(e) {
      e.preventDefault();

      document.querySelector('.debug-notice').classList.add('disabled');


    }

    var debugSend = document.querySelector('.fiwi-debugger .send');
    debugSend.addEventListener('click', infoSend);

    function infoSend(e) {
      e.preventDefault();
      var version = document.getElementsByTagName("html")[0].getAttribute("class");
      var pm = document.getElementById('pm').value;
      var url = document.URL;
      getInfo();
      var position = document.querySelector('.position').value;

        document.getElementsByTagName("html")[0].classList.remove('prepare-screenshot');
        document.getElementsByTagName("html")[0].classList.remove('finished-screenshot');
        document.getElementsByTagName("body")[0].transform = '';

      var send = 'mailto:' + pm + '?subject=System%20Debug%20Information%20for%3A%20' + url + '&body=Website%3A%20' + url + '%0AScreen Size%3A%20' + screenSize + '%0AWindow Size%3A%20' + windowSize + '%0AScroll Position%3A%20' + position + '%0ASystem Info%3A%20' + version;
//
//      setTimeout(function(){
//        window.location = send;
//      }, 5000);

      window.location = send;

      document.querySelector('.fiwi-debugger').classList.remove('active');
      //          $('.fiwi-debugger .form-container').slideUp(500);
      return false;
    }

  }

})();
