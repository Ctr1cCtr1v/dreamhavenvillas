// Deal Alerts form: sends the signup in the background and shows a thank-you
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
    btn.disabled = true;
    try {
      const data = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.querySelectorAll('.field, .field-row, .check--consent, button').forEach((el) => { el.hidden = true; });
      show('success', true);
    } catch (err) {
      show('error', false);
    } finally {
      btn.disabled = false;
    }
  });
})();
