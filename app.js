(function () {
  var D = window.PORTFOLIO;
  var app = document.getElementById("app");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pendingScroll = null;
  var firstHome = true;
  var observers = [];

  // 글자를 쪼개 시간차로 올라오게 합니다. 줄바꿈은 낱말 단위로 유지합니다.
  function splitTitle(text, accent) {
    var i = 0;
    return text.split(" ").map(function (word) {
      var isAccent = accent && word.indexOf(accent) === 0;
      var chars = Array.from(word).map(function (ch) {
        var delay = 240 + i * 34 + (i % 3) * 9; i++;
        return '<span class="ch" style="animation-delay:' + delay + 'ms">' + esc(ch) + '</span>';
      }).join("");
      return '<span class="word' + (isAccent ? " accent" : "") + '" aria-hidden="true">' + chars + '</span>' + (/,$/.test(word) ? '<br>' : '');
    }).join(" ");
  }

  function popChars(text) {
    return Array.from(text).map(function (ch, i) {
      return '<span class="pop" style="--i:' + i + '">' + esc(ch) + '</span>';
    }).join("");
  }

  function scrubWords(text) {
    return text.split(" ").map(function (w) { return '<span class="scrub">' + esc(w) + '</span>'; }).join(" ");
  }

  // 화면에 들어올 때 한 번만 재생합니다.
  function watch() {
    observers.forEach(function (o) { o.disconnect(); }); observers = [];
    var items = app.querySelectorAll("[data-reveal]");
    if (calm || !("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
    observers.push(io);
  }

  // 소개 문장은 스크롤에 맞춰 낱말이 차례로 밝아집니다.
  var scrubBound = false;
  function scrub() {
    var list = app.querySelectorAll(".scrub");
    var h = window.innerHeight;
    list.forEach(function (w, i) {
      var y = w.getBoundingClientRect().top;
      var k = calm ? 1 : Math.max(0, Math.min(1, (h * 0.86 - y) / (h * 0.26)));
      w.style.opacity = (0.22 + k * 0.78).toFixed(2);
    });
  }
  function bindScrub() { if (!scrubBound) { scrubBound = true; window.addEventListener("scroll", scrub, { passive: true }); window.addEventListener("resize", scrub); } scrub(); }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function card(w, idx) {
    var r = w.ratio === "9:16" ? "0.5625" : "1.7778";
    var f = w.videos[0].file;
    var win = /상$/.test(w.result) ? " win" : "";
    return '<a class="card" data-reveal style="--r:' + r + ';--d:' + Math.min(idx, 5) * 90 + 'ms" href="#/works/' + w.id + '">' +
      '<span class="frame"><img src="media/' + f + '.jpg" alt="">' +
      '<video data-src="media/' + f + '-preview.mp4" muted loop playsinline preload="none"></video>' +
      '<span class="badge' + win + '">' + esc(w.badge) + '</span></span>' +
      '<h3>' + esc(w.title) + '</h3><p>' + esc(w.kind) + ' · ' + esc(w.length) + '</p></a>';
  }

  function home() {
    app.innerHTML =
      '<div class="hero' + (firstHome && !calm ? " play" : " still") + '"><p class="eyebrow">' + esc(D.eyebrow) + '</p>' +
      '<h1 aria-label="' + esc(D.lead) + '">' + splitTitle(D.lead, "메시지") + '</h1>' +
      '<div class="cta"><a href="#/" data-go="works">작품 보기</a><a href="' + esc(D.channel) + '" target="_blank" rel="noopener">유튜브 채널 ↗</a></div></div>' +
      '<section id="works" class="rail-wrap" aria-label="작품">' +
      '<div class="rail">' + D.works.map(card).join("") + '</div>' +
      '<button class="arrow prev" aria-label="이전 작품">‹</button><button class="arrow next" aria-label="다음 작품">›</button></section>' +
      '<section class="block"><h2>결과</h2><div class="results">' +
      D.results.map(function (r, i) { return '<div data-reveal style="--d:' + i * 130 + 'ms"><strong>' + popChars(r.big) + '</strong><span>' + esc(r.text) + '</span></div>'; }).join("") +
      '</div></section>' +
      '<section class="block"><h2>소개</h2><div class="about">' +
      D.about.map(function (p) { return '<p>' + scrubWords(p) + '</p>'; }).join("") + '</div></section>' +
      '<section class="block" id="plans"><h2>기획</h2><div class="plans">' +
      D.plans.map(function (p, i) {
        return '<article data-reveal style="--d:' + i * 120 + 'ms"><h3>' + esc(p.title) + '</h3><small>' + esc(p.from) + '</small><ul>' +
          p.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join("") + '</ul></article>';
      }).join("") + '</div></section>' +
      '<section class="block"><h2>툴</h2><div class="skills">' +
      D.skills.map(function (s, i) { return '<span data-reveal style="--d:' + i * 38 + 'ms">' + esc(s) + '</span>'; }).join("") + '</div></section>' +
      '<section class="block contact" id="contact"><h2>연락</h2><a class="mail" data-reveal href="mailto:' + esc(D.email) + '">' + esc(D.email) + '</a><p class="channel"><a href="' + esc(D.channel) + '" target="_blank" rel="noopener">유튜브 채널 ↗</a></p></section>';

    if (window.setKineticLevel) window.setKineticLevel(1);
    firstHome = false;
    var heroEl = app.querySelector(".hero.play");
    if (heroEl) setTimeout(function () { heroEl.classList.add("done"); }, 2600);
    watch(); bindScrub();
    var go = app.querySelector("[data-go]");
    if (go) go.addEventListener("click", function (e) { e.preventDefault(); app.querySelector("#works").scrollIntoView(); });
    var rail = app.querySelector(".rail");
    function step(dir) { rail.scrollBy({ left: dir * Math.max(320, rail.clientWidth * 0.6), behavior: calm ? "auto" : "smooth" }); }
    app.querySelector(".prev").onclick = function () { step(-1); };
    app.querySelector(".next").onclick = function () { step(1); };

    if (!calm && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) {
            if (!v.src) v.src = v.dataset.src;
            var p = v.play(); if (p && p.catch) p.catch(function () {});
          } else { v.pause(); }
        });
      }, { threshold: 0.5 });
      app.querySelectorAll(".card video").forEach(function (v) {
        v.addEventListener("error", function () { v.remove(); });
        io.observe(v);
      });
    }
  }

  function player(v, w) {
    if (v.youtube) {
      return '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(v.youtube) + '" title="' + esc(w.title) + '" allowfullscreen></iframe>';
    }
    return '<video controls playsinline preload="metadata" poster="media/' + v.file + '.jpg" src="media/' + v.file + '.mp4"></video>';
  }

  function detail(id) {
    var i = D.works.findIndex(function (w) { return w.id === id; });
    if (i < 0) { location.hash = "#/"; return; }
    var w = D.works[i];
    var prev = D.works[(i + D.works.length - 1) % D.works.length];
    var next = D.works[(i + 1) % D.works.length];
    var rows = [["형식", w.kind + " · " + w.ratio + " · " + w.length], ["대상", w.context], ["결과", w.result], ["역할", w.role]];
    if (w.tools) rows.push(["툴", w.tools]);
    if (window.setKineticLevel) window.setKineticLevel(0.45);
    firstHome = false;
    app.innerHTML = '<article class="detail enter">' +
      '<div class="players ' + (w.ratio === "9:16" ? "tall" : "wide") + '">' + w.videos.map(function (v) { return player(v, w); }).join("") + '</div>' +
      '<div><a class="back" href="#/">← 전체 작품</a><h1>' + esc(w.title) + '</h1><p class="kind">' + esc(w.badge) + '</p><dl>' +
      rows.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join("") + '</dl><ul>' +
      w.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join("") + '</ul>' +
      (w.yt ? '<a class="yt" href="https://www.youtube.com/' + esc(w.yt) + '" target="_blank" rel="noopener">유튜브에서 보기 ↗</a>' : '') +
      '<div class="pager"><a href="#/works/' + prev.id + '">← ' + esc(prev.title) + '</a><a href="#/works/' + next.id + '">' + esc(next.title) + ' →</a></div>' +
      '</div></article>';
    document.title = w.title + " · 노호민 포트폴리오";
    window.scrollTo(0, 0);
  }

  function route() {
    var m = location.hash.match(/^#\/works\/([\w-]+)/);
    if (m) { detail(m[1]); return; }
    document.title = "노호민 포트폴리오";
    home();
    if (pendingScroll) {
      var t = document.getElementById(pendingScroll); pendingScroll = null;
      if (t) t.scrollIntoView();
    } else { window.scrollTo(0, 0); }
  }

  document.querySelectorAll("[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var id = a.dataset.scroll;
      var onHome = !/^#\/works\//.test(location.hash);
      if (onHome) { var t = document.getElementById(id); if (t) t.scrollIntoView(); }
      else { pendingScroll = id; location.hash = "#/"; }
    });
  });
  window.addEventListener("hashchange", route);
  route();
})();
