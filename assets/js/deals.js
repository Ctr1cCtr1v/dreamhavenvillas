// Deal Alerts form (Google Form or Formspree-style endpoint): sends the signup in the background and shows a thank-you
// message in place. Without JavaScript the form still posts normally.
(() => {
  const form = document.querySelector('[data-deal-form]');
  if (!form) return;
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
    } catch (err) {
      show('error', false);
    } finally {
      btn.disabled = false;
    }
  });
})();
