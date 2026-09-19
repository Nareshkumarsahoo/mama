/* ==========================================================================
   PERSONALIZATION CONFIGURATION (EDIT THIS SECTION TO CUSTOMIZE YOUR WEBSITE!)
   ========================================================================== */

const ROMANTIC_CONFIG = {
  // Her Name or Nickname (Used across the app)
  herName: "Mama",
  
  // Your Name / Signature
  myName: "Your Love",

  // Background Music URL (MP3 link). 
  // Leave empty ("") to use the built-in gentle romantic ambient synthesizer!
  bgMusicUrl: "https://assets.mixkit.co/music/preview/mixkit-romantic-sunset-688.mp3",
  
  // Enable Web Audio API backup sound synth if MP3 fails to load or is blocked
  enableAudioSynthFallback: true,

  // Make the NO button dodge/move randomly away when mouse gets close or on tap
  dodgeNoButton: true,

  // Footer Note
  footerMessage: "Made with ❤️ for Mama",

  // Opening Screen Configuration
  opening: {
    title: "Hey Mama ❤️",
    subtitle: "I have a few very important questions for you...",
    btnText: "Start the Questions 💌"
  },

  // Questions Flow (Add, edit, or modify any questions and responses!)
  questions: [
    {
      id: 1,
      questionText: "Mama, are you still angry with me? 😠",
      yesBtn: "YES 😤",
      noBtn: "NO 🥺",
      yesResponse: {
        emoji: "😤",
        title: "Oh no! 🥺",
        message: "Don't stay angry for long baby! I promise to make it up with infinite hugs, chocolate & kisses! 🥰"
      },
      noResponse: {
        emoji: "🥺❤️",
        title: "Yay! 🥰",
        message: "That makes my heart fly! You are the absolute sweetest! ✨"
      }
    },
    {
      id: 2,
      questionText: "Mama, can I give you a big warm hug to make the sadness go away? 🫂🥺",
      yesBtn: "YES, I NEED A HUG 🥺❤️",
      noBtn: "NO HUGS 😤",
      yesResponse: {
        emoji: "🫂✨",
        title: "Sending Infinite Hugs! 💖",
        message: "Wrapping my arms around you tight! I'm so sorry for making you sad baby. I never want to see you hurt! 🥺❤️"
      },
      noResponse: {
        emoji: "🥺❤️",
        title: "Aww come here! 🫂",
        message: "Too bad, hugs are mandatory when my princess is sad! Big warm squeeze coming your way! 🫂✨"
      }
    },
    {
      id: 3,
      questionText: "Mama, will you forgive me if I buy your favorite snacks & treat you like a queen? 🍫👑",
      yesBtn: "FORGIVEN! 👑💖",
      noBtn: "STILL ANGRY! 😤",
      yesResponse: {
        emoji: "🍫👑",
        title: "Treat Time! ✨",
        message: "Yay! You deserve all the sweetness in the world! Snacks, cuddles, and royal treatment incoming! 🍬💖"
      },
      noResponse: {
        emoji: "🥺🍭",
        title: "I won't give up! 🥰",
        message: "Then double the snacks and extra kisses until that beautiful smile comes back! 🍦❤️"
      }
    },
    {
      id: 4,
      questionText: "Mama, will you promise to smile for me right now? Even a little tiny one? 😊✨",
      yesBtn: "PROMISE! 😊❤️",
      noBtn: "NO SMILES! 😠",
      yesResponse: {
        emoji: "😊✨",
        title: "Your Smile is Everything! ❤️",
        message: "There it is! That gorgeous smile is my absolute favorite thing in the universe! 🌍💖"
      },
      noResponse: {
        emoji: "🫣💖",
        title: "I know you're smiling inside! 😜",
        message: "Even your angry cute face melts my heart! I love you so much! 🥰❤️"
      }
    },
    {
      id: 5,
      questionText: "Mama, do you love me? 😘😘",
      yesBtn: "YES ❤️",
      noBtn: "NO 😭",
      yesResponse: {
        emoji: "🥰✨",
        title: "I knew it! ❤️",
        message: "I love you a million times more! You are my whole universe! 🌎💖"
      },
      noResponse: {
        emoji: "😭",
        title: "Awww 🥺 Are you sure?",
        message: "I know you're just teasing me! My love for you is completely unstoppable anyway! 😜❤️"
      }
    },
    {
      id: 6,
      questionText: "Mama, will you go on a date with me? 🌹",
      yesBtn: "YES 🥰",
      noBtn: "NO 🙈",
      yesResponse: {
        emoji: "🥂🌹",
        title: "It's a Date! ✨",
        message: "Get ready for the most romantic day ever! Flowers, sweet smiles, and magical memories await! 💖"
      },
      noResponse: {
        emoji: "🙈",
        title: "Oh really? 😜",
        message: "You can't resist forever! Next date is mandatory hugs & ice cream! 🍨❤️"
      }
    },
    {
      id: 7,
      questionText: "Mama, will you be my forever? 🎶❤️",
      yesBtn: "YES, FOREVER ❤️",
      noBtn: "NO 😭",
      yesResponse: {
        emoji: "💍♾️",
        title: "Forever & Ever! ❤️",
        message: "Holding your hand forever is my dream come true! You are my forever love! ✨"
      },
      noResponse: {
        emoji: "🥺❤️",
        title: "Wait a minute! 🔒",
        message: "Nice try! 'Forever' is already locked into our fate! You're stuck with me! 🔒❤️"
      }
    }
  ],

  // Final Celebration Screen Configuration
  finalScreen: {
    title: "Then it's settled... ❤️",
    math: "You + Me = Forever ♾️",
    quote: "Thank you for being my favorite person. 🥺❤️",
    replayBtnText: "Replay Our Little Love Story 💕"
  }
};

/* ==========================================================================
   APP STATE MACHINE & UI LOGIC
   ========================================================================== */

class RomanticApp {
  constructor(config) {
    this.config = config;
    this.currentStep = 0; // 0 = Opening, 1..N = Questions, N+1 = Final
    this.totalQuestions = config.questions.length;
    this.isPlayingMusic = false;
    this.audioContext = null;

    this.initDOM();
    this.initAudio();
    this.initCanvasHearts();
    this.render();
  }

  initDOM() {
    this.cardWrapper = document.getElementById("cardWrapper");
    this.cardContent = document.getElementById("cardContent");
    this.musicToggleBtn = document.getElementById("musicToggleBtn");
    this.bgAudio = document.getElementById("bgAudio");
    this.footerMessage = document.getElementById("footerMessage");
    this.responseModal = document.getElementById("responseModal");

    // Modal elements
    this.modalEmoji = document.getElementById("modalEmoji");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalMessage = document.getElementById("modalMessage");
    this.modalActionBtn = document.getElementById("modalActionBtn");

    if (this.footerMessage) {
      this.footerMessage.textContent = this.config.footerMessage;
    }

    if (this.musicToggleBtn) {
      this.musicToggleBtn.addEventListener("click", () => this.toggleMusic());
    }

    // Modal action listener
    if (this.modalActionBtn) {
      this.modalActionBtn.addEventListener("click", () => this.closeModalAndAdvance());
    }
  }

  /* ==========================================================================
     AUDIO PLAYER & SYNTHESIZER FALLBACK
     ========================================================================== */

  initAudio() {
    if (this.config.bgMusicUrl) {
      this.bgAudio.src = this.config.bgMusicUrl;
    }

    // Fallback error handler if audio file fails to load
    this.bgAudio.addEventListener("error", () => {
      console.warn("Background audio URL failed to load. Readying Web Audio synth fallback.");
    });
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  playMusic() {
    this.isPlayingMusic = true;
    this.musicToggleBtn.classList.add("playing");
    this.musicToggleBtn.querySelector(".music-text").textContent = "Music Playing 💕";

    if (this.config.bgMusicUrl && this.bgAudio.src) {
      this.bgAudio.play().catch(err => {
        console.log("Audio playback deferred. Playing Web Audio Synth fallback.");
        this.playSynthMelody();
      });
    } else if (this.config.enableAudioSynthFallback) {
      this.playSynthMelody();
    }
  }

  pauseMusic() {
    this.isPlayingMusic = false;
    this.musicToggleBtn.classList.remove("playing");
    this.musicToggleBtn.querySelector(".music-text").textContent = "Play Music 💕";
    if (this.bgAudio) this.bgAudio.pause();
    if (this.synthInterval) clearInterval(this.synthInterval);
  }

  // Gentle Romantic Chimes Ambient Synthesizer using Web Audio API
  playSynthMelody() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }

    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 493.88]; // C, E, G, C5, A, F, G, B
    let index = 0;

    if (this.synthInterval) clearInterval(this.synthInterval);

    this.synthInterval = setInterval(() => {
      if (!this.isPlayingMusic) return;

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(notes[index], this.audioContext.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + 1.8);

      index = (index + 1) % notes.length;
    }, 1200);
  }

  /* ==========================================================================
     FLOATING HEARTS CANVAS ENGINE
     ========================================================================== */

  initCanvasHearts() {
    const canvas = document.getElementById("heartCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 45);

    class HeartParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.hue = Math.floor(Math.random() * 50) + 330; // Soft pink to red/purple
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.6;
        this.rotation += this.rotSpeed;

        if (this.y < -30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 85%, 65%)`;

        // Draw Heart Shape
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
        ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 2, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new HeartParticle());
    }

    // Confetti particles burst collection
    this.confettiParticles = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Render burst confetti
      for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
        const cp = this.confettiParticles[i];
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.vy += 0.12; // gravity
        cp.opacity -= 0.015;

        if (cp.opacity <= 0) {
          this.confettiParticles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = cp.opacity;
          ctx.fillStyle = cp.color;
          ctx.beginPath();
          ctx.arc(cp.x, cp.y, cp.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  // Trigger Heart Confetti Explosion
  triggerConfetti() {
    const colors = ["#ff2a7b", "#ff758c", "#ff7eb3", "#9d4edf", "#ffffff", "#ffd1dc"];
    const originX = window.innerWidth / 2;
    const originY = window.innerHeight / 2 - 50;

    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      this.confettiParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1
      });
    }
  }

  /* ==========================================================================
     UI RENDERING & ROUTING
     ========================================================================== */

  render() {
    if (this.currentDodgeCleanup) {
      this.currentDodgeCleanup();
      this.currentDodgeCleanup = null;
    }

    this.cardContent.classList.remove("fade-in");
    this.cardContent.classList.add("fade-out");

    setTimeout(() => {
      this.cardContent.innerHTML = "";

      if (this.currentStep === 0) {
        this.renderOpeningView();
      } else if (this.currentStep <= this.totalQuestions) {
        this.renderQuestionView(this.currentStep - 1);
      } else {
        this.renderFinalView();
      }

      this.cardContent.classList.remove("fade-out");
      this.cardContent.classList.add("fade-in");
    }, 250);
  }

  // OPENING SCREEN
  renderOpeningView() {
    const { title, subtitle, btnText } = this.config.opening;

    this.cardContent.innerHTML = `
      <div class="pulse-heart" style="margin-bottom: 1rem;">💌</div>
      <h1 class="romantic-title">${title}</h1>
      <p class="subtitle">${subtitle}</p>
      
      <div class="button-group">
        <button id="startBtn" class="btn btn-primary shimmer-btn">
          <span>${btnText}</span>
        </button>
      </div>
    `;

    document.getElementById("startBtn").addEventListener("click", () => {
      // Start music automatically on first user click if preferred
      if (!this.isPlayingMusic) {
        this.playMusic();
      }
      this.currentStep = 1;
      this.render();
    });
  }

  // QUESTIONNAIRE SCREEN
  renderQuestionView(index) {
    const q = this.config.questions[index];
    const progressPct = Math.round(((index + 1) / this.totalQuestions) * 100);

    this.cardContent.innerHTML = `
      <div class="progress-container">
        <div class="progress-header">
          <span>Question ${index + 1} of ${this.totalQuestions}</span>
          <span>${progressPct}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-fill" style="width: ${progressPct}%;">
            <span class="progress-heart-badge">❤️</span>
          </div>
        </div>
      </div>

      <h2 class="question-text">${q.questionText}</h2>

      <div class="button-group horizontal">
        <button id="yesBtn" class="btn btn-primary shimmer-btn">
          <span>${q.yesBtn}</span>
        </button>
        <button id="noBtn" class="btn btn-secondary">
          <span>${q.noBtn}</span>
        </button>
      </div>
    `;

    const noBtn = document.getElementById("noBtn");

    document.getElementById("yesBtn").addEventListener("click", () => {
      this.handleAnswer("YES", q);
    });

    noBtn.addEventListener("click", () => {
      this.handleAnswer("NO", q);
    });

    // Attach evasive dodging mechanism to NO button
    this.setupDodgeNoButton(noBtn, q);
  }

  // Set up evasive "NO" button behavior (moves randomly within the card container)
  setupDodgeNoButton(noBtn, questionObj) {
    if (!this.config.dodgeNoButton) return;

    const playfulPhrases = [
      questionObj.noBtn,
      "Are you sure? 🥺",
      "Wrong button! 😜",
      "Catch me! 🏃‍♀️",
      "Nope! 🙈",
      "Try again! 💖",
      "Click YES! ❤️"
    ];
    let dodgeCount = 0;

    const moveBtn = (e) => {
      if (e && e.type === "touchstart") {
        e.preventDefault();
      }

      const cardRect = this.cardContent.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();

      // Calculate max offset from center to stay safely within card boundaries
      const maxOffsetX = Math.max(20, (cardRect.width / 2) - (btnRect.width / 2) - 15);
      const maxOffsetY = Math.max(20, (cardRect.height / 2) - (btnRect.height / 2) - 15);

      // Pick a random position inside card
      let randomX = (Math.random() - 0.5) * 2 * maxOffsetX;
      let randomY = (Math.random() - 0.5) * 2 * maxOffsetY;

      // Ensure a noticeable movement distance
      if (Math.abs(randomX) < 40) randomX = randomX < 0 ? -80 : 80;
      if (Math.abs(randomY) < 30) randomY = randomY < 0 ? -60 : 60;

      noBtn.style.position = "relative";
      noBtn.style.zIndex = "25";
      noBtn.style.transition = "transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
      noBtn.style.left = "auto";
      noBtn.style.top = "auto";
      noBtn.style.boxShadow = "";

      // Cycle text playfully
      dodgeCount++;
      const span = noBtn.querySelector("span");
      if (span) {
        span.textContent = playfulPhrases[dodgeCount % playfulPhrases.length];
      }
    };

    // Proximity detection on mouse movement inside card
    const onMouseMove = (e) => {
      const rect = noBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 110) {
        moveBtn(e);
      }
    };

    // Event listeners for proximity, hover, touch and click
    noBtn.addEventListener("mouseover", moveBtn);
    noBtn.addEventListener("touchstart", moveBtn, { passive: false });
    this.cardContent.addEventListener("mousemove", onMouseMove);

    // Save cleanup callback when rendering next view
    this.currentDodgeCleanup = () => {
      this.cardContent.removeEventListener("mousemove", onMouseMove);
    };
  }

  // RESPONSE MODAL INTERACTION
  handleAnswer(type, questionObj) {
    const response = type === "YES" ? questionObj.yesResponse : questionObj.noResponse;

    if (type === "YES") {
      this.triggerConfetti();
    }

    this.modalEmoji.textContent = response.emoji;
    this.modalTitle.textContent = response.title;
    this.modalMessage.textContent = response.message;

    this.responseModal.classList.remove("hidden");
  }

  closeModalAndAdvance() {
    this.responseModal.classList.add("hidden");
    this.currentStep += 1;
    this.render();
  }

  // FINAL CELEBRATION SCREEN
  renderFinalView() {
    const { title, math, quote, replayBtnText } = this.config.finalScreen;

    this.triggerConfetti();

    this.cardContent.innerHTML = `
      <div class="celebration-wrapper">
        <h1 class="final-title">${title}</h1>
        <p class="final-math">${math}</p>
        
        <div class="heart-3d-container">
          <div class="sparkle-ring"></div>
          <div class="big-heart-3d">💖</div>
        </div>

        <p class="final-quote">${quote}</p>

        <div class="button-group">
          <button id="replayBtn" class="btn btn-primary shimmer-btn">
            <span>${replayBtnText}</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById("replayBtn").addEventListener("click", () => {
      this.currentStep = 0;
      this.render();
    });
  }
}

// Initialize Application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new RomanticApp(ROMANTIC_CONFIG);
});
