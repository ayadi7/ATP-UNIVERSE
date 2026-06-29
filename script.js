let state = JSON.parse(localStorage.getItem('atpUniverseV5')||'{}');
if(!state.players){ state = structuredClone(DATA); save(); }

function save(){ localStorage.setItem('atpUniverseV5', JSON.stringify(state)); }
function resetData(){ if(confirm('Reset site data to v5 original?')){localStorage.removeItem('atpUniverseV5'); location.reload();}}
function toggleTheme(){ document.body.classList.toggle('light'); }

function view(id){ document.querySelectorAll('.page').forEach(p=>p.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0,0); }
function sortedPlayers(){ return [...state.players].sort((a,b)=>b.points-a.points); }
function updateRanks(){ sortedPlayers().forEach((p,i)=>{ state.players.find(x=>x.id===p.id).rank=i+1; }); save(); renderAll(); }

function renderHome(){
 const top=sortedPlayers()[0], next=state.tournaments.find(t=>t.status==='Next');
 document.getElementById('home').innerHTML=`
 <div class="hero"><h2>${next.name} is next</h2><p>Permanent ATP Universe database. <b class="gold">${state.players.length} players</b> are saved.</p></div>
 <div class="grid">
  <div class="card"><b>World No.1</b><div class="value">${top.name}</div><span>${top.points} pts</span></div>
  <div class="card"><b>Season Leader</b><div class="value">Novak Djokovic</div><span>AO · Indian Wells · Madrid</span></div>
  <div class="card"><b>Clay King</b><div class="value">Rafael Nadal</div><span>Monte-Carlo · Rome</span></div>
  <div class="card"><b>Database</b><div class="value">${state.players.length}</div><span>players locked</span></div>
 </div>
 <h2>Season Champions</h2><div class="grid">${state.tournaments.filter(t=>t.champion).map(t=>`<div class="card"><b>${t.name}</b><div class="value">${t.champion}</div><span>${t.score}</span></div>`).join('')}</div>`;
}
function renderRankings(){
 document.getElementById('rankings').innerHTML=`<h2>ATP Rankings</h2><input id="rankSearch" placeholder="Search..." onkeyup="rankTable()"><table id="rankTable"></table>`;
 rankTable();
}
function rankTable(){
 const q=(document.getElementById('rankSearch')?.value||'').toLowerCase();
 const rows=sortedPlayers().filter(p=>p.name.toLowerCase().includes(q));
 document.getElementById('rankTable').innerHTML=`<tr><th>#</th><th>Player</th><th>Country</th><th>Pts</th><th>Titles</th><th>Record</th></tr>`+
 rows.map((p,i)=>`<tr><td><b>${i+1}</b></td><td>${p.name}</td><td>${p.country}</td><td>${p.points}</td><td>${p.titles}</td><td>${p.wins}-${p.losses}</td></tr>`).join('');
}
function renderRace(){
 const rows=[...state.players].sort((a,b)=>b.titles-a.titles||b.points-a.points).slice(0,30);
 document.getElementById('race').innerHTML=`<h2>ATP Race 2026</h2><table><tr><th>#</th><th>Player</th><th>Titles</th><th>Points</th></tr>${rows.map((p,i)=>`<tr><td>${i+1}</td><td>${p.name}</td><td>${p.titles}</td><td>${p.points}</td></tr>`).join('')}</table>`;
}
function renderPlayers(){
 document.getElementById('players').innerHTML=`<h2>Players</h2><input id="playerSearch" placeholder="Search player..." onkeyup="playersList()"><div id="playersList" class="grid"></div>`;
 playersList();
}
function playersList(){
 const q=(document.getElementById('playerSearch')?.value||'').toLowerCase();
 document.getElementById('playersList').innerHTML=sortedPlayers().filter(p=>p.name.toLowerCase().includes(q)).map(p=>`
 <div class="player"><h3>#${p.rank} ${p.name}</h3><p>${p.country}</p><div class="statline"><span class="chip">${p.points} pts</span><span class="chip">${p.titles} titles</span><span class="chip">${p.wins}-${p.losses}</span><span class="chip">${p.surface}</span></div><p class="muted">Age ${p.age} · ${p.hand} · Best #${p.bestRank}</p></div>`).join('');
}
function renderTournaments(){
 document.getElementById('tournaments').innerHTML=`<h2>Tournament Archive</h2><div class="grid">${state.tournaments.map(t=>`<div class="card"><h3>${t.name} <span class="badge">${t.category}</span></h3><p>${t.surface} · ${t.status}</p><p>Champion: <b class="gold">${t.champion||'TBD'}</b></p><p>Runner-up: ${t.runnerUp||'TBD'}</p><p>${t.score||''}</p><p class="muted">${t.story}</p></div>`).join('')}</div>`;
}
function renderAustralia(){
 document.getElementById('australia').innerHTML=`<h2>Australian Open 2026</h2><div class="panel"><p><b>Champion:</b> Novak Djokovic</p><p><b>Runner-up:</b> Carlos Alcaraz</p><p><b>Player of Tournament:</b> Rafael Nadal</p></div><h3>Key matches</h3>${state.aoMatches.map(m=>`<div class="match"><b>${m.round}</b> · ${m.winner} def. ${m.loser}<p class="gold">${m.score}</p><p class="muted">${m.story}</p></div>`).join('')}`;
}
function renderSim(){
 const opts=sortedPlayers().map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
 document.getElementById('sim').innerHTML=`<h2>Match Simulator</h2><div class="panel"><label>Player A</label><select id="simA">${opts}</select><label>Player B</label><select id="simB">${opts}</select><label>Surface</label><select id="simSurface"><option>Hard</option><option>Clay</option><option>Grass</option></select><button class="btn" onclick="simulate()">Simulate</button><div id="simResult"></div></div>`;
}
function simulate(){
 const a=state.players.find(p=>p.id===document.getElementById('simA').value), b=state.players.find(p=>p.id===document.getElementById('simB').value), s=document.getElementById('simSurface').value;
 if(a.id===b.id){document.getElementById('simResult').innerHTML='<p class="red">Choose two different players.</p>';return;}
 let powerA=(100-a.rank)+a.points/300+(a.surface===s?8:0)+Math.random()*20;
 let powerB=(100-b.rank)+b.points/300+(b.surface===s?8:0)+Math.random()*20;
 let w=powerA>=powerB?a:b, l=w.id===a.id?b:a;
 let scores=["6-4, 6-3","7-6(5), 6-4","6-3, 4-6, 6-2","7-5, 3-6, 7-6(4)"];
 document.getElementById('simResult').innerHTML=`<div class="match"><h3>${w.name} def. ${l.name}</h3><p class="gold">${scores[Math.floor(Math.random()*scores.length)]}</p><p class="muted">${w.name} used ranking pressure and surface form to win on ${s}.</p></div>`;
}
function renderAdmin(){
 document.getElementById('admin').innerHTML=`<h2>Admin Panel</h2><div class="panel"><p>Add quick points to a player after a tournament.</p><select id="adminPlayer">${sortedPlayers().map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select><input id="adminPts" type="number" placeholder="Points to add"><button class="btn" onclick="addPoints()">Add points and update rankings</button><button class="pill danger" onclick="resetData()">Reset local data</button></div>`;
}
function addPoints(){ const p=state.players.find(x=>x.id===document.getElementById('adminPlayer').value); const pts=parseInt(document.getElementById('adminPts').value||0); p.points+=pts; p.wins+=1; updateRanks(); alert('Updated '+p.name); }
function renderAll(){ renderHome(); renderRankings(); renderRace(); renderPlayers(); renderTournaments(); renderAustralia(); renderSim(); renderAdmin(); }
renderAll();
