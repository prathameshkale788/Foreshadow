/* ============================================
   FORESHADOW — Cosmos 3D Orbit Gallery Preloader
   Vanilla Three.js port of the React ParticleSphere component
   - 1500 glowing particles on a sphere surface
   - Wedding photos orbiting as image planes
   - Slow auto-rotation + user OrbitControls
   ============================================ */

(function () {
  'use strict';

  // ─── Always show overlay (ENTER button + logo) regardless of Three.js status ───
  function showOverlay() {
    var overlay = document.getElementById('preloader-overlay');
    if (overlay && !overlay.classList.contains('visible')) {
      overlay.classList.add('visible');
    }
  }

  // Show overlay after a small delay for dramatic effect
  setTimeout(showOverlay, 400);
  // Safety net: if something delays, force overlay visible after 2s
  setTimeout(showOverlay, 2000);

  // ─── Configuration (matching the React component) ───
  var CONFIG = {
    PARTICLE_COUNT: 1500,
    PARTICLE_SIZE_MIN: 0.005,
    PARTICLE_SIZE_MAX: 0.01,
    SPHERE_RADIUS: 9,
    POSITION_RANDOMNESS: 4,
    ROTATION_SPEED_Y: 0.0005,
    PARTICLE_OPACITY: 1,
    IMAGE_SIZE: 1.5,
    images: [
      'https://iili.io/CoMdRtf.jpg',
      'https://iili.io/CoMdAwG.jpg',
      'https://iili.io/CoMduus.jpg',
      'https://iili.io/CoMdz8X.jpg',
      'https://iili.io/CoMdqnR.jpg',
      'https://iili.io/CoMddyg.jpg',
      'https://iili.io/CoMd93P.jpg',
      'https://iili.io/CoMJmGV.jpg',
      'https://iili.io/CoMJtZx.jpg',
      'https://iili.io/CoMJZjj.jpg',
      'https://iili.io/CoMJQTb.jpg',
      'https://iili.io/CoMJsyu.jpg',
      'https://iili.io/CoMJive.jpg',
      'https://iili.io/CoMJPa9.jpg',
      'https://iili.io/CoMJr4S.jpg',
      'https://iili.io/CoMJgG2.jpg',
    ].reverse(),
  };

  // ─── State ───
  var scene, camera, renderer, group, controls;
  var animationId = null;
  var imageMeshes = [];

  var container = document.getElementById('preloader-canvas-container');
  if (!container) return;

  // ─── Try to initialize Three.js (non-fatal if it fails) ───
  try {
    if (typeof THREE === 'undefined') {
      throw new Error('Three.js not loaded');
    }
    init();
    animate();
  } catch (e) {
    console.warn('Cosmos 3D preloader failed to initialize:', e);
    // Overlay is already scheduled to show via setTimeout above
  }

  // ─── Initialize Scene ───
  function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera (matching demo: position [-10, 1.5, 10], fov 50)
    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;
    camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      1000
    );
    camera.position.set(-10, 1.5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xEFE9D7);
    container.appendChild(renderer.domElement);

    // Lights
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Group for rotation
    group = new THREE.Group();
    scene.add(group);

    // ─── Create Particles using InstancedMesh (efficient single draw call) ───
    createParticles();

    // ─── Load and Create Orbiting Image Planes ───
    loadOrbitingImages();

    // ─── OrbitControls ───
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 5;
      controls.maxDistance = 25;
    }

    // ─── Resize Handler ───
    window.addEventListener('resize', onResize, { passive: true });
  }

  // ─── Create 1500 Particles on Sphere Surface ───
  function createParticles() {
    var particleGeom = new THREE.SphereGeometry(1, 8, 6);
    var particleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: CONFIG.PARTICLE_OPACITY,
    });

    var instancedMesh = new THREE.InstancedMesh(
      particleGeom,
      particleMat,
      CONFIG.PARTICLE_COUNT
    );

    var dummy = new THREE.Object3D();
    var color = new THREE.Color();

    for (var i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution with random variation
      var phi = Math.acos(-1 + (2 * i) / CONFIG.PARTICLE_COUNT);
      var theta = Math.sqrt(CONFIG.PARTICLE_COUNT * Math.PI) * phi;

      var radiusVariation =
        CONFIG.SPHERE_RADIUS +
        (Math.random() - 0.5) * CONFIG.POSITION_RANDOMNESS;

      var x = radiusVariation * Math.cos(theta) * Math.sin(phi);
      var y = radiusVariation * Math.cos(phi);
      var z = radiusVariation * Math.sin(theta) * Math.sin(phi);

      var scale =
        Math.random() * (CONFIG.PARTICLE_SIZE_MAX - CONFIG.PARTICLE_SIZE_MIN) +
        CONFIG.PARTICLE_SIZE_MIN;

      dummy.position.set(x, y, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);

      // Elegant warm dark tones (deep olive, sage, burgundy — visible on cream)
      var hue = Math.random() < 0.5
        ? Math.random() * 0.05 + 0.05   // warm olive
        : Math.random() * 0.03 + 0.97;  // warm burgundy
      color.setHSL(
        hue,
        0.4 + Math.random() * 0.3,
        0.2 + Math.random() * 0.15
      );
      instancedMesh.setColorAt(i, color);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }

    group.add(instancedMesh);
  }

  // ─── Load Wedding Photos and Position as Orbiting Planes ───
  function loadOrbitingImages() {
    var textureLoader = new THREE.TextureLoader();
    var imageCount = CONFIG.images.length;

    CONFIG.images.forEach(function (src, i) {
      textureLoader.load(
        src,
        function (texture) {
          // Calculate position on equatorial ring
          var angle = (i / imageCount) * Math.PI * 2;
          var x = CONFIG.SPHERE_RADIUS * Math.cos(angle);
          var y = 0; // All images on the equator
          var z = CONFIG.SPHERE_RADIUS * Math.sin(angle);

          var geometry = new THREE.PlaneGeometry(
            CONFIG.IMAGE_SIZE,
            CONFIG.IMAGE_SIZE
          );
          var material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
          });

          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(x, y, z);

          // Face outward from center
          var outwardDir = new THREE.Vector3(x, y, z).normalize();
          var lookTarget = mesh.position
            .clone()
            .add(outwardDir.multiplyScalar(2));
          mesh.lookAt(lookTarget);

          group.add(mesh);
          imageMeshes.push(mesh);

          // Fade in the image smoothly
          fadeInMesh(material);
        },
        undefined,
        function (err) {
          console.warn('Failed to load orbit texture:', src);
        }
      );
    });
  }

  // ─── Fade in an image material ───
  function fadeInMesh(material) {
    var opacity = 0;
    function step() {
      opacity += 0.02;
      if (opacity >= 1) {
        material.opacity = 1;
        return;
      }
      material.opacity = opacity;
      requestAnimationFrame(step);
    }
    step();
  }

  // ─── Resize Handler ───
  function onResize() {
    if (!renderer || !container || !camera) return;
    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // ─── Exit Animation State ───
  var isExiting = false;
  var exitStartTime = 0;

  // Called by main.js when ENTER is clicked
  window._triggerPreloaderExit = function () {
    isExiting = true;
    exitStartTime = performance.now();

    // Disable user controls during exit
    if (controls) {
      controls.enabled = false;
    }
  };

  // ─── Animation Loop ───
  function animate() {
    animationId = requestAnimationFrame(animate);

    if (isExiting) {
      var elapsed = (performance.now() - exitStartTime) / 1000; // seconds

      // Exponentially accelerating rotation (gentle → furious whirlwind)
      var speedMultiplier = 1 + Math.pow(elapsed, 2.5) * 80;
      group.rotation.y += CONFIG.ROTATION_SPEED_Y * speedMultiplier;

      // Sphere expands outward (particles scatter)
      var expandScale = 1 + Math.pow(elapsed, 2) * 0.4;
      group.scale.set(expandScale, expandScale, expandScale);

      // Camera drifts slightly forward (zoom-through feel)
      if (elapsed < 2) {
        camera.position.z -= elapsed * 0.008;
        camera.position.x -= elapsed * 0.004;
        camera.fov = 50 + elapsed * 5; // slight FOV widening for drama
        camera.updateProjectionMatrix();
      }

    } else {
      // Normal auto-rotate
      group.rotation.y += CONFIG.ROTATION_SPEED_Y;

      // Update OrbitControls
      if (controls) {
        controls.update();
      }
    }

    renderer.render(scene, camera);
  }

  // ─── Cleanup (called when preloader is dismissed) ───
  window._destroyPreloaderWave = function () {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    window.removeEventListener('resize', onResize);

    if (controls) {
      controls.dispose();
      controls = null;
    }

    // Dispose all image meshes
    imageMeshes.forEach(function (mesh) {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (mesh.material.map) mesh.material.map.dispose();
        mesh.material.dispose();
      }
    });
    imageMeshes = [];

    // Dispose scene children
    if (group) {
      group.traverse(function (child) {
        if (child.isMesh || child.isInstancedMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      });
    }

    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer = null;
    }

    scene = null;
    camera = null;
    group = null;
  };
})();
