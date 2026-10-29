(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const toggle = header.querySelector('.site-toggle');
  const groups = [...header.querySelectorAll('.site-disclosure')];
  const setOpen = (group, open) => {
    group.querySelector('button').setAttribute('aria-expanded', String(open));
    group.querySelector('.site-panel').hidden = !open;
  };
  const closeGroups = () => groups.forEach(group => setOpen(group, false));
  const closeAll = () => { closeGroups(); toggle.setAttribute('aria-expanded', 'false'); };
  header.classList.add('nav-ready');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    closeGroups(); toggle.setAttribute('aria-expanded', String(open));
  });
  groups.forEach(group => {
    const button = group.querySelector('button');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeGroups(); setOpen(group, open);
    });
    button.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      event.preventDefault(); closeGroups(); setOpen(group, true);
      const links = group.querySelectorAll('a');
      links[event.key === 'ArrowDown' ? 0 : links.length - 1].focus();
    });
    group.addEventListener('focusout', event => {
      if (!group.contains(event.relatedTarget)) setOpen(group, false);
    });
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openGroup = groups.find(group => !group.querySelector('.site-panel').hidden);
    if (openGroup) { setOpen(openGroup, false); openGroup.querySelector('button').focus(); }
    else if (toggle.getAttribute('aria-expanded') === 'true') { closeAll(); toggle.focus(); }
  });
  header.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    if (link.dataset.page && typeof window.showPage === 'function' && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault(); window.showPage(link.dataset.page);
    }
    closeAll();
  });
  header.addEventListener('focusout', event => {
    if (!header.contains(event.relatedTarget)) closeAll();
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeAll(); });
  window.addEventListener('hashchange', closeAll);
  window.matchMedia('(max-width: 760px)').addEventListener('change', closeAll);
})();
