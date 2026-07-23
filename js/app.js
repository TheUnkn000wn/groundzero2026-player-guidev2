
const tabs=[...document.querySelectorAll('.tab')];
const panels=[...document.querySelectorAll('.panel')];
function resetTabScroll(){
  // Move the viewport to the beginning of the newly opened tab content,
  // while keeping the hero/header above it out of view.
  const activePanel=document.querySelector('.panel.active');
  if(!activePanel) return;

  activePanel.scrollIntoView({behavior:'auto',block:'start'});

  // Keep the panel heading visible below the sticky tab navigation.
  const stickyTabs=document.querySelector('.tabs');
  const offset=(stickyTabs?.offsetHeight || 0)+14;
  window.scrollBy({top:-offset,left:0,behavior:'auto'});
}
function openTab(name, updateHash=false){
  tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===name));
  if(updateHash) history.replaceState(null,'','#'+name);

  // Wait until the selected panel is visible, then reset the view.
  requestAnimationFrame(resetTabScroll);
}
tabs.forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab,true)));
document.querySelectorAll('.side a').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault(); openTab(a.dataset.target);
  setTimeout(()=>document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'}),60);
}));
document.querySelectorAll('.faq button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));

const input=document.getElementById('searchInput');
input.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase();
  document.querySelectorAll('mark').forEach(m=>m.replaceWith(m.textContent));
  if(!q) return;
  let first=null;
  panels.forEach(panel=>{
    const walker=document.createTreeWalker(panel,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(['SCRIPT','STYLE','BUTTON'].includes(node.parentElement?.tagName)) return;
      const text=node.nodeValue; const idx=text.toLowerCase().indexOf(q);
      if(idx>=0){
        const frag=document.createDocumentFragment();
        frag.append(text.slice(0,idx));
        const mark=document.createElement('mark'); mark.textContent=text.slice(idx,idx+q.length); frag.append(mark);
        frag.append(text.slice(idx+q.length)); node.replaceWith(frag);
        if(!first){first=mark; openTab(panel.dataset.panel);}
      }
    });
  });
  if(first) setTimeout(()=>first.scrollIntoView({behavior:'smooth',block:'center'}),80);
});

document.querySelectorAll('[data-open-tab]').forEach(btn=>{
  btn.addEventListener('click',()=>openTab(btn.dataset.openTab,true));
});

document.querySelector('.print-action')?.addEventListener('click',()=>window.print());
const initial=location.hash.replace('#','');
if(tabs.some(t=>t.dataset.tab===initial)) openTab(initial);


document.querySelectorAll('.footer-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    openTab(a.dataset.target);
    setTimeout(() => document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'}), 60);
  });
});


/* ---- Extracted script block ---- */


(function(){
  const target = document.getElementById('scheduleFullscreenTarget');
  const expandBtn = document.getElementById('scheduleExpandBtn');
  const closeBtn = document.getElementById('scheduleCloseFullscreen');
  const scaleEl = document.getElementById('scheduleScale');
  const zoomLabel = document.getElementById('scheduleZoomLabel');
  const zoomIn = document.getElementById('scheduleZoomIn');
  const zoomOut = document.getElementById('scheduleZoomOut');
  const search = document.getElementById('scheduleSearch');
  let zoom = 1;

  function applyZoom(){
    scaleEl.style.transform = `scale(${zoom})`;
    scaleEl.style.width = `${100 / zoom}%`;
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  }

  zoomIn?.addEventListener('click', () => {
    zoom = Math.min(1.4, +(zoom + 0.1).toFixed(2));
    applyZoom();
  });

  zoomOut?.addEventListener('click', () => {
    zoom = Math.max(0.7, +(zoom - 0.1).toFixed(2));
    applyZoom();
  });

  function openSchedule(){
    if (target.requestFullscreen) {
      target.requestFullscreen().catch(() => target.classList.add('fullscreen-fallback'));
    } else {
      target.classList.add('fullscreen-fallback');
    }
  }

  function closeSchedule(){
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    target.classList.remove('fullscreen-fallback');
  }

  expandBtn?.addEventListener('click', openSchedule);
  closeBtn?.addEventListener('click', closeSchedule);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') target.classList.remove('fullscreen-fallback');
  });

  if (!document.getElementById('scheduleSearchResults')) search?.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let hits = 0;
    document.querySelectorAll('.guide-match').forEach(card => {
      card.classList.remove('search-hidden','search-hit');
      if (!q) return;
      const hit = card.textContent.toLowerCase().includes(q);
      card.classList.add(hit ? 'search-hit' : 'search-hidden');
      if (hit) hits++;
    });

    const help = document.getElementById('scheduleSearchHelp');
    if (!help) return;

    if (!q) {
      help.textContent = 'Matching schedule cells will be highlighted below.';
      return;
    }

    help.textContent = hits
      ? `${hits} matching schedule ${hits === 1 ? 'cell' : 'cells'} found.`
      : 'No match found. Check the complete team code from the official draw results.';

    if (hits) {
      const firstHit = document.querySelector('.guide-match.search-hit');
      if (firstHit) {
        setTimeout(() => {
          firstHit.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          firstHit.classList.add('search-flash');
          setTimeout(() => firstHit.classList.remove('search-flash'), 1800);
        }, 80);
      }
    }
  });
})();


/* ---- Extracted script block ---- */


(function(){
  const isMobile = window.matchMedia('(max-width: 800px), (pointer: coarse)').matches;

  document.querySelectorAll('a.sponsor-link[href]').forEach(link => {
    if (isMobile) {
      link.removeAttribute('target');
      link.setAttribute('rel','noopener noreferrer');
    }

    link.addEventListener('click', function(event){
      const url = this.getAttribute('href');
      if (!url || url === '#') return;

      if (isMobile) {
        event.preventDefault();
        window.location.assign(url);
      }
    }, {passive:false});
  });
})();


/* ---- Extracted script block ---- */


(function(){
  const overlay = document.getElementById('mobileQuickNavOverlay');
  const openButton = document.getElementById('mobileQuickNavOpen');
  const closeButton = document.getElementById('mobileQuickNavClose');
  const linksContainer = document.getElementById('mobileQuickNavLinks');
  const searchInput = document.getElementById('mobileQuickNavSearch');
  const desktopLinks = Array.from(document.querySelectorAll('.side a[data-target]'));

  if (!overlay || !openButton || !linksContainer) return;

  desktopLinks.forEach((originalLink, index) => {
    const link = originalLink.cloneNode(true);
    link.dataset.originalQuickLink = String(index);
    linksContainer.appendChild(link);
  });

  function openSheet(){
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    setTimeout(() => searchInput?.focus(), 240);
  }

  function closeSheet(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if (searchInput) {
      searchInput.value='';
      linksContainer.querySelectorAll('a').forEach(link => link.classList.remove('filtered-out'));
    }
  }

  openButton.addEventListener('click', openSheet);
  closeButton?.addEventListener('click', closeSheet);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeSheet();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeSheet();
  });

  linksContainer.addEventListener('click', event => {
    const clicked = event.target.closest('a[data-original-quick-link]');
    if (!clicked) return;
    event.preventDefault();

    const original = desktopLinks[Number(clicked.dataset.originalQuickLink)];
    closeSheet();

    if (original) {
      setTimeout(() => original.click(), 180);
    }
  });

  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    linksContainer.querySelectorAll('a').forEach(link => {
      link.classList.toggle('filtered-out', Boolean(query) && !link.textContent.toLowerCase().includes(query));
    });
  });
})();


/* ===== v2.0 intelligent schedule finder and global command palette ===== */
(function(){
  const input=document.getElementById('scheduleSearch');
  const results=document.getElementById('scheduleSearchResults');
  const help=document.getElementById('scheduleSearchHelp');
  if(!input||!results) return;
  const aliases={
    hi:['high intermediate','high inter','high'], li:['low intermediate','low inter','low'], n:['novice'],
    md:['mens doubles','men doubles','mens','men','male'], wd:['womens doubles','women doubles','womens','women','female'],
    mx:['mixed doubles','mixed','mix'], xd:['mixed doubles','mixed','mix']
  };
  function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/['’]/g,'').replace(/\bmens?\b/g,'men').replace(/\bwomens?\b/g,'women').replace(/[^a-z0-9]+/g,' ').trim()}
  function expand(q){
    let tokens=norm(q).split(/\s+/).filter(Boolean), out=[...tokens];
    tokens.forEach(t=>{if(aliases[t]) aliases[t].forEach(x=>out.push(...x.split(' ')));});
    if(tokens.includes('high')) out.push('intermediate');
    if(tokens.includes('low')) out.push('intermediate');
    return [...new Set(out)];
  }
  const cards=[...document.querySelectorAll('.guide-match')].map(card=>{
    const text=[card.dataset.label,card.dataset.matchup,card.dataset.time,card.dataset.court,card.textContent].join(' ');
    const category=card.classList.contains('women')?'women':card.classList.contains('men')?'men':card.classList.contains('mixed')?'mixed':'';
    return {card,text:norm(text),label:card.dataset.label||'',matchup:card.dataset.matchup||'',time:card.dataset.time||'',court:card.dataset.court||'',category};
  });
  function score(item,tokens,raw){
    if(!tokens.length) return 0; let s=0; const compact=item.text.replace(/ /g,'');
    if(item.text.includes(raw)) s+=12;
    tokens.forEach(t=>{if(item.text.split(' ').includes(t)) s+=5; else if(item.text.includes(t)) s+=3; else if(t.length>2 && compact.includes(t)) s+=2;});
    return s;
  }
  function render(){
    document.querySelectorAll('.guide-match').forEach(c=>c.classList.remove('search-hidden','search-hit'));
    const raw=norm(input.value); const tokens=expand(raw);
    if(!raw){results.hidden=true;results.innerHTML='';help.textContent='Try “High Men”, “HI MD”, “Novice Mix”, “Court 5”, or a team code.';document.querySelector('.guide-schedule-wrap')?.classList.remove('searching');return;}
    const matches=cards.map(x=>({...x,rank:score(x,tokens,raw)})).filter(x=>x.rank>=Math.max(4,tokens.length*2)).sort((a,b)=>b.rank-a.rank||a.time.localeCompare(b.time));
    results.hidden=false;
    help.textContent=matches.length?`${matches.length} matching ${matches.length===1?'match':'matches'} found.`:'No matching schedule found. Try fewer words or a team code.';
    if(!matches.length){results.innerHTML='<div class="schedule-no-results"><b>No matches found</b><p>Try “High Men”, “HI MD”, “Mixed”, “Court 5”, or the official team code.</p></div>';return;}
    results.innerHTML=`<div class="schedule-results-header"><div><span class="section-tag">Search Results</span><h3>${matches.length} ${matches.length===1?'Match':'Matches'} Found</h3></div><p>Results stay here so you can compare matches without losing your place.</p></div><div class="schedule-result-grid">${matches.map((m,i)=>`<article class="match-result-card" data-result-index="${i}"><div class="match-result-top"><span class="match-time">${m.time||'Time TBA'}</span><span class="match-court">${m.court||'Court TBA'}</span></div><div class="match-division${m.category?' category-'+m.category:''}">${m.label}</div><div class="match-teams"><span>${(m.matchup.split(/\s+vs\s+/i)[0]||'TBA')}</span><span class="match-vs">VS</span><span>${(m.matchup.split(/\s+vs\s+/i)[1]||'TBA')}</span></div><div class="match-result-actions"><button type="button" class="match-details-toggle" aria-expanded="false">Details</button><button type="button" class="match-view-board">Full Schedule</button></div><div class="match-inline-details" hidden><dl><div><dt>Time</dt><dd>${m.time||'TBA'}</dd></div><div><dt>Court</dt><dd>${m.court||'TBA'}</dd></div><div><dt>Division / Category</dt><dd class="match-detail-category${m.category?' category-'+m.category:''}">${m.label||'TBA'}</dd></div><div><dt>Match</dt><dd>${m.matchup||'TBA'}</dd></div></dl></div></article>`).join('')}</div>`;
    results.querySelectorAll('.match-result-card').forEach((cardEl,idx)=>{
      const detailsBtn=cardEl.querySelector('.match-details-toggle');
      const details=cardEl.querySelector('.match-inline-details');
      const boardBtn=cardEl.querySelector('.match-view-board');
      detailsBtn?.addEventListener('click',()=>{
        const willOpen=details.hidden;
        details.hidden=!willOpen;
        detailsBtn.setAttribute('aria-expanded',String(willOpen));
        detailsBtn.textContent=willOpen?'Hide Details':'Details';
      });
      boardBtn?.addEventListener('click',()=>{
        const target=matches[idx].card;
        target.scrollIntoView({behavior:'smooth',block:'center',inline:'center'});
        target.classList.add('search-flash');
        setTimeout(()=>target.classList.remove('search-flash'),1800);
      });
    });
  }
  input.addEventListener('input',render);
})();

(function(){
  const overlay=document.getElementById('commandPalette'), open=document.getElementById('commandOpen'), input=document.getElementById('commandInput'), results=document.getElementById('commandResults');
  if(!overlay||!input||!results) return;
  const entries=[];
  document.querySelectorAll('.side a[data-target], .footer-links a[data-target]').forEach(a=>entries.push({title:a.textContent.trim(),detail:'Section',action:()=>a.click()}));
  document.querySelectorAll('.fault-topic').forEach(btn=>entries.push({title:btn.querySelector('strong')?.innerText.trim()||'Rule',detail:'Common fault',action:()=>{openTab('rules',true);btn.click();setTimeout(()=>document.querySelector('#common-faults')?.scrollIntoView({behavior:'smooth',block:'start'}),80)}}));
  function show(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>input.focus(),50)}
  function hide(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';input.value='';results.innerHTML='<p class="command-empty">Start typing to search the Player Guide.</p>'}
  function render(){const q=input.value.trim().toLowerCase();if(!q){results.innerHTML='<p class="command-empty">Start typing to search the Player Guide.</p>';return}const found=entries.filter(e=>(e.title+' '+e.detail).toLowerCase().includes(q)).slice(0,12);results.innerHTML=found.length?found.map((e,i)=>`<button class="command-item" data-i="${i}"><b>${e.title}</b><small>${e.detail}</small></button>`).join(''):'<p class="command-empty">No result found.</p>';results.querySelectorAll('.command-item').forEach((b,i)=>b.onclick=()=>{hide();found[i].action()})}
  open?.addEventListener('click',show);input.addEventListener('input',render);overlay.addEventListener('click',e=>{if(e.target===overlay)hide()});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();show()}if(e.key==='Escape'&&overlay.classList.contains('open'))hide()});
})();


// Version 3.0 fault topic master-detail navigation
(()=>{
  const buttons=[...document.querySelectorAll('.fault-topic')];
  const panels=[...document.querySelectorAll('[data-fault-panel]')];
  const select=document.querySelector('#fault-topic-select');
  if(!buttons.length||!panels.length)return;
  function showFault(id){
    buttons.forEach(btn=>{
      const active=btn.dataset.faultTarget===id;
      btn.classList.toggle('is-active',active);
      btn.setAttribute('aria-selected',String(active));
      const small=btn.querySelector('small');
      if(small)small.textContent=active?'Selected topic':'Open rule guidance';
    });
    panels.forEach(panel=>{
      const active=panel.id===id;
      panel.hidden=!active;
      panel.classList.toggle('is-active',active);
    });
    if(select&&select.value!==id)select.value=id;
  }
  buttons.forEach(btn=>btn.addEventListener('click',()=>showFault(btn.dataset.faultTarget)));
  select?.addEventListener('change',()=>showFault(select.value));
  showFault(buttons.find(btn=>btn.classList.contains('is-active'))?.dataset.faultTarget||buttons[0].dataset.faultTarget);
})();
