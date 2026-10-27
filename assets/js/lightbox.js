// Full-screen photo viewer for any link with data-lightbox="<group>".
// Links in the same group become one swipeable set. Without JavaScript the
// links simply open the large photo.
(() => {
  const triggers = () => [...document.querySelectorAll('a[data-lightbox]')];
  if (!triggers().length || !window.HTMLDialogElement) return;

  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Photo viewer');
  dlg.innerHTML = `
    <div class="lightbox__stage">
      <img class="lightbox__img" alt="">
    </div>
    <div class="lightbox__bar">
      <span class="lightbox__caption"></span>
      <span class="lightbox__count"></span>
    </div>
    <button class="lightbox__btn lightbox__close" type="button" aria-label="Close">&times;</button>
    <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">&#8249;</button>
    <button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">&#8250;</button>`;
  document.body.appendChild(dlg);

  const img = dlg.querySelector('.lightbox__img');
  const caption = dlg.querySelector('.lightbox__caption');
  const count = dlg.querySelector('.lightbox__count');
  const prevBtn = dlg.querySelector('.lightbox__prev');
  const nextBtn = dlg.querySelector('.lightbox__next');
  let set = [], index = 0, opener = null;

  // Warm up the neighbours at the same size the viewer will pick
  const preload = (a) => {
    if (!a) return;
    const t = a.querySelector('img'), i = new Image();
    if (t && t.srcset) { i.sizes = '100vw'; i.srcset = t.srcset; }
    i.src = a.href;
  };

  const show = (i) => {
    index = (i + set.length) % set.length;
    const a = set[index];
    const thumb = a.querySelector('img');
    img.classList.remove('is-loaded');
    img.removeAttribute('srcset');
    if (thumb && thumb.srcset) { img.srcset = thumb.srcset; img.sizes = '100vw'; }
    img.src = a.href;
    img.alt = (thumb && thumb.alt) || a.dataset.caption || '';
    caption.textContent = a.dataset.caption || '';
    count.textContent = set.length > 1 ? `${index + 1} / ${set.length}` : '';
    prevBtn.hidden = nextBtn.hidden = set.length < 2;
    preload(set[(index + 1) % set.length]);
    preload(set[(index - 1 + set.length) % set.length]);
  };
  img.addEventListener('load', () => img.classList.add('is-loaded'));

  const open = (a) => {
    // Same group, skipping photos hidden by a gallery filter
    set = triggers().filter((t) => t.dataset.lightbox === a.dataset.lightbox && !t.closest('[hidden]'));
    opener = a;
    show(set.indexOf(a));
    document.documentElement.classList.add('lightbox-open');
    dlg.showModal();
  };

  dlg.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
    img.removeAttribute('src');
    if (opener) opener.focus();
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-lightbox]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    open(a);
  });

  dlg.querySelector('.lightbox__close').addEventListener('click', () => dlg.close());
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));
  // Click on the dark backdrop (not the photo or controls) closes
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.classList.contains('lightbox__stage')) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe left/right on touch screens
  let startX = null, startY = null;
  dlg.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  dlg.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });
})();

// Gallery category filter buttons
(() => {
  const bar = document.querySelector('.filters');
  if (!bar) return;
  const items = [...document.querySelectorAll('.gallery__item')];
  bar.hidden = false;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('.filter').forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    items.forEach((it) => { it.hidden = f !== 'all' && it.dataset.category !== f; });
  });
})();
