/* COMERCIAL QUILLACAS – 3D Battery (Three.js r158) */
(function () {
  function waitFor() {
    const el = document.getElementById('battery3dContainer');
    if (!el) { setTimeout(waitFor, 100); return; }
    function tryInit() {
      if (el.offsetWidth < 10 || typeof THREE === 'undefined') { requestAnimationFrame(tryInit); return; }
      init(el);
    }
    if (document.readyState === 'complete') tryInit();
    else window.addEventListener('load', tryInit);
  }
  waitFor();

  function init(el) {
    const W = el.offsetWidth, H = el.offsetHeight;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 60);
    camera.position.set(0, 1.0, 7.2);
    camera.lookAt(0, 0.2, 0);

    /* Lights */
    scene.add(new THREE.AmbientLight(0x1a2a40, 5));
    const key = new THREE.DirectionalLight(0xfff3e0, 5);
    key.position.set(4, 8, 5); key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024); scene.add(key);
    const fill = new THREE.DirectionalLight(0xaad4ff, 2);
    fill.position.set(-5, 1, 2); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffb040, 2.5);
    rim.position.set(0, -3, -5); scene.add(rim);
    const glow = new THREE.PointLight(0x00ccff, 0, 7);
    glow.position.set(0, -1.3, 0); scene.add(glow);

    /* ─── Textures ─── */
    function tex(w, h, fn) {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      fn(c.getContext('2d'), w, h);
      return new THREE.CanvasTexture(c);
    }

    const frontTex = tex(1024, 512, (ctx, w, h) => {
      // background
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#091222'); g.addColorStop(1, '#050d18');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      // noise
      for (let i = 0; i < 2500; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.015})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
      }
      // gold stripes
      const sg = ctx.createLinearGradient(0, 0, w, 0);
      sg.addColorStop(0, '#5a3800'); sg.addColorStop(0.5, '#ffd740'); sg.addColorStop(1, '#5a3800');
      ctx.fillStyle = sg;
      ctx.fillRect(0, 0, w, 46); ctx.fillRect(0, h - 46, w, 46);
      // TOYO
      ctx.textAlign = 'center';
      ctx.font = 'bold 185px Arial Black,Impact,sans-serif';
      const tg = ctx.createLinearGradient(0, 55, 0, 310);
      tg.addColorStop(0, '#fff'); tg.addColorStop(0.3, '#ffe799');
      tg.addColorStop(0.6, '#ffc200'); tg.addColorStop(1, '#7a4800');
      ctx.fillStyle = tg;
      ctx.shadowColor = 'rgba(255,180,0,0.7)'; ctx.shadowBlur = 35;
      ctx.fillText('TOYO', 512, 270); ctx.shadowBlur = 0;
      // BATTERY
      ctx.font = 'bold 46px Arial,sans-serif';
      ctx.fillStyle = '#ffc200';
      ctx.shadowColor = 'rgba(255,194,0,0.8)'; ctx.shadowBlur = 14;
      ctx.fillText('BATTERY', 512, 346); ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255,194,0,0.4)';
      ctx.fillRect(180, 362, 664, 2);
      ctx.font = '25px Arial'; ctx.fillStyle = 'rgba(170,215,255,0.85)';
      ctx.fillText('12V · 75Ah · 680A CCA · MF', 512, 408);
      ctx.font = 'bold 21px Arial'; ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255,194,0,0.7)';
      ctx.fillText('⚡ TOYO BATTERY CO., LTD.', 26, 34);
      ctx.textAlign = 'right'; ctx.font = '19px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText('ISO 9001 · JIS D5301', 998, 34);
    });

    const sideTex = tex(512, 512, (ctx) => {
      ctx.fillStyle = '#07101c'; ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 1800; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.013})`;
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
      }
      ctx.strokeStyle = '#c49000'; ctx.lineWidth = 5;
      ctx.strokeRect(7, 7, 498, 498);
      ctx.save(); ctx.translate(256, 256); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = 'bold 105px Arial Black,sans-serif';
      const sg = ctx.createLinearGradient(-180, 0, 180, 0);
      sg.addColorStop(0, '#5a3800'); sg.addColorStop(0.5, '#ffc200'); sg.addColorStop(1, '#5a3800');
      ctx.fillStyle = sg;
      ctx.shadowColor = 'rgba(255,194,0,0.4)'; ctx.shadowBlur = 18;
      ctx.fillText('TOYO', 0, 0); ctx.restore();
      ctx.font = 'bold 42px Arial Black'; ctx.textBaseline = 'top';
      ctx.fillStyle = '#ff4040'; ctx.textAlign = 'left';
      ctx.shadowColor = 'rgba(255,0,0,0.5)'; ctx.shadowBlur = 8;
      ctx.fillText('(+)', 18, 18);
      ctx.fillStyle = '#9999ff'; ctx.textAlign = 'right';
      ctx.shadowColor = 'rgba(100,100,255,0.5)';
      ctx.fillText('(−)', 494, 18); ctx.shadowBlur = 0;
    });

    const topTex = tex(512, 256, (ctx) => {
      ctx.fillStyle = '#0a1220'; ctx.fillRect(0, 0, 512, 256);
      ctx.strokeStyle = 'rgba(255,194,0,0.06)'; ctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke(); }
      for (let y = 0; y < 256; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke(); }
    });

    /* Materials */
    const M = THREE.MeshStandardMaterial;
    const bodyMats = [
      new M({ map: sideTex,  metalness: .15, roughness: .6 }),
      new M({ map: sideTex,  metalness: .15, roughness: .6 }),
      new M({ map: topTex,   metalness: .1,  roughness: .7 }),
      new M({ color: 0x030508, metalness: .1, roughness: .95 }),
      new M({ map: frontTex, metalness: .12, roughness: .55 }),
      new M({ map: frontTex, metalness: .12, roughness: .55 }),
    ];
    const goldM = new M({ color: 0xd4a000, metalness: .99, roughness: .07, emissive: 0xff8800, emissiveIntensity: .18 });
    const negM  = new M({ color: 0x2a3080, metalness: .99, roughness: .07 });
    const darkM = new M({ color: 0x07101e, metalness: .06, roughness: .88 });
    const capM  = new M({ color: 0x0b1428, metalness: .1,  roughness: .65 });
    const chargeM = new M({ color: 0x00ccff, emissive: 0x00ccff, emissiveIntensity: 2.5, transparent: true, opacity: .84 });

    /* ─── Battery Group ─── */
    const batt = new THREE.Group();
    scene.add(batt);

    const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.0, 2.05), bodyMats);
    body.castShadow = true; body.receiveShadow = true;
    batt.add(body);

    // Lid
    const lid = new THREE.Mesh(new THREE.BoxGeometry(3.4, .17, 2.05), darkM);
    lid.position.y = 1.085; batt.add(lid);

    // Gold edge strips
    [[-1.04, -1.04], [-1.04, 1.06], [1.04, -1.04], [1.04, 1.06]].forEach(([z, y]) => {
      const e = new THREE.Mesh(new THREE.BoxGeometry(3.46, .1, .1), goldM);
      e.position.set(0, y, z); batt.add(e);
    });

    // Ribs
    [-1.2, -.6, 0, .6, 1.2].forEach(x =>
      [1.04, -1.04].forEach(z => {
        const r = new THREE.Mesh(new THREE.BoxGeometry(.07, 1.97, .07), darkM);
        r.position.set(x, 0, z); batt.add(r);
      })
    );

    // Bottom rail
    const foot = new THREE.Mesh(new THREE.BoxGeometry(3.1, .14, 1.82), darkM);
    foot.position.y = -1.07; batt.add(foot);

    // Cell caps
    for (let i = 0; i < 6; i++) {
      const cx = -1.38 + i * .55;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .1, 18), capM);
      cap.position.set(cx, 1.19, 0); batt.add(cap);
      const slot = new THREE.Mesh(new THREE.BoxGeometry(.17, .06, .06), new M({ color: 0x010204 }));
      slot.position.set(cx, 1.25, 0); batt.add(slot);
    }

    // Terminals
    function addTerm(x, mat) {
      [[.14, .2, .22], [.1, .1, .28], [.13, .13, .065]].forEach(([rt, rb, h], i) => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 20), mat);
        m.position.set(x, [1.2, 1.4, 1.535][i], 0);
        m.castShadow = true; batt.add(m);
      });
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(.065, .065, .09, 14), new M({ color: 0x010204 }));
      hole.position.set(x, 1.56, 0); batt.add(hole);
    }
    addTerm(-0.95, goldM);
    addTerm(0.95, negM);

    // Bridge
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(1.9, .09, .15), goldM);
    bridge.position.y = 1.545; batt.add(bridge);

    // Handle
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-.85, 1.68, 0),
      new THREE.Vector3(0, 2.4, 0),
      new THREE.Vector3(.85, 1.68, 0)
    );
    batt.add(new THREE.Mesh(
      new THREE.TubeGeometry(curve, 28, .068, 12, false),
      new M({ color: 0x0c1828, metalness: .1, roughness: .82 })
    ));

    // Charge bar (starts at base, grows up)
    const CBAR_H = 0.012;
    const chargeMesh = new THREE.Mesh(new THREE.BoxGeometry(2.88, CBAR_H, 1.75), chargeM);
    batt.add(chargeMesh);

    // Warning sticker
    const warnTex = tex(512, 200, (ctx) => {
      ctx.fillStyle = '#ffd000'; ctx.fillRect(0, 0, 512, 200);
      ctx.fillStyle = '#000'; ctx.fillRect(8, 8, 496, 184);
      ctx.fillStyle = '#ffd000'; ctx.font = 'bold 30px Arial'; ctx.textAlign = 'center';
      ctx.fillText('⚠ DANGER · PELIGRO', 256, 44);
      ctx.fillStyle = '#fff'; ctx.font = '21px Arial';
      ctx.fillText('Explosive gas – No flames or sparks', 256, 80);
      ctx.fillText('Contains sulfuric acid · CORROSIVE', 256, 108);
      ctx.fillStyle = '#ffd000'; ctx.font = 'bold 17px Arial';
      ctx.fillText('TOYO BATTERY CO., LTD. · ISO 9001', 256, 148);
    });
    const warn = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, .58),
      new M({ map: warnTex, transparent: true })
    );
    warn.position.set(0, -.42, 1.03); batt.add(warn);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new M({ color: 0x060d1a, metalness: .5, roughness: .65, transparent: true, opacity: .85 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.22;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle dust
    const NF = 100, fp = new Float32Array(NF * 3);
    for (let i = 0; i < NF; i++) {
      fp[i*3] = (Math.random()-.5)*11;
      fp[i*3+1] = (Math.random()-.5)*8;
      fp[i*3+2] = (Math.random()-.5)*8;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(fp, 3));
    scene.add(new THREE.Points(dustGeo, new M({ color: 0xffa030, transparent: true, opacity: .28 })));

    /* ─── Mouse drag ─── */
    let drag = false, px = 0, py = 0, vy = .003, vx = 0;
    renderer.domElement.addEventListener('pointerdown', e => {
      drag = true; px = e.clientX; py = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    });
    renderer.domElement.addEventListener('pointermove', e => {
      if (!drag) return;
      vy += (e.clientX - px) * .012; vx += (e.clientY - py) * .009;
      px = e.clientX; py = e.clientY;
    });
    renderer.domElement.addEventListener('pointerup', () => drag = false);

    /* ─── Resize ─── */
    new ResizeObserver(() => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (w > 0 && h > 0) { camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }
    }).observe(el);

    /* ─── Animate ─── */
    const BAT_BOTTOM = -1.0; // y of battery bottom interior
    const BAT_HEIGHT =  2.0; // total interior height
    let t = 0, chargeLevel = .1, chargeDir = 1;
    const htmlBar = document.getElementById('batChargeBar');

    (function loop() {
      requestAnimationFrame(loop);
      t += .016;

      // rotation
      if (!drag) { vy += .0022; vx *= .93; vy *= .97; }
      else        { vx *= .8;   vy *= .8; }
      batt.rotation.y += vy;
      batt.rotation.x = Math.max(-.38, Math.min(.38, batt.rotation.x + vx));
      batt.position.y = Math.sin(t * .5) * .13;

      // charge
      chargeLevel += .0015 * chargeDir;
      if (chargeLevel >= 1)   chargeDir = -1;
      if (chargeLevel <= .04) chargeDir =  1;

      const scaledH = BAT_HEIGHT * chargeLevel;
      chargeMesh.scale.y = Math.max(.001, scaledH / CBAR_H);
      chargeMesh.position.y = BAT_BOTTOM + scaledH * .5;

      const hue = .52 - chargeLevel * .1;
      chargeM.color.setHSL(hue, 1, .55);
      chargeM.emissive.setHSL(hue, 1, .55);
      chargeM.emissiveIntensity = 1.8 + chargeLevel * 2.2;
      glow.intensity = chargeLevel * 4;
      glow.color.setHSL(hue, 1, .6);

      if (htmlBar) htmlBar.style.width = Math.round(chargeLevel * 100) + '%';

      // dust
      const fa = dustGeo.attributes.position.array;
      for (let i = 0; i < NF; i++) { fa[i*3+1] += .004; if (fa[i*3+1] > 4.5) fa[i*3+1] = -4.5; }
      dustGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    })();
  }
})();
