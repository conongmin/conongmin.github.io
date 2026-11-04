// 배경 키네틱 타이포: 실제 작업 단어와 작품 제목이 아주 천천히 흐르고, 글자 물결이 지나갑니다.
(function () {
  var canvas = document.getElementById("kinetic");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FONT = '"Pretendard Variable", Pretendard, "Malgun Gothic", sans-serif';
  var BASE = "#39322a", SOFT = "#1f1b17", WARM = [217, 152, 90], BASE_RGB = [57, 50, 42], SOFT_RGB = [31, 27, 23];

  // size: 화면 기준 글자 크기, y: 세로 위치, speed: 초당 픽셀, mode: 외곽선 또는 면
  var ROWS = [
    { text: "첫 1초 끝까지 ", size: 0.17, y: 0.25, speed: 16, dir: -1, mode: "stroke", weight: 800, scroll: 0.16 },
    { text: "꿈꾸던 나, 곧 방송됩니다 · 범인은 이 안에 있다 · 쓰고, 줄이고, 만나요 · 바로피트니스 · ", size: 0.024, y: 0.34, speed: 22, dir: 1, mode: "fill", weight: 500, scroll: 0.06 },
    { text: "HOOK CUT LOOP ", size: 0.145, y: 0.66, speed: 12, dir: 1, mode: "fill", weight: 800, scroll: 0.1 },
    { text: "멈추게 하고 끝까지 보게 하고 다시 보게 ", size: 0.06, y: 0.83, speed: 20, dir: -1, mode: "stroke", weight: 700, scroll: 0.22 }
  ];

  var W = 0, H = 0, dpr = 1, rows = [], start = 0, last = 0;
  var scrollY = 0, shown = 0, boost = 0, travel = 0, prevScroll = 0, prevT = 0;
  var mx = 0, my = 0, tx = 0, ty = 0, visibleLevel = 1;

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, W < 800 ? 1.5 : 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    var unit = Math.max(W, H * 1.15);
    rows = ROWS.map(function (r) {
      var px = Math.max(r.mode === "fill" && r.size < 0.05 ? 13 : 40, r.size * unit);
      ctx.font = r.weight + " " + px + "px " + FONT;
      var letters = [], x = 0, chars = Array.from(r.text);
      chars.forEach(function (ch) {
        var w = ctx.measureText(ch).width;
        letters.push({ ch: ch, x: x, w: w }); x += w;
      });
      return { o: r, px: px, font: ctx.font, letters: letters, cycle: x };
    });
  }

  function mix(a, b, k) { return "rgb(" + Math.round(a[0] + (b[0] - a[0]) * k) + "," + Math.round(a[1] + (b[1] - a[1]) * k) + "," + Math.round(a[2] + (b[2] - a[2]) * k) + ")"; }
  function ease(k) { return 1 - Math.pow(1 - k, 3); }

  function draw(now) {
    var t = (now - start) / 1000;
    var dt = Math.min(0.1, Math.max(0, t - prevT)); prevT = t;
    var v = (scrollY - prevScroll) / Math.max(dt, 0.016); prevScroll = scrollY;
    boost += (Math.max(-900, Math.min(900, v)) * 0.12 - boost) * 0.08;   // 스크롤 속도만큼 잠깐 빨라짐
    travel += dt * (1 + Math.abs(boost) * 0.02);
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;

    var heroFade = Math.max(0, 1 - scrollY / (H * 0.9));
    var target = visibleLevel * (0.4 + 0.6 * heroFade);
    var entry = calm ? 1 : ease(Math.min(1, t / 1.8));
    shown = target * entry;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = shown;
    ctx.textBaseline = "alphabetic";

    rows.forEach(function (row, idx) {
      var r = row.o, px = row.px;
      var shift = r.dir * (r.speed * travel + boost * 0.4) + r.dir * scrollY * r.scroll + mx * (idx % 2 ? -14 : 14);
      var off = ((shift % row.cycle) + row.cycle) % row.cycle;
      var base = H * r.y + px * 0.36 + my * (idx % 2 ? -8 : 8) + (1 - entry) * px * 0.25;
      var bandAt = W * (0.5 + 0.62 * Math.sin(t * 0.13 + idx * 1.7));   // 천천히 오가는 빛 띠
      ctx.font = row.font;
      if (r.mode === "stroke") ctx.lineWidth = Math.max(1, px * 0.008) * dpr / dpr;

      for (var n = -1; n * row.cycle + off - row.cycle < W + row.cycle; n++) {
        var ox = n * row.cycle + off - row.cycle;
        for (var i = 0; i < row.letters.length; i++) {
          var l = row.letters[i], x = ox + l.x;
          if (x > W + px || x + l.w < -px || l.ch === " ") continue;
          var wave = Math.sin(x * 0.0042 - t * 0.55 + idx * 1.3);
          var lift = wave * px * 0.035, stretch = 1 + wave * 0.075;
          var d = Math.abs(x + l.w / 2 - bandAt) / (W * 0.16);
          var glow = Math.max(0, 1 - d * d) * 0.62;
          ctx.setTransform(dpr, 0, 0, dpr * stretch, dpr * x, dpr * (base + lift));
          if (r.mode === "stroke") { ctx.strokeStyle = mix(BASE_RGB, WARM, glow); ctx.strokeText(l.ch, 0, 0); }
          else { ctx.fillStyle = mix(SOFT_RGB, WARM, glow * (px < 40 ? 0.9 : 0.34)); ctx.fillText(l.ch, 0, 0); }
        }
      }
    });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function frame(now) {
    if (now - last >= 1000 / (W < 800 ? 24 : 40)) { last = now; draw(now); }
    window.requestAnimationFrame(frame);
  }

  function boot() {
    build(); start = performance.now();
    if (calm) { draw(start + 4000); return; }
    window.requestAnimationFrame(frame);
  }

  window.addEventListener("scroll", function () { scrollY = window.scrollY; if (calm) draw(start + 4000); }, { passive: true });
  window.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    tx = (e.clientX / W - 0.5) * 2; ty = (e.clientY / H - 0.5) * 2;
  }, { passive: true });
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { build(); if (calm) draw(start + 4000); }, 160); });
  window.setKineticLevel = function (v) { visibleLevel = v; if (calm) draw(start + 4000); };

  var sample = ROWS.map(function (r) { return r.text; }).join("");
  var fonts = document.fonts;
  if (fonts && fonts.load) {
    Promise.race([
      Promise.all([fonts.load('800 80px "Pretendard Variable"', sample), fonts.load('500 20px "Pretendard Variable"', sample)]),
      new Promise(function (r) { setTimeout(r, 1800); })
    ]).then(boot, boot);
  } else { boot(); }
})();
