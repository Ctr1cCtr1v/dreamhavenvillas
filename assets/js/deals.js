// Deal Alerts forms (Google Form or Formspree-style endpoint): send the signup in the background and show a thank-you
// message in place. Without JavaScript the form still posts normally. Also runs the signup popup.
(() => {
  const DONE_KEY = 'dhv-deals-signed-up';
  const SEEN_KEY = 'dhv-deals-popup-seen';
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k) => { try { localStorage.setItem(k, '1'); } catch (e) { /* storage blocked: fine */ } },
  };

  document.querySelectorAll('[data-deal-form]').forEach((form) => {
    const status = form.querySelector('.deal-form__status');
    const btn = form.querySelector('button[type="submit"]');
    const msg = (k) => form.querySelector(`template[data-msg="${k}"]`).innerHTML.trim();
    const show = (k, ok) => {
      status.textContent = msg(k);
      status.classList.toggle('is-ok', ok);
      status.hidden = false;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.hasAttribute('data-not-ready')) return show('not-ready', false);
      const data = new FormData(form);
      const bot = data.get('_gotcha');
      data.delete('_gotcha');
      // Answers with no form question yet ride along in the first-name answer,
      // e.g. "Jane Doe · text: 407-555-0100".
      const first = form.querySelector('[data-first-name]');
      if (first && first.name) {
        let full = data.get(first.name) || '';
        form.querySelectorAll('[data-merge]').forEach((el) => {
          const v = el.value.trim();
          if (!v) return;
          full += el.dataset.merge ? ` · ${el.dataset.merge}: ${v}` : ` ${v}`;
        });
        data.set(first.name, full);
      }
      // The Google Form requires at least one deal type: no boxes ticked means all of them.
      const picks = form.querySelectorAll('[data-interest]');
      if (picks.length && !form.querySelector('[data-interest]:checked')) {
        picks.forEach((el) => data.append(el.name, el.value));
      }
      btn.disabled = true;
      try {
        if (bot) {
          // Spam trap filled in: pretend it worked, send nothing.
        } else if (form.hasAttribute('data-google')) {
          // Google Forms doesn't allow reading its reply from another site, so
          // a sent request counts as success (a network failure still throws).
          await fetch(form.action, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(data) });
        } else {
          const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(res.status);
        }
        form.querySelectorAll('.field, .field-row, .check--consent, button').forEach((el) => { el.hidden = true; });
        show('success', true);
        store.set(DONE_KEY);
      } catch (err) {
        show('error', false);
      } finally {
        btn.disabled = false;
      }
    });
  });

  // Popup: once per visitor, a few seconds after landing. Never on the Deal
  // Alerts page itself, and never again after signing up.
  const pop = document.querySelector('[data-deal-popup]');
  if (!pop || !window.HTMLDialogElement) return;
  if (store.get(DONE_KEY) || store.get(SEEN_KEY) || document.querySelector('.deals [data-deal-form]')) return;
  const delay = (Number(pop.dataset.delay) || 15) * 1000;
  setTimeout(() => {
    if (document.querySelector('dialog[open]')) return; // e.g. the photo viewer is open
    store.set(SEEN_KEY);
    pop.showModal();
  }, delay);
  pop.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => pop.close()));
  pop.addEventListener('click', (e) => { if (e.target === pop) pop.close(); }); // tap outside to close
})();
