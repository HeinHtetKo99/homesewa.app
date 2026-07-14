/** Inline boot script: paints roadblock overlay before React hydrates. */
export const ROADBLOCK_BOOT_SCRIPT = `(function(){
  try {
    var COOKIE = "homesewa_roadblock";
    var EVENT = "homesewa:roadblock-done";
    var DISPLAY_MS = 6000;
    var CLOSE_DELAY_MS = 3000;
    var DEFAULT_SRC = "/roadblock/default/default.jpg";

    function todayKey() {
      var d = new Date();
      var m = String(d.getMonth() + 1).padStart(2, "0");
      var day = String(d.getDate()).padStart(2, "0");
      return d.getFullYear() + "-" + m + "-" + day;
    }

    function getCookie(name) {
      var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : null;
    }

    function markSeen() {
      var midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      var maxAge = Math.max(1, Math.ceil((midnight.getTime() - Date.now()) / 1000));
      document.cookie = COOKIE + "=" + encodeURIComponent(todayKey()) + "; path=/; max-age=" + maxAge + "; SameSite=Lax";
    }

    function done() {
      window.__HS_ROADBLOCK_DONE = true;
      try { window.dispatchEvent(new Event(EVENT)); } catch (e) {}
    }

    if (getCookie(COOKIE) === todayKey()) {
      done();
      return;
    }

    var months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
    var now = new Date();
    var month = months[now.getMonth()];
    var day = now.getDate();
    var candidates = [
      "/roadblock/" + month + "/" + day + ".jpg",
      "/roadblock/" + month + "/default.jpg",
      DEFAULT_SRC
    ];

    markSeen();
    document.documentElement.classList.add("hs-roadblock-active");
    if (document.body) {
      document.body.classList.add("hideScroll");
      document.body.classList.remove("showScroll");
    }

    var root = document.createElement("div");
    root.id = "homesewa-roadblock";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "Advertisement");
    root.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:#d0d0d0";
    root.innerHTML = '<div class="hs-roadblock__inner" style="position:relative"><button type="button" class="hs-roadblock__close" disabled aria-label="Close advertisement" style="display:none;position:absolute;top:-10px;right:-10px;z-index:10;width:40px;height:40px;border:0;border-radius:50%;background:#055d59;color:#fff;font-size:20px;font-weight:bold;cursor:not-allowed;text-align:center">3</button><img class="hs-roadblock__img" alt="Advertisement" style="visibility:hidden;display:block;width:min(550px,92vw);height:min(550px,80vh);object-fit:contain;border-radius:3%" /></div>';

    function mount() {
      if (!document.body) {
        document.addEventListener("DOMContentLoaded", mount, { once: true });
        return;
      }
      document.body.classList.add("hideScroll");
      document.body.insertBefore(root, document.body.firstChild);
      start();
    }

    function loadImage(src) {
      return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() { resolve(src); };
        img.onerror = function() { reject(); };
        img.src = src;
      });
    }

    function resolveSrc() {
      var i = 0;
      function next() {
        if (i >= candidates.length) return Promise.reject();
        var src = candidates[i++];
        return loadImage(src).catch(next);
      }
      return next();
    }

    function close() {
      if (root.parentNode) root.parentNode.removeChild(root);
      document.documentElement.classList.remove("hs-roadblock-active");
      var lock = document.getElementById("hs-roadblock-lock");
      if (lock && lock.parentNode) lock.parentNode.removeChild(lock);
      if (document.body) {
        document.body.style.visibility = "";
        document.body.classList.remove("hideScroll");
        document.body.classList.add("showScroll");
      }
      done();
    }

    function start() {
      var btn = root.querySelector(".hs-roadblock__close");
      var imgEl = root.querySelector(".hs-roadblock__img");
      var left = 3;

      resolveSrc().then(function(src) {
        imgEl.src = src;
        imgEl.style.visibility = "visible";
        btn.style.display = "block";

        var auto = setTimeout(close, DISPLAY_MS);
        var tick = setInterval(function() {
          left -= 1;
          if (left <= 0) {
            clearInterval(tick);
            btn.disabled = false;
            btn.textContent = "X";
            btn.style.cursor = "pointer";
          } else {
            btn.textContent = String(left);
          }
        }, 1000);

        setTimeout(function() {
          btn.disabled = false;
          btn.textContent = "X";
          btn.style.cursor = "pointer";
        }, CLOSE_DELAY_MS);

        btn.addEventListener("click", function() {
          if (btn.disabled) return;
          clearTimeout(auto);
          clearInterval(tick);
          close();
        });
      }).catch(function() {
        close();
      });
    }

    mount();
  } catch (e) {
    window.__HS_ROADBLOCK_DONE = true;
  }
})();`;
