/* @ちゃんねる — motor do BBS (sem dependências) */
(function () {
  "use strict";
  var D = window.BBS;
  var app = document.getElementById("app");
  var popupLayer = document.getElementById("popup-layer");
  var eyes = document.getElementById("eyes");
  var WEEK = ["日", "月", "火", "水", "木", "金", "土"];
  var LS = "atch_";
  var cur = location.hash || "#/";
  function go(h) { if (h === cur) { route(); return; } cur = h; try { history.pushState(null, "", h); } catch (e) {} route(); }
  window.addEventListener("popstate", function () { cur = location.hash || "#/"; route(); });

  /* ---------------- armazenamento seguro ---------------- */
  function load(k, def) {
    try { var v = localStorage.getItem(LS + k); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  }
  function save(k, v) { try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) {} }

  /* ---------------- utilidades ---------------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function hash(str) { // FNV-1a 32 bits
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h >>> 0;
  }
  var B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function code(str, len) {
    var out = "", h = hash(str);
    for (var i = 0; i < len; i++) { h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0; h = (h ^ hash(str + i)) >>> 0; out += B64[h % 64]; }
    return out;
  }
  function seeded(seed) { var s = hash(seed); return function () { s = Math.imul(s ^ (s >>> 13), 0x5bd1e995) >>> 0; s ^= s >>> 15; return (s >>> 0) / 4294967296; }; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtDate(d) {
    return d.getFullYear() + "/" + pad(d.getMonth() + 1) + "/" + pad(d.getDate()) + "(" + WEEK[d.getDay()] + ") " +
      pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }
  function dayKey(d) { return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }
  function parseStart(s) { // "2008/09/28 00:12"
    var m = s.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
    return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0);
  }
  function board(id) { for (var i = 0; i < D.boards.length; i++) if (D.boards[i].id === id) return D.boards[i]; return null; }

  /* ---------------- relógio do universo (2008) ---------------- */
  var firstVisit = load("first", null);
  if (!firstVisit) { firstVisit = Date.now(); save("first", firstVisit); }
  function worldNow() {
    var real = new Date();
    var days = Math.floor((Date.now() - firstVisit) / 86400000);
    return new Date(2008, 9, 6 + days, real.getHours(), real.getMinutes(), real.getSeconds());
  }

  /* ---------------- usuário ---------------- */
  var mySeed = load("seed", null);
  if (!mySeed) { mySeed = String(Math.random()).slice(2); save("seed", mySeed); }
  function myId(d, boardId) { return code(mySeed + boardId + dayKey(d), 8); }
  var prefs = load("prefs", { name: "", mail: "" });

  /* ---------------- construção das threads ---------------- */
  var cache = {};
  function allThreads() {
    var list = D.threads.slice();
    load("threads", []).forEach(function (t) { list.push(t); });
    return list;
  }
  function findThread(boardId, key) {
    var l = allThreads();
    for (var i = 0; i < l.length; i++) if (l[i].board === boardId && l[i].key === key) return l[i];
    return null;
  }
  function build(t) {
    var ck = t.board + "/" + t.key;
    var b = board(t.board);
    var rnd = seeded(ck);
    var d = parseStart(t.start);
    var posts = [];
    (t.posts || []).forEach(function (p, i) {
      var o = p[2] || {};
      if (i > 0) {
        var gap = o.gap != null ? o.gap : 1 + Math.floor(rnd() * 10);
        d = new Date(d.getTime() + gap * 60000 + Math.floor(rnd() * 59000));
      } else {
        d = new Date(d.getTime() + Math.floor(rnd() * 59000));
      }
      posts.push({
        name: o.name || b.noname, trip: o.trip || "", mail: o.mail || "",
        date: new Date(d.getTime()), id: code(ck + p[0] + dayKey(d), 8),
        body: o.body || p[1], aa: !!o.aa, mine: false
      });
    });
    load("p_" + ck, []).forEach(function (p) {
      posts.push({ name: p.name, trip: p.trip || "", mail: p.mail, date: new Date(p.time), id: p.id, body: p.body, aa: !!p.aa, mine: !!p.mine, fusi: p.fusi });
    });
    posts.sort(function (a, b) { return a.date - b.date; });
    // última "subida" (age): último post sem sage
    var bump = posts[0].date;
    posts.forEach(function (p) { if (!/^sage$/i.test(p.mail)) bump = p.date; });
    // contagem de IDs
    var idc = {};
    posts.forEach(function (p) { idc[p.id] = (idc[p.id] || 0) + 1; });
    var seen = {};
    posts.forEach(function (p, i) { p.n = i + 1; seen[p.id] = (seen[p.id] || 0) + 1; p.idIdx = seen[p.id]; p.idTotal = idc[p.id]; });
    var r = { t: t, b: b, posts: posts, bump: bump, last: posts[posts.length - 1].date };
    cache[ck] = r;
    return r;
  }

  function addPost(t, p) {
    var ck = t.board + "/" + t.key;
    var arr = load("p_" + ck, []);
    arr.push(p);
    save("p_" + ck, arr);
  }

  /* ---------------- formatação do corpo ---------------- */
  function formatBody(p, ctx) {
    var s = esc(p.body);
    s = s.replace(/&gt;&gt;(\d{1,4})(?:-(\d{1,4}))?/g, function (m, a, b) {
      var href = ctx ? "#/read/" + ctx.t.board + "/" + ctx.t.key + "/" + a + (b ? "-" + b : "") : "#";
      return '<a class="anchor" data-a="' + a + '" data-b="' + (b || a) + '" href="' + href + '">' + m + "</a>";
    });
    s = s.replace(/(^|[^h])(h?ttps?:\/\/[\w\-.~:\/?#\[\]@!$&'()*+,;=%]+)/g, function (m, pre, url) {
      var real = url.charAt(0) === "t" ? "h" + url : url;
      return pre + '<a href="' + real + '" target="_blank" rel="noopener">' + url + "</a>";
    });
    s = s.replace(/その目、だれの目？/g, '<span class="creepy">その目、だれの目？</span>');
    s = s.replace(/\n/g, "<br>");
    return p.aa ? '<span class="aa">' + s + "</span>" : s;
  }

  function renderPost(p, ctx) {
    var nameHtml = esc(p.name) + (p.trip ? ' <span class="trip">◆' + esc(p.trip) + "</span>" : "");
    if (p.fusi) nameHtml += '</b>(' + esc(p.fusi) + ')<b>';
    var name = p.mail ? '<a href="mailto:' + esc(p.mail) + '">' + nameHtml + "</a>" : nameHtml;
    var cls = p.idTotal >= 5 ? "many" : p.idTotal >= 2 ? "mid" : "";
    var idTxt = "ID:" + p.id + (p.idTotal > 1 ? " (" + p.idIdx + "/" + p.idTotal + ")" : "");
    return '<dl class="post' + (p.mine ? " mine" : "") + '" data-n="' + p.n + '" data-id="' + p.id + '">' +
      '<dt><a class="num" data-n="' + p.n + '">' + p.n + "</a> ：<span class=\"name\"><b>" + name + "</b></span>：" +
      fmtDate(p.date) + ' <span class="id ' + cls + '" data-id="' + p.id + '">' + idTxt + "</span></dt>" +
      "<dd>" + formatBody(p, ctx) + "</dd></dl>";
  }

  function kb(r) {
    var bytes = 0;
    r.posts.forEach(function (p) { bytes += unescape(encodeURIComponent(p.body + p.name + p.mail)).length + 80; });
    return Math.ceil(bytes / 1024);
  }

  /* ---------------- partes comuns ---------------- */
  function footer() {
    return '<div class="footer">@ちゃんねる BBS.CGI ver 2008.10 (fan-made)<br>' +
      'Site de fã inspirado no BBS fictício de CHAOS;HEAD. Sem afiliação com MAGES./Nitroplus. Todos os posts são ficção.</div>';
  }
  function postForm(kind, extra) {
    var title = kind === "new" ? '<tr><td>タイトル</td><td colspan="3"><input type="text" class="wide" name="subject" maxlength="64" required></td></tr>' : "";
    return '<form class="bbs" data-kind="' + kind + '"' + (extra || "") + ">" +
      "<table>" + title +
      '<tr><td>名前：</td><td><input type="text" name="name" value="' + esc(prefs.name) + '" placeholder="(Nome) vazio = anônimo"></td>' +
      '<td>E-mail(省略可)：</td><td><input type="text" name="mail" value="' + esc(prefs.mail) + '" placeholder="sage"></td></tr>' +
      '<tr><td colspan="4"><textarea name="body" required></textarea></td></tr>' +
      '<tr><td colspan="4"><button type="submit">' + (kind === "new" ? "新規スレッド作成" : "書き込む") + "</button> " +
      '<span class="small">Dicas: <b>sage</b> no e-mail não sobe a thread · <b>Nome#senha</b> gera trip · <b>&gt;&gt;número</b> responde</span>' +
      '<div class="form-msg"></div></td></tr>' +
      "</table></form>";
  }

  /* ---------------- páginas ---------------- */
  function pageTop() {
    var hits = load("hits", 1206) + 1; save("hits", hits);
    var cats = {};
    D.boards.forEach(function (b) { (cats[b.cat] = cats[b.cat] || []).push(b); });
    var menu = '<div class="menu"><b>@ちゃんねる掲示板</b><br><a href="#/guide">ガイド (Guia)</a><a href="#/search">スレタイ検索 (Busca)</a>';
    Object.keys(cats).forEach(function (c) {
      menu += '<b class="cat">' + esc(c) + "</b>";
      cats[c].forEach(function (b) { menu += '<a href="#/board/' + b.id + '">' + esc(b.name.split("＠")[0]) + "</a>"; });
    });
    menu += "</div>";

    // ranking de velocidade (posts / dia)
    var now = worldNow();
    var rank = allThreads().map(function (t) {
      var r = build(t);
      var days = Math.max((now - r.posts[0].date) / 86400000, 0.5);
      return { r: r, speed: r.posts.length / days };
    }).sort(function (a, b) { return b.speed - a.speed; }).slice(0, 8);

    var news = D.news.map(function (n) { return '<li><span class="news-date">' + n[0] + "</span> " + esc(n[1]) + "</li>"; }).join("");
    var boards = D.boards.map(function (b) {
      return '<li><a href="#/board/' + b.id + '">' + esc(b.name) + "</a> — " + esc(b.pt) + "</li>";
    }).join("");
    var ranking = rank.map(function (x, i) {
      return "<li>" + (i + 1) + '. <a href="#/read/' + x.r.t.board + "/" + x.r.t.key + '/l50">' + esc(x.r.t.title) + " (" + x.r.posts.length + ")</a> " +
        '<span class="small">[' + esc(x.r.b.name.split("＠")[0]) + "] 勢い " + x.speed.toFixed(1) + "</span></li>";
    }).join("");

    app.innerHTML =
      '<div class="logo"><span class="at">@</span>ちゃんねる</div>' +
      '<div class="sublogo">「ハッキング から 今晩のおかず まで」 — de hacking até o jantar de hoje</div>' +
      '<div class="top-layout">' + menu +
      '<div class="top-main">' +
      '<div class="box yellow"><h2>お知らせ (Avisos)</h2><ul>' + news + "</ul></div>" +
      '<div class="box white"><h2>勢いランキング (Threads mais rápidas)</h2><ol style="list-style:none;padding-left:4px">' + ranking + "</ol></div>" +
      '<div class="box"><h2>掲示板一覧 (Boards)</h2><ul>' + boards + "</ul></div>" +
      '<div class="box white small">あなたは <span class="counter">' + String(hits).padStart(7, "0") + "</span> 人目のお客様です。 (Você é o visitante nº " + hits + ")<br>" +
      "Hora do servidor: " + fmtDate(now) + "</div>" +
      "</div></div>" + footer();
  }

  function sortedThreads(boardId) {
    return allThreads().filter(function (t) { return t.board === boardId; })
      .map(build).sort(function (a, b) { return b.bump - a.bump; });
  }

  function pageBoard(boardId) {
    var b = board(boardId);
    if (!b) return notFound();
    var list = sortedThreads(boardId);
    var html = '<div class="board-head"><div class="board-title">' + esc(b.name) + "</div>" +
      '<div style="text-align:center" class="small">' + esc(b.pt) + ' · <a href="#/">■ @ちゃんねるトップ</a></div><hr>' +
      '<b>ローカルルール (Regras locais)</b><ul class="board-rules">' + b.rules.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ul></div>";

    html += '<div class="thread-index">';
    list.forEach(function (r, i) {
      html += '<a href="' + (i < 10 ? "#t" + i : "#/read/" + b.id + "/" + r.t.key + "/l50") + '" data-jump="' + (i < 10 ? "t" + i : "") + '">' +
        (i + 1) + ": " + esc(r.t.title) + " (" + r.posts.length + ")</a>";
    });
    html += ' <a class="more" href="#/subback/' + b.id + '">スレッド一覧はこちら</a></div>';

    list.slice(0, 10).forEach(function (r, i) {
      var base = "#/read/" + b.id + "/" + r.t.key;
      html += '<div class="thread-box" id="t' + i + '">' +
        '<div class="t-nav"><a href="#t' + Math.max(i - 1, 0) + '" data-jump="t' + Math.max(i - 1, 0) + '">▲</a><a href="#t' + Math.min(i + 1, Math.min(list.length, 10) - 1) + '" data-jump="t' + Math.min(i + 1, Math.min(list.length, 10) - 1) + '">▼</a></div>' +
        '<div class="t-title">【' + (i + 1) + ":" + r.posts.length + "】" + esc(r.t.title) + "</div><br>";
      var shown = [r.posts[0]];
      var tail = r.posts.slice(Math.max(1, r.posts.length - 5));
      html += renderPost(r.posts[0], r);
      if (r.posts.length - 1 > tail.length) html += '<div class="omitted">（' + (r.posts.length - 1 - tail.length) + " 件のレスを省略。全部読むには下のリンクを）</div>";
      tail.forEach(function (p) { html += renderPost(p, r); });
      html += '<div class="read-nav"><a href="' + base + '/">全部読む</a><a href="' + base + '/l50">最新50</a><a href="' + base + '/1-100">1-100</a><a href="#/board/' + b.id + '">板のトップ</a><a href="#/">リロード</a></div>';
      html += postForm("reply", ' data-board="' + b.id + '" data-key="' + r.t.key + '"');
      html += "</div>";
    });

    html += '<div class="box white"><b>新規スレッド作成 (Criar nova thread)</b>' + postForm("new", ' data-board="' + b.id + '"') + "</div>";
    html += footer();
    app.innerHTML = html;
    document.title = b.name;
  }

  function pageSubback(boardId) {
    var b = board(boardId);
    if (!b) return notFound();
    var list = sortedThreads(boardId);
    app.innerHTML = '<div class="board-head"><div class="board-title">' + esc(b.name) + " — スレッド一覧</div>" +
      '<div style="text-align:center"><a href="#/board/' + b.id + '">掲示板に戻る</a></div></div><div class="thread-index">' +
      list.map(function (r, i) { return '<a href="#/read/' + b.id + "/" + r.t.key + '/l50">' + (i + 1) + ": " + esc(r.t.title) + " (" + r.posts.length + ")</a><br>"; }).join("") +
      "</div>" + footer();
  }

  function pageRead(boardId, key, range) {
    var t = findThread(boardId, key);
    if (!t) return notFound();
    var r = build(t);
    var total = r.posts.length;
    var sel;
    range = range || "";
    var m;
    if (/^l(\d+)$/.test(range)) { var n = +range.slice(1); sel = r.posts.slice(Math.max(1, total - n)); sel.unshift(r.posts[0]); }
    else if ((m = range.match(/^(\d+)-(\d*)$/))) { var a = +m[1], z = m[2] ? +m[2] : total; sel = r.posts.filter(function (p) { return p.n >= a && p.n <= z; }); if (a > 1) sel.unshift(r.posts[0]); }
    else if (/^\d+$/.test(range)) { sel = r.posts.filter(function (p) { return p.n === +range; }); }
    else sel = r.posts;

    var base = "#/read/" + boardId + "/" + key;
    var nav = '<div class="read-nav"><a href="#/board/' + boardId + '">■掲示板に戻る■</a><a href="' + base + '/">全部</a>';
    for (var i = 1; i <= total; i += 100) nav += '<a href="' + base + "/" + i + "-" + (i + 99) + '">' + i + "-</a>";
    nav += '<a href="' + base + '/l50">最新50</a></div>';

    var html = nav + '<div class="read-title">' + esc(t.title) + "</div>";
    sel.forEach(function (p) { html += renderPost(p, r); });
    var size = kb(r);
    if (total >= 1000) {
      html += '<p class="over1000">このスレッドは１０００を超えました。<br>もう書けないので、新しいスレッドを立ててくださいです。。。</p>';
    } else {
      html += "<hr>" + nav + '<div class="size-warn">' + size + "KB" + (size > 450 ? " — 500KBを超えると書き込めなくなります" : "") + "</div>" +
        '<a href="' + base + "/" + total + '-">新着レスの表示</a>' +
        postForm("reply", ' data-board="' + boardId + '" data-key="' + key + '"');
    }
    html += footer();
    app.innerHTML = html;
    document.title = t.title;
    if (/その目|ニュージェネ/.test(t.title) && Math.random() < 0.12) setTimeout(flashEyes, 4000 + Math.random() * 8000);
  }

  function pageSearch(q) {
    q = q || "";
    var html = '<div class="board-head"><div class="board-title">スレタイ検索 / Busca</div><div style="text-align:center"><a href="#/">トップ</a></div></div>' +
      '<form id="searchform" class="bbs"><input type="text" class="wide" name="q" value="' + esc(q) + '" placeholder="palavra-chave"> <button>検索</button></form>';
    if (q) {
      if (/その目|だれの目/.test(q)) flashEyes();
      var ql = q.toLowerCase(), hits = 0;
      allThreads().forEach(function (t) {
        var r = build(t);
        var inTitle = t.title.toLowerCase().indexOf(ql) >= 0;
        var postsHit = r.posts.filter(function (p) { return p.body.toLowerCase().indexOf(ql) >= 0; });
        if (!inTitle && !postsHit.length) return;
        hits++;
        html += '<div class="search-hit"><a href="#/read/' + t.board + "/" + t.key + '/">' + mark(t.title, q) + "</a> (" + r.posts.length + ") " +
          '<span class="small">[' + esc(r.b.name) + "]</span>";
        postsHit.slice(0, 3).forEach(function (p) {
          html += '<div class="small">&gt;&gt;' + p.n + ": " + mark(p.body.replace(/\s+/g, " ").slice(0, 120), q) + "</div>";
        });
        html += "</div>";
      });
      if (!hits) html += "<p>該当するスレッドはありません。(Nada encontrado.)</p>";
    }
    app.innerHTML = html + footer();
  }
  function mark(text, q) {
    var e = esc(text), qe = esc(q);
    return e.split(qe).join("<mark>" + qe + "</mark>");
  }

  function pageGuide() {
    var rows = [
      ["名無し (nanashi)", "Anônimo. Se você deixar o nome vazio, recebe o nome padrão da board."],
      ["ID", "Código de 8 caracteres gerado pela sua conexão. Muda todo dia. Clique em um ID para destacar todos os posts dele."],
      ["sage", "Escreva <b>sage</b> no campo E-mail para responder sem subir a thread na lista."],
      ["age", "O contrário: subir a thread. Qualquer post sem sage faz isso."],
      ["トリップ (trip)", "Escreva <b>Nome#senha</b>. A senha vira um código ◆XXXXXXXXXX que prova que é você."],
      ["&gt;&gt;n (anka)", "Âncora para responder ao post n. Passe o mouse para ver o post. Clique no número de um post para responder."],
      ["fusianasan", "Não escreva isso no campo nome. Sério. (Exibe seu host para todos.)"],
      ["乙 (otsu)", "\"Bom trabalho\". Dito para quem criou a thread: >>1 乙"],
      ["妄想乙 (mousou otsu)", "\"Bom trabalho com o delírio\". Usado quando alguém conta algo inacreditável."],
      ["ｷﾀ━(ﾟ∀ﾟ)━!!", "\"Chegou!!\" Empolgação."],
      ["釣り (tsuri)", "Pesca/isca. Post falso para enganar os outros."],
      ["AA", "Arte ASCII. Fica bonita com a fonte MS PGothic / Mona."],
      ["dat落ち", "Quando a thread cai do servidor por inatividade."],
      ["1000", "Uma thread aceita no máximo 1000 posts. Depois disso, crie a próxima parte."],
    ];
    app.innerHTML = '<div class="board-head"><div class="board-title">@ちゃんねる ガイド</div><div style="text-align:center"><a href="#/">トップ</a></div></div>' +
      '<div class="box white"><table>' + rows.map(function (r) { return '<tr><td style="padding:4px 12px 4px 0;white-space:nowrap"><b>' + r[0] + "</b></td><td>" + r[1] + "</td></tr>"; }).join("") + "</table></div>" +
      '<div class="box yellow small">Seus posts, threads e preferências ficam salvos apenas no seu navegador (localStorage). ' +
      '<button id="wipe">Apagar meus dados</button></div>' + footer();
  }

  function notFound() {
    app.innerHTML = '<p class="red" style="font-size:20px">ＥＲＲＯＲ：そんな板orスレッドないです。</p><p><a href="#/">トップへ</a></p>' + footer();
  }

  /* ---------------- envio de posts ---------------- */
  function parseName(raw, b) {
    raw = (raw || "").replace(/◆/g, "◇").replace(/★/g, "☆").trim();
    var trip = "", fusi = "";
    var i = raw.indexOf("#");
    if (i >= 0) { trip = code("trip:" + raw.slice(i + 1), 10); raw = raw.slice(0, i); }
    if (raw.toLowerCase() === "fusianasan") {
      fusi = "p" + (hash(mySeed) % 9000 + 1000) + "-ipad" + (hash(mySeed + "x") % 90 + 10) + "shibuya.tokyo.ocn.ne.jp";
      raw = b.noname;
    }
    return { name: raw || b.noname, trip: trip, fusi: fusi };
  }

  function submit(form) {
    var msg = form.querySelector(".form-msg");
    var b = board(form.getAttribute("data-board"));
    var body = form.body.value.replace(/\r/g, "");
    if (!body.trim()) { msg.textContent = "ＥＲＲＯＲ：本文がありません！"; return; }
    if (body.length > 2048) { msg.textContent = "ＥＲＲＯＲ：本文が長すぎます！"; return; }
    var last = load("lastpost", 0);
    if (Date.now() - last < 5000) { msg.textContent = "ＥＲＲＯＲ：連続投稿ですか？？ (Espere alguns segundos.)"; return; }
    var nm = parseName(form.name.value, b);
    var mail = form.mail.value.trim();
    prefs = { name: form.name.value, mail: mail }; save("prefs", prefs);
    var now = worldNow();
    var aa = /[　]{3,}|[／＼|｜（）∧]{4,}/.test(body) && body.split("\n").length > 2;
    var post = { name: nm.name, trip: nm.trip, fusi: nm.fusi, mail: mail, body: body, time: now.getTime(), id: myId(now, b.id), mine: true, aa: aa };

    var t;
    if (form.getAttribute("data-kind") === "new") {
      var subject = form.subject.value.trim();
      if (!subject) { msg.textContent = "ＥＲＲＯＲ：サブジェクトが存在しません！"; return; }
      var key = String(Math.floor(now.getTime() / 1000));
      t = { board: b.id, key: key, start: fmtStart(now), title: subject, posts: [] };
      var ts = load("threads", []); ts.push(t); save("threads", ts);
    } else {
      t = findThread(b.id, form.getAttribute("data-key"));
      if (build(t).posts.length >= 1000) { msg.textContent = "ＥＲＲＯＲ：このスレッドには書き込めません。"; return; }
    }
    addPost(t, post);
    save("lastpost", Date.now());
    if (/その目、?だれの目/.test(body)) setTimeout(flashEyes, 600);
    app.innerHTML = '<div class="box white" style="margin-top:40px;text-align:center"><b>書きこみが終わりました。</b><br><br>画面を切り替えるまでしばらくお待ち下さい。<br><span class="small">(Post enviado. Aguarde...)</span></div>';
    var target = "#/read/" + b.id + "/" + t.key + "/l50";
    setTimeout(function () { go(target); scrollBottom(); }, 900);
    scheduleReply(t);
  }
  function fmtStart(d) { return d.getFullYear() + "/" + pad(d.getMonth() + 1) + "/" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function scrollBottom() { setTimeout(function () { window.scrollTo(0, document.body.scrollHeight); }, 50); }

  /* anônimos que respondem */
  function scheduleReply(t) {
    if (Math.random() > 0.6) return;
    setTimeout(function () {
      var r = build(t);
      var target = r.posts[r.posts.length - 1].n;
      var hour = worldNow().getHours();
      var creepyChance = (/その目|ニュージェネ|見られて|都市伝説/.test(t.title) ? 0.35 : 0.08) + (hour < 4 ? 0.2 : 0);
      var pool = Math.random() < creepyChance ? D.autoReplies.creepy : D.autoReplies.generic;
      var body = pool[Math.floor(Math.random() * pool.length)].replace("{n}", target);
      var now = worldNow();
      var b = board(t.board);
      addPost(t, { name: b.noname, mail: Math.random() < 0.4 ? "sage" : "", body: body, time: now.getTime(),
        id: code("anon" + Math.random(), 8), mine: false });
      var here = cur.indexOf("#/read/" + t.board + "/" + t.key) === 0;
      if (here) { route(); notify("新着レス 1件 (nova resposta)"); }
      if (pool === D.autoReplies.creepy && Math.random() < 0.3) setTimeout(flashEyes, 1500);
    }, 4000 + Math.random() * 10000);
  }

  function notify(text) {
    var n = document.createElement("div");
    n.textContent = text;
    n.style.cssText = "position:fixed;right:12px;bottom:12px;background:#ffffcc;border:1px solid #000;padding:6px 12px;z-index:60;font-size:14px";
    document.body.appendChild(n);
    setTimeout(function () { n.remove(); }, 3500);
  }

  /* ---------------- その目、だれの目？ ---------------- */
  var eyesBusy = false;
  function flashEyes() {
    if (eyesBusy) return;
    eyesBusy = true;
    app.classList.add("glitch");
    eyes.classList.add("on");
    setTimeout(function () { eyes.classList.remove("on"); app.classList.remove("glitch"); eyesBusy = false; }, 1800);
  }

  /* ---------------- popups de âncora ---------------- */
  var hideTimer = null;
  function currentCtx() {
    var m = cur.match(/^#\/read\/([^/]+)\/([^/]+)/);
    if (m) { var t = findThread(m[1], m[2]); return t ? build(t) : null; }
    return null;
  }
  function ctxFromEl(el) {
    var form = null, box = el.closest(".thread-box");
    if (box) form = box.querySelector("form.bbs");
    if (form) { var t = findThread(form.getAttribute("data-board"), form.getAttribute("data-key")); if (t) return build(t); }
    return currentCtx();
  }
  function showPopup(el, posts, ctx) {
    clearTimeout(hideTimer);
    // remove popups mais profundos que o atual
    var depth = el.closest(".popup") ? +el.closest(".popup").getAttribute("data-depth") + 1 : 0;
    Array.prototype.slice.call(popupLayer.children).forEach(function (p) { if (+p.getAttribute("data-depth") >= depth) p.remove(); });
    var div = document.createElement("div");
    div.className = "popup";
    div.setAttribute("data-depth", depth);
    div.innerHTML = posts.length ? posts.map(function (p) { return renderPost(p, ctx); }).join("") : '<span class="small">(存在しないレスです / post inexistente)</span>';
    popupLayer.appendChild(div);
    var rect = el.getBoundingClientRect();
    var left = Math.min(rect.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - div.offsetWidth - 8);
    div.style.left = Math.max(4, left) + "px";
    var top = rect.top + window.scrollY - div.offsetHeight - 4;
    if (top < window.scrollY) top = rect.bottom + window.scrollY + 4;
    div.style.top = top + "px";
  }
  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { popupLayer.innerHTML = ""; }, 350);
  }

  document.addEventListener("mouseover", function (e) {
    var a = e.target.closest(".anchor");
    if (a) {
      var ctx = ctxFromEl(a);
      if (!ctx) return;
      var from = +a.getAttribute("data-a"), to = Math.min(+a.getAttribute("data-b"), from + 30);
      showPopup(a, ctx.posts.filter(function (p) { return p.n >= from && p.n <= to; }), ctx);
      return;
    }
    var id = e.target.closest(".id");
    if (id && id.closest("#app")) {
      var c2 = ctxFromEl(id);
      if (c2 && +(id.textContent.match(/\/(\d+)\)/) || [0, 1])[1] > 1) {
        var who = id.getAttribute("data-id");
        showPopup(id, c2.posts.filter(function (p) { return p.id === who; }), c2);
      }
      return;
    }
    if (e.target.closest(".popup")) clearTimeout(hideTimer);
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(".anchor") || e.target.closest(".popup") || e.target.closest(".id")) scheduleHide();
  });

  /* ---------------- cliques ---------------- */
  document.addEventListener("click", function (e) {
    var ml = e.target.closest('a[href^="mailto:"]');
    if (ml) { e.preventDefault(); return; }
    var jump = e.target.closest("[data-jump]");
    if (jump && jump.getAttribute("data-jump")) {
      e.preventDefault();
      var tgt = document.getElementById(jump.getAttribute("data-jump"));
      if (tgt) tgt.scrollIntoView();
      return;
    }
    var anc = e.target.closest(".anchor");
    if (anc && !anc.closest(".popup") && document.querySelector('#app .post[data-n="' + anc.getAttribute("data-a") + '"]') && cur.indexOf("#/read/") === 0) {
      e.preventDefault();
      var el = document.querySelector('#app .post[data-n="' + anc.getAttribute("data-a") + '"]');
      el.scrollIntoView({ block: "center" });
      el.classList.add("highlight"); setTimeout(function () { el.classList.remove("highlight"); }, 1500);
      return;
    }
    var nav = e.target.closest('a[href^="#/"]');
    if (nav) { e.preventDefault(); go(nav.getAttribute("href")); return; }
    var num = e.target.closest(".num");
    if (num) {
      var scope = num.closest(".thread-box") || document;
      var ta = scope.querySelector("textarea") || document.querySelector("textarea");
      if (ta) {
        ta.value += (ta.value && !/\n$/.test(ta.value) ? "\n" : "") + ">>" + num.getAttribute("data-n") + "\n";
        ta.focus();
      }
      return;
    }
    var id = e.target.closest(".id");
    if (id && id.closest("#app")) {
      var who = id.getAttribute("data-id");
      var on = !id.closest(".post").classList.contains("highlight");
      document.querySelectorAll("#app .post").forEach(function (p) { p.classList.toggle("highlight", on && p.getAttribute("data-id") === who); });
      return;
    }
    if (e.target.id === "wipe") {
      if (!e.target.dataset.armed) { e.target.dataset.armed = "1"; e.target.textContent = "Clique de novo para confirmar"; return; }
      try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(LS) === 0) localStorage.removeItem(k); }); } catch (err) {}
      e.target.textContent = "Dados apagados. Recarregue a página.";
    }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.id === "searchform") { e.preventDefault(); go("#/search/" + encodeURIComponent(f.q.value)); return; }
    if (f.classList.contains("bbs")) { e.preventDefault(); submit(f); }
  });

  /* ---------------- roteamento ---------------- */
  function route() {
    popupLayer.innerHTML = "";
    document.title = D.site;
    var h = cur.replace(/^#\/?/, "");
    var parts = h.split("/");
    switch (parts[0]) {
      case "": pageTop(); break;
      case "board": pageBoard(parts[1]); break;
      case "subback": pageSubback(parts[1]); break;
      case "read": pageRead(parts[1], parts[2], parts[3]); break;
      case "search": pageSearch(decodeURIComponent(parts.slice(1).join("/") || "")); break;
      case "guide": pageGuide(); break;
      default:
        if (/^t\d+$/.test(parts[0])) return; // âncora interna
        notFound();
    }
    if (!/^t\d+$/.test(parts[0])) window.scrollTo(0, 0);
  }
  
  route();
  if (Math.random() < 0.03) setTimeout(flashEyes, 20000 + Math.random() * 40000);
})();
