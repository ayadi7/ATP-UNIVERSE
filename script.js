const $=id=>document.getElementById(id);
function toggleMenu(){ $('nav').classList.toggle('open') }
function showTab(id){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));$(id).classList.add('active');scrollTo(0,0)}
function renderHome(){
 const top=DATA.players.slice(0,4), next=DATA.tournaments.find(t=>t.status==='Next');
 $('home').innerHTML=`<div class="hero"><h2>Road to Roland Garros</h2><div class="big">${next.name}</div><p>${DATA.players.length} players locked · Current season database active</p></div>
 <div class="rankTop">${top.map(p=>`<div class="card"><h3>#${p[2]} ${p[0]}</h3><div class="value">${p[3]} pts</div><p>${p[1]}</p></div>`).join('')}</div>
 <h2>Season Champions</h2><div class="grid">${DATA.tournaments.filter(t=>t.status==='Closed').map(t=>`<div class="card"><h3>${t.name}</h3><p>Champion</p><div class="value">${t.champion}</div><p class="muted">${t.score}</p></div>`).join('')}</div>`;
}
function renderRankings(){
 $('rankings').innerHTML=`<h2>ATP Universe Rankings</h2><input class="search" id="rankSearch" onkeyup="drawRankings()" placeholder="Search player..."><table id="rankTable"></table>`;drawRankings();
}
function drawRankings(){let q=($('rankSearch')?.value||'').toLowerCase();let rows=DATA.players.filter(p=>p[0].toLowerCase().includes(q));$('rankTable').innerHTML='<tr><th>#</th><th>Player</th><th>Country</th><th>Points</th><th>Titles</th></tr>'+rows.map(p=>`<tr><td><b>${p[2]}</b></td><td>${p[0]}</td><td>${p[1]}</td><td>${p[3]}</td><td>${p[4]}</td></tr>`).join('')}
function renderPlayers(){
 $('players').innerHTML=`<h2>Players</h2><input class="search" id="playerSearch" onkeyup="drawPlayers()" placeholder="Search player..."><div id="playerGrid" class="playerGrid"></div>`;drawPlayers();
}
function drawPlayers(){let q=($('playerSearch')?.value||'').toLowerCase();let rows=DATA.players.filter(p=>p[0].toLowerCase().includes(q));$('playerGrid').innerHTML=rows.map(p=>`<div class="player"><h3>#${p[2]} ${p[0]}</h3><p>${p[1]}</p><p><b>${p[3]}</b> points · Titles: ${p[4]}</p><p class="tiny">Player page coming in v4.0</p></div>`).join('')}
function renderTournaments(){
 $('tournaments').innerHTML=`<h2>Tournaments</h2><div class="grid">${DATA.tournaments.map(t=>`<div class="tour" style="border-color:${t.color}"><h3>${t.name}</h3><span class="badge" style="background:${t.color}">${t.surface}</span><p>${t.city}</p><p>Champion: <b class="gold">${t.champion}</b></p><p>Runner-up: ${t.runnerUp}</p><p class="muted">${t.score}</p><button onclick="openTournament('${t.id}')">Open</button></div>`).join('')}</div>`;
}
function openTournament(id){showTab('bracket');drawBracket(id)}
function renderBracket(){drawBracket('ao2026')}
function drawBracket(id){
 const t=DATA.tournaments.find(x=>x.id===id)||DATA.tournaments[0];
 let rounds=[...new Set(DATA.aoMatches.map(m=>m[0]))];
 $('bracket').innerHTML=`<div class="tournamentHead" style="background:linear-gradient(135deg,${t.color},#0f172a)"><h2>${t.name}</h2><p>${t.city} · ${t.surface}</p><p>Champion: <b>${t.champion}</b> · MVP: ${t.mvp}</p></div>
 <div class="bracketWrap"><div class="bracket">${rounds.map(r=>`<div class="round"><h3>${r}</h3>${DATA.aoMatches.filter(m=>m[0]===r).map(m=>`<div class="match"><p>${m[1]} vs ${m[2]}</p><p class="winner">${m[3]}</p><p>${m[4]}</p></div>`).join('')}</div>`).join('')}</div></div>
 <p class="muted">v3.0 bracket model. Next: full 128-player Grand Slam bracket.</p>`;
}
function renderCalendar(){
 $('calendar').innerHTML=`<h2>Season Calendar</h2><div class="grid">${DATA.tournaments.map(t=>`<div class="card" style="border-color:${t.color}"><h3>${t.name}</h3><p>${t.status}</p><p>${t.surface} · ${t.city}</p></div>`).join('')}</div>`;
}
function renderNews(){
 $('news').innerHTML=`<h2>ATP Universe News</h2><div class="panel"><h3>Roland Garros awaits</h3><p>Djokovic leads the season with three titles, Nadal arrives as clay champion after Monte-Carlo and Rome, and Alcaraz remains the biggest threat.</p></div><div class="panel"><h3>Australian Open archive restored</h3><p>The final-stage Australian Open bracket has been added to the v3.0 tournament page.</p></div>`;
}
renderHome();renderRankings();renderPlayers();renderTournaments();renderBracket();renderCalendar();renderNews();
