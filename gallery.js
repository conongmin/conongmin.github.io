// 스크롤 연동 3D 전시: 처음엔 글자만 보이고, 내릴수록 작품이 멀리서 커지며 다가옵니다.
window.initGallery = function (stage) {
  var pin = stage.querySelector(".pin");
  var hero = stage.querySelector(".hero");
  var deck = stage.querySelector(".deck");
  var cards = Array.prototype.slice.call(stage.querySelectorAll(".card"));
  var counter = stage.querySelector(".counter");
  var num = counter.querySelector(".num");
  var name = counter.querySelector(".name");
  var bar = counter.querySelector(".bar i");
  var n = cards.length;
  var W, H, intro, step, spacing, depth, cur = -1, raf = 0, active = -1, alive = true;
  var mx = 0, my = 0, tx = 0, ty = 0;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function ease(k) { return k * k * (3 - 2 * k); }

  function size() {
    W = window.innerWidth; H = window.innerHeight;
    var phone = W < 800;
    var maxH = Math.min(H * (phone ? 0.62 : 0.68), H - 190);
    cards.forEach(function (c) {
      var r = parseFloat(c.dataset.r);
      var w = Math.min(maxH * r, W * (phone ? 0.84 : 0.56));
      c.style.setProperty("--w", Math.round(w) + "px");
      c.style.setProperty("--fh", Math.round(w / r) + "px");
    });
    intro = H * 1.15;
    step = Math.max(H * 0.62, 420);
    spacing = phone ? W * 0.66 : Math.min(W * 0.31, 480);
    depth = phone ? 170 : 300;
    stage.style.height = Math.round(H + intro + step * (n - 1) + H * 0.3) + "px";
    cur = -1;
  }

  function apply(y) {
    var a = clamp(y / intro, 0, 1);
    var g = clamp((y - intro) / step, 0, n - 1);

    // 제목은 카메라 쪽으로 다가오다 지나갑니다.
    var k = clamp(y / (intro * 0.56), 0, 1), kk = ease(k);
    hero.style.opacity = (1 - kk).toFixed(3);
    hero.style.transform = "translate3d(0," + (-kk * 40).toFixed(1) + "px," + (kk * 520).toFixed(1) + "px)";
    hero.style.visibility = k >= 1 ? "hidden" : "visible";
    hero.style.pointerEvents = k > 0.3 ? "none" : "auto";

    for (var i = 0; i < n; i++) {
      var c = cards[i], d = i - g, ad = Math.abs(d);
      // 가까운 카드부터 차례로 멀리서 날아옵니다.
      var ai = ease(clamp((a - 0.1 - ad * 0.08) / 0.78, 0, 1));
      var x = d * spacing * (0.3 + 0.7 * ai);
      var z = -ad * depth - (1 - ai) * 2600 + Math.max(0, 1 - ad) * 70;
      var yy = (1 - ai) * 70 + Math.pow(ad, 1.2) * 12;
      var ry = clamp(-d * 36, -64, 64) * (0.35 + 0.65 * ai);
      var rx = (1 - ai) * 26;
      var o = clamp(ai * 2.2, 0, 1) * clamp(3.7 - ad, 0, 1);
      c.style.transform = "translate3d(" + x.toFixed(1) + "px," + yy.toFixed(1) + "px," + z.toFixed(1) + "px) rotateY(" + ry.toFixed(2) + "deg) rotateX(" + rx.toFixed(2) + "deg)";
      c.style.opacity = o.toFixed(3);
      c.style.visibility = o <= 0.001 ? "hidden" : "visible";
      c.style.pointerEvents = o > 0.5 && ai > 0.7 ? "auto" : "none";
      c.style.setProperty("--shade", clamp(ad * 0.34 + (1 - ai) * 0.5, 0, 0.74).toFixed(3));
      c.style.setProperty("--cap", clamp(1.15 - ad * 1.5, 0, 1).toFixed(3));

      var v = c.querySelector("video");
      if (v) {
        var want = a > 0.3 && ad < 1.6;
        if (want && v.paused) {
          if (!v.getAttribute("src")) v.src = v.dataset.src;
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else if (!want && !v.paused) { v.pause(); }
      }
    }

    var idx = Math.round(g);
    if (idx !== active) {
      active = idx;
      num.textContent = String(idx + 1).padStart(2, "0") + " / " + String(n).padStart(2, "0");
      name.textContent = cards[idx].dataset.title;
    }
    counter.style.opacity = clamp((a - 0.72) / 0.25, 0, 1).toFixed(3);
    bar.style.transform = "scaleX(" + ((g + 1) / n).toFixed(3) + ")";
  }

  function frame() {
    if (!alive) return;
    raf = window.requestAnimationFrame(frame);
    var r = stage.getBoundingClientRect();
    if (r.bottom < -300 || r.top > H + 300) return;
    var target = -r.top;
    var next = cur < 0 ? target : cur + (target - cur) * (W < 800 ? 0.24 : 0.13);
    if (Math.abs(target - next) < 0.2) next = target;
    mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
    deck.style.transform = "rotateY(" + (mx * 3.2).toFixed(2) + "deg) rotateX(" + (-my * 2.4).toFixed(2) + "deg)";
    if (next !== cur) { cur = next; apply(Math.max(0, cur)); }
  }

  function onMove(e) {
    if (e.pointerType === "touch") return;
    tx = (e.clientX / W - 0.5) * 2; ty = (e.clientY / H - 0.5) * 2;
  }
  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(size, 140); }
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("resize", onResize);

  function top() { return stage.getBoundingClientRect().top + window.scrollY; }
  // 키보드로 카드에 이동하면 그 카드가 가운데로 옵니다.
  cards.forEach(function (c, i) {
    c.addEventListener("focus", function () { if (c.matches(":focus-visible")) window.scrollTo({ top: top() + intro + step * i, behavior: "instant" }); });
    c.addEventListener("click", function () { var v = c.querySelector("video"); if (v) v.pause(); });
  });
  cards.forEach(function (c) { var v = c.querySelector("video"); if (v) v.addEventListener("error", function () { v.remove(); }); });

  size();
  apply(Math.max(0, -stage.getBoundingClientRect().top));
  raf = window.requestAnimationFrame(frame);

  return {
    startY: function () { return top() + intro; },
    destroy: function () {
      alive = false; window.cancelAnimationFrame(raf); clearTimeout(rt);
      window.removeEventListener("pointermove", onMove); window.removeEventListener("resize", onResize);
    }
  };
};
