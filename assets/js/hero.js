// Home hero slideshow: crossfades through the photos in assets/images/hero/.
// Each next photo is downloaded just before it's shown. Stops for visitors who
// prefer reduced motion, pauses when the tab is hidden, and has a pause button.
(() => {
  const box = document.querySelector('[data-slideshow]');
  if (!box) return;
  const slides = [...box.querySelectorAll('.hero__slide')];
  const btn = box.parentElement.querySelector('.hero__pause');
  const ms = (parseFloat(box.dataset.interval) || 6) * 1000;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let i = 0, timer = null, paused = false, busy = false;

  // Resolves once the photo is ready (or after 8s, so one slow photo can't stall the show).
  const load = (img) => new Promise((done) => {
    setTimeout(done, 8000);
    if (img.dataset.src) {
      img.srcset = img.dataset.srcset || '';
      img.src = img.dataset.src;
      delete img.dataset.src; delete img.dataset.srcset;
    }
    if (img.complete && img.naturalWidth) return done();
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });

  const next = async () => {
    if (busy) return;
    busy = true;
    const n = (i + 1) % slides.length;
    await load(slides[n]);
    if (!slides[n].naturalWidth) { busy = false; return; }   // failed to load: skip for now
    slides[i].classList.remove('is-active');
    slides[n].classList.add('is-active');
    i = n;
    busy = false;
    load(slides[(n + 1) % slides.length]);
  };

  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => {
    stop();
    if (!paused && !reduce.matches && !document.hidden) timer = setInterval(next, ms);
  };

  if (btn) {
    btn.hidden = reduce.matches;
    btn.addEventListener('click', () => {
      paused = !paused;
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
      start();
    });
  }
  reduce.addEventListener('change', () => { if (btn) btn.hidden = reduce.matches; start(); });
  document.addEventListener('visibilitychange', start);

  // Fetch the second photo once the page has finished loading, then begin.
  const begin = () => { load(slides[1]); start(); };
  if (document.readyState === 'complete') begin();
  else window.addEventListener('load', begin, { once: true });
})();
