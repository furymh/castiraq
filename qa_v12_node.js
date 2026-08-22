const fs=require('fs'),vm=require('vm');
const store={};global.localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>store[k]=String(v),removeItem:k=>delete store[k]};global.window=global;global.location={};global.document={};global.navigator={};global.confirm=()=>true;global.prompt=()=>'';
vm.runInThisContext(fs.readFileSync('db.v10.js','utf8'),{filename:'db.v10.js'});vm.runInThisContext(fs.readFileSync('db.v12.js','utf8'),{filename:'db.v12.js'});
const DB=global.CastDB,results=[];function test(name,fn){try{const val=fn();results.push({name,pass:true,value:val})}catch(e){results.push({name,pass:false,error:e.message})}}
test('photographer login',()=>DB.login('photo@castiraq.demo','123456')?.role);
let p,sc,sh;
test('create project',()=>{p=DB.createWorkspaceProject('Reality QA','commercial');return p.id});
test('add talents',()=>{DB.addTalentToPhotoProject(p.id,'t1');DB.addTalentToPhotoProject(p.id,'t2');return DB.state().photoProjects.find(x=>x.id===p.id).talentIds.length});
test('scene inheritance',()=>{sc=DB.addScene(p.id,'Rooftop');const loc=DB.addProjectEntity(p.id,'location',{name:'Rooftop'}),look=DB.addProjectEntity(p.id,'look',{name:'Black Look'}),light=DB.addProjectEntity(p.id,'lighting',{name:'Golden Backlight'}),cam=DB.addProjectEntity(p.id,'camera',{name:'CAM A',camera:'FX3',lens:'50mm',fps:'24'});DB.updateSceneV12(sc.id,{locationId:loc.id,lookId:look.id,lightingSetupId:light.id,cameraSetupId:cam.id,talentIds:['t1']});sh=DB.createShotV10(p.id,sc.id);DB.updateShotV10(sh.id,{description:'Sara walks to camera',image:'talent1.jpg',planningStatus:'ready'});const e=DB.effectiveShot(DB.state().shots.find(x=>x.id===sh.id));if(e.effectiveLocationId!==loc.id||e.effectiveTalentIds[0]!=='t1')throw Error('inheritance failed');return e});
test('readiness ready',()=>DB.shotReadiness(DB.state().shots.find(x=>x.id===sh.id)));
test('shot override',()=>{const loc2=DB.addProjectEntity(p.id,'location',{name:'Studio B'});DB.updateShotV10(sh.id,{locationId:loc2.id});return DB.effectiveShot(DB.state().shots.find(x=>x.id===sh.id)).effectiveLocationId===loc2.id});
test('create variations',()=>{['Wide Shot','Medium Shot','Close Up'].forEach(sz=>DB.createShotVariation(sh.id,sz));return DB.shotsByOrder(p.id,'storyOrder').length});
test('story vs shooting order',()=>{const list=DB.shotsByOrder(p.id,'storyOrder'),ids=list.map(x=>x.id).reverse();DB.reorderShotOrder(DB.getOrCreateStoryboard(p.id).id,ids,'shootingOrder');const shoot=DB.shotsByOrder(p.id,'shootingOrder');return shoot[0].id===ids[0]});
test('capture statuses',()=>{DB.setCaptureStatus(sh.id,'captured');DB.setCaptureStatus(sh.id,'retake');DB.setCaptureStatus(sh.id,'skipped');return DB.state().shots.find(x=>x.id===sh.id).captureStatus});
test('project readiness',()=>DB.projectReadiness(p.id));
test('stress 100 shots',()=>{for(let i=0;i<100;i++){const x=DB.createShotV10(p.id,sc.id);DB.updateShotV10(x.id,{description:'Stress '+i,image:'talent1.jpg',talentIds:['t1']})}return DB.shotsByOrder(p.id,'storyOrder').length});
test('50 tasks',()=>{for(let i=0;i<50;i++)DB.createPhotoTask(p.id,{title:'Task '+i});return DB.state().photoTasks.filter(x=>x.projectId===p.id).length});

test('regression company login',()=>{DB.logout();return DB.login('company@castiraq.demo','123456')?.role});
test('regression talent login',()=>{DB.logout();return DB.login('talent@castiraq.demo','123456')?.role});
test('unauthorized photographer project access denied',()=>{let denied=false;try{DB.projectReadiness(p.id)}catch(e){denied=e.message==='PROJECT_NOT_FOUND'}if(!denied)throw Error('authorization failed');return true});
test('regression admin login',()=>{DB.logout();return DB.login('admin@castiraq.demo','123456')?.role});
test('photographer relogin',()=>{DB.logout();return DB.login('photo@castiraq.demo','123456')?.role});

const pass=results.filter(x=>x.pass).length;fs.writeFileSync('QA_V12_DATA.json',JSON.stringify({pass,total:results.length,results},null,2));console.log(`${pass}/${results.length} passed`);if(pass!==results.length)process.exit(1);
