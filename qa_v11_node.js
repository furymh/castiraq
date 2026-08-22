const fs=require('fs'),vm=require('vm');
class LS{constructor(){this.m=new Map()}getItem(k){return this.m.has(k)?this.m.get(k):null}setItem(k,v){this.m.set(k,String(v))}removeItem(k){this.m.delete(k)}}
const localStorage=new LS();const ctx={window:{},localStorage,console,Date,JSON,Math,setTimeout,clearTimeout};ctx.window.window=ctx.window;ctx.window.localStorage=localStorage;ctx.globalThis=ctx.window;vm.createContext(ctx);vm.runInContext(fs.readFileSync('/mnt/data/castiraq_v11/db.v10.js','utf8'),ctx);const DB=ctx.window.CastDB;const out={};
DB.login('photo@castiraq.demo','123456');out.login=!!DB.currentUser();const p=DB.createWorkspaceProject('V11 QA Project','commercial');const sc=DB.addScene(p.id,'Scene 01');
for(let i=0;i<100;i++){const sh=DB.createShotV10(p.id,sc.id);DB.updateShotV10(sh.id,{description:'QA Shot '+(i+1),status:i%3===0?'Ready':'Planned',captureStatus:i%5===0?'captured':'not_shot',lens:(i%2?'35mm':'50mm')})}
for(let i=0;i<50;i++){DB.addBoardItem(p.id,i%4===0?'color':'note',{text:'QA item '+i,color:'#C9B18A'})}
const sb=DB.getOrCreateStoryboard(p.id),projectShots=DB.state().shots.filter(x=>x.storyboardId===sb.id);
for(let i=0;i<20;i++)DB.createPhotoTask(p.id,{title:'QA Task '+i,shotId:i<10?projectShots[i].id:''});
const s=DB.state();out.shots=s.shots.filter(x=>x.storyboardId===sb.id).length;out.boardItems=s.boardItems.filter(x=>x.projectId===p.id).length;out.tasks=s.photoTasks.filter(x=>x.projectId===p.id).length;out.projectPersisted=!!s.photoProjects.find(x=>x.id===p.id);out.pass=out.login&&out.shots===100&&out.boardItems===50&&out.tasks===20&&out.projectPersisted;console.log(JSON.stringify(out,null,2));
