import * as THREE from 'three';
import { makeHuman } from './human.js';
import { glowSprite, sparks, streak, rippleOverlay, box, solarPanel, panelOnRack, house, sunDisc, electron, photon, cable, cellStack, inverter, breakerBox, lamp, utilityPole, meter, dotPool } from './props.js';
import { materials } from './materials.js';
import { kf, lerp, smooth, easeOut, easeIn, easeInOut, range, clamp, V, cam, place, shake, ikArm } from './anim.js';

export const DURATION = 28.0;

// [start, text, end?]
export const CAPTIONS = [
  [0.00, 'Se você colocar'], [0.89, 'um painel solar'], [1.67, 'no telhado'], [2.52, 'de onde vem'], [3.18, 'a energia'], [3.75, 'da sua casa?'],
  [4.67, 'Muita gente acha'], [5.52, 'que ele usa'], [6.26, 'o calor do sol'],
  [7.18, 'Mas'], [7.56, 'na verdade'], [8.31, 'ele usa a luz'],
  [9.27, 'Cada célula'], [9.95, 'é feita'], [10.46, 'de silício'], [11.30, 'em duas camadas'],
  [12.19, 'Quando a luz'], [12.81, 'bate'], [13.32, 'ela solta'], [13.85, 'elétrons'], [14.49, 'que correm'], [15.00, 'pelos fios'],
  [15.50, 'Só que isso'], [16.18, 'é corrente'], [16.80, 'contínua'], [17.46, 'então um inversor'], [18.37, 'transforma'], [19.00, 'em alternada'], [19.77, 'igual'], [20.10, 'à da tomada'],
  [20.98, 'Ela passa'], [21.60, 'pelo quadro de luz'], [22.75, 'e acende'], [23.22, 'a sua casa'],
  [24.04, 'E o que sobra'], [24.79, 'vai para a rede'], [25.86, 'e vira crédito'], [26.65, 'na sua conta', 27.6],
];
// [fadeInStart, fullStart, fullEnd, fadeOutEnd] to black
export const FADES = [[6.98, 7.12, 7.2, 7.36]];

function idle(t, k = 1) { return Math.sin(t * 1.6) * 0.012 * k; }
const STAND = {
  lSh: [0.05, 0, 0.16], rSh: [0.05, 0, -0.16], lEl: [-0.25, 0, 0], rEl: [-0.25, 0, 0],
  lHip: [0, 0, 0.07], rHip: [0, 0, -0.07], lAn: [0, 0, -0.07], rAn: [0, 0, 0.07],
};
function standPose(h, t, extra = {}) {
  const p = { ...STAND, ...extra };
  p.chest = [idle(t) + (extra.chest?.[0] || 0), extra.chest?.[1] || 0, extra.chest?.[2] || 0];
  h.setPose(p);
}
// a homeowner: colored shirt + jeans instead of the black base suit
let _dress;
function person() {
  const M = materials();
  _dress = _dress || {
    shirt: new THREE.MeshStandardMaterial({ color: 0xf08a24, roughness: 0.8, bumpMap: M.cloth.bumpMap, bumpScale: 1.2 }),
    pants: new THREE.MeshStandardMaterial({ color: 0x2f4f86, roughness: 0.85, bumpMap: M.cloth.bumpMap, bumpScale: 1.4 }),
  };
  const h = makeHuman('casual');
  const legs = new Set();
  for (const k of ['lHip', 'rHip']) h.j[k].traverse(o => legs.add(o));
  h.root.traverse(o => { if (o.isMesh && o.material === M.cloth) o.material = legs.has(o) ? _dress.pants : _dress.shirt; });
  return h;
}
// steady stream of dots along a curve
function flow(pool, curve, t, speed, { from = 0, to = 1, visible = 1 } = {}) {
  const n = pool.items.length, L = curve.getLength();
  pool.items.forEach((d, i) => {
    const u = (((i / n) + t * speed / L) % 1 + 1) % 1;
    const w = from + (to - from) * u;
    d.position.copy(curve.getPointAt(w));
    d.visible = visible > 0.01;
    d.scale.setScalar(Math.max(0.001, visible));
  });
}
function addSun(scene, pos, size = 6) { const s = sunDisc(size); s.position.set(...pos); scene.add(s); return s; }

// ============ SHOT 1: the house with panels on the roof ============
function shot1({ makeStage }) {
  const scene = makeStage({ shadowSize: 6, sunDir: [-3, 7, 5] });
  const h = house(); scene.add(h);
  addSun(scene, [-4, 14, -30], 7);
  const man = person(); man.root.position.set(0.95, 0, 2.6); man.root.rotation.y = 0.2; scene.add(man.root);
  const c = cam(40);
  return {
    scene, camera: c,
    update(t) {
      const look = smooth(range(t, 1.2, 2.4));
      standPose(man, t, { neck: [-0.35 * look, -0.2 * look, 0], head: [-0.25 * look, 0, 0] });
      man.setMouth(0.15 * smooth(range(t, 3.4, 3.9)));
      h.panels.forEach(p => p.setGlow(0.0));
      const k = easeInOut(range(t, 0, 4.6));
      const s = shake(t, 0.5);
      place(c, [lerp(2.8, 1.1, k) + s[0], lerp(2.6, 3.6, k) + s[1], lerp(10.5, 4.6, k)], [lerp(0, 0.1, k), lerp(1.7, 2.55, k), lerp(0, 0.6, k)]);
      return { dof: { focus: c.position.distanceTo(V(0, 2.4, 0.8)), aperture: 0.0008, maxblur: 0.004 }, bloom: 0.5 };
    },
  };
}

// ============ SHOT 2: "it uses the sun's heat" (sweaty man, red heat ripple on the panel) ============
function shot2({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sunDir: [-2, 7, 5], sun: 2.8 });
  const rack = panelOnRack(0.55); rack.position.set(0.35, 0, -0.75); rack.rotation.y = -0.35; scene.add(rack);
  const man = person(); man.root.position.set(-0.25, 0, 0.35); man.root.rotation.y = 0.25; scene.add(man.root);
  addSun(scene, [1.2, 5.6, -16], 4);
  const rp = rippleOverlay(rack.panel.face);
  const drops = [];
  const dropM = new THREE.MeshPhysicalMaterial({ color: 0xbfe6ff, roughness: 0.05, clearcoat: 1 });
  for (let i = 0; i < 5; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 8), dropM); d.scale.set(1, 1.5, 1); scene.add(d); drops.push(d); }
  const c = cam(36);
  return {
    scene, camera: c,
    update(t) {
      standPose(man, t, { neck: [-0.05, 0.25, 0], head: [0.05, 0.15, 0.05], spine: [0.04, 0, 0] });
      // wipe the forehead
      const wipe = Math.sin(t * 5) * 0.06;
      man.root.updateMatrixWorld(true);
      const T = man.root.localToWorld(V(-0.03 + wipe, 1.83, 0.17));
      ikArm(man, 'r', T, man.root.localToWorld(V(-0.7, 1.55, 0.4)), V(0, 0, -1).applyQuaternion(man.root.quaternion));
      man.setMouth(0.35 + 0.1 * Math.sin(t * 7));
      // sweat drops
      drops.forEach((d, i) => {
        const ph = ((t * 0.9 + i * 0.37) % 1);
        const p = man.root.localToWorld(V(-0.1 + i * 0.05, 1.8 - ph * 0.45 - ph * ph * 0.3, 0.12 + 0.02 * i));
        d.position.copy(p); d.visible = ph < 0.8;
      });
      const u = rp.material.uniforms;
      u.uCenter.value.set(0, 0.0175, 0);
      u.uAmp.value = 0.75 * smooth(range(t, 0.2, 0.8));
      u.uRadius.value = 0.1 + easeOut(range(t, 0.2, 2.2)) * 1.0;
      u.uTime.value = t * 0.7; u.uRings.value = 60; u.uSpot.value = 0.2; u.uSpotAmp.value = 0.6;
      u.uBlot.value = 0.5 * smooth(range(t, 0.8, 2.0));
      const k = easeInOut(range(t, 0, 2.6));
      const s = shake(t, 0.8, 4);
      place(c, [lerp(0.35, 0.15, k) + s[0], lerp(1.5, 1.45, k) + s[1], lerp(4.3, 3.7, k)], [0.05, 1.2, 0]);
      return { dof: { focus: c.position.distanceTo(V(-0.2, 1.6, 0.3)), aperture: 0.002, maxblur: 0.008 }, bloom: 0.5, exposure: 1.05 };
    },
  };
}

// ============ SHOT 3: "it uses the light" – rays of light rain onto the cells ============
function shot3({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sunDir: [1, 6, 4] });
  const rack = panelOnRack(0.55); scene.add(rack);
  const p = rack.panel;
  const N = 18, rays = [], balls = [];
  const R = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  const src = V(0.75, 0.6, 0.3).normalize();
  for (let i = 0; i < N; i++) { const s = streak(0xffd23a); scene.add(s); rays.push(s); const b = photon(0.02); scene.add(b); balls.push(b); }
  const flashes = []; for (let i = 0; i < N; i++) { const f = glowSprite(0xfff0b0, 0.1); f.material.opacity = 0; scene.add(f); flashes.push(f); }
  addSun(scene, [14, 12, 4], 3);
  const c = cam(38);
  return {
    scene, camera: c,
    update(t) {
      scene.updateMatrixWorld(true);
      p.setGlow(0.5 * smooth(range(t, 0.4, 1.4)) * (0.85 + 0.15 * Math.sin(t * 9)));
      for (let i = 0; i < N; i++) {
        const hit = p.localToWorld(V((R(i, 1) - 0.5) * 0.85, 0.02, (R(i, 2) - 0.5) * 1.45));
        const per = 0.9, off = R(i, 3) * per;
        const ph = ((t + off) % per) / per;            // 0..1 travel
        const head = hit.clone().addScaledVector(src, (1 - ph) * 2.6);
        const tail = head.clone().addScaledVector(src, 0.6);
        rays[i].set(head, tail, 0.007, 0.65 * smooth(range(t, 0, 0.3)));
        balls[i].position.copy(head);
        const f = flashes[i]; f.position.copy(hit).addScaledVector(src, 0.01);
        const fl = Math.max(0, 1 - ph) ** 8; f.material.opacity = 0.0 + (ph > 0.92 ? (ph - 0.92) / 0.08 : 0) * 0.9; f.scale.setScalar(0.08 + 0.05 * fl);
      }
      const k = easeInOut(range(t, 0, 2.2));
      place(c, [lerp(-2.2, -1.9, k), lerp(1.45, 1.35, k), lerp(2.3, 2.0, k)], [0.25, lerp(1.0, 0.95, k), 0]);
      return { dof: { focus: c.position.distanceTo(V(0, 0.85, 0.1)), aperture: 0.004, maxblur: 0.01 }, bloom: 0.9 };
    },
  };
}

// ============ SHOT 4: a cell is two layers of silicon ============
function shot4({ makeStage }) {
  const scene = makeStage({ shadowSize: 2, sunDir: [-2, 6, 4] });
  const cs = cellStack(0.6); cs.position.set(0, 1.25, 0); scene.add(cs);
  const c = cam(36);
  return {
    scene, camera: c,
    update(t) {
      cs.rotation.y = -0.6 + t * 0.18;
      cs.rotation.x = 0.05;
      const ex = easeOut(range(t, 1.9, 2.6));
      cs.explode(ex);
      cs.nMat.emissiveIntensity = 0.5 * smooth(range(t, 2.1, 2.4)) * (1 - smooth(range(t, 2.6, 2.9)));
      cs.pMat.emissiveIntensity = 0.5 * smooth(range(t, 2.4, 2.7));
      const k = easeInOut(range(t, 0, 2.9));
      place(c, [lerp(1.2, 1.35, k), lerp(2.0, 1.85, k), lerp(1.7, 1.95, k)], [0, lerp(1.25, 1.3, k), 0]);
      return { dof: { focus: c.position.distanceTo(cs.position), aperture: 0.003, maxblur: 0.008 }, bloom: 0.45 };
    },
  };
}

// ============ SHOT 5: light knocks electrons loose; they run into the wire ============
function shot5({ makeStage }) {
  const scene = makeStage({ shadowSize: 2, sunDir: [-2, 6, 4] });
  const cs = cellStack(0.6); cs.position.set(0, 1.2, 0); cs.rotation.y = -0.25; scene.add(cs);
  cs.explode(0.12);
  scene.updateMatrixWorld(true);
  const S = 0.3, gy = cs.grid.position.y + 0.006;
  const L = (x, y, z) => cs.localToWorld(V(x, y, z));
  const edge = L(S + 0.01, gy, 0);
  const wire = cable([[edge.x, edge.y, edge.z], ...[[S + 0.25, gy - 0.02, 0.05], [S + 0.7, gy - 0.25, 0.15], [S + 1.4, gy - 0.6, 0.0], [S + 2.6, gy - 1.0, -0.3]].map(p => { const w = L(...p); return [w.x, w.y, w.z]; })], 0.016, 0xc8622a);
  scene.add(wire);
  const R = (i, k) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  const N = 22, src = V(-0.2, 1, 0.35).normalize();
  const ph = [], el = [], fl = [], tr = [];
  for (let i = 0; i < N; i++) {
    const a = photon(0.018); scene.add(a); ph.push(a);
    const e = electron(0.013); scene.add(e); el.push(e);
    const f = glowSprite(0xfff0b0, 0.08); f.material.opacity = 0; scene.add(f); fl.push(f);
    const s = streak(0xffe28a); scene.add(s); tr.push(s);
  }
  const fingerZ = (z) => { const n = 9; const i = clamp(Math.round((z + S) / (2 * S / n) - 0.5), 0, n - 1); return -S + (i + 0.5) * 2 * S / n; };
  const c = cam(44);
  const wl = wire.curve.getLength();
  return {
    scene, camera: c,
    update(t) {
      cs.nMat.emissiveIntensity = 0.15;
      for (let i = 0; i < N; i++) {
        const th = 0.15 + i * 0.13;                // hit time
        const x = (R(i, 1) - 0.5) * 0.48, z = (R(i, 2) - 0.5) * 0.5;
        const hit = L(x, cs.n.position.y + 0.016, z);
        const dt = t - th;
        // photon falls in
        const fall = clamp(-dt / 0.35);
        ph[i].visible = dt < 0 && dt > -0.35;
        ph[i].position.copy(hit).addScaledVector(src, fall * 0.9);
        tr[i].set(ph[i].position, ph[i].position.clone().addScaledVector(src, 0.18), 0.003, ph[i].visible ? 0.6 : 0);
        fl[i].position.copy(hit); fl[i].material.opacity = dt > 0 ? Math.max(0, 1 - dt / 0.25) : 0; fl[i].scale.setScalar(0.06 + dt * 0.2);
        // electron: pops up, slides to the finger, along it to the edge, into the wire
        const e = el[i];
        if (dt < 0) { e.visible = false; continue; }
        e.visible = true;
        const fz = fingerZ(z);
        const a1 = 0.18, v = 1.1;
        const along = (S - x) / v;
        if (dt < a1) {
          const k = easeOut(dt / a1);
          e.position.copy(L(x, lerp(cs.n.position.y + 0.016, gy + 0.02, k), lerp(z, fz, k)));
        } else if (dt < a1 + along) {
          e.position.copy(L(x + (dt - a1) * v, gy + 0.02, fz));
        } else {
          const u = clamp((dt - a1 - along) * 1.3 / wl);
          e.position.copy(wire.curve.getPointAt(u)).add(V(0, 0.022, 0));
          e.visible = u < 0.999;
        }
      }
      const k = easeInOut(range(t, 0, 3.3));
      const s = shake(t, 0.5, 2);
      place(c, [lerp(-0.1, 0.3, k) + s[0], lerp(1.95, 1.85, k) + s[1], lerp(1.55, 1.45, k)], [lerp(-0.02, 0.12, k), 1.2, 0]);
      return { dof: { focus: c.position.distanceTo(cs.position), aperture: 0.004, maxblur: 0.01 }, bloom: 0.8 };
    },
  };
}

// ============ SHOT 6: direct current flows down the cable from the roof ============
function houseCable() {
  return [[1.45, 2.2, 1.25], [1.64, 2.05, 1.1], [1.65, 1.95, 0.8], [1.65, 1.75, 0.45], [1.68, 1.68, 0.3]];
}
function shot6({ makeStage }) {
  const scene = makeStage({ shadowSize: 6, sunDir: [3, 7, 5] });
  const h = house(); scene.add(h);
  const inv = inverter(); inv.position.set(1.72, 1.3, 0.3); inv.rotation.y = Math.PI / 2; scene.add(inv);
  const cb = cable(houseCable(), 0.018); scene.add(cb);
  const pool = dotPool(16, () => electron(0.016)); scene.add(pool);
  addSun(scene, [24, 14, -10], 5);
  const c = cam(38);
  return {
    scene, camera: c,
    update(t) {
      h.panels.forEach(p => p.setGlow(0.25));
      flow(pool, cb.curve, t, 0.45);
      pool.items.forEach(d => d.position.add(V(0.02, 0.015, 0)));
      const k = easeInOut(range(t, 0, 1.95));
      place(c, [lerp(4.4, 4.0, k), lerp(2.6, 2.2, k), lerp(3.2, 2.6, k)], [1.6, lerp(1.85, 1.6, k), lerp(0.8, 0.5, k)]);
      return { dof: { focus: c.position.distanceTo(V(1.65, 1.8, 0.7)), aperture: 0.002, maxblur: 0.006 }, bloom: 0.6 };
    },
  };
}

// ============ SHOT 7: the inverter turns DC into AC ============
function shot7({ makeStage }) {
  const scene = makeStage({ shadowSize: 2.5, sunDir: [-2, 6, 5] });
  scene.add(box(4, 3.2, 0.2, new THREE.MeshStandardMaterial({ color: 0x7f98b3, roughness: 0.85 }), [0, 1.6, -0.2]));
  const inv = inverter(); inv.position.set(0, 1.4, 0.0); scene.add(inv);
  const cin = cable([[-1.6, 1.62, -0.06], [-0.6, 1.62, -0.06], [-0.32, 1.6, -0.04], [-0.26, 1.55, -0.02]], 0.016); scene.add(cin);
  const cout = cable([[0.26, 1.25, -0.02], [0.32, 1.22, -0.04], [0.6, 1.2, -0.06], [1.6, 1.2, -0.06]], 0.016); scene.add(cout);
  const NDC = 9, NAC = 30;
  const dc = dotPool(NDC, () => electron(0.014)); scene.add(dc);
  const ac = dotPool(NAC, () => glowBallAC()); scene.add(ac);
  function glowBallAC() { return electron(0.016); }
  const c = cam(40);
  return {
    scene, camera: c,
    update(t) {
      // DC: straight, steady line flowing in from the left
      dc.items.forEach((d, i) => { const u = ((i / NDC + t * 0.35) % 1); d.position.set(-0.85 + u * 0.58, 1.62, 0.05); });
      // AC: a wave flowing out to the right (appears once the inverter is on)
      const on = smooth(range(t, 0.7, 1.3));
      ac.items.forEach((d, i) => {
        const u = ((i / NAC + t * 0.25) % 1);
        const x = 0.3 + u * 0.6;
        d.position.set(x, 1.2 + 0.14 * Math.sin(x * 16 - t * 8) * on, 0.06);
        d.scale.setScalar(Math.max(0.001, on * smooth(range(u, 0, 0.08))));
      });
      inv.screen.emissiveIntensity = 0.4 + 1.4 * on * (0.8 + 0.2 * Math.sin(t * 12));
      const k = easeInOut(range(t, 0, 3.55));
      const s = shake(t, 0.5, 5);
      place(c, [lerp(-0.1, 0.05, k) + s[0], 1.5 + s[1], lerp(3.6, 3.2, k)], [lerp(-0.1, 0.05, k), 1.42, 0]);
      return { dof: { focus: c.position.z, aperture: 0.002, maxblur: 0.006 }, bloom: 0.7 };
    },
  };
}

// ============ SHOT 8: through the breaker panel, the lamp lights up ============
function shot8({ makeStage }) {
  const scene = makeStage({ shadowSize: 4, sunDir: [-2, 6, 6], sun: 1.4 });
  const wallM = new THREE.MeshStandardMaterial({ color: 0x8fbfa8, roughness: 0.9 });
  const floorM = new THREE.MeshStandardMaterial({ color: 0xb98a5e, roughness: 0.7 });
  const back = box(5, 2.8, 0.1, wallM, [0, 1.4, -1.6]); back.receiveShadow = true; scene.add(back);
  const left = box(0.1, 2.8, 5, wallM, [-1.8, 1.4, 0.4]); left.receiveShadow = true; scene.add(left);
  const fl = box(5, 0.05, 5, floorM, [0, 0.0, 0.4]); fl.receiveShadow = true; scene.add(fl);
  const ceil = box(5, 0.1, 5, new THREE.MeshStandardMaterial({ color: 0xf2f2ee }), [0, 2.85, 0.4]); scene.add(ceil);
  const bb = breakerBox(); bb.position.set(-1.0, 1.45, -1.52); scene.add(bb);
  const lp = lamp(); lp.position.set(0.35, 2.8, -0.55); scene.add(lp);
  const cb = cable([[-1.0, 1.75, -1.53], [-1.0, 2.75, -1.53], [-0.6, 2.78, -1.2], [0.35, 2.78, -0.55]], 0.012, 0xf2f2f2); scene.add(cb);
  const pool = dotPool(10, () => electron(0.016)); scene.add(pool);
  const man = person(); man.root.position.set(0.05, 0, -0.35); man.root.rotation.y = 0.15; scene.add(man.root);
  const c = cam(42);
  const TSW = 0.85, TON = 1.8;
  return {
    scene, camera: c,
    update(t) {
      // flip the main breaker
      bb.switches[0].rotation.x = t > TSW ? -0.5 : 0.5;
      const go = smooth(range(t, TSW, TSW + 0.2));
      flow(pool, cb.curve, t, 0.9, { visible: go });
      pool.items.forEach(d => d.position.add(V(0, 0, 0.02)));
      const on = smooth(range(t, TON, TON + 0.15));
      lp.setOn(on);
      const up = smooth(range(t, TON + 0.1, TON + 0.6));
      standPose(man, t, { neck: [-0.35 * up, 0.1 * up, 0], head: [-0.25 * up, 0.1, 0], lSh: [0.05, 0, 0.16 + 0.5 * up], rSh: [0.05, 0, -0.16 - 0.5 * up], lEl: [-0.25 - 0.6 * up, 0, 0], rEl: [-0.25 - 0.6 * up, 0, 0] });
      man.setMouth(0.6 * up);
      const k = easeInOut(range(t, 0, 3.05));
      const s = shake(t, 0.5, 8);
      place(c, [lerp(1.0, 0.85, k) + s[0], lerp(1.55, 1.45, k) + s[1], lerp(3.0, 2.6, k)], [lerp(-0.45, -0.05, smooth(range(t, 0.9, 2.0))), lerp(1.65, 1.75, k), -0.9]);
      return { dof: { focus: c.position.distanceTo(V(0, 1.6, -0.4)), aperture: 0.0015, maxblur: 0.006 }, bloom: 0.45, exposure: lerp(0.6, 0.85, on) };
    },
  };
}

// ============ SHOT 9: the extra goes to the grid, the meter counts credit ============
function shot9({ makeStage }) {
  const scene = makeStage({ shadowSize: 8, sunDir: [3, 7, 6] });
  const h = house(); scene.add(h);
  const pole = utilityPole(5.2); pole.position.set(4.6, 0, -1.4); scene.add(pole);
  const mt = meter(); mt.position.set(1.69, 1.15, 0.65); mt.rotation.y = Math.PI / 2; scene.add(mt);
  const pt = pole.localToWorld(pole.top.clone());
  const cb = cable([[1.62, 2.75, 0.0], [2.6, 3.1, -0.5], [3.6, 3.7, -1.0], [pt.x, pt.y, pt.z]], 0.014); scene.add(cb);
  const pool = dotPool(12, () => electron(0.045)); scene.add(pool);
  addSun(scene, [24, 18, -20], 7);
  const c = cam(40);
  return {
    scene, camera: c,
    update(t) {
      h.panels.forEach(p => p.setGlow(0.25));
      h.winMat.emissiveIntensity = 0.5;
      flow(pool, cb.curve, t, 1.2);
      mt.setValue(1250 + Math.floor(t * 9));
      const k = easeInOut(range(t, 0.2, 3.3));
      const s = shake(t, 0.5, 9);
      c.fov = lerp(50, 40, k);
      const L = [lerp(2.5, 1.69, k), lerp(2.7, 1.17, k), lerp(-0.6, 0.65, k)];
      place(c, [lerp(6.0, 2.95, k) + s[0], lerp(3.0, 1.2, k) + s[1], lerp(10.5, 1.05, k)], L);
      return { dof: { focus: c.position.distanceTo(V(...L)), aperture: 0.0015, maxblur: 0.006 }, bloom: 0.6 };
    },
  };
}

export const SHOTS = [
  { start: 0.0, end: 4.62, build: shot1 },
  { start: 4.62, end: 7.16, build: shot2 },
  { start: 7.16, end: 9.24, build: shot3 },
  { start: 9.24, end: 12.15, build: shot4 },
  { start: 12.15, end: 15.45, build: shot5 },
  { start: 15.45, end: 17.42, build: shot6 },
  { start: 17.42, end: 20.95, build: shot7 },
  { start: 20.95, end: 24.0, build: shot8 },
  { start: 24.0, end: DURATION + 1, build: shot9 },
];
