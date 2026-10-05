'use strict';
// 이 파일에서 카테고리 설명과 원문 링크를 수정할 수 있습니다.
const categories = [
 {id:'community',title:'거사모 카페',symbol:'⌂',description:'동네 이야기와 생활의 발견',accent:'#1955ef',tint:'#eaf0ff',intro:'거제의 생활 소식과 주민들의 이야기를 만나보세요.',links:[['거사모 카페','생활 소식 · 지역 커뮤니티','https://cafe.naver.com/glove']]},
 {id:'welfare',title:'거제도 복지정보',symbol:'♡',description:'공식 복지뉴스 · 지원 분야 · 상담',accent:'#cb477c',tint:'#ffedf4',intro:'거제시 공식 복지포털의 지원 분야와 소식을 확인하세요.',links:[['거제시 복지포털','지원 분야 · 복지뉴스 · 상담실','https://www.geoje.go.kr/welfare/index.geoje?contentsSid=9446']]},
 {id:'property',title:'거제도 재테크 거제민국',symbol:'▤',description:'우리 동네 집과 부동산 이야기',accent:'#965ed0',tint:'#f3edff',intro:'거제 지역 부동산 커뮤니티와 공시자료를 함께 확인하세요.',links:[['거제도 재테크 거제민국','지역 매물 · 부동산 소식','https://cafe.naver.com/geojerich'],['국토교통부 실거래가 공개시스템','지역을 거제로 선택해 거래 내역 확인','https://rt.molit.go.kr/']]},
 {id:'hotplace',title:'거제 핫플',symbol:'✳',description:'가보고 싶은 곳, 새로운 취향',accent:'#df7427',tint:'#fff1e5',intro:'거제의 새로운 공간과 여행 소식을 원문에서 둘러보세요. 운영시간과 방문 안내는 각 장소의 최신 게시물을 확인하세요.',links:[['hotgeoje 인스타그램','거제 핫플 · 카페 · 여행 콘텐츠','https://www.instagram.com/hotgeoje/'],['거제 문화관광','거제시 공식 관광 안내','https://tour.geoje.go.kr/']]},
 {id:'stocks',title:'주식정보',symbol:'↗',description:'시장의 흐름을 확인하는 시간',accent:'#218370',tint:'#e7f6ef',intro:'국내외 시장과 종목 소식을 네이버 증권에서 확인하세요.',links:[['네이버 증권','시장 지수 · 종목 · 금융 뉴스','https://stock.naver.com/']],note:'실시간 시세를 이 화면에 저장하거나 표시하지 않습니다. 시세와 기준 시각은 원문에서 확인하세요.'},
 {id:'school',title:'거제중앙고 공지',symbol:'▱',description:'학교 소식을 가까이, 빠르게',accent:'#1955ef',tint:'#eaf0ff',intro:'거제중앙고등학교 공식 공지사항을 확인하세요. 첨부파일과 일정은 학교 게시판에서 확인할 수 있습니다.',links:[['거제중앙고등학교 공지사항','학교 공식 공지 · 안내문 · 첨부자료','https://gjjungang-h.gne.go.kr/gjjungang-h/na/ntt/selectNttList.do?mi=110267&bbsId=123343']]},
 {id:'data',title:'거제 데이터',symbol:'▥',description:'숫자로 살펴보는 우리 도시',accent:'#258794',tint:'#e5f5f8',intro:'거제시 데이터 포털에서 인구 등 지역 데이터를 살펴보세요. 통계의 기준월과 갱신일은 각 자료에서 확인하세요.',links:[['거제도 데이터정보 · 인구','거제시 데이터 포털 인구 검색','https://data.geoje.go.kr/index.geoje?menuCd=DOM_000000204001000000&searchKeyword=%EC%9D%B8%EA%B5%AC']]},
 {id:'accounting',title:'예산·회계 실무',symbol:'▧',description:'공공기관 실무에 필요한 자료',accent:'#727044',tint:'#f3f2e5',intro:'공공기관 예산·회계와 복지예산 실무 자료를 찾아보세요. 적용 연도와 기관별 지침은 원문에서 확인하세요.',links:[['복지예산실무 카페','예산 · 회계 실무 커뮤니티','https://cafe.naver.com/gangseogu'],['지방재정365','지방재정 공개 자료','https://www.lofin365.go.kr/']]}
];
const $ = id => document.getElementById(id);
let zIndex = 100;
const openWindows = new Map();
categories.unshift(categories.splice(categories.findIndex(item=>item.id==='welfare'),1)[0]);
categories.push({id:'bus',title:'부산–거제 2000번',symbol:'▣',description:'실시간 버스 지도 · 도착정보',accent:'#ffad65',tint:'#fff1e5',links:[]});
categories.forEach((item,index)=>{
 const nav = document.createElement('button');
 nav.innerHTML = `<span class="nav-symbol">${item.symbol}</span>${item.title}`;
 nav.addEventListener('click',()=>openWindow(item)); $('navigation').append(nav);
 const card = document.createElement('button'); card.className = 'card';
 card.style.setProperty('--accent',item.accent); card.style.setProperty('--tint',item.tint);
 card.innerHTML = `<span class="symbol" aria-hidden="true">${item.symbol}</span><span class="number">0${index+1}</span><h3>${item.title}</h3><p>${item.description}</p><span class="open-label">정보 창 열기 +</span>`;
 card.addEventListener('click',()=>openWindow(item)); $('cards').append(card);
});
function front(state){state.element.hidden=false;state.element.style.zIndex=++zIndex;document.querySelectorAll('.taskbar button').forEach(b=>b.classList.remove('current'));state.task.classList.add('current');}
function closeWindow(id){const state=openWindows.get(id);if(!state)return;state.element.remove();state.task.remove();openWindows.delete(id);state.opener?.focus();}
function openWindow(item){
 if(item.id==='stocks'){showPanel('stocks-panel');return;} if(item.id==='bus'){showPanel('bus-panel');return;} if(item.id==='welfare'){document.getElementById('welfare-panel').scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(openWindows.has(item.id)){front(openWindows.get(item.id));return;}
 const element=document.createElement('section');element.className='window';element.setAttribute('role','dialog');element.setAttribute('aria-labelledby',`title-${item.id}`);element.tabIndex=-1;
 const offset=(openWindows.size%5)*24;element.style.left=`${Math.min(innerWidth-650,Math.max(12,innerWidth*.25))+offset}px`;element.style.top=`${110+offset}px`;
 element.innerHTML=`<div class="window-title"><span aria-hidden="true" style="color:${item.accent}">${item.symbol}</span><strong id="title-${item.id}">${item.title}</strong><button data-action="min" aria-label="창 최소화">−</button><button data-action="max" aria-label="창 최대화 또는 복원">□</button><button data-action="close" class="close" aria-label="창 닫기">×</button></div><div class="window-body"><span class="eyebrow">GEOJE LIFE DESK</span><h2>${item.title}</h2><p>${item.intro}</p>${item.links.map(([title,desc,url])=>`<a class="resource" href="${url}" target="_blank" rel="noopener noreferrer"><strong>${title}<span aria-hidden="true">↗</span></strong><small>${desc} · 새 탭에서 열기</small></a>`).join('')}<p class="source-note">${item.note||'최신 게시물은 원문에서 확인하세요. 카페와 인스타그램은 로그인이나 가입이 필요할 수 있습니다.'}</p></div>`;
 const task=document.createElement('button');task.textContent=`${item.symbol} ${item.title}`;
 const state={element,task,opener:document.activeElement};openWindows.set(item.id,state);$('windows').append(element);$('taskbar').append(task);
 task.addEventListener('click',()=>{front(state);element.focus();});
 element.addEventListener('pointerdown',()=>front(state));
 element.querySelector('[data-action="close"]').addEventListener('click',()=>closeWindow(item.id));
 element.querySelector('[data-action="min"]').addEventListener('click',()=>{element.hidden=true;task.classList.remove('current');task.focus();});
 element.querySelector('[data-action="max"]').addEventListener('click',()=>element.classList.toggle('maximized'));
 element.addEventListener('keydown',event=>{if(event.key==='Escape')closeWindow(item.id);});
 const titlebar=element.querySelector('.window-title');let drag;
 titlebar.addEventListener('pointerdown',event=>{if(event.target.closest('button')||element.classList.contains('maximized')||innerWidth<=720)return;drag={x:event.clientX,y:event.clientY,left:element.offsetLeft,top:element.offsetTop};titlebar.setPointerCapture(event.pointerId);});
 titlebar.addEventListener('pointermove',event=>{if(!drag)return;element.style.left=`${Math.max(0,Math.min(innerWidth-element.offsetWidth,drag.left+event.clientX-drag.x))}px`;element.style.top=`${Math.max(0,Math.min(innerHeight-120,drag.top+event.clientY-drag.y))}px`;});
 titlebar.addEventListener('pointerup',()=>drag=null);titlebar.addEventListener('pointercancel',()=>drag=null);
 front(state);element.focus();
}
$('reset').addEventListener('click',()=>{[...openWindows.keys()].forEach(closeWindow);$('home').focus();});
$('home').addEventListener('click',()=>{[...openWindows.keys()].forEach(closeWindow);showPanel('weather-panel',false);showPanel('stocks-panel',false);window.scrollTo({top:0,behavior:'smooth'});});
window.addEventListener('resize',()=>openWindows.forEach(({element})=>{if(innerWidth>720&&!element.classList.contains('maximized')){element.style.left=`${Math.max(12,Math.min(element.offsetLeft,innerWidth-element.offsetWidth-12))}px`;element.style.top=`${Math.max(12,Math.min(element.offsetTop,innerHeight-120))}px`;}}));
function updateDate(){$('date').textContent=new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'long',day:'numeric',weekday:'short'}).format(new Date());}
updateDate();setInterval(updateDate,60000);
const cities=[{name:'서울',lat:37.5665,lon:126.978},{name:'거제',lat:34.8806,lon:128.6211},{name:'부산',lat:35.1796,lon:129.0756},{name:'충주',lat:36.991,lon:127.9259}];
function weatherCondition(code){if(code===0)return['☀','맑음'];if(code<=3)return['☁','구름'];if(code<=48)return['≋','안개'];if(code<=67)return['☂','비'];if(code<=77)return['❄','눈'];if(code<=82)return['☂','소나기'];if(code<=86)return['❄','눈 소나기'];return['ϟ','뇌우'];}
async function loadWeather(){
 $('refresh').disabled=true;$('weather-status').textContent='날씨를 불러오는 중입니다.';
 $('weather').innerHTML=cities.map(c=>`<div class="weather-city"><strong>${c.name}</strong><div class="reading"><span class="temp">—</span><span class="weather-icon">☁</span></div><span class="weather-detail">조회 중</span></div>`).join('');
 const results=await Promise.allSettled(cities.map(async(city,index)=>{
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
  try{const url=`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FSeoul`;
   const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw new Error('weather');const data=await response.json();const c=data.current;
   if(!c||!Number.isFinite(c.temperature_2m)||!Number.isFinite(c.weather_code)||!Number.isFinite(c.relative_humidity_2m)||typeof c.time!=='string')throw new Error('data');
   const [symbol,label]=weatherCondition(c.weather_code);$('weather').children[index].innerHTML=`<strong>${city.name}</strong><div class="reading"><span class="temp">${Math.round(c.temperature_2m)}°</span><span class="weather-icon" aria-hidden="true">${symbol}</span></div><span class="weather-detail">${label} · 습도 ${c.relative_humidity_2m}%</span>`;return c.time;
  }catch(error){$('weather').children[index].querySelector('.weather-detail').textContent='연결 실패 · 네이버에서 확인';throw error;}finally{clearTimeout(timer);}
 }));
 const good=results.filter(r=>r.status==='fulfilled');$('weather-status').textContent=good.length?`Open-Meteo 예보 · 한국시간 ${good[0].value.replace('T',' ')} 기준${good.length<4?' · 일부 도시 조회 실패':''}`:'날씨 연결을 확인해주세요. 네이버 날씨에서 최신 정보를 볼 수 있습니다.';$('refresh').disabled=false;
}
$('refresh').addEventListener('click',loadWeather);loadWeather();

// 날씨와 주식 창은 처음부터 펼쳐져 있습니다. 최소화 후 작업 표시줄에서 복원합니다.
const panelTasks=new Map();
function showPanel(id,scroll=true){const panel=$(id);panel.hidden=false;panel.classList.remove('panel-minimized');panelTasks.get(id)?.remove();panelTasks.delete(id);if(scroll)panel.scrollIntoView({behavior:'smooth',block:'center'});}
document.querySelectorAll('[data-show]').forEach(button=>button.addEventListener('click',()=>showPanel(button.dataset.show)));
document.querySelectorAll('[data-panel]').forEach(button=>button.addEventListener('click',()=>{
 const id=button.dataset.panel,panel=$(id);
 if(button.dataset.control==='max'){panel.classList.toggle('panel-maximized');return;}
 panel.hidden=true;panel.classList.remove('panel-maximized');
 if(button.dataset.control==='min'&&!panelTasks.has(id)){const task=document.createElement('button');task.textContent=({'weather-panel':'☀ 날씨 창','stocks-panel':'↗ 주식 창','bus-panel':'▣ 2000번 버스'})[id];task.addEventListener('click',()=>showPanel(id));$('taskbar').append(task);panelTasks.set(id,task);task.focus();}
 else if(button.dataset.control==='close'){panelTasks.get(id)?.remove();panelTasks.delete(id);document.querySelector(`[data-show="${id}"]`).focus();}
}));
document.querySelectorAll('.desk-panel').forEach(panel=>panel.addEventListener('keydown',event=>{if(event.key==='Escape')panel.classList.remove('panel-maximized');}));
$('reset').addEventListener('click',()=>{['weather-panel','stocks-panel','bus-panel'].forEach(id=>{$(id).hidden=true;$(id).classList.remove('panel-maximized');panelTasks.get(id)?.remove();panelTasks.delete(id);});});
const weatherNav=document.createElement('button');weatherNav.innerHTML='<span class="nav-symbol">☀</span>네 도시 날씨';weatherNav.addEventListener('click',()=>showPanel('weather-panel'));$('navigation').prepend(weatherNav);
const widgetScript=document.createElement('script');widgetScript.src='https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';widgetScript.async=true;
widgetScript.textContent=JSON.stringify({colorTheme:'light',dateRange:'1D',locale:'kr',isTransparent:true,width:'100%',height:380,showChart:true,showSymbolLogo:true,showFloatingTooltip:true,plotLineColorGrowing:'rgba(0,119,255,1)',plotLineColorFalling:'rgba(0,119,255,1)',gridLineColor:'rgba(0,45,110,0.06)',scaleFontColor:'#556b87',belowLineFillColorGrowing:'rgba(0,119,255,0.12)',belowLineFillColorFalling:'rgba(0,119,255,0.12)',belowLineFillColorGrowingBottom:'rgba(0,119,255,0)',belowLineFillColorFallingBottom:'rgba(0,119,255,0)',tabs:[{title:'미국 대표 종목',symbols:[{s:'NASDAQ:NVDA',d:'엔비디아'},{s:'NASDAQ:AAPL',d:'애플'},{s:'NASDAQ:MSFT',d:'마이크로소프트'}]}]});
widgetScript.onerror=()=>{$('market-status').textContent='차트 연결을 확인해주세요. 네이버 증권에서 최신 시세를 볼 수 있습니다.';};
const marketObserver=new MutationObserver(()=>{if($('market-widget').querySelector('iframe')){$('market-status').textContent='TradingView 제공 · 시세 기준 시각은 차트에서 확인';marketObserver.disconnect();}});marketObserver.observe($('market-widget'),{childList:true,subtree:true});
$('market-widget').append(widgetScript);
setTimeout(()=>{if(!$('market-widget').querySelector('iframe'))$('market-status').textContent='차트 연결이 지연되고 있습니다. 네이버 증권에서 확인하세요.';},15000);

// 공식 복지포털에서 2026-10-06 확인한 내용. 자동 갱신이 아닌 확인일 기준 목록입니다.
const welfareServices=[
 ['임신·출산·다자녀','가족에게 필요한 지원 안내','https://www.geoje.go.kr/index.geoje?menuCd=DOM_000009602001000000'],
 ['저소득층 지원','희망복지지원 안내','https://www.geoje.go.kr/index.geoje?menuCd=DOM_000009601002001001'],
 ['어르신 복지','노인 복지시책 안내','https://www.geoje.go.kr/index.geoje?menuCd=DOM_000009605002001000'],
 ['장애인 복지','장애인 복지시책 안내','https://www.geoje.go.kr/index.geoje?menuCd=DOM_000009606003001000'],
 ['청소년 상담','거제시 청소년 플랫폼','https://www.geoje.go.kr/youthplatform'],
 ['가족 지원','거제시 가족센터','https://geoje.familynet.or.kr/center/']
];
welfareServices.forEach(([title,description,url])=>{const link=document.createElement('a');link.className='welfare-service';link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.innerHTML=`<strong>${title}<span aria-hidden="true">↗</span></strong><small>${description}</small>`;$('welfare-services').append(link);});
const welfareNews=[
 {title:'청년여성 일경험 사업 · 참여기업 모집',date:'2026.09.30',sid:'306491322',summary:'17차 모집. 접수는 10월 8일 오후 6시까지이며, 경남여성새로일하기센터에 우편 또는 이메일로 신청합니다. 문의 055-286-1675.'},
 {title:'거제시장애인복지관 · 계약직 채용 안내',date:'2026.09.29',sid:'306490758',summary:'채용 공고가 게시되었습니다. 모집 분야와 접수 일정은 원문에서 확인하세요.'},
 {title:'진로교육지원센터 · 위탁운영 평가 공개',date:'2026.10.01',sid:'306491796',summary:'센터 관리·운영에 관한 민간위탁 성과평가 결과를 확인할 수 있습니다.'},
 {title:'거제시영어마을 · 위탁운영 평가 공개',date:'2026.10.01',sid:'306491793',summary:'영어마을 관리·운영 사무의 성과평가 결과를 공개한 게시물입니다.'},
 {title:'거제시민자치대학 · 이대호 강연 안내',date:'2026.09.30',sid:'306491292',summary:'전 야구선수 이대호의 시민자치대학 강연 안내입니다. 일정은 원문에서 확인하세요.'},
 {title:'설렘페스타 · 3회차 참가 안내',date:'2026.09.18',sid:'306485386',summary:'거제시 미혼남녀 만남행사 참가자 모집 안내입니다. 접수 가능 여부는 원문을 확인하세요.'}
];
welfareNews.forEach(item=>{const article=document.createElement('article');article.className='welfare-article';const url=`https://www.geoje.go.kr/welfare/board/view.do?boardId=BBS_0000008&dataSid=${item.sid}&menuCd=DOM_000009607001000000`;article.innerHTML=`<div><time>${item.date}</time><span>공식 게시물 요약</span></div><h4><a href="${url}" target="_blank" rel="noopener noreferrer">${item.title} <span aria-hidden="true">↗</span></a></h4><p>${item.summary}</p>`;$('welfare-news').append(article);});
$('bus-reload').addEventListener('click',()=>{$('bus-map').src='https://bis.geoje.go.kr/main/main.do?action=webMain';});


