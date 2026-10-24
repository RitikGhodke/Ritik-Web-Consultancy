// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// // laptop atke to false kar do (glow band, par smooth chalega)
// const BLOOM = true;

// const DISK_VERT = `
// uniform float uTime;
// uniform float uIntro;
// uniform float uPx;
// uniform float uBoost;
// attribute float aRadius;
// attribute float aAngle;
// attribute float aSeed;
// attribute float aY;
// varying vec3 vColor;
// varying float vAlpha;

// void main() {
//   // Keplerian rotation: andar tez, bahar dheere
//   float omega = 1.15 / pow(aRadius, 1.5);
//   float a = aAngle + uTime * omega * (0.8 + uBoost);
//   float r = aRadius * mix(0.25, 1.0, uIntro);
//   float wob = sin(uTime * 0.6 + aSeed * 30.0) * 0.03 * aRadius;
//   float flare = 0.02 + aRadius * 0.014;

//   vec3 pos = vec3(
//     cos(a) * (r + wob),
//     aY * flare + sin(a * 2.0 + uTime * 0.4 + aSeed * 10.0) * 0.015 * aRadius,
//     sin(a) * (r + wob)
//   );

//   vec4 mv = modelViewMatrix * vec4(pos, 1.0);
//   gl_Position = projectionMatrix * mv;

//   float t = clamp((aRadius - 1.15) / 5.0, 0.0, 1.0);
//   float hot = 1.0 - smoothstep(0.0, 0.3, t);

//   vec3 c = mix(vec3(0.12, 0.38, 1.0), vec3(0.75, 0.97, 1.0), hot);
//   c = mix(c, vec3(0.5, 0.28, 0.95), smoothstep(0.5, 1.0, t) * 0.7);

//   // ek side zyada chamakdaar (doppler jaisa)
//   float beam = 0.7 + 0.5 * cos(a);
//   vColor = c * beam;
//   vAlpha = uIntro * (0.3 + 0.7 * hot) * (1.0 - smoothstep(0.8, 1.0, t)) * 0.75;

//   gl_PointSize = min(
//     (1.2 + aSeed * 2.0 + hot * 2.2) * uPx * (8.0 / -mv.z),
//     14.0 * uPx
//   );
// }
// `;

// const DISK_FRAG = `
// varying vec3 vColor;
// varying float vAlpha;
// void main() {
//   float d = length(gl_PointCoord - 0.5);
//   float a = 1.0 - smoothstep(0.0, 0.5, d);
//   a = a * a;
//   gl_FragColor = vec4(vColor, a * vAlpha);
// }
// `;

// const HALO_VERT = `
// varying vec2 vP;
// void main() {
//   vP = position.xy;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

// const HALO_FRAG = `
// uniform float uIntro;
// uniform float uTime;
// varying vec2 vP;
// void main() {
//   float r = length(vP);
//   float ring = exp(-pow((r - 1.07) * 7.0, 2.0));
//   float halo = exp(-(r - 1.0) * 2.4) * 0.22;
//   float pulse = 0.9 + 0.1 * sin(uTime * 1.3);
//   vec3 col = mix(vec3(0.35, 0.7, 1.0), vec3(1.0), ring) * (ring * 1.6 + halo) * pulse;
//   gl_FragColor = vec4(col * uIntro, 1.0);
// }
// `;

// const randn = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.8;

// export default function SmokeBackground() {
//   const ref = useRef(null);

//   useEffect(() => {
//     const mount = ref.current;
//     const section = mount.closest("section") || mount;
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     const mobile = window.innerWidth < 768;
//     const COUNT = mobile ? 11000 : 36000;
//     const useBloom = BLOOM && !mobile;

//     const renderer = new THREE.WebGLRenderer({
//       antialias: false,
//       powerPreference: "high-performance",
//     });
//     const pr = Math.min(window.devicePixelRatio || 1, 1.5);
//     renderer.setPixelRatio(pr);
//     renderer.setClearColor(0x02030a, 1);
//     renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
//     mount.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x02030a);
//     const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
//     camera.position.set(0, 1.7, 11.5);

//     // ---------- Accretion disk ----------
//     const R_IN = 1.15;
//     const R_OUT = 6.2;
//     const aRadius = new Float32Array(COUNT);
//     const aAngle = new Float32Array(COUNT);
//     const aSeed = new Float32Array(COUNT);
//     const aY = new Float32Array(COUNT);
//     for (let i = 0; i < COUNT; i++) {
//       let r;
//       if (Math.random() < 0.16) {
//         r = R_IN + Math.abs(randn()) * 0.28; // andar ka bright ring
//       } else {
//         r = R_IN * Math.pow(R_OUT / R_IN, Math.pow(Math.random(), 0.85));
//       }
//       aRadius[i] = r;
//       aAngle[i] = Math.random() * Math.PI * 2;
//       aSeed[i] = Math.random();
//       aY[i] = randn();
//     }
//     const diskGeo = new THREE.BufferGeometry();
//     diskGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
//     diskGeo.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
//     diskGeo.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));
//     diskGeo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
//     diskGeo.setAttribute("aY", new THREE.BufferAttribute(aY, 1));

//     const diskU = {
//       uTime: { value: 0 },
//       uIntro: { value: 0 },
//       uPx: { value: pr },
//       uBoost: { value: 0 },
//     };
//     const diskMat = new THREE.ShaderMaterial({
//       uniforms: diskU,
//       vertexShader: DISK_VERT,
//       fragmentShader: DISK_FRAG,
//       transparent: true,
//       depthWrite: false,
//       blending: THREE.AdditiveBlending,
//     });
//     const disk = new THREE.Points(diskGeo, diskMat);
//     disk.frustumCulled = false;

//     const tiltGroup = new THREE.Group();
//     tiltGroup.rotation.set(0.2, 0, 0.3);
//     tiltGroup.add(disk);
//     scene.add(tiltGroup);

//     // ---------- Event horizon (kaala gola, peeche ke particles chhupata hai) ----------
//     const sphere = new THREE.Mesh(
//       new THREE.SphereGeometry(1.0, 48, 48),
//       new THREE.MeshBasicMaterial({ color: 0x000000 })
//     );
//     scene.add(sphere);

//     // ---------- Lensing ring (hamesha camera ki taraf) ----------
//     const haloU = { uIntro: { value: 0 }, uTime: { value: 0 } };
//     const haloMat = new THREE.ShaderMaterial({
//       uniforms: haloU,
//       vertexShader: HALO_VERT,
//       fragmentShader: HALO_FRAG,
//       transparent: true,
//       depthWrite: false,
//       depthTest: false,
//       blending: THREE.AdditiveBlending,
//     });
//     const halo = new THREE.Mesh(new THREE.RingGeometry(1.0, 3.2, 128, 1), haloMat);
//     halo.renderOrder = 10;
//     scene.add(halo);

//     // ---------- Stars ----------
//     const SC = 2200;
//     const starPos = new Float32Array(SC * 3);
//     for (let i = 0; i < SC; i++) {
//       const u = Math.random() * 2 - 1;
//       const th = Math.random() * Math.PI * 2;
//       const rr = 45 + Math.random() * 25;
//       const s = Math.sqrt(1 - u * u);
//       starPos[i * 3] = rr * s * Math.cos(th);
//       starPos[i * 3 + 1] = rr * u;
//       starPos[i * 3 + 2] = rr * s * Math.sin(th);
//     }
//     const starGeo = new THREE.BufferGeometry();
//     starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
//     const starMat = new THREE.PointsMaterial({
//       size: 0.22,
//       color: 0x9bb8ff,
//       transparent: true,
//       opacity: 0.8,
//       depthWrite: false,
//     });
//     const stars = new THREE.Points(starGeo, starMat);
//     scene.add(stars);

//     // ---------- Bloom ----------
//     let composer = null;
//     let bloom = null;
//     if (useBloom) {
//       composer = new EffectComposer(renderer);
//       composer.setPixelRatio(pr);
//       composer.addPass(new RenderPass(scene, camera));
//       bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.9, 0.7, 0.15);
//       composer.addPass(bloom);
//     }

//     const resize = () => {
//       const w = mount.clientWidth || 1;
//       const h = mount.clientHeight || 1;
//       renderer.setSize(w, h, false);
//       if (composer) composer.setSize(w, h);
//       camera.aspect = w / h;
//       const wide = camera.aspect > 1.1;
//       // wide screen: black hole right side me, mobile: upar center me
//       camera.setViewOffset(w, h, wide ? -w * 0.2 : 0, wide ? 0 : h * 0.18, w, h);
//       camera.updateProjectionMatrix();
//     };

//     const tilt = { x: 0, y: 0 };
//     const target = { x: 0, y: 0 };
//     const onMove = (e) => {
//       const r = section.getBoundingClientRect();
//       target.x = ((e.clientX - r.left) / r.width - 0.5) * 1.0;
//       target.y = ((e.clientY - r.top) / r.height - 0.5) * 1.0;
//     };

//     const lerp = THREE.MathUtils.lerp;
//     const start = performance.now();
//     let scrollP = 0;
//     let raf = 0;
//     let running = true;

//     const frame = (now) => {
//       const t = (now - start) / 1000;
//       const k = Math.min(1, t / 3); // 3 sec intro (Hero ke INTRO se match)
//       const ease = 1 - Math.pow(1 - k, 3);

//       // scroll karne par camera andar ghusta hai
//       const rect = section.getBoundingClientRect();
//       const prog = THREE.MathUtils.clamp(-rect.top / (rect.height * 0.9), 0, 1);
//       scrollP += (prog - scrollP) * 0.08;

//       tilt.x += (target.x - tilt.x) * 0.05;
//       tilt.y += (target.y - tilt.y) * 0.05;

//       diskU.uTime.value = t;
//       diskU.uIntro.value = ease;
//       diskU.uBoost.value = scrollP * 2.5;
//       haloU.uTime.value = t;
//       haloU.uIntro.value = ease;

//       const introZ = lerp(11.5, 7.8, ease);
//       camera.position.set(
//         tilt.x * 1.4,
//         lerp(1.7, 0.6, scrollP) - tilt.y * 1.0,
//         lerp(introZ, 2.8, scrollP)
//       );
//       camera.fov = lerp(52, 80, scrollP);
//       camera.lookAt(0, 0, 0);
//       camera.updateProjectionMatrix();

//       const s = 0.2 + 0.8 * ease;
//       sphere.scale.setScalar(s);
//       halo.scale.setScalar(s);
//       halo.quaternion.copy(camera.quaternion);

//       tiltGroup.rotation.y = t * 0.02;
//       stars.rotation.y = t * 0.004 + tilt.x * 0.05;
//       stars.rotation.x = tilt.y * 0.03;

//       if (bloom) bloom.strength = lerp(0.9, 1.6, scrollP) + (1 - ease) * 1.2;

//       if (composer) composer.render();
//       else renderer.render(scene, camera);
//     };

//     const loop = (now) => {
//       if (!running) {
//         raf = 0;
//         return;
//       }
//       frame(now);
//       raf = requestAnimationFrame(loop);
//     };

//     resize();
//     if (reduce) {
//       frame(start + 4000);
//     } else {
//       raf = requestAnimationFrame(loop);
//     }

//     section.addEventListener("mousemove", onMove);
//     const ro = new ResizeObserver(() => {
//       resize();
//       if (reduce) frame(start + 4000);
//     });
//     ro.observe(mount);

//     // hero screen se bahar ho to pause
//     const io = new IntersectionObserver(([entry]) => {
//       running = entry.isIntersecting;
//       if (running && !raf && !reduce) raf = requestAnimationFrame(loop);
//     });
//     io.observe(mount);

//     return () => {
//       running = false;
//       cancelAnimationFrame(raf);
//       section.removeEventListener("mousemove", onMove);
//       ro.disconnect();
//       io.disconnect();
//       diskGeo.dispose();
//       diskMat.dispose();
//       sphere.geometry.dispose();
//       sphere.material.dispose();
//       halo.geometry.dispose();
//       haloMat.dispose();
//       starGeo.dispose();
//       starMat.dispose();
//       if (composer && composer.dispose) composer.dispose();
//       renderer.dispose();
//       renderer.domElement.remove();
//     };
//   }, []);

//   return <div ref={ref} className="pointer-events-none absolute inset-0" />;
// }











"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// laptop atke to false kar do (glow band, par smooth chalega)
const BLOOM = true;

const R_MAX = 6.0; // galaxy ka size
const ARMS = 3; // spiral arms ki sankhya
const SPIN = 0.9; // arms kitni tight lipti hain

const GAL_VERT = `
uniform float uTime;
uniform float uIntro;
uniform float uPx;
uniform float uBoost;
attribute float aRadius;
attribute float aAngle;
attribute float aSeed;
attribute float aY;
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float omega = 0.11 / (0.9 + aRadius * 0.18);
  // intro me galaxy spiral hoke khulti hai
  float unwind = (1.0 - uIntro) * 3.2 / (0.6 + aRadius * 0.35);
  float a = aAngle + uTime * omega * (1.0 + uBoost) + unwind;
  float r = aRadius * mix(0.12, 1.0, uIntro);
  float tw = sin(uTime * (0.8 + aSeed * 2.0) + aSeed * 50.0);

  vec3 pos = vec3(
    cos(a) * r,
    aY * mix(0.3, 1.0, uIntro) + sin(a * 3.0 + uTime * 0.3 + aSeed * 10.0) * 0.01 * aRadius,
    sin(a) * r
  );

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float inner = 1.0 - smoothstep(0.0, 2.2, aRadius);
  vColor = aColor;
  vAlpha = uIntro
         * (0.42 + 0.5 * inner)
         * (0.8 + 0.2 * tw)
         * (1.0 - smoothstep(4.8, 6.2, aRadius) * 0.6);

  gl_PointSize = min(
    (0.9 + aSeed * 1.9 + inner * 1.6) * uPx * (8.0 / -mv.z),
    12.0 * uPx
  );
}
`;

const GAL_FRAG = `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.0, 0.5, d);
  a = a * a;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

const GLOW_VERT = `
varying vec2 vP;
void main() {
  vP = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const GLOW_FRAG = `
uniform float uIntro;
uniform float uTime;
varying vec2 vP;
void main() {
  float r = length(vP);
  float g = exp(-r * 2.2) * 0.9 + exp(-r * 0.7) * 0.12;
  float pulse = 0.94 + 0.06 * sin(uTime * 0.9);
  vec3 col = mix(vec3(0.45, 0.6, 1.0), vec3(1.0, 0.85, 0.6), exp(-r * 1.4));
  float edge = 1.0 - smoothstep(4.5, 5.9, r);
  gl_FragColor = vec4(col * g * pulse * edge * uIntro, 1.0);
}
`;

const randn = () => (Math.random() + Math.random() + Math.random() - 1.5) * 0.8;
const mixN = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const sign = () => (Math.random() < 0.5 ? 1 : -1);

export default function SmokeBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const mount = ref.current;
    const section = mount.closest("section") || mount;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const COUNT = mobile ? 16000 : 55000;
    const useBloom = BLOOM && !mobile;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    const pr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pr);
    renderer.setClearColor(0x02030a, 1);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02030a);
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    camera.position.set(0, 1.4, 12);

    // ---------- Galaxy particles ----------
    const aRadius = new Float32Array(COUNT);
    const aAngle = new Float32Array(COUNT);
    const aSeed = new Float32Array(COUNT);
    const aY = new Float32Array(COUNT);
    const aColor = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const kind = Math.random();
      let x, y, z;
      let cr, cg, cb;

      if (kind < 0.16) {
        // core / bulge: golden-white
        const rr = Math.abs(randn()) * 0.9 + 0.05;
        const u = Math.random() * 2 - 1;
        const th = Math.random() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        x = rr * s * Math.cos(th);
        z = rr * s * Math.sin(th);
        y = rr * u * 0.7;
        const w = Math.random();
        cr = 1.0;
        cg = mixN(0.78, 0.95, w);
        cb = mixN(0.5, 0.82, w);
      } else if (kind < 0.93) {
        // spiral arms
        const r = R_MAX * Math.pow(Math.random(), 1.7) + 0.2;
        const branch = (Math.floor(Math.random() * ARMS) / ARMS) * Math.PI * 2;
        const a = branch + r * SPIN;
        const spread = 0.38 * (0.25 + r * 0.22);
        const rx = Math.pow(Math.random(), 2.4) * sign() * spread;
        const rz = Math.pow(Math.random(), 2.4) * sign() * spread;
        x = Math.cos(a) * r + rx;
        z = Math.sin(a) * r + rz;
        y = randn() * 0.06 * (1.0 + 0.3 * (1 - r / R_MAX));

        const t = r / R_MAX;
        const m1 = smooth(0.0, 0.45, t);
        const m2 = smooth(0.55, 1.0, t) * 0.8;
        // core gold -> mid blue-white -> outer purple
        cr = mixN(mixN(1.0, 0.55, m1), 0.4, m2);
        cg = mixN(mixN(0.82, 0.72, m1), 0.32, m2);
        cb = mixN(mixN(0.55, 1.0, m1), 0.95, m2);

        if (Math.random() < 0.07) {
          // pink nebula regions
          cr = 1.0;
          cg = 0.45;
          cb = 0.75;
        }
        const br = 0.65 + 0.7 * Math.random();
        cr *= br;
        cg *= br;
        cb *= br;
      } else {
        // dim halo stars
        const rr = 1.0 + Math.random() * 6.0;
        const u = Math.random() * 2 - 1;
        const th = Math.random() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        x = rr * s * Math.cos(th);
        z = rr * s * Math.sin(th);
        y = rr * u * 0.8;
        cr = 0.6;
        cg = 0.72;
        cb = 1.0;
      }

      aRadius[i] = Math.hypot(x, z);
      aAngle[i] = Math.atan2(z, x);
      aY[i] = y;
      aSeed[i] = Math.random();
      aColor[i * 3] = cr;
      aColor[i * 3 + 1] = cg;
      aColor[i * 3 + 2] = cb;
    }

    const galGeo = new THREE.BufferGeometry();
    galGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    galGeo.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
    galGeo.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));
    galGeo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
    galGeo.setAttribute("aY", new THREE.BufferAttribute(aY, 1));
    galGeo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));

    const galU = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uPx: { value: pr },
      uBoost: { value: 0 },
    };
    const galMat = new THREE.ShaderMaterial({
      uniforms: galU,
      vertexShader: GAL_VERT,
      fragmentShader: GAL_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const galaxy = new THREE.Points(galGeo, galMat);
    galaxy.frustumCulled = false;

    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.set(1.0, 0, 0.35);
    tiltGroup.add(galaxy);
    scene.add(tiltGroup);

    // ---------- Core glow (hamesha camera ki taraf) ----------
    const glowU = { uIntro: { value: 0 }, uTime: { value: 0 } };
    const glowMat = new THREE.ShaderMaterial({
      uniforms: glowU,
      vertexShader: GLOW_VERT,
      fragmentShader: GLOW_FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), glowMat);
    glow.renderOrder = 10;
    scene.add(glow);

    // ---------- Background stars ----------
    const SC = 2200;
    const starPos = new Float32Array(SC * 3);
    for (let i = 0; i < SC; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const rr = 45 + Math.random() * 25;
      const s = Math.sqrt(1 - u * u);
      starPos[i * 3] = rr * s * Math.cos(th);
      starPos[i * 3 + 1] = rr * u;
      starPos[i * 3 + 2] = rr * s * Math.sin(th);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.22,
      color: 0x9bb8ff,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---------- Bloom ----------
    let composer = null;
    let bloom = null;
    if (useBloom) {
      composer = new EffectComposer(renderer);
      composer.setPixelRatio(pr);
      composer.addPass(new RenderPass(scene, camera));
      bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.8, 0.7, 0.15);
      composer.addPass(bloom);
    }

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      if (composer) composer.setSize(w, h);
      camera.aspect = w / h;
      const wide = camera.aspect > 1.1;
      // wide screen: galaxy thodi right me, mobile: upar center me
      camera.setViewOffset(w, h, wide ? -w * 0.16 : 0, wide ? 0 : h * 0.15, w, h);
      camera.updateProjectionMatrix();
    };

    const tilt = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 1.0;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 1.0;
    };

    const lerp = THREE.MathUtils.lerp;
    const start = performance.now();
    let scrollP = 0;
    let raf = 0;
    let running = true;

    const frame = (now) => {
      const t = (now - start) / 1000;
      const k = Math.min(1, t / 3); // 3 sec intro (Hero ke INTRO se match)
      const ease = 1 - Math.pow(1 - k, 3);

      // scroll karne par camera galaxy me ghusta hai
      const rect = section.getBoundingClientRect();
      const prog = THREE.MathUtils.clamp(-rect.top / (rect.height * 0.9), 0, 1);
      scrollP += (prog - scrollP) * 0.08;

      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;

      galU.uTime.value = t;
      galU.uIntro.value = ease;
      galU.uBoost.value = scrollP * 3.0;
      glowU.uTime.value = t;
      glowU.uIntro.value = ease;

      const introZ = lerp(12, 8.0, ease);
      camera.position.set(
        tilt.x * 1.4,
        lerp(1.4, 0.3, scrollP) - tilt.y * 1.0,
        lerp(introZ, 2.4, scrollP)
      );
      camera.fov = lerp(52, 78, scrollP);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      // scroll pe galaxy face-on hoti hai
      tiltGroup.rotation.x = lerp(1.0, 1.3, scrollP) + tilt.y * 0.08;
      tiltGroup.rotation.z = 0.35 + tilt.x * 0.06;

      glow.scale.setScalar(0.3 + 0.7 * ease);
      glow.quaternion.copy(camera.quaternion);

      stars.rotation.y = t * 0.004 + tilt.x * 0.05;
      stars.rotation.x = tilt.y * 0.03;

      if (bloom) bloom.strength = lerp(0.8, 1.5, scrollP) + (1 - ease) * 1.0;

      if (composer) composer.render();
      else renderer.render(scene, camera);
    };

    const loop = (now) => {
      if (!running) {
        raf = 0;
        return;
      }
      frame(now);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) {
      frame(start + 4000);
    } else {
      raf = requestAnimationFrame(loop);
    }

    section.addEventListener("mousemove", onMove);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(start + 4000);
    });
    ro.observe(mount);

    // hero screen se bahar ho to pause
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !raf && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(mount);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      ro.disconnect();
      io.disconnect();
      galGeo.dispose();
      galMat.dispose();
      glow.geometry.dispose();
      glowMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      if (composer && composer.dispose) composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} className="pointer-events-none absolute inset-0" />;
}