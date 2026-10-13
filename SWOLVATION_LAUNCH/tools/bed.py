# original synth audio bed: wind, fan hum, distant plate clank, low dark pulse (no samples, no licensing)
import numpy as np, wave, sys
SR=48000; T=float(sys.argv[2]) if len(sys.argv)>2 else 20.0; n=int(SR*T); t=np.arange(n)/SR
rng=np.random.default_rng(13)
def lp(x,fc):  # one-pole low-pass
    a=np.exp(-2*np.pi*fc/SR); y=np.empty_like(x); s=0.0
    for i in range(len(x)): s=a*s+(1-a)*x[i]; y[i]=s
    return y
def lp_fast(x,fc,passes=2):
    for _ in range(passes):
        k=max(1,int(SR/(2*np.pi*fc))); c=np.cumsum(np.insert(x,0,0)); x=(c[k:]-c[:-k])/k; x=np.concatenate([x,np.full(k-1,x[-1])])
    return x
def env(a,d,length):
    e=np.zeros(length); ai=int(a*SR); e[:ai]=np.linspace(0,1,ai); e[ai:]=np.exp(-np.arange(length-ai)/(d*SR)); return e
L=np.zeros(n); R=np.zeros(n)
# wind: band-limited noise with slow gusts, decorrelated L/R
for ch in (L,R):
    w=rng.normal(size=n); w=lp_fast(w,900)-lp_fast(w,120)
    gust=0.55+0.45*np.sin(2*np.pi*0.11*t+rng.uniform(0,6))*np.sin(2*np.pi*0.037*t+1)
    ch+=0.9*w/np.abs(w).max()*gust*0.35
# fan hum: 58 Hz + harmonics with blade flutter
hum=sum(a*np.sin(2*np.pi*f*t) for f,a in ((58,1),(116,.5),(174,.25),(232,.12)))
hum*=0.75+0.25*np.sin(2*np.pi*13.3*t)
fade=np.clip(1.3-t/12,0.35,1)  # fan sits forward in shot 1, recedes after
L+=0.05*hum*fade; R+=0.045*hum*fade
# low dark pulse: 41 Hz sub, slow heartbeat every 1.25 s, building gently
pl=np.zeros(n)
for k,st in enumerate(np.arange(0.4,T,1.25)):
    i=int(st*SR); m=min(n-i,int(1.0*SR)); pl[i:i+m]+=env(0.02,0.28,m)*(0.6+0.4*min(1,k/10))
pulse=pl*np.sin(2*np.pi*41*t)+0.3*pl*np.sin(2*np.pi*82*t)
L+=0.42*pulse; R+=0.42*pulse
# distant plate clank: inharmonic metal partials, filtered and roomy; one per shot change
for st,pan in ((5.05,0.35),(10.1,0.65),(15.1,0.45)):
    i=int(st*SR); m=min(n-i,int(2.5*SR)); tt=np.arange(m)/SR
    c=sum(a*np.sin(2*np.pi*f*tt)*np.exp(-tt/d) for f,a,d in ((523,1,.6),(1187,.6,.35),(1873,.4,.22),(2711,.25,.15),(311,.5,.9)))
    c=lp_fast(c,2500,1); c*=0.18
    # simple room: a few decaying echoes
    out=c.copy()
    for dl,g in ((0.043,.5),(0.091,.35),(0.157,.25),(0.233,.15)):
        k=int(dl*SR); out[k:]+=g*c[:-k]
    L[i:i+m]+=out*(1-pan); R[i:i+m]+=out*pan
# fades
f=np.ones(n); fi=int(0.25*SR); fo=int(0.6*SR); f[:fi]=np.linspace(0,1,fi); f[-fo:]=np.linspace(1,0,fo)
L*=f; R*=f
x=np.stack([L,R],1); x/=np.abs(x).max()/0.9
with wave.open(sys.argv[1],'wb') as wv:
    wv.setnchannels(2); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes((x*32767).astype('<i2').tobytes())
