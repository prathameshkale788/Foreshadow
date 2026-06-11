/* ============================================
   FORESHADOW — RevealWaveImage Preloader
   Vanilla Three.js port of the React component
   ============================================ */

(function () {
  'use strict';

  // ─── Configuration (matching the React demo props) ───
  const CONFIG = {
    imageSrc: 'assets/images/drive_photos/folder_1/PKP_-10.jpg',
    waveSpeed: 0.2,
    waveFrequency: 0.7,
    waveAmplitude: 0.5,
    revealRadius: 0.5,
    revealSoftness: 1.0,
    pixelSize: 2.0,
    mouseRadius: 0.4,
  };

  // ─── Shaders (identical to the React component) ───

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uRevealRadius;
    uniform float uRevealSoftness;
    uniform float uPixelSize;
    uniform float uMouseActive;

    uniform float uWaveSpeed;
    uniform float uWaveFrequency;
    uniform float uWaveAmplitude;
    uniform float uMouseRadius;

    varying vec2 vUv;

    // Bayer 4x4 dithering pattern
    float bayer4x4(vec2 pos) {
      int x = int(mod(pos.x, 4.0));
      int y = int(mod(pos.y, 4.0));
      int index = x + y * 4;

      float pattern[16];
      pattern[0] = 0.0;    pattern[1] = 8.0;    pattern[2] = 2.0;    pattern[3] = 10.0;
      pattern[4] = 12.0;   pattern[5] = 4.0;    pattern[6] = 14.0;   pattern[7] = 6.0;
      pattern[8] = 3.0;    pattern[9] = 11.0;   pattern[10] = 1.0;   pattern[11] = 9.0;
      pattern[12] = 15.0;  pattern[13] = 7.0;   pattern[14] = 13.0;  pattern[15] = 5.0;

      for (int i = 0; i < 16; i++) {
          if (i == index) return pattern[i] / 16.0;
      }
      return 0.0;
    }

    void main() {
      vec2 uv = vUv;

      // Wave and Ripple Distortions
      float time = uTime;
      float waveStrength = uWaveAmplitude * 0.1;

      // Continuous waves
      float wave1 = sin(uv.y * uWaveFrequency + time * uWaveSpeed) * waveStrength;
      float wave2 = sin(uv.x * uWaveFrequency * 0.7 + time * uWaveSpeed * 0.8) * waveStrength * 0.5;

      vec2 distortedUv = uv;
      distortedUv.x += wave1;
      distortedUv.y += wave2;

      // Mouse interaction (Ripple)
      if (uMouseActive > 0.01) {
          vec2 mousePos = uMouse;
          float dist = distance(uv, mousePos);
          float mouseInfluence = smoothstep(uMouseRadius, 0.0, dist);

          float rippleFreq = uWaveFrequency * 5.0;
          float rippleSpeed = uWaveSpeed * 1.0;
          float rippleStrength = uWaveAmplitude * 0.05;

          float ripple = sin(dist * rippleFreq - time * rippleSpeed) * rippleStrength * mouseInfluence * uMouseActive;
          distortedUv.x += ripple;
          distortedUv.y += ripple;
      }

      // Sampling and Color Logic
      vec4 color = texture2D(uTexture, distortedUv);

      // Grayscale conversion
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

      // Dithering
      vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize);
      float dither = bayer4x4(pixelCoord);

      // 2-level quantization
      float quantized;
      float adjusted = gray + (dither - 0.5) * 0.5;
      if (adjusted < 0.33) {
          quantized = 0.0;
      } else if (adjusted < 0.66) {
          quantized = 0.5;
      } else {
          quantized = 1.0;
      }
      vec3 bwColor = vec3(quantized);

      // Reveal Flashlight
      float revealDist = distance(uv, uMouse);
      float innerRadius = uRevealRadius * (1.0 - uRevealSoftness);
      float outerRadius = uRevealRadius;
      float revealAmount = 1.0 - smoothstep(innerRadius, outerRadius, revealDist);
      revealAmount *= uMouseActive;

      vec3 finalColor = mix(bwColor, color.rgb, revealAmount);

      gl_FragColor = vec4(finalColor, color.a);
    }
  `;

  // ─── State ───
  let scene, camera, renderer, mesh, clock;
  let mouseActive = 0;
  let hasEntered = false;
  let isMouseInCanvas = false;
  let mouseX = -10, mouseY = -10;
  let animationId = null;

  const container = document.getElementById('preloader-canvas-container');
  if (!container) return;

  // ─── Load Image & Initialize ───
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(CONFIG.imageSrc, function (texture) {
    const imgWidth = texture.image.naturalWidth || texture.image.width;
    const imgHeight = texture.image.naturalHeight || texture.image.height;
    const aspectRatio = imgWidth / imgHeight;

    init(texture, aspectRatio);
    animate();

    // Show the overlay content with a small delay for dramatic effect
    setTimeout(function () {
      const overlay = document.getElementById('preloader-overlay');
      if (overlay) overlay.classList.add('visible');
    }, 400);
  }, undefined, function (err) {
    console.warn('Preloader texture failed to load:', err);
    // Fallback: show the overlay immediately without the shader
    const overlay = document.getElementById('preloader-overlay');
    if (overlay) overlay.classList.add('visible');
  });

  function init(texture, aspectRatio) {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Clock
    clock = new THREE.Clock();

    // Compute plane scale to cover the viewport (like object-fit: cover)
    const viewportAspect = container.clientWidth / container.clientHeight;
    let scaleX, scaleY;
    if (aspectRatio > viewportAspect) {
      // Image is wider than viewport — fit height, overflow width
      scaleY = 1;
      scaleX = aspectRatio / viewportAspect;
    } else {
      // Image is taller than viewport — fit width, overflow height
      scaleX = 1;
      scaleY = viewportAspect / aspectRatio;
    }

    // Geometry + Material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uRevealRadius: { value: CONFIG.revealRadius },
        uRevealSoftness: { value: CONFIG.revealSoftness },
        uPixelSize: { value: CONFIG.pixelSize },
        uMouseActive: { value: 0 },
        uWaveSpeed: { value: CONFIG.waveSpeed },
        uWaveFrequency: { value: CONFIG.waveFrequency },
        uWaveAmplitude: { value: CONFIG.waveAmplitude },
        uMouseRadius: { value: CONFIG.mouseRadius },
      },
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(scaleX, scaleY, 1);
    scene.add(mesh);

    // ─── Mouse Events ───
    const preloader = document.getElementById('preloader');

    preloader.addEventListener('mouseenter', function () {
      isMouseInCanvas = true;
    });

    preloader.addEventListener('mouseleave', function () {
      isMouseInCanvas = false;
    });

    preloader.addEventListener('mousemove', function (e) {
      // Convert mouse position to 0..1 UV space
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = 1.0 - (e.clientY - rect.top) / rect.height; // Flip Y
    });

    // Touch support
    preloader.addEventListener('touchstart', function (e) {
      isMouseInCanvas = true;
      updateTouchPosition(e);
    }, { passive: true });

    preloader.addEventListener('touchmove', function (e) {
      updateTouchPosition(e);
    }, { passive: true });

    preloader.addEventListener('touchend', function () {
      isMouseInCanvas = false;
    }, { passive: true });

    function updateTouchPosition(e) {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseX = (e.touches[0].clientX - rect.left) / rect.width;
        mouseY = 1.0 - (e.touches[0].clientY - rect.top) / rect.height;
      }
    }

    // ─── Resize Handler ───
    window.addEventListener('resize', onResize, { passive: true });
  }

  function onResize() {
    if (!renderer || !container || !mesh) return;

    renderer.setSize(container.clientWidth, container.clientHeight);

    // Recalculate cover scale
    const texture = mesh.material.uniforms.uTexture.value;
    if (texture && texture.image) {
      const imgWidth = texture.image.naturalWidth || texture.image.width;
      const imgHeight = texture.image.naturalHeight || texture.image.height;
      const aspectRatio = imgWidth / imgHeight;
      const viewportAspect = container.clientWidth / container.clientHeight;

      let scaleX, scaleY;
      if (aspectRatio > viewportAspect) {
        scaleY = 1;
        scaleX = aspectRatio / viewportAspect;
      } else {
        scaleX = 1;
        scaleY = viewportAspect / aspectRatio;
      }
      mesh.scale.set(scaleX, scaleY, 1);
    }
  }

  function animate() {
    animationId = requestAnimationFrame(animate);

    if (!mesh) return;

    const material = mesh.material;
    material.uniforms.uTime.value = clock.getElapsedTime();

    // Smooth mouse active easing
    if (isMouseInCanvas) {
      hasEntered = true;
    }
    const targetActive = isMouseInCanvas ? 1 : 0;
    mouseActive += (targetActive - mouseActive) * 0.08;
    material.uniforms.uMouseActive.value = mouseActive;

    // Update mouse position
    if (hasEntered) {
      material.uniforms.uMouse.value.set(mouseX, mouseY);
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

    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer = null;
    }
    if (mesh) {
      mesh.geometry.dispose();
      mesh.material.dispose();
      mesh.material.uniforms.uTexture.value.dispose();
      mesh = null;
    }
    if (scene) {
      scene = null;
    }
    camera = null;
    clock = null;
  };

})();
