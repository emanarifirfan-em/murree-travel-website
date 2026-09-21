import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, Moon, CloudSnow, Eye, RotateCcw, Sparkles, Wind } from 'lucide-react';

export const MountainScene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeMode, setTimeMode] = useState<'golden' | 'day' | 'night'>('golden');
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);

  // References to animate and control Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const snowParticlesRef = useRef<THREE.Points | null>(null);
  const cloudsGroupRef = useRef<THREE.Group | null>(null);
  const terrainGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Mouse interaction state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    // Detect mobile or small screens for initial low-power mode
    const isMobile = window.innerWidth < 768;
    setIsLowPower(isMobile);

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a141e, 0.012);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 35, 110);
    camera.lookAt(0, 10, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff0dd, 0x112233, 0.9);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    dirLight.position.set(40, 80, 50);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // 5. Build Layered Mountain Terrain
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);
    terrainGroupRef.current = terrainGroup;

    // Create 3 mountain ridges: Front, Mid, Far
    const createMountainRidge = (
      widthSeg: number, 
      heightSeg: number, 
      posZ: number, 
      scaleY: number, 
      baseColor: number,
      noiseFactor: number
    ) => {
      const geo = new THREE.PlaneGeometry(240, 90, widthSeg, heightSeg);
      geo.rotateX(-Math.PI / 2);

      const posAttr = geo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);

        // Sinusoidal pseudo-noise mountain peaks
        const elevation = 
          Math.sin(x * 0.04) * Math.cos(z * 0.03) * noiseFactor * 12 +
          Math.sin(x * 0.08 + 1.2) * 8 +
          Math.sin(x * 0.015 - z * 0.02) * 16 -
          (z * 0.18); // sloping down towards foreground

        posAttr.setY(i, Math.max(0, elevation * scaleY));
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.85,
        metalness: 0.1,
        flatShading: true
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, -10, posZ);
      return mesh;
    };

    // Segments: lower if mobile
    const segs = isMobile ? 32 : 64;
    const farRidge = createMountainRidge(segs, segs / 2, -60, 1.4, 0x1b2838, 2.2);
    const midRidge = createMountainRidge(segs, segs / 2, -20, 1.0, 0x162c26, 1.8);
    const frontRidge = createMountainRidge(segs, segs / 2, 20, 0.6, 0x10211b, 1.2);

    terrainGroup.add(farRidge);
    terrainGroup.add(midRidge);
    terrainGroup.add(frontRidge);

    // 6. Pine Trees Clusters on Mid and Front Ridges
    const treeCount = isMobile ? 40 : 120;
    const pineGeo = new THREE.ConeGeometry(1.6, 6, 4);
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x0a1d15, roughness: 0.9, flatShading: true });
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 1.8, 4);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x22170f });

    const treesGroup = new THREE.Group();
    for (let i = 0; i < treeCount; i++) {
      const tree = new THREE.Group();
      const foliage = new THREE.Mesh(pineGeo, pineMat);
      foliage.position.y = 3;
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.9;
      tree.add(foliage);
      tree.add(trunk);

      // Distribute across ridges
      const tx = (Math.random() - 0.5) * 160;
      const tz = Math.random() * 40 - 10;
      const ty = Math.sin(tx * 0.04) * 5 + (Math.random() * 4) + 1;

      tree.position.set(tx, ty, tz);
      const scale = 0.8 + Math.random() * 0.7;
      tree.scale.set(scale, scale, scale);
      treesGroup.add(tree);
    }
    terrainGroup.add(treesGroup);

    // 7. Clouds Layer
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);
    cloudsGroupRef.current = cloudsGroup;

    const cloudCount = isMobile ? 4 : 10;
    const cloudMat = new THREE.MeshLambertMaterial({
      color: 0xdae6f2,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });

    for (let i = 0; i < cloudCount; i++) {
      const cloudPuff = new THREE.Mesh(
        new THREE.SphereGeometry(6 + Math.random() * 6, 7, 7),
        cloudMat
      );
      cloudPuff.scale.set(2.5, 0.5, 1.2);
      cloudPuff.position.set(
        (Math.random() - 0.5) * 180,
        18 + Math.random() * 12,
        (Math.random() - 0.5) * 80 - 10
      );
      cloudsGroup.add(cloudPuff);
    }

    // 8. Snow Particles
    const snowCount = isMobile ? 300 : 1000;
    const snowGeo = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowVelocities = new Float32Array(snowCount);

    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3] = (Math.random() - 0.5) * 200;
      snowPositions[i * 3 + 1] = Math.random() * 70;
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 140 + 20;
      snowVelocities[i] = 0.15 + Math.random() * 0.25;
    }

    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    const snowMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.1,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const snowParticles = new THREE.Points(snowGeo, snowMat);
    scene.add(snowParticles);
    snowParticlesRef.current = snowParticles;

    // 9. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight || 550;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. Mouse interaction handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = x * 15;
      mouse.current.targetY = y * 8;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // 11. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera damping with mouse
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.04;

      if (cameraRef.current) {
        cameraRef.current.position.x = mouse.current.x;
        cameraRef.current.position.y = 35 + mouse.current.y;
        cameraRef.current.lookAt(0, 10, 0);
      }

      // Gentle cloud drift
      if (cloudsGroupRef.current) {
        cloudsGroupRef.current.children.forEach((cloud) => {
          cloud.position.x += delta * 1.8;
          if (cloud.position.x > 100) cloud.position.x = -100;
        });
      }

      // Snow particle drift
      if (snowParticlesRef.current && snowParticlesRef.current.visible) {
        const positions = snowParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < snowCount; i++) {
          positions[i * 3 + 1] -= snowVelocities[i];
          positions[i * 3] += Math.sin(elapsedTime + i) * 0.05; // slight flutter
          if (positions[i * 3 + 1] < 0) {
            positions[i * 3 + 1] = 65;
            positions[i * 3] = (Math.random() - 0.5) * 200;
          }
        }
        snowParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  // Update lighting and atmosphere based on timeMode
  useEffect(() => {
    if (!sceneRef.current || !dirLightRef.current || !hemiLightRef.current) return;
    const scene = sceneRef.current;
    const dirLight = dirLightRef.current;
    const hemiLight = hemiLightRef.current;

    if (timeMode === 'golden') {
      // Golden Hour Sunrise / Sunset
      scene.fog = new THREE.FogExp2(0x182029, 0.012);
      hemiLight.color.setHex(0xffc58d);
      hemiLight.groundColor.setHex(0x18242f);
      hemiLight.intensity = 1.0;
      dirLight.color.setHex(0xffaa5e);
      dirLight.intensity = 1.6;
      dirLight.position.set(60, 40, 50);
    } else if (timeMode === 'day') {
      // Crisp Alpine Noon
      scene.fog = new THREE.FogExp2(0x142838, 0.010);
      hemiLight.color.setHex(0xffffff);
      hemiLight.groundColor.setHex(0x152c38);
      hemiLight.intensity = 1.1;
      dirLight.color.setHex(0xfafafa);
      dirLight.intensity = 1.8;
      dirLight.position.set(10, 90, 40);
    } else {
      // Moonlight & Mist
      scene.fog = new THREE.FogExp2(0x060c12, 0.016);
      hemiLight.color.setHex(0x82a5c4);
      hemiLight.groundColor.setHex(0x060e15);
      hemiLight.intensity = 0.4;
      dirLight.color.setHex(0xaec8e6);
      dirLight.intensity = 0.6;
      dirLight.position.set(-40, 60, -30);
    }
  }, [timeMode]);

  // Toggle snow particles
  useEffect(() => {
    if (snowParticlesRef.current) {
      snowParticlesRef.current.visible = snowEnabled;
    }
  }, [snowEnabled]);

  const resetCamera = () => {
    mouse.current.targetX = 0;
    mouse.current.targetY = 0;
  };

  return (
    <section id="mountain-3d" className="relative w-full py-20 bg-[#080e14] overflow-hidden border-t border-b border-[#1b2b3a]">
      {/* Background radial ambiance */}
      <div className="absolute inset-0 bg-radial from-[#152533]/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-[#d4af37] mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE 3D EXPLORATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f3f4f6] font-normal leading-tight">
              The Himalayan Ridges of Murree & Galiyat
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-2xl font-light">
              Explore the elevation, towering blue pines, and seasonal atmosphere in real-time. Drag or move your mouse to adjust vantage perspective.
            </p>
          </div>

          {/* Interactive Mode Controls */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2">
            {/* Time of Day Buttons */}
            <div className="flex items-center p-1 bg-[#101922] border border-[#233544] rounded-full text-xs">
              <button
                onClick={() => setTimeMode('golden')}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all ${
                  timeMode === 'golden'
                    ? 'bg-[#d4af37] text-[#080e14] font-bold shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
                title="Golden Hour Sunrise"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Golden Hour</span>
              </button>

              <button
                onClick={() => setTimeMode('day')}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all ${
                  timeMode === 'day'
                    ? 'bg-[#d4af37] text-[#080e14] font-bold shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
                title="High Alpine Noon"
              >
                <Wind className="w-3.5 h-3.5" />
                <span>Alpine Noon</span>
              </button>

              <button
                onClick={() => setTimeMode('night')}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all ${
                  timeMode === 'night'
                    ? 'bg-[#d4af37] text-[#080e14] font-bold shadow'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
                title="Moonlight & Mist"
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Moonlight</span>
              </button>
            </div>

            {/* Snow Particle Toggle */}
            <button
              onClick={() => setSnowEnabled(!snowEnabled)}
              className={`px-3 py-2 rounded-full border text-xs flex items-center space-x-1.5 transition-all ${
                snowEnabled
                  ? 'bg-[#152a3a] border-[#385975] text-[#93c5fd]'
                  : 'bg-[#101922] border-[#233544] text-[#64748b]'
              }`}
            >
              <CloudSnow className="w-3.5 h-3.5" />
              <span>{snowEnabled ? 'Snow: On' : 'Snow: Off'}</span>
            </button>

            {/* Reset Camera */}
            <button
              onClick={resetCamera}
              className="p-2 rounded-full bg-[#101922] border border-[#233544] text-[#94a3b8] hover:text-white transition-colors"
              title="Center View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas Stage Container */}
        <div className="relative w-full h-[460px] sm:h-[520px] rounded-xl overflow-hidden border border-[#233544] bg-[#091017] shadow-2xl group cursor-grab active:cursor-grabbing">
          {/* Canvas Mount */}
          <div ref={containerRef} className="w-full h-full" />

          {/* Overlay Guide HUD */}
          <div className="absolute top-4 left-4 pointer-events-none flex flex-col space-y-2">
            <div className="px-3 py-1.5 rounded-md bg-[#091118]/80 backdrop-blur-md border border-[#1e2f3d] text-[11px] text-[#94a3b8] font-mono flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE 3D SIMULATION • 2,291M ELEVATION</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#091118]/80 backdrop-blur-md border border-[#1e2f3d] text-[11px] text-[#94a3b8]">
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive: Move cursor to orbit mountain terrain</span>
          </div>

          {/* Altitude Indicators */}
          <div className="absolute bottom-4 left-4 pointer-events-none flex items-center space-x-4 text-[11px] text-slate-400 font-mono">
            <div className="bg-[#091118]/80 backdrop-blur-md px-3 py-1 rounded border border-[#1e2f3d]">
              KASHMIR POINT: 2,350M
            </div>
            <div className="bg-[#091118]/80 backdrop-blur-md px-3 py-1 rounded border border-[#1e2f3d]">
              MUKSHPURI TOP: 2,800M
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
