#!/usr/bin/env python3
"""Generate Engrove prototype measurement WAV assets v0.1.0.

Requires: Python 3 + numpy.
Output: 48 kHz / 16-bit signed PCM / stereo WAV.
"""
from pathlib import Path
import numpy as np, wave, json, hashlib, math

OUT=Path(__file__).resolve().parent
SR=48000; VER="0.1.0"; A=10**(-12/20); AH=10**(-18/20)

def z(sec): return np.zeros((round(sec*SR),2),float)
def env(n,rs=.02):
    e=np.ones(n); r=min(round(rs*SR),n//2)
    if r:
        q=.5-.5*np.cos(np.linspace(0,np.pi,r,endpoint=False))
        e[:r]*=q; e[-r:]*=q[::-1]
    return e
def tone(f,sec,a):
    n=round(sec*SR); t=np.arange(n)/SR
    return a*np.sin(2*np.pi*f*t)*env(n)
def chirp(f0,f1,sec,a):
    n=round(sec*SR); t=np.arange(n)/SR; k=math.log(f1/f0)
    p=2*np.pi*f0*sec/k*(np.exp(t/sec*k)-1)
    return a*np.sin(p)*env(n)
def st(s,l=True,r=True,rinv=False):
    x=np.zeros((len(s),2))
    if l:x[:,0]=s
    if r:x[:,1]=(-1 if rinv else 1)*s
    return x
def crc8(bs):
    c=0
    for b in bs:
        c^=b
        for _ in range(8):
            c=(((c<<1)^7)&255) if c&128 else ((c<<1)&255)
    return c
def header(tid):
    p=bytes([0xE7,tid,0x01]); pkt=p+bytes([crc8(p)])
    parts=[z(2),st(chirp(1000,5000,.6,AH)),z(.2)]
    for b in pkt:
        for k in range(7,-1,-1):
            parts.append(st(tone(2200 if (b>>k)&1 else 1200,.08,AH)))
    parts.append(z(.5))
    return np.vstack(parts)
def write(name,x):
    if np.max(np.abs(x))>=.999: raise RuntimeError("clipping")
    pcm=np.round(np.clip(x,-1,1)*32767).astype("<i2")
    p=OUT/name
    with wave.open(str(p),"wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    return p

for tid,side in [(1,"L"),(2,"R")]:
    h=header(tid); s=chirp(20,20000,12,A)
    write(f"ENGROVE-ROOM-DECAY-{side}-v{VER}.wav",
          np.vstack([h,z(1),st(s,l=side=="L",r=side=="R"),z(12)]))

h=header(3); s=chirp(20,250,20,A)
write(f"ENGROVE-BASS-MAP-v{VER}.wav",np.vstack([h,z(1),st(s),z(5)]))

h=header(4); q=chirp(400,5000,2,A)
write(f"ENGROVE-STEREO-INTEGRITY-v{VER}.wav",
      np.vstack([h,z(1),st(q,True,False),z(1),st(q,False,True),z(1),
                 st(q),z(1),st(q,True,True,True),z(3)]))

h=header(5); s=chirp(20,200,28,A); parts=[h,z(1),st(s),z(1)]
for f in [25,31.5,40,50,63,80,100,125,160,200]:
    parts += [st(tone(f,.8,A)),z(.2)]
parts += [z(4)]
write(f"ENGROVE-ISOLATION-v{VER}.wav",np.vstack(parts))

print("Generated Engrove prototype signals", VER)
