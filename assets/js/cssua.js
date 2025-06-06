var cssua = (function (n, l, p) {
  var q = /\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,
    r = /([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,
    s = /\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,
    t = /\bsilk-accelerated=true\b/,
    u = /\bfluidapp\b/,
    v = /(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,
    w =
      /(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,
    x = /(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,
    k = {
      parse: function (b, d) {
        var a = {};
        d && (a.standalone = d);
        b = ('' + b).toLowerCase();
        if (!b) return a;
        for (var c, e, g = b.split(/[()]/), f = 0, k = g.length; f < k; f++)
          if (f % 2) {
            var m = g[f].split(';');
            c = 0;
            for (e = m.length; c < e; c++)
              if (q.exec(m[c])) {
                var h = RegExp.$1.split(' ').join('_'),
                  l = RegExp.$2;
                if (!a[h] || parseFloat(a[h]) < parseFloat(l)) a[h] = l;
              }
          } else if ((m = g[f].match(r)))
            for (c = 0, e = m.length; c < e; c++)
              (h = m[c].split(/[\/\s]+/)),
                h.length &&
                  'mozilla' !== h[0] &&
                  (a[h[0].split(' ').join('_')] = h.slice(1).join('-'));
        w.exec(b)
          ? ((a.mobile = RegExp.$1),
            s.exec(b) &&
              (delete a[a.mobile],
              (a.blackberry = a.version || RegExp.$3 || RegExp.$2 || RegExp.$1),
              RegExp.$1
                ? (a.mobile = 'blackberry')
                : '0.0.1' === a.version && (a.blackberry = '7.1.0.0')))
          : x.exec(b)
          ? ((a.game = RegExp.$1),
            (c = a.game.split(' ').join('_')),
            a.version && !a[c] && (a[c] = a.version))
          : v.exec(b) && (a.desktop = RegExp.$1);
        a.intel_mac_os_x
          ? ((a.mac_os_x = a.intel_mac_os_x.split('_').join('.')),
            delete a.intel_mac_os_x)
          : a.cpu_iphone_os
          ? ((a.ios = a.cpu_iphone_os.split('_').join('.')),
            delete a.cpu_iphone_os)
          : a.cpu_os
          ? ((a.ios = a.cpu_os.split('_').join('.')), delete a.cpu_os)
          : 'iphone' !== a.mobile || a.ios || (a.ios = '1');
        a.opera && a.version
          ? ((a.opera = a.version), delete a.blackberry)
          : t.exec(b)
          ? (a.silk_accelerated = !0)
          : u.exec(b) && (a.fluidapp = a.version);
        a.edge &&
          (delete a.applewebkit,
          delete a.safari,
          delete a.chrome,
          delete a.android);
        if (a.applewebkit)
          (a.webkit = a.applewebkit),
            delete a.applewebkit,
            a.opr && ((a.opera = a.opr), delete a.opr, delete a.chrome),
            a.safari &&
              (a.chrome ||
              a.crios ||
              a.fxios ||
              a.opera ||
              a.silk ||
              a.fluidapp ||
              a.phantomjs ||
              (a.mobile && !a.ios)
                ? (delete a.safari, a.vivaldi && delete a.chrome)
                : (a.safari =
                    a.version && !a.rim_tablet_os
                      ? a.version
                      : {
                          419: '2.0.4',
                          417: '2.0.3',
                          416: '2.0.2',
                          412: '2.0',
                          312: '1.3',
                          125: '1.2',
                          85: '1.0',
                        }[parseInt(a.safari, 10)] || a.safari));
        else if (a.msie || a.trident)
          if (
            (a.opera || (a.ie = a.msie || a.rv),
            delete a.msie,
            delete a.android,
            a.windows_phone_os)
          )
            (a.windows_phone = a.windows_phone_os), delete a.windows_phone_os;
          else {
            if (
              'wpdesktop' === a.mobile ||
              'xblwp7' === a.mobile ||
              'zunewp7' === a.mobile
            )
              (a.mobile = 'windows desktop'),
                (a.windows_phone =
                  9 > +a.ie ? '7.0' : 10 > +a.ie ? '7.5' : '8.0'),
                delete a.windows_nt;
          }
        else if (a.gecko || a.firefox) a.gecko = a.rv;
        a.rv && delete a.rv;
        a.version && delete a.version;
        return a;
      },
      format: function (b) {
        var d = '',
          a;
        for (a in b)
          if (a && b.hasOwnProperty(a)) {
            var c = a,
              e = b[a],
              c = c.split('.').join('-'),
              g = ' ua-' + c;
            if ('string' === typeof e) {
              for (
                var e = e.split(' ').join('_').split('.').join('-'),
                  f = e.indexOf('-');
                0 < f;

              )
                (g += ' ua-' + c + '-' + e.substring(0, f)),
                  (f = e.indexOf('-', f + 1));
              g += ' ua-' + c + '-' + e;
            }
            d += g;
          }
        return d;
      },
      encode: function (b) {
        var d = '',
          a;
        for (a in b)
          a &&
            b.hasOwnProperty(a) &&
            (d && (d += '\x26'),
            (d += encodeURIComponent(a) + '\x3d' + encodeURIComponent(b[a])));
        return d;
      },
    };
  k.userAgent = k.ua = k.parse(l, p);
  l = k.format(k.ua) + ' js';
  n.className = n.className
    ? n.className.replace(/\bno-js\b/g, '') + l
    : l.substr(1);
  return k;
})(document.documentElement, navigator.userAgent, navigator.standalone);
