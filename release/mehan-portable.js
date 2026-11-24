/* Mehan Portable Progressive Runtime (Zero Dependencies) */
(function () {
  try {
    var saved = localStorage.getItem('mehan-mode');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
      document.documentElement.style.colorScheme = saved;
    }
  } catch (e) {}

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    if (target instanceof HTMLDialogElement && target.classList.contains('mh-modal')) {
      var r = target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        target.close();
        return;
      }
    }

    var segBtn = target.closest('.mh-seg button');
    if (segBtn && segBtn.parentElement) {
      segBtn.parentElement.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-selected', b === segBtn ? 'true' : 'false');
        b.classList.toggle('is-active', b === segBtn);
      });
    }

    var sw = target.closest('.mh-switch');
    if (sw) {
      var next = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(next));
      sw.classList.toggle('is-on', next);
    }

    var tab = target.closest('.mh-tab[data-tab]');
    if (tab && tab.parentElement) {
      var tabId = tab.getAttribute('data-tab');
      tab.parentElement.querySelectorAll('.mh-tab').forEach(function (t) {
        var active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.classList.toggle('is-active', active);
      });
      document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
        if (p instanceof HTMLElement) {
          p.hidden = p.getAttribute('data-tab-panel') !== tabId;
        }
      });
    }

    var openBtn = target.closest('[data-mh-modal-open]');
    if (openBtn) {
      var dlg = document.getElementById(openBtn.getAttribute('data-mh-modal-open') || '');
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }

    var closeBtn = target.closest('[data-mh-modal-close]');
    if (closeBtn) {
      var parentDlg = closeBtn.closest('dialog');
      if (parentDlg) parentDlg.close();
    }

    var themeBtn = target.closest('[data-mh-theme-toggle], .mh-theme-toggle');
    if (themeBtn) {
      var root = document.documentElement;
      var isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
      var nextMode = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', nextMode);
      root.style.colorScheme = nextMode;
      try { localStorage.setItem('mehan-mode', nextMode); } catch (err) {}
    }

    var copyBtn = target.closest('[data-mh-copy]');
    if (copyBtn) {
      var payload = copyBtn.getAttribute('data-mh-copy') || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).catch(function () {});
      }
      copyBtn.setAttribute('data-copied', 'true');
      setTimeout(function () { copyBtn.removeAttribute('data-copied'); }, 1800);
    }

    var anchorCell = target.closest('.mh-anchor-grid button');
    if (anchorCell && anchorCell.parentElement) {
      anchorCell.parentElement.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-checked', b === anchorCell ? 'true' : 'false');
      });
    }
  });
})();