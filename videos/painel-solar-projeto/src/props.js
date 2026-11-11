import * as THREE from 'three';
import { materials } from './materials.js';
import { glowTexture, rng } from './textures.js';

const shadow = o => { o.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return o; };
const box = (w, h, d, mat, p = [0, 0, 0], r = [0, 0, 0]) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(...p); m.rotation.set(...r); return m;
};

// ---------- pistol (barrel along +x, muzzle at .muzzle) ----------
export function pistol() {
  const M = materials();
  const g = new THREE.Group();
  g.add(box(0.19, 0.036, 0.03, M.gun, [0, 0.03, 0]));
  for (let i = 0; i < 7; i++) g.add(box(0.003, 0.03, 0.031, M.gunDark, [-0.085 + i * 0.007, 0.032, 0]));
  g.add(box(0.05, 0.012, 0.031, M.gunDark, [0.02, 0.03, 0])); // ejection port
  g.add(box(0.17, 0.022, 0.026, M.gunDark, [0.005, 0.003, 0]));
  const grip = box(0.04, 0.115, 0.03, M.gunDark, [-0.065, -0.052, 0], [0, 0, 0.22]); g.add(grip);
  const tg = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.004, 8, 20, Math.PI), M.gunDark);
  tg.rotation.z = Math.PI; tg.position.set(-0.012, -0.008, 0); g.add(tg);
  g.add(box(0.004, 0.018, 0.006, M.gunDark, [-0.014, -0.015, 0], [0, 0, 0.3]));
  g.add(box(0.008, 0.008, 0.006, M.gunDark, [0.088, 0.052, 0]));
  g.add(box(0.012, 0.008, 0.02, M.gunDark, [-0.088, 0.052, 0]));
  const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.004, 16), M.mouth);
  bore.rotation.z = Math.PI / 2; bore.position.set(0.0955, 0.03, 0); g.add(bore);
  g.muzzle = new THREE.Vector3(0.1, 0.03, 0);
  return shadow(g);
}

// first person arm holding the pistol (pistol frame = arm frame)
export function gunArm() {
  const M = materials();
  const g = new THREE.Group();
  const gun = pistol(); g.add(gun);
  const hand = new THREE.Group(); g.add(hand);
  const palm = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 24), M.skin);
  palm.scale.set(0.95, 1.1, 0.8); palm.position.set(-0.075, -0.06, 0); hand.add(palm);
  for (let i = 0; i < 4; i++) {
    const f = new THREE.Mesh(new THREE.CapsuleGeometry(0.0115, 0.035, 4, 10), M.skin);
    f.rotation.x = Math.PI / 2; f.position.set(-0.045 - i * 0.004, -0.03 - i * 0.022, 0.026); hand.add(f);
  }
  const th = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.05, 4, 10), M.skin);
  th.rotation.set(0, 0, -1.2); th.position.set(-0.04, 0.0, -0.022); hand.add(th);
  const fa = new THREE.Mesh(new THREE.CapsuleGeometry(0.042, 0.45, 8, 20), M.skin);
  fa.rotation.z = 1.05; fa.position.set(-0.29, -0.2, 0); hand.add(fa);
  g.muzzle = gun.muzzle;
  return shadow(g);
}

// ---------- bullet (nose along +y) with mushroom morph ----------
export function bullet(scale = 1) {
  const M = materials();
  const A = [[0, 0], [0.0052, 0], [0.0057, 0.0015], [0.0057, 0.006], [0.0057, 0.0105], [0.0052, 0.0135], [0.0042, 0.016], [0.0026, 0.0178], [0, 0.0186]];
  const B = [[0, 0.001], [0.0052, 0.001], [0.006, 0.0025], [0.0068, 0.006], [0.0095, 0.0085], [0.0125, 0.0098], [0.0118, 0.0108], [0.006, 0.0112], [0, 0.0112]];
  const smoothP = (P) => { const c = new THREE.SplineCurve(P.map(([r, y]) => new THREE.Vector2(r, y))); return c.getPoints(28); };
  const mk = (P) => new THREE.LatheGeometry(smoothP(P), 64);
  const ga = mk(A), gb = mk(B);
  // jagged splatter on the mushroom
  const p = gb.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i), y = p.getY(i);
    const rad = Math.hypot(x, z);
    if (rad > 0.0065) { const a = Math.atan2(z, x); const k = 1 + (Math.sin(a * 6) * 0.09 + Math.sin(a * 11 + 1.3) * 0.05) * ((rad - 0.0065) / 0.006); p.setX(i, x * k); p.setZ(i, z * k); }
  }
  ga.morphAttributes.position = [gb.attributes.position];
  ga.computeVertexNormals();
  const m = new THREE.Mesh(ga, M.copper.clone());
  m.material.emissive = new THREE.Color(0x7a2408);
  m.scale.setScalar(scale);
  m.morphTargetInfluences = [0];
  m.castShadow = true;
  return m;
}

// ---------- sword (blade along +y, origin at grip) ----------
export function sword() {
  const M = materials();
  const g = new THREE.Group();
  const bg = new THREE.BoxGeometry(0.05, 0.85, 0.008, 1, 16, 1);
  const p = bg.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i) + 0.425, t = y / 0.85;
    const w = t > 0.88 ? (1 - t) / 0.12 : 1 - t * 0.25;
    p.setX(i, p.getX(i) * w); p.setZ(i, p.getZ(i) * (Math.abs(p.getX(i)) > 0.015 ? 0.35 : 1));
  }
  bg.translate(0, 0.425 + 0.09, 0); bg.computeVertexNormals();
  g.add(new THREE.Mesh(bg, M.steelBright));
  g.add(box(0.008, 0.6, 0.0095, M.steelDark, [0, 0.4, 0]));
  g.add(box(0.2, 0.022, 0.03, M.steelDark, [0, 0.08, 0]));
  const gr = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.14, 12), M.leather); g.add(gr);
  const pm = new THREE.Mesh(new THREE.SphereGeometry(0.026, 16, 12), M.steelDark); pm.position.y = -0.08; g.add(pm);
  g.tip = new THREE.Vector3(0, 0.94, 0);
  return shadow(g);
}

// ---------- heater shield (front +z) ----------
export function shield() {
  const M = materials();
  const s = new THREE.Shape();
  s.moveTo(-0.27, 0.32); s.lineTo(0.27, 0.32);
  s.bezierCurveTo(0.29, 0.0, 0.2, -0.25, 0, -0.42);
  s.bezierCurveTo(-0.2, -0.25, -0.29, 0.0, -0.27, 0.32);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.014, bevelSegments: 3, curveSegments: 32 });
  // curve it a bit
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) { const x = p.getX(i); p.setZ(i, p.getZ(i) - x * x * 0.5); }
  geo.computeVertexNormals();
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, M.steel));
  const pts = s.getSpacedPoints(26);
  for (const q of pts) { const r = new THREE.Mesh(new THREE.SphereGeometry(0.008, 10, 8), M.steelDark); r.position.set(q.x * 0.9, q.y * 0.9, 0.034 - q.x * q.x * 0.45); g.add(r); }
  return shadow(g);
}

// ---------- spiked mace (handle along +y, origin at grip) ----------
export function mace() {
  const M = materials();
  const g = new THREE.Group();
  const h = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.02, 0.62, 16), M.steelDark); h.position.y = 0.2; g.add(h);
  const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.16, 16), M.leather); g.add(wrap);
  const head = new THREE.Group(); head.position.y = 0.53; g.add(head);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.065, 32, 24), M.steel));
  const N = 22;
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, rr = Math.sqrt(1 - y * y), th = i * 2.39996;
    const dir = new THREE.Vector3(Math.cos(th) * rr, y, Math.sin(th) * rr);
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.06, 12), M.steelBright);
    c.position.copy(dir.clone().multiplyScalar(0.085));
    c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    head.add(c);
  }
  g.head = head;
  return shadow(g);
}

// ---------- arrow (points +z, tip at origin) ----------
export function arrow() {
  const M = materials();
  const g = new THREE.Group();
  const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.74, 10), M.wood);
  sh.rotation.x = Math.PI / 2; sh.position.z = -0.42; g.add(sh);
  const hd = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.055, 4), M.steelDark);
  hd.rotation.x = Math.PI / 2; hd.position.z = -0.027; g.add(hd);
  for (let i = 0; i < 3; i++) {
    const f = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.1), M.feather);
    const a = i * Math.PI * 2 / 3;
    f.rotation.set(0, 0, a); f.rotateX(Math.PI / 2); f.position.set(Math.cos(a) * 0.014, Math.sin(a) * 0.014, -0.72);
    g.add(f);
  }
  return shadow(g);
}

// ---------- bow (vertical, faces +z, grip at origin), dynamic draw ----------
export function bow() {
  const M = materials();
  const g = new THREE.Group();
  const L = 0.72;
  const limbMesh = new THREE.Mesh(new THREE.BufferGeometry(), M.woodDark); g.add(limbMesh);
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.12, 12), M.leather); g.add(grip);
  const s1 = new THREE.Mesh(new THREE.CylinderGeometry(0.0018, 0.0018, 1, 6), M.string);
  const s2 = s1.clone(); g.add(s1, s2);
  const tmp = new THREE.Vector3();
  function seg(m, a, b) {
    m.position.copy(a).add(b).multiplyScalar(0.5);
    tmp.subVectors(b, a); m.scale.set(1, tmp.length(), 1);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tmp.normalize());
  }
  g.nock = new THREE.Vector3();
  g.update = (draw) => {
    const k = 0.1 + 0.16 * draw;
    const ys = L * (1 - 0.06 * draw);
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24 * 2 - 1;
      pts.push(new THREE.Vector3(0, t * ys, -k * t * t - 0.02 * Math.abs(t) ** 4 * (1 - draw)));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    limbMesh.geometry.dispose();
    limbMesh.geometry = new THREE.TubeGeometry(curve, 48, 0.011, 8, false);
    const top = pts[24], bot = pts[0];
    g.nock.set(0, 0.035, -k - 0.02 - 0.58 * draw);
    seg(s1, top, g.nock); seg(s2, bot, g.nock);
  };
  g.update(0);
  return shadow(g);
}

// ---------- wooden armor stand ----------
export function stand() {
  const M = materials();
  const g = new THREE.Group();
  g.add(box(0.075, 1.5, 0.075, M.wood, [0, 0.75, 0]));
  g.add(box(0.4, 0.06, 0.07, M.wood, [0, 1.38, 0]));
  for (let i = 0; i < 3; i++) {
    const a = i * Math.PI * 2 / 3 + 0.5;
    const leg = box(0.06, 0.55, 0.06, M.wood);
    leg.position.set(Math.cos(a) * 0.2, 0.2, Math.sin(a) * 0.2);
    leg.lookAt(Math.cos(a) * 2, 0.2, Math.sin(a) * 2); leg.rotateX(Math.PI / 2 - 0.65);
    g.add(leg);
    g.add(box(0.12, 0.05, 0.09, M.wood, [Math.cos(a) * 0.38, 0.025, Math.sin(a) * 0.38], [0, -a, 0]));
  }
  return shadow(g);
}

// ---------- effects ----------
let _glow;
export function glowSprite(color = 0xffffff, size = 1) {
  _glow = _glow || glowTexture();
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: _glow, color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }));
  s.scale.setScalar(size);
  return s;
}

// deterministic spark burst: update(dt since burst)
export function sparks(count = 60, { speed = 2.5, spread = 1, gravity = -6, life = 0.6, color = [1, 0.75, 0.3], size = 0.02, seed = 9, dir = new THREE.Vector3(0, 0, 1) } = {}) {
  const r = rng(seed);
  _glow = _glow || glowTexture();
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size, map: _glow, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false });
  const pts = new THREE.Points(geo, mat); pts.frustumCulled = false;
  const V = [], Lf = [];
  const d = dir.clone().normalize();
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize().multiplyScalar(spread).add(d).normalize().multiplyScalar(speed * (0.3 + r() * 0.9));
    V.push(v); Lf.push(life * (0.4 + r() * 0.8));
  }
  pts.update = (t) => {
    for (let i = 0; i < count; i++) {
      const tt = Math.max(0, t), v = V[i];
      pos[i * 3] = v.x * tt; pos[i * 3 + 1] = v.y * tt + 0.5 * gravity * tt * tt; pos[i * 3 + 2] = v.z * tt;
      const a = t < 0 ? 0 : Math.max(0, 1 - tt / Lf[i]);
      col[i * 3] = color[0] * a * 3; col[i * 3 + 1] = color[1] * a * 3; col[i * 3 + 2] = color[2] * a * 3;
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
  };
  pts.update(-1);
  return pts;
}

// glowing tracer streak between two points
export function streak(color = 0xfff2dd) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 8, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  const tmp = new THREE.Vector3();
  m.set = (a, b, r = 0.003, op = 0.7) => {
    m.position.copy(a).add(b).multiplyScalar(0.5);
    tmp.subVectors(b, a); const L = tmp.length();
    m.scale.set(r, Math.max(L, 1e-4), r);
    if (L > 1e-5) m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tmp.normalize());
    m.material.opacity = op; m.visible = op > 0.001 && L > 1e-4;
  };
  return m;
}

// ---------- red impact ripple overlay ----------
const NOISE = `
float h3(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float n3(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z); }
`;
export function rippleOverlay(target) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uCenter: { value: new THREE.Vector3() }, uRadius: { value: 0 }, uAmp: { value: 0 },
      uTime: { value: 0 }, uRings: { value: 160 }, uSpot: { value: 0.04 }, uBlot: { value: 0 }, uSpotAmp: { value: 1 },
    },
    vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: NOISE + `
      uniform vec3 uCenter; uniform float uRadius,uAmp,uTime,uRings,uSpot,uBlot,uSpotAmp; varying vec3 vPos;
      void main(){
        float d = distance(vPos,uCenter);
        float front = 1.0 - smoothstep(uRadius*0.75, uRadius, d);
        float wob = n3(vPos*30.0)*0.012;
        float rings = pow(0.5+0.5*sin((d+wob*0.4)*uRings - uTime*9.0), 7.0);
        float fall = mix(1.0, 0.45, clamp(d/max(uRadius,1e-3),0.,1.));
        float bl = smoothstep(0.55, 0.8, n3(vPos*22.0 + vec3(0.,uTime*0.3,0.))*0.7 + n3(vPos*60.0)*0.3);
        float core = exp(-d*d/(uSpot*uSpot));
        float a = (rings*0.85*fall)*front*uAmp + bl*uBlot*front + core*uSpotAmp*uAmp;
        a = clamp(a,0.,1.);
        vec3 c = mix(vec3(0.9,0.05,0.06), vec3(1.0,0.45,0.42), core*0.6 + rings*0.25);
        gl_FragColor = vec4(c*(1.0+core*0.8), a*0.88);
      }`,
    transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4, side: THREE.FrontSide,
  });
  const m = new THREE.Mesh(target.geometry, mat);
  m.renderOrder = 5;
  target.add(m);
  return m;
}

// ======================= SOLAR PROPS =======================
export { box, shadow };
const _std = (o) => new THREE.MeshStandardMaterial(o);
const _phy = (o) => new THREE.MeshPhysicalMaterial(o);

function panelTexture(cols = 6, rows = 10) {
  const W = 600, H = 1000, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = '#e4e9ef'; x.fillRect(0, 0, W, H);
  const cw = W / cols, ch = H / rows, g = 5, k = 9;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const x0 = i * cw + g, y0 = j * ch + g, x1 = (i + 1) * cw - g, y1 = (j + 1) * ch - g;
    const gr = x.createLinearGradient(x0, y0, x1, y1); gr.addColorStop(0, '#132a63'); gr.addColorStop(1, '#0a1738');
    x.fillStyle = gr; x.beginPath();
    x.moveTo(x0 + k, y0); x.lineTo(x1 - k, y0); x.lineTo(x1, y0 + k); x.lineTo(x1, y1 - k); x.lineTo(x1 - k, y1); x.lineTo(x0 + k, y1); x.lineTo(x0, y1 - k); x.lineTo(x0, y0 + k); x.closePath(); x.fill();
    x.strokeStyle = 'rgba(150,175,230,0.16)'; x.lineWidth = 1;
    for (let y = y0 + 4; y < y1; y += 5) { x.beginPath(); x.moveTo(x0, y); x.lineTo(x1, y); x.stroke(); }
    x.strokeStyle = '#c9cdd3'; x.lineWidth = 2.2;
    for (let b = 1; b <= 3; b++) { const bx = x0 + (x1 - x0) * b / 4; x.beginPath(); x.moveTo(bx, y0); x.lineTo(bx, y1); x.stroke(); }
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
let _panelMats;
function panelMats() {
  if (_panelMats) return _panelMats;
  const map = panelTexture();
  _panelMats = {
    face: _phy({ map, roughness: 0.12, metalness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05, emissive: 0x3060ff, emissiveMap: map, emissiveIntensity: 0 }),
    frame: _phy({ color: 0xd4d8de, metalness: 1, roughness: 0.3 }),
  };
  return _panelMats;
}
// solar panel lying in XZ (cells face +y), 1.0 x 1.65 m. .face is the cell surface mesh, .setGlow(k)
export function solarPanel() {
  const PM = panelMats();
  const g = new THREE.Group();
  const face = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.035, 1.65), [PM.frame, PM.frame, PM.face, PM.frame, PM.frame, PM.frame]);
  g.add(face); g.face = face;
  for (const s of [1, -1]) {
    g.add(box(1.04, 0.05, 0.03, PM.frame, [0, 0.008, s * 0.84]));
    g.add(box(0.03, 0.05, 1.7, PM.frame, [s * 0.515, 0.008, 0]));
  }
  g.setGlow = (k) => { PM.face.emissiveIntensity = k; };
  return shadow(g);
}
// panel on a little ground rack, tilted toward +z
export function panelOnRack(tilt = 0.55) {
  const M = materials();
  const g = new THREE.Group();
  const p = solarPanel(); p.rotation.x = tilt; p.position.y = 0.75; g.add(p); g.panel = p;
  for (const s of [1, -1]) {
    g.add(box(0.05, 0.75 + 0.45, 0.05, M.steelDark, [s * 0.42, (0.75 + 0.45) / 2, -0.62]));
    g.add(box(0.05, 0.3, 0.05, M.steelDark, [s * 0.42, 0.15, 0.62]));
  }
  return shadow(g);
}

// gable house, front wall faces +z, solar panels on the front roof slope
export function house() {
  const g = new THREE.Group();
  const wall = _std({ color: 0xf1e3c8, roughness: 0.85 });
  const roofM = _std({ color: 0xb4513a, roughness: 0.7 });
  const trim = _std({ color: 0xffffff, roughness: 0.6 });
  const winM = _phy({ color: 0x9fc6e8, roughness: 0.05, metalness: 0.2, clearcoat: 1, emissive: 0xffc46b, emissiveIntensity: 0 });
  const doorM = _std({ color: 0x5a7a46, roughness: 0.6 });
  const W = 3.2, D = 2.6, Hh = 2.2, pitch = 0.5236, over = 0.25;
  g.add(box(W, Hh, D, wall, [0, Hh / 2, 0]));
  const tri = new THREE.Shape(); tri.moveTo(-D / 2, 0); tri.lineTo(D / 2, 0); tri.lineTo(0, D / 2 * Math.tan(pitch)); tri.closePath();
  for (const s of [1, -1]) {
    const gm = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.1, bevelEnabled: false }), wall);
    gm.rotation.y = Math.PI / 2; gm.position.set(s > 0 ? W / 2 - 0.1 : -W / 2, Hh, 0); g.add(gm);
  }
  const half = D / 2 + over, L = half / Math.cos(pitch), ridgeY = Hh + D / 2 * Math.tan(pitch);
  const eaveY = Hh - over * Math.tan(pitch);
  g.slopes = [];
  for (const s of [1, -1]) {
    const sl = new THREE.Group();
    sl.position.set(0, (ridgeY + eaveY) / 2 + 0.04, s * half / 2); sl.rotation.x = s * pitch; g.add(sl);
    sl.add(box(W + 0.5, 0.08, L, roofM));
    g.slopes.push(sl);
  }
  g.add(box(W + 0.55, 0.1, 0.1, roofM, [0, ridgeY + 0.08, 0]));
  // panels on the front slope
  g.panels = [];
  for (const x of [-1.08, 0, 1.08]) {
    const p = solarPanel(); p.position.set(x, 0.08, 0.02); g.slopes[0].add(p); g.panels.push(p);
  }
  // door + windows
  g.add(box(0.7, 1.4, 0.06, doorM, [0.0, 0.7, D / 2 + 0.02]));
  g.add(box(0.06, 0.06, 0.06, _std({ color: 0xd8b04a, metalness: 1, roughness: 0.3 }), [0.22, 0.7, D / 2 + 0.07]));
  for (const x of [-1.05, 1.05]) {
    g.add(box(0.8, 0.7, 0.05, winM, [x, 1.25, D / 2 + 0.01]));
    g.add(box(0.9, 0.08, 0.1, trim, [x, 0.86, D / 2 + 0.04]));
    g.add(box(0.05, 0.7, 0.07, trim, [x, 1.25, D / 2 + 0.035]));
    g.add(box(0.8, 0.05, 0.07, trim, [x, 1.25, D / 2 + 0.035]));
  }
  // lawn
  const lawn = new THREE.Mesh(new THREE.CircleGeometry(6, 64), _std({ color: 0x6fb44a, roughness: 0.95 }));
  lawn.rotation.x = -Math.PI / 2; lawn.position.y = 0.002; lawn.receiveShadow = true; g.add(lawn);
  g.winMat = winM; g.ridgeY = ridgeY;
  shadow(g); lawn.castShadow = false;
  return g;
}

// big sun in the sky (place it far away)
export function sunDisc(size = 6) {
  const g = new THREE.Group();
  g.add(glowSprite(0xffd27a, size * 2.6));
  g.add(glowSprite(0xfff2c8, size * 1.1));
  const core = new THREE.Mesh(new THREE.SphereGeometry(size * 0.18, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.6, 1.6), toneMapped: false }));
  g.add(core);
  return g;
}

// glowing ball (electron = blue, photon = yellow)
export function glowBall(color = 0x5fc4ff, r = 0.012, glow = 6, core = null) {
  const g = new THREE.Group();
  const c = core || new THREE.Color(color).multiplyScalar(2.2);
  g.add(new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), new THREE.MeshBasicMaterial({ color: c, toneMapped: false })));
  const s = glowSprite(color, r * glow); s.material.opacity = 0.9; g.add(s);
  return g;
}
export const electron = (r = 0.012) => glowBall(0x1f6dff, r, 5, new THREE.Color(0.08, 0.42, 1.9));
export const photon = (r = 0.014) => glowBall(0xffd84a, r, 8);

// insulated cable along points
export function cable(points, r = 0.015, color = 0x202226) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
  const m = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(32, points.length * 16), r, 10, false), _std({ color, roughness: 0.55 }));
  m.castShadow = true; m.curve = curve;
  return m;
}

// one solar cell as a stack: grid fingers / N (blue) / P (red) / back contact. .n .p .grid .back groups, size s
export function cellStack(s = 0.6) {
  const M = materials();
  const g = new THREE.Group();
  const nM = _phy({ color: 0x2f62e0, roughness: 0.25, clearcoat: 1, emissive: 0x2040ff, emissiveIntensity: 0 });
  const pM = _phy({ color: 0xd2453a, roughness: 0.35, clearcoat: 0.6, emissive: 0xff2010, emissiveIntensity: 0 });
  const n = new THREE.Group(); n.add(box(s, 0.03, s, nM)); g.add(n);
  const p = new THREE.Group(); p.add(box(s, 0.09, s, pM)); g.add(p);
  const back = new THREE.Group(); back.add(box(s, 0.012, s, M.steelBright)); g.add(back);
  const grid = new THREE.Group(); g.add(grid);
  const fingers = 9;
  for (let i = 0; i < fingers; i++) grid.add(box(s, 0.006, 0.006, M.steelBright, [0, 0, -s / 2 + (i + 0.5) * s / fingers]));
  for (const x of [-s / 4, s / 4]) grid.add(box(0.025, 0.01, s, M.steelBright, [x, 0.003, 0]));
  g.n = n; g.p = p; g.back = back; g.grid = grid; g.nMat = nM; g.pMat = pM; g.size = s;
  // stacked positions (y of each layer's centre); explode(k) pulls them apart
  g.explode = (k) => {
    p.position.y = 0; n.position.y = 0.06 + 0.25 * k; grid.position.y = 0.078 + 0.5 * k; back.position.y = -0.051 - 0.22 * k;
  };
  g.explode(0);
  return shadow(g);
}

// wall-mounted inverter (front +z): box, fins, green display
export function inverter() {
  const g = new THREE.Group();
  const body = _phy({ color: 0xeef0f2, roughness: 0.4, clearcoat: 0.5 });
  const dark = _std({ color: 0x2c2f35, roughness: 0.5 });
  g.add(box(0.5, 0.65, 0.2, body));
  g.add(box(0.46, 0.08, 0.205, _std({ color: 0xf2a51a, roughness: 0.4 }), [0, 0.24, 0.0]));
  for (let i = 0; i < 6; i++) g.add(box(0.02, 0.5, 0.05, dark, [-0.27, -0.02, -0.06 + i * 0.0]));
  const scr = _std({ color: 0x0b2412, emissive: 0x3cff7a, emissiveIntensity: 0.6 });
  g.add(box(0.22, 0.1, 0.01, scr, [0, 0.06, 0.104]));
  g.add(box(0.03, 0.03, 0.01, _std({ color: 0x113311, emissive: 0x3cff7a, emissiveIntensity: 2 }), [0.16, -0.08, 0.104]));
  for (const x of [-0.12, 0.12]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.06, 16), dark); c.position.set(x, -0.35, 0.03); g.add(c); }
  g.screen = scr;
  return shadow(g);
}

// breaker panel (front +z) with a row of switches
export function breakerBox() {
  const g = new THREE.Group();
  const grey = _phy({ color: 0xd9dcdf, metalness: 0.4, roughness: 0.45 });
  const dark = _std({ color: 0x33363b, roughness: 0.6 });
  g.add(box(0.5, 0.6, 0.1, grey));
  g.add(box(0.42, 0.42, 0.02, dark, [0, -0.02, 0.055]));
  g.switches = [];
  for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) {
    const sw = box(0.04, 0.12, 0.04, _std({ color: 0xf4f4f4, roughness: 0.4 }), [-0.15 + i * 0.06, 0.08 - r * 0.2, 0.07]);
    g.add(sw); g.switches.push(sw);
  }
  return shadow(g);
}

// hanging ceiling lamp; .setOn(k)
export function lamp() {
  const g = new THREE.Group();
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.5, 8), _std({ color: 0x222222 })); cord.position.y = -0.25; g.add(cord);
  const shadeM = _std({ color: 0x2f5d8a, roughness: 0.5, side: THREE.DoubleSide });
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.18, 32, 1, true), shadeM); shade.position.y = -0.55; g.add(shade);
  const bulbM = new THREE.MeshBasicMaterial({ color: 0x555555, toneMapped: false });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 16), bulbM); bulb.position.y = -0.66; g.add(bulb);
  const glow = glowSprite(0xffd890, 0.7); glow.position.y = -0.66; glow.material.opacity = 0; g.add(glow);
  const light = new THREE.PointLight(0xffd6a0, 0, 6, 1.5); light.position.y = -0.7; g.add(light);
  g.setOn = (k) => { bulbM.color.setRGB(0.35 + 3 * k, 0.33 + 2.6 * k, 0.3 + 1.6 * k); glow.material.opacity = k; light.intensity = 3 * k; };
  g.setOn(0);
  shade.castShadow = true;
  return g;
}

// wooden utility pole with a crossarm; .top is the wire attachment (local)
export function utilityPole(h = 5) {
  const M = materials();
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, h, 16), M.woodDark); pole.position.y = h / 2; g.add(pole);
  g.add(box(1.4, 0.1, 0.1, M.woodDark, [0, h - 0.4, 0]));
  const ins = _std({ color: 0x7fb7a8, roughness: 0.2 });
  for (const x of [-0.6, 0, 0.6]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.14, 12), ins); c.position.set(x, h - 0.28, 0); g.add(c); }
  g.top = new THREE.Vector3(0, h - 0.2, 0);
  return shadow(g);
}

// energy meter with a canvas readout; .setValue(n)
export function meter() {
  const g = new THREE.Group();
  g.add(box(0.36, 0.5, 0.14, _phy({ color: 0xe9ecef, roughness: 0.35, clearcoat: 0.6 })));
  const c = document.createElement('canvas'); c.width = 256; c.height = 96;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.105), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
  scr.position.set(0, 0.08, 0.072); g.add(scr);
  const ctx = c.getContext('2d');
  g.setValue = (v, color = '#7dff9a') => {
    ctx.fillStyle = '#0d1a12'; ctx.fillRect(0, 0, 256, 96);
    ctx.fillStyle = color; ctx.font = 'bold 64px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(Math.round(v)).padStart(5, '0'), 128, 52);
    tex.needsUpdate = true;
  };
  g.setValue(0);
  return shadow(g);
}

// glowing dots helper: n balls; .at(i, pos, visible)
export function dotPool(n, make = electron) {
  const g = new THREE.Group(); g.items = [];
  for (let i = 0; i < n; i++) { const d = make(); g.add(d); g.items.push(d); }
  return g;
}
