"""First Sale campaign packages: hook variants (first card swapped), a new direct-response edit, and Reel covers.
Runs in the Higgsfield sandbox next to the existing pipeline (~/ad/tools/type.js, ~/ad/tools/edit.py, ~/mk/edl/*.json).
Usage: python3 fs.py && bash render_fs.sh   (type.js renders type/fs_spec.json, then edit.py renders each edl/fs_*.json)
Final state below includes two post-QA tweaks: P2 hook B card moved up to y=240, P5 cover uses the two flat lays side by side."""
import json, copy
T='/home/user/mk/type/'; E='/home/user/mk/edl/'; O='/home/user/mk/fs_out/'
LOGO='{{IMG:/home/user/ad/tools/logo.png}}'
specs=[]
def card(name, html): specs.append({'out': T+name+'.png','w':1080,'h':1920,'html':html})
def tk(text, top, size=58, white=False):
    cls='tk tkw' if white else 'tk'
    return f"<div class='{cls}' style='position:absolute;left:110px;right:200px;top:{top}px;text-align:center;font-size:{size}px'><span>{text}</span></div>"
def logo(top,w=260): return f"<img src='{LOGO}' style='position:absolute;left:{545-w//2}px;top:{top}px;width:{w}px'>"
# hook cards (TikTok-native caption boxes inside the safe area x 110-880, y 230-1350)
H={'p1b':tk("you&rsquo;d never guess what&rsquo;s on the back.",330,60),'p1c':tk('Christian gym shirt. dark on purpose.',330,60),
   'p2b':tk('Christian gym wear doesn&rsquo;t have to look like youth group merch.',240,58),'p2c':tk('faith-based gym wear, but make it dark.',300,60),
   'p3b':tk('zoom in on the back of this shirt.',300,62),'p3c':tk('most people miss all 3 of these.',300,62),
   'p4b':tk('would you wear this to the gym?',260,62),'p4c':tk('too dark for a Christian shirt?',260,62),
   'p4b_end':logo(640)+tk('yes or no?',1060,50),'p4c_end':logo(640)+tk('tell me in the comments',1060,48),
   'p5a':tk('two shirts. two verses.',330,64),'p5b':tk('Christian gym shirts under $45.',330,62),'p5c':tk('scripture you can lift in.',330,64),
   'p5_j':tk('Joshua 1:9',1180,54,white=True),'p5_p':tk('Philippians 4:13',1180,54,white=True),
   'p5_front':tk('a small cross on the front. that&rsquo;s it.',330,58),
   'p5_tee':tk('the tee &middot; $34.99',1180,60),'p5_ls':tk('the long sleeve &middot; $44.99',1180,60),
   'p5_end':logo(600)+tk('printed to order &middot; link in bio',1020,48)}
for k,v in H.items(): card('fs_'+k, v)
# Reel covers: full-bleed image, title kept inside the 3:4 grid crop (y 240-1680) and below the print
def cover(name,img,l1,l2,pos='50% 40%'):
    html=(f"<div style='position:absolute;inset:0;background:#0b0b0b'></div><img class='cover' style='object-position:{pos}' src='{{{{IMG:{img}}}}}'>"
          "<div style='position:absolute;left:0;right:0;top:1080px;bottom:0;background:linear-gradient(to bottom,rgba(11,11,11,0),rgba(11,11,11,.88) 34%,rgba(11,11,11,.96))'></div>"
          f"<div class='c d' style='top:1300px;font-size:132px;color:#f5f3ef'>{l1}</div>"
          f"<div class='c d' style='top:1425px;font-size:132px;color:#f5f3ef'>{l2}</div>"
          "<div class='c s' style='top:1590px;font-size:30px;color:#bdb6aa'>SWOLVATION</div>")
    card('cover_'+name, html)
I='/home/user/mk/img/'
# p5split.jpg = pteeflat.jpg and plsflat.jpg, each centre-cropped to 540x1920, side by side (ImageMagick +append)
cover('p1',I+'n8fix.jpg','FRONT QUIET.','BACK LOUD.','50% 30%')
cover('p2',I+'n7.jpg','NOT CHURCH','MERCH.','50% 35%')
cover('p3',I+'n1.jpg','3 DETAILS','YOU MISSED','50% 35%')
cover('p4',I+'n2.jpg','RATE THE','BACK /10','50% 35%')
cover('p5',I+'p5split.jpg','TWO SHIRTS.','TWO VERSES.','50% 30%')
json.dump(specs, open(T+'fs_spec.json','w'))
# EDL variants: copy the produced edit, swap only the named title cards
def variant(base, name, swaps):
    d=copy.deepcopy(json.load(open(E+base+'.json')))
    for t in d['titles']:
        fn=t['png'].split('/')[-1]
        if fn in swaps: t['png']=T+swaps[fn]
    d['out']=O+name+'.mp4'; json.dump(d, open(E+'fs_'+name+'.json','w'),indent=1); return name
jobs=[]
jobs+= [variant('FRONT-QUIET-BACK-LOUD','P1_FRONT-QUIET_hookB',{'t2_a.png':'fs_p1b.png'}), variant('FRONT-QUIET-BACK-LOUD','P1_FRONT-QUIET_hookC',{'t2_a.png':'fs_p1c.png'})]
jobs+= [variant('NOT-CHURCH-MERCH','P2_NOT-CHURCH-MERCH_hookB',{'t1_hook.png':'fs_p2b.png'}), variant('NOT-CHURCH-MERCH','P2_NOT-CHURCH-MERCH_hookC',{'t1_hook.png':'fs_p2c.png'})]
jobs+= [variant('3-DETAILS','P3_3-DETAILS_hookB',{'t3_hook.png':'fs_p3b.png'}), variant('3-DETAILS','P3_3-DETAILS_hookC',{'t3_hook.png':'fs_p3c.png'})]
jobs+= [variant('RATE-THE-BACK','P4_RATE-THE-BACK_hookB',{'t4_a.png':'fs_p4b.png','t4_end.png':'fs_p4b_end.png'}), variant('RATE-THE-BACK','P4_RATE-THE-BACK_hookC',{'t4_a.png':'fs_p4c.png','t4_end.png':'fs_p4c_end.png'})]
# P5 direct response: tee back, long sleeve back, tee front, both flat lays with prices, end card
shots=[{'src':'/home/user/ad/newv/g16.mp4','ss':0.0,'d':2.2,'grade':'none'},{'src':'/home/user/ad/newv/g17.mp4','ss':0.0,'d':2.2,'grade':'none'},
       {'src':'/home/user/ad/new/n8fix.png','d':1.6,'zoom':[1.0,1.04]},{'src':'/home/user/ad/stills/p_teeflat.png','d':1.6,'zoom':[1.04,1.0]},
       {'src':'/home/user/ad/stills/p_lsflat.png','d':1.6,'zoom':[1.0,1.04]},{'src':'black','d':2.2}]
aud={'dur':11.4,'room':-26,'events':[{'t':round(i*0.55,2),'type':'pulse','g':-9 if i%2==0 else -13} for i in range(21)]+
     [{'t':t,'type':'tick','g':-6} for t in (0,2.2,4.4,6.0,7.6)]+[{'t':0.0,'type':'hit','g':-3,'f0':66,'f1':38},{'t':9.2,'type':'hit','g':-2,'f0':56,'f1':32},{'t':9.22,'type':'ring','g':-12,'base':98,'dur':1.8}]}
json.dump(aud, open('/home/user/mk/aud/TWO-SHIRTS.json','w'))
for hk in 'abc':
    titles=[{'png':T+f'fs_p5{hk}.png','t0':0,'t1':2.2,'fade':0.05},{'png':T+'fs_p5_j.png','t0':0.9,'t1':2.2,'fade':0.05},{'png':T+'fs_p5_p.png','t0':2.2,'t1':4.4,'fade':0.05},
            {'png':T+'fs_p5_front.png','t0':4.4,'t1':6.0,'fade':0.05},{'png':T+'fs_p5_tee.png','t0':6.0,'t1':7.6,'fade':0.05},{'png':T+'fs_p5_ls.png','t0':7.6,'t1':9.2,'fade':0.05},
            {'png':T+'fs_p5_end.png','t0':9.2,'t1':11.4,'fade':0.05}]
    name=f'P5_TWO-SHIRTS_hook{hk.upper()}'
    json.dump({'out':O+name+'.mp4','audio':'/home/user/mk/aud/TWO-SHIRTS.json','grain':2,'shots':shots,'titles':titles}, open(E+'fs_'+name+'.json','w'),indent=1)
    jobs.append(name)
open('/home/user/mk/fs_jobs.txt','w').write('\n'.join(jobs)); print(len(specs),'cards;',len(jobs),'videos')
