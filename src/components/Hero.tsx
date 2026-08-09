import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Star, Play } from 'lucide-react';

export default function Hero() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090909, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x442200, 0.6);
    scene.add(ambient);
    const keyLight = new THREE.PointLight(0xff6a00, 3, 50);
    keyLight.position.set(5, 5, 8);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff8c00, 2, 40);
    rimLight.position.set(-6, -3, 5);
    scene.add(rimLight);

    // === Kettlebell (sphere + handle) ===
    const kettlebellGroup = new THREE.Group();
    const ballGeom = new THREE.SphereGeometry(1.6, 64, 64);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x110800,
    });
    const ball = new THREE.Mesh(ballGeom, metalMat);
    kettlebellGroup.add(ball);

    const handleGeom = new THREE.TorusGeometry(0.7, 0.18, 16, 48);
    const handle = new THREE.Mesh(handleGeom, metalMat);
    handle.position.y = 1.7;
    handle.rotation.x = Math.PI / 2;
    kettlebellGroup.add(handle);

    kettlebellGroup.position.set(0, 0, 0);
    scene.add(kettlebellGroup);

    // === Dumbbells (two cylinders + weights) ===
    function makeDumbbell(): THREE.Group {
      const g = new THREE.Group();
      const barMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.85, roughness: 0.3 });
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 16), barMat);
      bar.rotation.z = Math.PI / 2;
      g.add(bar);
      const wMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.8, roughness: 0.35 });
      [-0.9, 0.9].forEach((x) => {
        const w1 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.3, 24), wMat);
        w1.position.x = x;
        w1.rotation.z = Math.PI / 2;
        g.add(w1);
        const w2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 24), wMat);
        w2.position.x = x + (x > 0 ? 0.25 : -0.25);
        w2.rotation.z = Math.PI / 2;
        g.add(w2);
      });
      return g;
    }

    const dumbbell1 = makeDumbbell();
    dumbbell1.position.set(-4.5, 2.2, -2);
    dumbbell1.rotation.z = 0.4;
    scene.add(dumbbell1);

    const dumbbell2 = makeDumbbell();
    dumbbell2.position.set(4.2, -2.5, -1);
    dumbbell2.rotation.z = -0.3;
    dumbbell2.scale.set(0.8, 0.8, 0.8);
    scene.add(dumbbell2);

    const dumbbell3 = makeDumbbell();
    dumbbell3.position.set(3.5, 2.8, -3);
    dumbbell3.rotation.x = 0.5;
    dumbbell3.scale.set(0.6, 0.6, 0.6);
    scene.add(dumbbell3);

    // === Orange particles ===
    const particleCount = 400;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005,
      });
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff6a00,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let rafId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      kettlebellGroup.position.y = Math.sin(t * 0.8) * 0.4;
      kettlebellGroup.rotation.y = Math.sin(t * 0.3) * 0.3;
      kettlebellGroup.rotation.x = Math.cos(t * 0.4) * 0.1;

      dumbbell1.position.y = 2.2 + Math.sin(t * 0.6 + 1) * 0.3;
      dumbbell1.rotation.y = t * 0.3;
      dumbbell2.position.y = -2.5 + Math.cos(t * 0.5) * 0.3;
      dumbbell2.rotation.y = -t * 0.2;
      dumbbell3.position.y = 2.8 + Math.sin(t * 0.7 + 2) * 0.25;
      dumbbell3.rotation.x = t * 0.25;

      // Particle drift
      const pos = particleGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pos.array[i * 3] += velocities[i].x;
        pos.array[i * 3 + 1] += velocities[i].y;
        pos.array[i * 3 + 2] += velocities[i].z;
        if (Math.abs(pos.array[i * 3]) > 10) velocities[i].x *= -1;
        if (Math.abs(pos.array[i * 3 + 1]) > 7) velocities[i].y *= -1;
        if (Math.abs(pos.array[i * 3 + 2]) > 5) velocities[i].z *= -1;
      }
      pos.needsUpdate = true;

      // Camera parallax
      camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouse.current.y * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background treadmill image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/unnamed_(1).jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60" />
      </div>

      {/* Orange glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/30 mb-8" data-reveal>
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Premium Fitness Studio</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6" data-reveal>
              Transform Your Body.
              <br />
              <span className="text-brand-orange">Transform</span> Your Life.
            </h1>

            <p className="text-lg text-white/60 max-w-md mb-10 leading-relaxed" data-reveal>
              Reborn Fitness Studio is where strength meets discipline. Train with elite coaches, premium equipment, and a community that pushes you beyond limits.
            </p>

            <div className="flex flex-wrap gap-4 mb-12" data-reveal>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-orange text-white font-semibold hover:bg-orange-500 transition-all duration-300 orange-glow hover:scale-105"
              >
                Join Today
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                Book Free Trial
              </a>
            </div>

            <div className="flex flex-wrap gap-8" data-reveal>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <span className="text-sm text-white/50 uppercase tracking-wider">Rating</span>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold mb-1">500+</div>
                <span className="text-sm text-white/50 uppercase tracking-wider">Reviews</span>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold mb-1">100%</div>
                <span className="text-sm text-white/50 uppercase tracking-wider">Results</span>
              </div>
            </div>
          </div>

          {/* Right - Three.js */}
          <div className="relative h-[500px] lg:h-[600px]" data-reveal>
            <div ref={mountRef} className="absolute inset-0" />
            <div className="absolute inset-0 bg-orange-glow pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-orange to-transparent" />
      </div>
    </section>
  );
}
