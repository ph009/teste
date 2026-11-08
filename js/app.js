/* @channel — BBS engine (no dependencies) */
(function () {
  "use strict";
  var D = window.BBS;
  var app = document.getElementById("app");
  var popupLayer = document.getElementById("popup-layer");
  var eyes = document.getElementById("eyes");
  var WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var LS = "atch2_";

  /* ---------------- routing (kept in-page; works inside embedded viewers) ---------------- */
  var cur = location.hash || "#/";
  function go(h) {
    if (h !== cur) { cur = h; try { history.pushState(null, "", h); } catch (e) {} }
    route();
  }
  window.addEventListener("popstate", function () { cur = location.hash || "#/"; route(); });

  /* ---------------- storage ---------------- */
  function load(k, def) { try { var v = localStorage.getItem(LS + k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
  function save(k, v) { try { localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) {} }

  /* ---------------- utils ---------------- */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function hash(str) { var h = 0x811c9dc5; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; }
  var B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function code(str, len) {
    var out = "", h = hash(str);
    for (var i = 0; i < len; i++) { h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0; h = (h ^ hash(str + i)) >>> 0; out += B64[h % 64]; }
    return out;
  }
  function seeded(seed) { var s = hash(seed); return function () { s = Math.imul(s ^ (s >>> 13), 0x5bd1e995) >>> 0; s ^= s >>> 15; return (s >>> 0) / 4294967296; }; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  // in-game style: 200X/10/7(Tue) 15:41:00
  function fmtDate(d) {
    return "200X/" + (d.getMonth() + 1) + "/" + d.getDate() + "(" + WEEK[d.getDay()] + ") " +
      pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }
  function dayKey(d) { return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }
  function parseStart(s) { var m = s.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/); return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], 0); }
  function fmtStart(d) { return d.getFullYear() + "/" + pad(d.getMonth() + 1) + "/" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()); }
  function board(id) { for (var i = 0; i < D.boards.length; i++) if (D.boards[i].id === id) return D.boards[i]; return null; }

  /* ---------------- in-world clock ---------------- */
  var firstVisit = load("first", null);
  if (!firstVisit) { firstVisit = Date.now(); save("first", firstVisit); }
  function worldNow() {
    var real = new Date(), ws = D.worldStart;
    var days = Math.floor((Date.now() - firstVisit) / 86400000);
    return new Date(ws[0], ws[1], ws[2] + days, real.getHours(), real.getMinutes(), real.getSeconds());
  }

  /* ---------------- user ---------------- */
  var mySeed = load("seed", null);
  if (!mySeed) { mySeed = String(Math.random()).slice(2); save("seed", mySeed); }
  function myId(d, boardId) { return code(mySeed + boardId + dayKey(d), 8); }
  var prefs = load("prefs", { name: "", mail: "" });

  /* ---------------- threads ---------------- */
  function allThreads() { return D.threads.concat(load("threads", [])); }
  function findThread(b, k) { var l = allThreads(); for (var i = 0; i < l.length; i++) if (l[i].board === b && l[i].key === k) return l[i]; return null; }
  function build(t) {
    var ck = t.board + "/" + t.key, b = board(t.board), rnd = seeded(ck), d = parseStart(t.start), posts = [];
    (t.posts || []).forEach(function (p, i) {
      var o = p[2] || {};
      var gap = i === 0 ? 0 : (o.gap != null ? o.gap : 1 + Math.floor(rnd() * 10));
      d = new Date(d.getTime() + gap * 60000 + Math.floor(rnd() * 59000));
      posts.push({ name: o.name || b.noname, trip: "", mail: o.mail || "", date: new Date(d.getTime()),
        id: code(ck + p[0] + dayKey(d), 8), body: o.body || p[1], aa: !!o.aa, mine: false });
    });
    load("p_" + ck, []).forEach(function (p) {
      posts.push({ name: p.name, trip: p.trip || "", mail: p.mail, date: new Date(p.time), id: p.id, body: p.body, aa: !!p.aa, mine: !!p.mine, fusi: p.fusi });
    });
    posts.sort(function (a, c) { return a.date - c.date; });
    var bump = posts[0].date;
    posts.forEach(function (p, i) { p.n = i + 1; if (!/^sage$/i.test(p.mail)) bump = p.date; });
    return { t: t, b: b, posts: posts, bump: bump };
  }
  function addPost(t, p) { var k = "p_" + t.board + "/" + t.key, a = load(k, []); a.push(p); save(k, a); }
  function sortedThreads(id) {
    return allThreads().filter(function (t) { return t.board === id; }).map(build).sort(function (a, c) { return c.bump - a.bump; });
  }

  /* ---------------- rendering posts ---------------- */
  function formatBody(p, r) {
    var s = esc(p.body);
    s = s.replace(/&gt;&gt;(\d{1,4})(?:-(\d{1,4}))?/g, function (m, a, z) {
      return '<a class="anchor" data-a="' + a + '" data-b="' + (z || a) + '" href="#/read/' + r.t.board + "/" + r.t.key + "/" + a + (z ? "-" + z : "") + '">' + m + "</a>";
    });
    s = s.replace(/(^|[^h])(h?ttps?:\/\/[\w\-.~:\/?#\[\]@!$&'()*+,;=%]+)/g, function (m, pre, url) {
      return pre + '<a href="' + (url.charAt(0) === "t" ? "h" + url : url) + '" target="_blank" rel="noopener">' + url + "</a>";
    });
    s = s.replace(/(whose eyes are those eyes\??|その目、だれの目？)/gi, '<span class="creepy">$1</span>');
    s = s.replace(/\n/g, "<br>");
    return p.aa ? '<span class="aa">' + s + "</span>" : s;
  }
  function renderPost(p, r) {
    var name = esc(p.name) + (p.trip ? " ◆" + esc(p.trip) : "");
    var host = p.fusi ? " (" + esc(p.fusi) + ")" : "";
    var mail = p.mail ? p.mail : "age";
    return '<div class="post' + (p.mine ? " mine" : "") + '" data-n="' + p.n + '" data-id="' + p.id + '">' +
      '<p class="ph"><a class="num" data-n="' + p.n + '">' + p.n + "</a>Name: " +
      '<span class="name">' + name + "</span>" + host + " [" + esc(mail) + "]: " + fmtDate(p.date) +
      ' <span class="idl">ID:</span><span class="id" data-id="' + p.id + '">' + p.id + "</span></p>" +
      '<div class="body">' + formatBody(p, r) + "</div></div>";
  }
  function kb(r) { var n = 0; r.posts.forEach(function (p) { n += unescape(encodeURIComponent(p.body + p.name + p.mail)).length + 80; }); return Math.ceil(n / 1024); }

  /* ---------------- shared blocks ---------------- */
  function banner(b) {
    if (!b) {
      return '<div class="banner t-portal"><div class="b-mascot">(´∀｀)<small>2ch? no.</small></div>' +
        '<div class="b-slogan">From hacking to tonight\'s dinner.</div>' +
        '<div class="b-title"><span class="at">@</span>channel</div>' +
        '<div class="b-warn"><u>Users under 20 years old</u> will be banned.</div></div>';
    }
    return '<div class="banner ' + b.theme + '"><div class="b-mascot">' + esc(b.mascot) + "<small>" + esc(b.mascotSub) + "</small></div>" +
      '<div class="b-slogan">' + esc(b.slogan) + "</div>" +
      '<div class="b-title">' + esc(b.name.replace(/ Board$/, "")) + " Board Guide</div>" +
      '<div class="b-warn">Users under <u>20 years old</u> will be banned.</div></div>';
  }
  function rulesBox(b) {
    var html = '<div class="rules"><p>Welcome to the @channel ' + esc(b.name) + ". Read the " + esc(b.name.replace(/ Board$/, "")) + " Board Guide before you post!</p>" +
      "<p>Users under the age of 20 are not allowed to proceed.</p>";
    b.rules.forEach(function (r, i) { html += "<p>" + (i + 1) + ". " + esc(r) + "</p>"; });
    return html + '<p class="center"><a href="#/guide/' + b.id + '">' + esc(b.name.replace(/ Board$/, "")) + " Board Guide</a></p></div>";
  }
  function homeBar() {
    return '<nav class="homebar"><a class="homebtn" href="#/">◀ Back to @channel Home</a></nav>';
  }
  function caseRows(withText) {
    return D.incidents.map(function (c) {
      return '<tr><td class="cno">No.' + c.no + '</td><td class="cdate">' + c.date + '</td><td class="cname">' + esc(c.name) +
        '</td><td class="ckao">' + esc(c.kao) + "</td>" + (withText ? '<td class="ctext">' + esc(c.text) + " <span class=\"cv\">(" + c.victims + (c.victims > 1 ? " victims" : " victim") + ")</span></td>" : "") + "</tr>";
    }).join("");
  }
  function footer() {
    return '<div class="footer">@channel BBS.CGI — fan-made tribute to the BBS seen in CHAOS;HEAD. ' +
      'Not affiliated with MAGES./Nitroplus/Spike Chunsoft. All posts are fiction. · <a href="#/">@channel top</a></div>';
  }
  function postForm(kind, attrs) {
    return '<form class="bbs" data-kind="' + kind + '"' + attrs + ">" +
      (kind === "new" ? '<div class="row"><label class="grow">Subject: <input type="text" name="subject" maxlength="64"></label></div>' : "") +
      '<div class="row"><button type="submit">' + (kind === "new" ? "Create New Thread" : "Post") + "</button>" +
      '<label>Name: <input type="text" name="name" value="' + esc(prefs.name) + '"></label>' +
      '<label>E-mail (optional): <input type="text" name="mail" value="' + esc(prefs.mail) + '"></label></div>' +
      '<textarea name="body" aria-label="Message"></textarea><div class="form-msg"></div></form>';
  }

  /* ---------------- pages ---------------- */
  function pageTop() {
    var hits = load("hits", 31337) + 1; save("hits", hits);
    var now = worldNow(), cats = {};
    D.boards.forEach(function (b) { (cats[b.cat] = cats[b.cat] || []).push(b); });
    var rank = allThreads().map(function (t) {
      var r = build(t), days = Math.max((now - r.posts[0].date) / 86400000, 0.5);
      return { r: r, s: r.posts.length / days };
    }).sort(function (a, c) { return c.s - a.s; }).slice(0, 8);

    var html = banner(null) + '<div class="col"><div class="rules"><p>Welcome to @channel, the anonymous bulletin board.</p>' +
      "<p>Users under the age of 20 are not allowed to proceed.</p>";
    D.news.forEach(function (n) { html += "<p>" + n[0] + " — " + esc(n[1]) + "</p>"; });
    html += '<p class="center"><a href="#/guide">@channel Guide</a> · <a href="#/search">Thread Title Search</a> · <a href="#/newgen">All Things New Gen</a></p></div>';
    html += '<div class="tbox"><div class="ttitle"><span class="t">Board List</span></div><div class="portal-grid">';
    Object.keys(cats).forEach(function (c) {
      html += "<div><h3>" + esc(c) + "</h3>" + cats[c].map(function (b) { return '<a href="#/board/' + b.id + '">' + esc(b.name) + "</a>"; }).join("") + "</div>";
    });
    html += '</div></div><div class="tbox"><div class="ttitle"><span class="t">New Gen Case List</span></div>' +
      '<div class="cases-wrap"><table class="cases">' + caseRows(false) + '</table></div>' +
      '<p class="small"><a href="#/newgen">Full case files at All Things New Gen</a> · <a href="#/board/incident">Incidents Board</a></p></div>';
    html += '<div class="tbox"><div class="ttitle"><span class="t">Fastest Threads</span></div><div class="tindex">';
    rank.forEach(function (x, i) {
      html += (i + 1) + ': <a href="#/read/' + x.r.t.board + "/" + x.r.t.key + '/l50">' + esc(x.r.t.title) + " (" + x.r.posts.length + ")</a> " +
        '<span class="small">[' + esc(x.r.b.name) + "] " + x.s.toFixed(1) + "/day</span><br>";
    });
    html += '</div><p class="small">You are visitor No. <span class="counter">' + String(hits).padStart(7, "0") + "</span> · Server time: " + fmtDate(now) + "</p></div></div>" + footer();
    app.innerHTML = html;
    document.title = "@channel";
  }

  function pageBoard(id) {
    var b = board(id);
    if (!b) return notFound();
    var list = sortedThreads(id), shown = Math.min(list.length, 10);
    var html = banner(b) + '<div class="col">' + rulesBox(b) + '<div class="tbox"><div class="tindex">';
    list.forEach(function (r, i) {
      html += '<a href="#/read/' + b.id + "/" + r.t.key + '/l50"' + (i < 10 ? ' data-jump="t' + i + '"' : "") + ">" + (i + 1) + ": " + esc(r.t.title) + " (" + r.posts.length + ")</a>";
    });
    html += '<br><a class="all" href="#/subback/' + b.id + '">All threads</a> · <a href="#/newthread/' + b.id + '" data-jump="newthread">Create new thread</a></div></div>';

    list.slice(0, 10).forEach(function (r, i) {
      var base = "#/read/" + b.id + "/" + r.t.key;
      html += '<div class="tbox" id="t' + i + '"><div class="tnav"><span data-jump="top" title="Top"></span>' +
        '<span class="up" data-jump="t' + Math.max(i - 1, 0) + '" title="Previous"></span>' +
        '<span class="down" data-jump="t' + Math.min(i + 1, shown - 1) + '" title="Next"></span></div>' +
        '<div class="ttitle"><span class="cnt">[' + (i + 1) + ":" + r.posts.length + ']</span><a class="t" href="' + base + '/">' + esc(r.t.title) + "</a></div>";
      var tail = r.posts.slice(Math.max(1, r.posts.length - 5));
      html += renderPost(r.posts[0], r);
      if (r.posts.length - 1 > tail.length) html += '<p class="omitted">(' + (r.posts.length - 1 - tail.length) + " replies omitted. Click \"Read all\" to view.)</p>";
      tail.forEach(function (p) { html += renderPost(p, r); });
      html += '<div class="tfoot"><a href="' + base + '/">Read all</a><a href="' + base + '/l50">Last 50</a><a href="' + base + '/1-100">1-100</a><a href="#/board/' + b.id + '">Board top</a></div>' +
        postForm("reply", ' data-board="' + b.id + '" data-key="' + r.t.key + '"') + "</div>";
    });
    html += '<div class="tbox" id="newthread"><div class="ttitle"><span class="t">Create New Thread</span></div>' + postForm("new", ' data-board="' + b.id + '"') + "</div></div>" + footer();
    app.innerHTML = html;
    document.title = b.name + " @channel";
  }

  function pageSubback(id) {
    var b = board(id);
    if (!b) return notFound();
    app.innerHTML = banner(b) + '<div class="col"><div class="tbox"><div class="ttitle"><span class="t">' + esc(b.name) + ' — All threads</span></div><div class="tindex">' +
      sortedThreads(id).map(function (r, i) { return '<a href="#/read/' + b.id + "/" + r.t.key + '/l50">' + (i + 1) + ": " + esc(r.t.title) + " (" + r.posts.length + ")</a><br>"; }).join("") +
      '</div><p><a href="#/board/' + b.id + '">Back to board</a></p></div></div>' + footer();
  }

  function pageRead(bid, key, range) {
    var t = findThread(bid, key);
    if (!t) return notFound();
    var r = build(t), total = r.posts.length, sel, m;
    range = range || "";
    if (/^l\d+$/.test(range)) { sel = r.posts.slice(Math.max(1, total - +range.slice(1))); sel.unshift(r.posts[0]); }
    else if ((m = range.match(/^(\d+)-(\d*)$/))) { var a = +m[1], z = m[2] ? +m[2] : total; sel = r.posts.filter(function (p) { return p.n >= a && p.n <= z; }); if (a > 1) sel.unshift(r.posts[0]); }
    else if (/^\d+$/.test(range)) sel = r.posts.filter(function (p) { return p.n === +range; });
    else sel = r.posts;
    var base = "#/read/" + bid + "/" + key;
    var nav = '<div class="tfoot" style="border:0;padding:0;margin-bottom:12px"><a href="#/board/' + bid + '">■ Back to board ■</a><a href="' + base + '/">Read all</a>';
    for (var i = 1; i <= total; i += 100) nav += '<a href="' + base + "/" + i + "-" + (i + 99) + '">' + i + "-</a>";
    nav += '<a href="' + base + '/l50">Last 50</a></div>';
    var html = '<div class="col"><div class="tbox">' + nav +
      '<div class="ttitle"><span class="t">' + esc(t.title) + "</span></div>";
    sel.forEach(function (p) { html += renderPost(p, r); });
    var size = kb(r);
    if (total >= 1000) html += '<p class="over1000">This thread has exceeded 1000 posts. You can\'t post anymore, so please start a new thread.</p>';
    else html += '<div class="tfoot">' + nav.replace(/^<div[^>]*>/, "").replace(/<\/div>$/, "") + '<a href="' + base + "/" + total + '-">New posts</a>' +
      '<div class="sizeinfo">' + size + "KB" + (size > 450 ? " — you won't be able to post after 500KB" : "") + "</div></div>" +
      postForm("reply", ' data-board="' + bid + '" data-key="' + key + '"');
    app.innerHTML = html + "</div></div>" + footer();
    document.title = t.title;
    if (/whose eyes|New Gen/i.test(t.title) && Math.random() < 0.12) setTimeout(flashEyes, 4000 + Math.random() * 8000);
  }

  function pageSearch(q) {
    var html = banner(null) + '<div class="col"><div class="tbox"><div class="ttitle"><span class="t">Thread Title Search</span></div>' +
      '<form id="searchform" class="bbs"><div class="row"><input type="text" class="wide" style="max-width:100%" name="q" value="' + esc(q) + '" aria-label="Keyword"><button>Search</button></div></form>';
    if (q) {
      if (/whose eyes|その目/i.test(q)) flashEyes();
      var ql = q.toLowerCase(), hits = 0;
      allThreads().forEach(function (t) {
        var r = build(t), inTitle = t.title.toLowerCase().indexOf(ql) >= 0;
        var ph = r.posts.filter(function (p) { return p.body.toLowerCase().indexOf(ql) >= 0; });
        if (!inTitle && !ph.length) return;
        hits++;
        html += '<div class="search-hit"><a href="#/read/' + t.board + "/" + t.key + '/">' + mark(t.title, q) + "</a> (" + r.posts.length + ') <span class="small">[' + esc(r.b.name) + "]</span>";
        ph.slice(0, 3).forEach(function (p) { html += '<div class="small">&gt;&gt;' + p.n + ": " + mark(p.body.replace(/\s+/g, " ").slice(0, 140), q) + "</div>"; });
        html += "</div>";
      });
      if (!hits) html += "<p>No threads found.</p>";
    }
    app.innerHTML = html + "</div></div>" + footer();
  }
  function mark(text, q) {
    var lt = text.toLowerCase(), lq = q.toLowerCase(), out = "", i = 0, j;
    while ((j = lt.indexOf(lq, i)) >= 0) { out += esc(text.slice(i, j)) + "<mark>" + esc(text.slice(j, j + q.length)) + "</mark>"; i = j + q.length; }
    return out + esc(text.slice(i));
  }

  function pageGuide(bid) {
    var b = bid ? board(bid) : null;
    var rows = [
      ["Anonymous", "Leave Name empty and you post as the board's default name (" + esc(b ? b.noname : "e.g. \"Anonymous Prophet\"") + ")."],
      ["ID", "8 characters generated from your connection. Changes every day. Click an ID to highlight every post by it; hover it to preview them."],
      ["sage", "Type <b>sage</b> in E-mail to reply without bumping the thread. It shows as <b>[sage]</b>; otherwise <b>[age]</b>."],
      ["Tripcode", "Type <b>Name#password</b> and your name gets a ◆code that proves it's you."],
      ["&gt;&gt;number", "Anchor to reply to a post. Hover to preview, click to jump. Click a post number to quote it."],
      ["fusianasan", "Do NOT type this in the Name field. (It shows your host to everyone.)"],
      ["delusion, good work", "Said to someone whose story is too good to be true."],
      ["ｷﾀ━(ﾟ∀ﾟ)━!!", "\"It's here!!\" Excitement."],
      ["New Gen", "Short for \"New Generation Madness\", the Shibuya incidents."],
      ["1000", "A thread holds at most 1000 posts. After that, make the next part."],
    ];
    var html = banner(b) + '<div class="col">' + (b ? rulesBox(b) : "") + '<div class="tbox"><div class="ttitle"><span class="t">' +
      (b ? esc(b.name.replace(/ Board$/, "")) + " Board Guide" : "@channel Guide") + '</span></div><table class="small">' +
      rows.map(function (r) { return '<tr><td style="padding:5px 18px 5px 0;vertical-align:top;white-space:nowrap"><b>' + r[0] + "</b></td><td>" + r[1] + "</td></tr>"; }).join("") +
      '</table><p class="small">Your posts, threads and settings are saved only in this browser. <button id="wipe" type="button">Delete my data</button></p>' +
      (b ? '<p><a href="#/board/' + b.id + '">Back to ' + esc(b.name) + "</a></p>" : "") + "</div></div>" + footer();
    app.innerHTML = html;
  }

  function pageNewGen() {
    var N = D.newgen, a = N.article;
    var html = '<div class="col"><div class="ng"><div class="ng-head"><div class="kick">All Things New Gen</div><h1>Want the GENeral NEWs?</h1>' +
      '<div class="bears">(;´(ｪ)`) (;´(ｪ)`) (;´(ｪ)`) (;´(ｪ)`) (;´(ｪ)`) (;´(ｪ)`) (;´(ｪ)`)</div></div>' +
      '<div class="ng-body"><div><div class="ng-bar">◆New Gen Headlines</div><ul class="ng-list">' +
      N.headlines.map(function (h) { return '<li><span class="kao">(;´(ｪ)`)</span><a href="#/search/' + encodeURIComponent(h.split(" ")[0]) + '">' + esc(h) + "</a></li>"; }).join("") +
      '</ul><div class="ng-bar">◆' + esc(a.title) + "</div>" +
      '<div class="ng-article"><div class="date">' + esc(a.date) + "</div><h3>1. Name: " + esc(a.name) + "</h3><p>" + esc(a.body).replace(/\n/g, "<br>") + "</p>" +
      '<div class="cases-wrap"><table class="cases ng-cases">' + caseRows(true) + "</table></div>" +
      "<h3>2. Name: " + esc(a.name) + "</h3><p>And the quakes. Shibuya only, every time:</p>" +
      D.melts.map(function (m) { return "<p>◆ " + esc(m.date) + " — M" + esc(m.mag) + ": " + esc(m.text) + "</p>"; }).join("") + "</div></div>" +
      '<div class="ng-side"><div class="counter-row">' + String(load("ngc", 1507834) + 1).split("").map(function (c) { return "<span>" + c + "</span>"; }).join("") + "</div>" +
      "<h4>BOOKMARKS</h4><ul><li>NEWS-SITE</li>" + N.bookmarks.map(function (x) { return "<li>◆" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<div class="box"><a href="#/board/incident">● New Gen General</a><a href="#/board/occult">● Occult</a><a href="#/">● @channel</a></div></div></div></div></div>' + footer();
    save("ngc", load("ngc", 1507834) + 1);
    app.innerHTML = html;
    document.title = "All Things New Gen";
  }

  function notFound() { app.innerHTML = '<div class="col"><div class="tbox"><p style="color:#c4170b;font-size:20px">ERROR: No such board or thread.</p><p><a href="#/">Back to @channel</a></p></div></div>' + footer(); }

  /* ---------------- posting ---------------- */
  function parseName(raw, b) {
    raw = (raw || "").replace(/◆/g, "◇").replace(/★/g, "☆").trim();
    var trip = "", fusi = "", i = raw.indexOf("#");
    if (i >= 0) { trip = code("trip:" + raw.slice(i + 1), 10); raw = raw.slice(0, i); }
    if (raw.toLowerCase() === "fusianasan") { fusi = "p" + (hash(mySeed) % 9000 + 1000) + "-ipad" + (hash(mySeed + "x") % 90 + 10) + "shibuya.tokyo.ocn.ne.jp"; raw = ""; }
    return { name: raw || b.noname, trip: trip, fusi: fusi };
  }
  function submit(form) {
    var msg = form.querySelector(".form-msg"), b = board(form.getAttribute("data-board"));
    var body = form.body.value.replace(/\r/g, "");
    if (!body.trim()) { msg.textContent = "ERROR: Message body is empty!"; return; }
    if (body.length > 2048) { msg.textContent = "ERROR: Message is too long!"; return; }
    if (Date.now() - load("lastpost", 0) < 5000) { msg.textContent = "ERROR: Posting too fast. Wait a few seconds."; return; }
    var nm = parseName(form.name.value, b), mail = form.mail.value.trim();
    prefs = { name: form.name.value, mail: mail }; save("prefs", prefs);
    var now = worldNow();
    var aa = /[　]{3,}|[／＼|｜（）∧]{4,}/.test(body) && body.split("\n").length > 2;
    var post = { name: nm.name, trip: nm.trip, fusi: nm.fusi, mail: mail, body: body, time: now.getTime(), id: myId(now, b.id), mine: true, aa: aa };
    var t;
    if (form.getAttribute("data-kind") === "new") {
      var subject = form.subject.value.trim();
      if (!subject) { msg.textContent = "ERROR: Subject is missing!"; return; }
      t = { board: b.id, key: String(Math.floor(now.getTime() / 1000)), start: fmtStart(now), title: subject, posts: [] };
      var ts = load("threads", []); ts.push(t); save("threads", ts);
    } else {
      t = findThread(b.id, form.getAttribute("data-key"));
      if (build(t).posts.length >= 1000) { msg.textContent = "ERROR: This thread is full."; return; }
    }
    addPost(t, post);
    save("lastpost", Date.now());
    if (/whose eyes are those eyes|その目、?だれの目/i.test(body)) setTimeout(flashEyes, 600);
    app.innerHTML = '<div class="col"><div class="tbox" style="margin-top:60px;text-align:center"><p><b>Your post has been submitted.</b></p><p class="small">Please wait while the page changes...</p></div></div>';
    setTimeout(function () { go("#/read/" + b.id + "/" + t.key + "/l50"); setTimeout(function () { window.scrollTo(0, document.body.scrollHeight); }, 50); }, 900);
    scheduleReply(t);
  }
  function scheduleReply(t) {
    if (Math.random() > 0.6) return;
    setTimeout(function () {
      var r = build(t), target = r.posts[r.posts.length - 1].n, hour = worldNow().getHours();
      var chance = (/whose eyes|New Gen|watching|quake/i.test(t.title) ? 0.35 : 0.08) + (hour < 4 ? 0.2 : 0);
      var pool = Math.random() < chance ? D.autoReplies.creepy : D.autoReplies.generic;
      var now = worldNow(), b = board(t.board);
      addPost(t, { name: b.noname, mail: Math.random() < 0.5 ? "sage" : "", body: pool[Math.floor(Math.random() * pool.length)].replace("{n}", target),
        time: now.getTime(), id: code("anon" + Math.random(), 8), mine: false });
      if (cur.indexOf("#/read/" + t.board + "/" + t.key) === 0) { route(); notify("1 new reply"); }
      if (pool === D.autoReplies.creepy && Math.random() < 0.3) setTimeout(flashEyes, 1500);
    }, 4000 + Math.random() * 10000);
  }
  function notify(text) {
    var n = document.createElement("div");
    n.textContent = text;
    n.style.cssText = "position:fixed;right:max(12px,env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));background:#f1efa9;color:#9c2a2a;border:1px solid #000;padding:6px 14px;z-index:60;font-size:14px";
    document.body.appendChild(n);
    setTimeout(function () { n.remove(); }, 3500);
  }

  /* ---------------- Whose eyes are those eyes? ---------------- */
  var busy = false;
  function flashEyes() {
    if (busy) return; busy = true;
    app.classList.add("glitch"); eyes.classList.add("on");
    setTimeout(function () { eyes.classList.remove("on"); app.classList.remove("glitch"); busy = false; }, 1800);
  }

  /* ---------------- popups ---------------- */
  var hideTimer = null;
  function ctxFromEl(el) {
    var box = el.closest(".tbox"), f = box && box.querySelector("form.bbs[data-key]");
    if (f) { var t = findThread(f.getAttribute("data-board"), f.getAttribute("data-key")); if (t) return build(t); }
    var m = cur.match(/^#\/read\/([^/]+)\/([^/]+)/);
    if (m) { var t2 = findThread(m[1], m[2]); if (t2) return build(t2); }
    return null;
  }
  function showPopup(el, posts, r) {
    clearTimeout(hideTimer);
    var depth = el.closest(".popup") ? +el.closest(".popup").getAttribute("data-depth") + 1 : 0;
    Array.prototype.slice.call(popupLayer.children).forEach(function (p) { if (+p.getAttribute("data-depth") >= depth) p.remove(); });
    var div = document.createElement("div");
    div.className = "popup"; div.setAttribute("data-depth", depth);
    div.innerHTML = posts.length ? posts.map(function (p) { return renderPost(p, r); }).join("") : '<span class="small">(That post does not exist.)</span>';
    popupLayer.appendChild(div);
    var rc = el.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    div.style.left = Math.max(4, Math.min(rc.left + window.scrollX, window.scrollX + vw - div.offsetWidth - 8)) + "px";
    var top = rc.top + window.scrollY - div.offsetHeight - 4;
    if (top < window.scrollY) top = rc.bottom + window.scrollY + 4;
    div.style.top = top + "px";
  }
  function scheduleHide() { clearTimeout(hideTimer); hideTimer = setTimeout(function () { popupLayer.innerHTML = ""; }, 350); }
  document.addEventListener("mouseover", function (e) {
    var a = e.target.closest(".anchor");
    if (a) { var r = ctxFromEl(a); if (!r) return; var f = +a.getAttribute("data-a"), z = Math.min(+a.getAttribute("data-b"), f + 30);
      showPopup(a, r.posts.filter(function (p) { return p.n >= f && p.n <= z; }), r); return; }
    var id = e.target.closest(".id");
    if (id) { var r2 = ctxFromEl(id); if (!r2) return; var who = id.getAttribute("data-id");
      var mine = r2.posts.filter(function (p) { return p.id === who; }); if (mine.length > 1) showPopup(id, mine, r2); return; }
    if (e.target.closest(".popup")) clearTimeout(hideTimer);
  });
  document.addEventListener("mouseout", function (e) { if (e.target.closest(".anchor, .popup, .id")) scheduleHide(); });

  /* ---------------- clicks ---------------- */
  document.addEventListener("click", function (e) {
    var j = e.target.closest("[data-jump]");
    if (j) {
      e.preventDefault();
      var id = j.getAttribute("data-jump");
      if (id === "top") { window.scrollTo(0, 0); return; }
      var el = document.getElementById(id); if (el) el.scrollIntoView();
      return;
    }
    var anc = e.target.closest(".anchor");
    if (anc && !anc.closest(".popup") && cur.indexOf("#/read/") === 0) {
      var tgt = document.querySelector('#app .post[data-n="' + anc.getAttribute("data-a") + '"]');
      if (tgt) { e.preventDefault(); tgt.scrollIntoView({ block: "center" }); tgt.classList.add("hl"); setTimeout(function () { tgt.classList.remove("hl"); }, 1500); return; }
    }
    var nav = e.target.closest('a[href^="#/"]');
    if (nav) { e.preventDefault(); go(nav.getAttribute("href")); return; }
    var num = e.target.closest(".num");
    if (num) {
      var scope = num.closest(".tbox") || document, ta = scope.querySelector("textarea") || document.querySelector("textarea");
      if (ta) { ta.value += (ta.value && !/\n$/.test(ta.value) ? "\n" : "") + ">>" + num.getAttribute("data-n") + "\n"; ta.focus(); }
      return;
    }
    var idEl = e.target.closest(".id");
    if (idEl && idEl.closest("#app")) {
      var who = idEl.getAttribute("data-id"), on = !idEl.closest(".post").classList.contains("hl");
      document.querySelectorAll("#app .post").forEach(function (p) { p.classList.toggle("hl", on && p.getAttribute("data-id") === who); });
      return;
    }
    if (e.target.id === "wipe") {
      if (!e.target.dataset.armed) { e.target.dataset.armed = "1"; e.target.textContent = "Click again to confirm"; return; }
      try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf(LS) === 0) localStorage.removeItem(k); }); } catch (err) {}
      e.target.textContent = "Deleted. Reload the page.";
    }
  });
  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (f.id === "searchform") { e.preventDefault(); go("#/search/" + encodeURIComponent(f.q.value)); return; }
    if (f.classList.contains("bbs")) { e.preventDefault(); submit(f); }
  });

  var floatHome = document.createElement("a");
  floatHome.className = "floathome"; floatHome.href = "#/"; floatHome.textContent = "◀ Home"; floatHome.hidden = true;
  floatHome.setAttribute("aria-label", "Back to @channel Home");
  document.body.appendChild(floatHome);

  /* ---------------- router ---------------- */
  function route() {
    popupLayer.innerHTML = "";
    var parts = cur.replace(/^#\/?/, "").split("/");
    switch (parts[0]) {
      case "": pageTop(); break;
      case "board": pageBoard(parts[1]); break;
      case "newthread": pageBoard(parts[1]); setTimeout(function () { var el = document.getElementById("newthread"); if (el) el.scrollIntoView(); }, 0); return;
      case "subback": pageSubback(parts[1]); break;
      case "read": pageRead(parts[1], parts[2], parts[3]); break;
      case "search": pageSearch(decodeURIComponent(parts.slice(1).join("/") || "")); break;
      case "guide": pageGuide(parts[1]); break;
      case "newgen": pageNewGen(); break;
      default: notFound();
    }
    if (parts[0] !== "") app.insertAdjacentHTML("afterbegin", homeBar());
    floatHome.hidden = parts[0] === "";
    window.scrollTo(0, 0);
  }
  route();
  if (Math.random() < 0.03) setTimeout(flashEyes, 20000 + Math.random() * 40000);
})();
