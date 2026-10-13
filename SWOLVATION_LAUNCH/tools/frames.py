#!/usr/bin/env python3
"""Crop a composite to exact 9:16 and make a digital-crop frame matching a camera move.

usage: frames.py SRC OUT CX CY ZOOM   (ZOOM 1.0 = full frame; >1 = tighter crop centred on CX,CY)
"""
import sys
from PIL import Image
src,out,cx,cy,z=sys.argv[1],sys.argv[2],float(sys.argv[3]),float(sys.argv[4]),float(sys.argv[5])
im=Image.open(src).convert('RGB'); W,H=im.size
TW,TH=1512,2688
w,h=TW/z,TH/z
x0=min(max(cx-w/2,0),W-w); y0=min(max(cy-h/2,0),H-h)
im.crop((round(x0),round(y0),round(x0+w),round(y0+h))).resize((TW,TH),Image.LANCZOS).save(out,quality=95)
print(out,round(x0),round(y0),round(w),round(h))
