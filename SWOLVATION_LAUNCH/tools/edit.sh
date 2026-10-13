# cut 4 x 5.0 s anchored clips into a ~20 s 1080x1920 edit; shot 4 gets an extra continuous
# digital drift so the ad is still moving at the cut; audio bed normalised to -14 LUFS
# expects clips/s1..s4.mp4 and audio/bed_raw.wav (from bed.py) under ~/np in the Higgsfield sandbox
set -e; cd ~/np
V=clips; O=out; mkdir -p $O
ffmpeg -v error -y -i $V/s1.mp4 -i $V/s2.mp4 -i $V/s3.mp4 -i $V/s4.mp4 -filter_complex "
[0:v]trim=start_frame=0:end_frame=120,setpts=PTS-STARTPTS,scale=1080:1920,setsar=1,fps=24[a];
[1:v]trim=start_frame=0:end_frame=120,setpts=PTS-STARTPTS,scale=1080:1920,setsar=1,fps=24[b];
[2:v]trim=start_frame=0:end_frame=120,setpts=PTS-STARTPTS,scale=1080:1920,setsar=1,fps=24[c];
[3:v]trim=start_frame=0:end_frame=120,setpts=PTS-STARTPTS,scale=2160:3840,zoompan=z='1.06-0.06*on/119':d=1:s=1080x1920:fps=24:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)',setsar=1[d];
[a][b][c][d]concat=n=4:v=1:a=0,format=yuv420p[v]" -map "[v]" -c:v libx264 -preset slow -crf 17 -r 24 -movflags +faststart $O/silent.mp4
# two-pass loudnorm to -14 LUFS integrated, -1.5 dBTP
J=$(ffmpeg -hide_banner -i audio/bed_raw.wav -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/{/,/}/p')
gi(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i audio/bed_raw.wav -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(gi input_i):measured_TP=$(gi input_tp):measured_LRA=$(gi input_lra):measured_thresh=$(gi input_thresh):offset=$(gi target_offset):linear=true" -ar 48000 audio/bed_-14.wav
ffmpeg -v error -y -i $O/silent.mp4 -i audio/bed_-14.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart $O/with_audio.mp4
ffmpeg -hide_banner -i $O/with_audio.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -A12 Summary
