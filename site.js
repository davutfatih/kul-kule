/* Kül Kule sitesi: metinler icerik/site.json'dan (yönetim panelinden düzenlenir), oyun verisi veri/oyun.json'dan okunur. */
(async function(){
  const $ = s => document.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; };
  const kac = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const yol = (o, k) => k.split('.').reduce((a, p) => a && a[p], o);
  const al = async u => { const r = await fetch(u, { cache:'no-cache' }); return r.json(); };
  const [S, V] = await Promise.all([al('icerik/site.json'), al('veri/oyun.json')]);
  /* yönetim paneli resim yollarını '/img/..' diye yazar; site alt klasörde (github.io/kul-kule/) yayınlandığı için göreli yap */
  const gy = p => String(p || '').replace(/^\/+/, '');
  S.kapak = gy(S.kapak); (S.kahramanlar || []).forEach(h => h.resim = gy(h.resim)); (S.galeri || []).forEach(g => g.resim = gy(g.resim));

  document.querySelectorAll('[data-k]').forEach(e => { const v = yol(S, e.dataset.k); if(v != null && v !== '') e.textContent = v; });
  $('#yil').textContent = new Date().getFullYear();
  if(S.kapak) document.documentElement.style.setProperty('--kapak', `url("${S.kapak}")`);

  /* kıvılcımlar */
  const kv = $('.kivilcimlar');
  for(let i = 0; i < 40; i++){ const k = el('i', 'kivilcim'); k.style.left = Math.random()*100 + '%'; k.style.setProperty('--dx', (Math.random()*160 - 80) + 'px'); k.style.animationDuration = (7 + Math.random()*9) + 's'; k.style.animationDelay = (-Math.random()*14) + 's'; k.style.opacity = .4 + Math.random()*.6; kv.appendChild(k); }

  /* hikâye */
  (S.hikaye || []).forEach(p => $('#hikaye-ic').appendChild(el('p', '', kac(p))));

  /* kahramanlar */
  const HK = { w:'Savaşçı', r:'Suikastçı', m:'Büyücü', p:'Ruhban', ortak:'Ortak' };
  (S.kahramanlar || []).forEach(h => {
    const n = V.kartlar.filter(k => k.kahraman === h.kod).length;
    $('#kahraman-ic').appendChild(el('article', 'kahraman', `
      <div class="foto" style="background-image:url('${kac(h.resim)}')"></div>
      <div class="ic"><h3>${kac(h.ad)}</h3><div class="unvan">“${kac(h.unvan)}”</div>
      <div class="etiketler"><span class="etiket">⚔ ${kac(h.silah)}</span><span class="etiket">✦ ${kac(h.kaynak)}</span>${n ? `<span class="etiket">🃏 ${n} özel kart</span>` : ''}</div>
      <p>${kac(h.oynanis)}</p>${h.ipucu ? `<p class="ipucu">💡 ${kac(h.ipucu)}</p>` : ''}</div>`));
  });

  /* nasıl oynanır */
  (S.nasil_oynanir || []).forEach(a => $('#adim-ic').appendChild(el('div', 'adim', `<h3>${kac(a.baslik)}</h3><p>${kac(a.metin)}</p>`)));
  (S.kontroller || []).forEach(k => $('#kontrol-ic').appendChild(el('div', 'kontrol', `<span class="tus">${kac(k.tus)}</span><span>${kac(k.is)}</span>`)));

  /* kart türleri, durumlar */
  V.turler.forEach(t => { const e = el('span', 'tur', `${t.ikon} ${kac(t.ad)}`); e.style.borderColor = t.renk; e.style.color = t.renk; $('#tur-ic').appendChild(e);
    const o = el('option'); o.value = t.ad; o.textContent = t.ikon + ' ' + t.ad; $('#kart-tur').appendChild(o); });
  V.durumlar.forEach(d => $('#durum-ic').appendChild(el('div', 'durum', `<b>${d.ikon} ${kac(d.ad)}</b> — ${kac(d.aciklama)}`)));

  /* süzgeçli, sayfalı liste yardımcısı */
  function liste(kap, dugme, veri, ciz, adim){
    let n = adim, son = veri;
    const goster = () => { kap.innerHTML = ''; son.slice(0, n).forEach((x, i) => { const e = ciz(x); e.style.animationDelay = Math.min(i % adim, 20) * 15 + 'ms'; kap.appendChild(e); });
      dugme.classList.toggle('gizli', son.length <= n); dugme.textContent = `Daha fazla göster (${son.length - n} kaldı)`; };
    dugme.onclick = () => { n += adim; goster(); };
    return { yenile(v){ son = v; n = adim; goster(); } };
  }

  /* kartlar */
  $('#kart-say').textContent = V.kartlar.length;
  const KL = liste($('#kart-ic'), $('#kart-daha'), V.kartlar, k => el('div', 'kart nad-' + k.nadirlik,
    `<span class="bedel">${k.enerji}</span><h4>${kac(k.ad)}</h4><div class="ust-bilgi">${k.ikon} ${kac(k.tur)} · ${kac(k.nadirlik)} · ${HK[k.kahraman] || ''}</div><p>${kac(k.aciklama)}</p>`), 24);
  const kartSuz = () => { const q = $('#kart-ara').value.toLocaleLowerCase('tr'), h = $('#kart-kahraman').value, t = $('#kart-tur').value;
    KL.yenile(V.kartlar.filter(k => (!h || k.kahraman === h) && (!t || k.tur === t) && (!q || (k.ad + ' ' + k.aciklama + ' ' + k.tur).toLocaleLowerCase('tr').includes(q)))); };
  ['#kart-ara', '#kart-kahraman', '#kart-tur'].forEach(s => $(s).addEventListener('input', kartSuz)); kartSuz();

  /* kombolar */
  $('#kombo-say').textContent = V.kombolar.length;
  const aileler = {}; V.kombolar.forEach(k => aileler[k.aile] = (aileler[k.aile] || 0) + 1);
  Object.entries(aileler).forEach(([a, n]) => {
    const b = el('button', 'aile', `${kac(a)}<i>${n}</i>`); b.type = 'button';
    b.onclick = () => { $('#kombo-aile').value = $('#kombo-aile').value === a ? '' : a; komboSuz(); }; b.dataset.a = a; $('#aile-ic').appendChild(b);
    const o = el('option'); o.value = a; o.textContent = a; $('#kombo-aile').appendChild(o);
  });
  const KO = liste($('#kombo-ic'), $('#kombo-daha'), V.kombolar, k => el('div', 'kombo',
    `<h4>⚡ ${kac(k.ad)}</h4><div class="ai">${kac(k.aile)}${k.kahraman ? ' · ' + HK[k.kahraman] : ''}</div><p class="nasil">${kac(k.nasil)}</p><p class="etki">→ ${kac(k.etki)}</p>`), 18);
  function komboSuz(){ const q = $('#kombo-ara').value.toLocaleLowerCase('tr'), a = $('#kombo-aile').value;
    document.querySelectorAll('.aile').forEach(b => b.classList.toggle('secili', b.dataset.a === a));
    KO.yenile(V.kombolar.filter(k => (!a || k.aile === a) && (!q || (k.ad + ' ' + k.nasil + ' ' + k.etki).toLocaleLowerCase('tr').includes(q)))); }
  ['#kombo-ara', '#kombo-aile'].forEach(s => $(s).addEventListener('input', komboSuz)); komboSuz();

  /* canavarlar */
  $('#canavar-say').textContent = V.canavarlar.length;
  const siniflar = ['Tümü', ...new Set(V.canavarlar.map(c => c.sinif))];
  const canCiz = s => { $('#canavar-ic').innerHTML = '';
    document.querySelectorAll('#canavar-sekme .aile').forEach(b => b.classList.toggle('secili', b.textContent.startsWith(s)));
    V.canavarlar.filter(c => s === 'Tümü' || c.sinif === s).forEach(c => $('#canavar-ic').appendChild(el('div', 'canavar' + (/Boss/.test(c.sinif) ? ' boss' : /Elit/.test(c.sinif) ? ' elit' : ''),
      `<div class="bas"><span class="ik">${c.ikon}</span><div><h4>${kac(c.ad)}</h4><div class="can">${kac(c.sinif)} · ❤ ${c.can}${c.fazli ? ' · çok evreli' : ''}</div></div></div>
       <p class="zd">${c.zayif.length ? `<span class="z">▲ ${c.zayif.map(kac).join(', ')}</span> ` : ''}${c.direncli.length ? `<span class="d">▼ ${c.direncli.map(kac).join(', ')}</span>` : ''}</p>
       ${c.ozellik.length ? `<ul>${c.ozellik.map(o => `<li>${kac(o)}</li>`).join('')}</ul>` : ''}`))); };
  siniflar.forEach(s => { const b = el('button', 'aile', kac(s) + (s === 'Tümü' ? '' : `<i>${V.canavarlar.filter(c => c.sinif === s).length}</i>`)); b.type = 'button'; b.onclick = () => canCiz(s); $('#canavar-sekme').appendChild(b); });
  canCiz('Tümü');
  V.kalintilar.forEach(k => $('#kalinti-ic').appendChild(el('div', 'kalinti', `<b>${k.ikon} ${kac(k.ad)}</b><br>${kac(k.aciklama)}`)));

  /* galeri */
  (S.galeri || []).forEach(g => { const f = el('figure', '', `<img loading="lazy" src="${kac(g.resim)}" alt="${kac(g.yazi)}"><figcaption>${kac(g.yazi)}</figcaption>`);
    f.onclick = () => { const b = $('#buyutec'); b.querySelector('img').src = g.resim; b.querySelector('p').textContent = g.yazi; b.classList.add('acik'); }; $('#galeri-ic').appendChild(f); });

  /* indir */
  const I = S.indirme || {};
  const d = $('#indir-dugme');
  if(I.aktif && I.adres){ d.href = I.adres; d.target = '_blank'; d.rel = 'noopener'; } else { d.textContent = 'Çok yakında'; d.removeAttribute('href'); d.style.opacity = .6; }
  (I.gereksinimler || []).forEach(g => $('#gerek-ic').appendChild(el('li', '', kac(g))));
  (I.kurulum || []).forEach(g => $('#kurulum-ic').appendChild(el('li', '', kac(g).replace(/copy \/b [^ ]+ [^ ]+/, m => `<code>${m}</code>`))));

  /* yapımcı, sss */
  const Y = S.yapimci || {};
  const il = [];
  if(Y.iletisim) il.push(/@/.test(Y.iletisim) ? `✉ <a href="mailto:${kac(Y.iletisim)}">${kac(Y.iletisim)}</a>` : kac(Y.iletisim));
  (Y.sosyal || []).forEach(s => s && s.adres && il.push(`<a href="${kac(s.adres)}" target="_blank" rel="noopener">${kac(s.ad || s.adres)}</a>`));
  $('#iletisim-ic').innerHTML = il.join(' · ');
  (S.sss || []).forEach(q => $('#sss-ic').appendChild(el('details', '', `<summary>${kac(q.s)}</summary><p>${kac(q.c)}</p>`)));

  document.querySelectorAll('.ust nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-acik')));
})().catch(e => { console.error(e); document.body.insertAdjacentHTML('afterbegin', '<p style="background:#600;color:#fff;padding:10px;margin:0;text-align:center">İçerik yüklenemedi: ' + e.message + '</p>'); });
