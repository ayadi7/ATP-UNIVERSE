const $ = (id)=>document.getElementById(id);

function showTab(id){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function changeClass(v){ return v>0?'up':v<0?'down':'same'; }
function changeText(v){ return v>0?`↑ ${v}`:v<0?`↓ ${Math.abs(v)}`:'—'; }

function renderHome(){
  const top = DATA.rankingsBeforeRG.slice(0,4);
  $('home').innerHTML = `
    <div class="hero">
      <h2>Roland Garros 2026 is next</h2>
      <p>ATP Universe is now powered by a permanent website instead of temporary Excel files.</p>
      <p><strong>${DATA.meta.playersCount} players</strong> are locked in the database.</p>
    </div>
    <div class="grid">
      <div class="card"><b>World No.1</b><div class="value">${top[0].player}</div><span>${top[0].pointsBeforeRG} pts</span></div>
      <div class="card"><b>Season Leader</b><div class="value">Novak Djokovic</div><span>AO · Indian Wells · Madrid</span></div>
      <div class="card"><b>Clay King</b><div class="value">Rafael Nadal</div><span>Monte-Carlo · Rome</span></div>
      <div class="card"><b>Next Event</b><div class="value">Roland Garros</div><span>Grand Slam · Clay</span></div>
    </div>
    <h2>Season Champions</h2>
    <div class="grid">${DATA.seasonTournaments.map(t=>`<div class="card"><b>${t.name}</b><div class="value">${t.champion}</div><span>${t.score}</span></div>`).join('')}</div>
  `;
}

function renderRankings(){
  $('rankings').innerHTML = `
    <h2>Rankings Before Roland Garros</h2>
    <input class="search" id="rankingSearch" placeholder="Search rankings..." onkeyup="renderRankingTable()">
    <table id="rankingTable"></table>
  `;
  renderRankingTable();
}

function renderRankingTable(){
  const q = ($('rankingSearch')?.value || '').toLowerCase();
  const rows = DATA.rankingsBeforeRG.filter(r=>r.player.toLowerCase().includes(q));
  $('rankingTable').innerHTML = `<tr><th>#</th><th>Change</th><th>Player</th><th>Points</th><th>AO Result</th><th>Titles</th></tr>`+
    rows.map(r=>`<tr>
      <td><b>${r.rankBeforeRG}</b></td>
      <td class="${changeClass(r.changeBeforeRG)}">${changeText(r.changeBeforeRG)}</td>
      <td>${r.player}</td>
      <td>${r.pointsBeforeRG}</td>
      <td>${r.aoResult}</td>
      <td>${r.titlesBeforeRG}</td>
    </tr>`).join('');
}

function renderPlayers(){
  $('players').innerHTML = `
    <h2>Players Database</h2>
    <input class="search" id="playerSearch" placeholder="Search player..." onkeyup="renderPlayersList()">
    <div id="playersList" class="playerGrid"></div>
  `;
  renderPlayersList();
}

function renderPlayersList(){
  const q = ($('playerSearch')?.value || '').toLowerCase();
  const rows = DATA.rankingsBeforeRG.filter(r=>r.player.toLowerCase().includes(q));
  $('playersList').innerHTML = rows.map(r=>`
    <div class="playerCard">
      <h3>#${r.rankBeforeRG} ${r.player}</h3>
      <p><b>${r.pointsBeforeRG}</b> points</p>
      <p>AO: ${r.aoResult || '—'} · Titles: ${r.titlesBeforeRG}</p>
      <p class="small">${r.source}</p>
    </div>
  `).join('');
}

function renderTournaments(){
  $('tournaments').innerHTML = `
    <h2>2026 Tournament Archive</h2>
    <div class="grid">
      ${DATA.seasonTournaments.map(t=>`
        <div class="card">
          <h3>${t.name} <span class="badge">${t.category}</span></h3>
          <p>Surface: ${t.surface}</p>
          <p>Champion: <b class="gold">${t.champion}</b></p>
          <p>Runner-up: ${t.runnerUp}</p>
          <p>Final: ${t.score}</p>
          <p class="muted">${t.story}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAustralia(){
  $('australia').innerHTML = `
    <h2>Australian Open 2026 GOLD EDITION</h2>
    <div class="panel">
      <p><b>Champion:</b> Novak Djokovic</p>
      <p><b>Runner-up:</b> Carlos Alcaraz</p>
      <p><b>Player of Tournament:</b> Rafael Nadal</p>
      <p><b>Match of Tournament:</b> Nadal def. Sinner, Round of 16</p>
    </div>
    <h3>Final-stage archive</h3>
    ${DATA.australianOpenFinalArchive.map(m=>`
      <div class="match">
        <b>${m.round}</b> · ${m.playerA} vs ${m.playerB}
        <p>Winner: <span class="gold">${m.winner}</span> · ${m.score}</p>
        <p>MVP: ${m.mvp} · ${m.duration} · ${m.stadium}</p>
        <p class="muted">${m.story}</p>
      </div>
    `).join('')}
  `;
}

function renderAdmin(){
  $('admin').innerHTML = `
    <h2>Admin Roadmap</h2>
    <div class="panel">
      <p>Next version will add editable tournament results directly in the browser.</p>
      <p>For now, this site stores the official ATP Universe database and avoids losing results in Excel files.</p>
    </div>
  `;
}

renderHome();renderRankings();renderPlayers();renderTournaments();renderAustralia();renderAdmin();
