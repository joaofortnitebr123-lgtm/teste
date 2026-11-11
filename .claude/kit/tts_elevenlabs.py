#!/usr/bin/env python3
"""ElevenLabs voiceover WITH word timings (any language), run from a project folder.

    python3 tts_elevenlabs.py <voice_id> [lang]      # e.g. nPczCjzI2devNBz1zQrb pt
Reads script.json (list of sentences), writes audio/vo.wav (44.1 kHz mono) and audio/vo.words.json
([{w, s, e}], the same format kit/words.py makes, ready for captions.py).
Key: ELEVENLABS_API_KEY (or a proxy that injects the xi-api-key header). Model: ELEVEN_MODEL (default eleven_multilingual_v2).
"""
import base64, json, os, subprocess, sys, urllib.request, urllib.error

voice = sys.argv[1] if len(sys.argv) > 1 else 'nPczCjzI2devNBz1zQrb'
lang = sys.argv[2] if len(sys.argv) > 2 else None
model = os.environ.get('ELEVEN_MODEL', 'eleven_multilingual_v2')
key = os.environ.get('ELEVENLABS_API_KEY', 'proxy-injected')
text = ' '.join(json.load(open('script.json')))
body = {'text': text, 'model_id': model,
        'voice_settings': {'stability': float(os.environ.get('ELEVEN_STABILITY', 0.45)), 'similarity_boost': 0.75,
                           'style': float(os.environ.get('ELEVEN_STYLE', 0.3)), 'use_speaker_boost': True}}
if lang: body['language_code'] = lang
req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128',
                             data=json.dumps(body).encode(), headers={'xi-api-key': key, 'Content-Type': 'application/json'})
try:
    d = json.load(urllib.request.urlopen(req, timeout=300))
except urllib.error.HTTPError as e:
    sys.exit(f'ElevenLabs error {e.code}: {e.read().decode(errors="replace")[:500]}')
os.makedirs('audio', exist_ok=True)
open('audio/vo_el.mp3', 'wb').write(base64.b64decode(d['audio_base64']))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'audio/vo_el.mp3', '-ac', '1', '-ar', '44100', 'audio/vo.wav'], check=True)
a = d['alignment']
words, cur, s, e = [], '', None, None
for ch, cs, ce in zip(a['characters'], a['character_start_times_seconds'], a['character_end_times_seconds']):
    if ch.isspace():
        if cur: words.append({'w': cur, 's': round(s, 3), 'e': round(e, 3)}); cur = ''
        continue
    if not cur: s = cs
    cur += ch; e = ce
if cur: words.append({'w': cur, 's': round(s, 3), 'e': round(e, 3)})
json.dump(words, open('audio/vo.words.json', 'w'), indent=0)
print(f'wrote audio/vo.wav + audio/vo.words.json: {len(words)} words, {words[-1]["e"]:.2f}s, {len(text)} characters')
