// Interactive Tactical Map Whiteboard for BGMI, Free Fire, and Honor of Kings

export class TacticalWhiteboard {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.currentMap = 'erangel';
    this.currentTool = 'freedraw'; // freedraw, arrow, circle, token, utility
    this.currentColor = '#00f0ff';
    this.brushSize = 4;
    this.selectedToken = 'IGL';
    this.selectedUtility = 'smoke';

    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    
    this.history = [];
    this.historyStep = -1;

    this.tokens = []; // { x, y, label, color, type }
    
    this.initCanvasSize();
    this.bindEvents();
    this.redrawAll();
  }

  initCanvasSize() {
    const container = this.canvas.parentElement;
    const width = container.clientWidth || 800;
    const height = Math.min(width * 0.75, 550);
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setMap(mapName) {
    this.currentMap = mapName;
    this.clearAll();
  }

  setTool(tool) {
    this.currentTool = tool;
  }

  setColor(color) {
    this.currentColor = color;
  }

  setBrushSize(size) {
    this.brushSize = parseInt(size, 10);
  }

  setToken(tokenLabel) {
    this.selectedToken = tokenLabel;
  }

  setUtility(utilityType) {
    this.selectedUtility = utilityType;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.initCanvasSize();
      this.redrawAll();
    });

    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      if (e.touches && e.touches[0]) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    const startDraw = (e) => {
      e.preventDefault();
      const pos = getPos(e);
      this.startX = pos.x;
      this.startY = pos.y;

      if (this.currentTool === 'token') {
        this.addToken(pos.x, pos.y, this.selectedToken, this.currentColor);
        this.saveState();
        return;
      }

      if (this.currentTool === 'utility') {
        this.addUtility(pos.x, pos.y, this.selectedUtility, this.currentColor);
        this.saveState();
        return;
      }

      this.isDrawing = true;
      if (this.currentTool === 'freedraw') {
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
      }
    };

    const draw = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);

      if (this.currentTool === 'freedraw') {
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.brushSize;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
      } else if (this.currentTool === 'arrow' || this.currentTool === 'circle') {
        this.redrawAll();
        if (this.currentTool === 'arrow') {
          this.drawArrow(this.startX, this.startY, pos.x, pos.y, this.currentColor, this.brushSize);
        } else if (this.currentTool === 'circle') {
          this.drawCircle(this.startX, this.startY, pos.x, pos.y, this.currentColor, this.brushSize);
        }
      }
    };

    const stopDraw = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      this.isDrawing = false;
      this.saveState();
    };

    this.canvas.addEventListener('mousedown', startDraw);
    this.canvas.addEventListener('mousemove', draw);
    this.canvas.addEventListener('mouseup', stopDraw);
    this.canvas.addEventListener('mouseleave', stopDraw);

    this.canvas.addEventListener('touchstart', startDraw, { passive: false });
    this.canvas.addEventListener('touchmove', draw, { passive: false });
    this.canvas.addEventListener('touchend', stopDraw, { passive: false });
  }

  drawMapBackground() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);

    // Map background rendering
    if (this.currentMap === 'erangel') {
      this.renderErangelMap(w, h);
    } else if (this.currentMap === 'bermuda') {
      this.renderBermudaMap(w, h);
    } else if (this.currentMap === 'hok_gorge') {
      this.renderHokGorgeMap(w, h);
    }
  }

  renderErangelMap(w, h) {
    // Water
    this.ctx.fillStyle = '#0a233a';
    this.ctx.fillRect(0, 0, w, h);

    // Main island landmass
    this.ctx.fillStyle = '#162822';
    this.ctx.strokeStyle = '#2d5a47';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.roundRect(w * 0.1, h * 0.08, w * 0.8, h * 0.58, 24);
    this.ctx.fill();
    this.ctx.stroke();

    // Military Island
    this.ctx.beginPath();
    this.ctx.roundRect(w * 0.25, h * 0.74, w * 0.5, h * 0.22, 16);
    this.ctx.fill();
    this.ctx.stroke();

    // Bridges
    this.ctx.fillStyle = '#64748b';
    this.ctx.fillRect(w * 0.38, h * 0.66, w * 0.04, h * 0.08); // West Bridge
    this.ctx.fillRect(w * 0.58, h * 0.66, w * 0.04, h * 0.08); // East Bridge

    // River cut
    this.ctx.fillStyle = '#0a233a';
    this.ctx.beginPath();
    this.ctx.ellipse(w * 0.45, h * 0.36, w * 0.25, h * 0.06, -0.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Key Hotspots & Compounds
    this.drawPoi(w * 0.5, h * 0.38, "Pochinki", "#f59e0b");
    this.drawPoi(w * 0.52, h * 0.24, "School", "#38bdf8");
    this.drawPoi(w * 0.45, h * 0.22, "Rozhok", "#10b981");
    this.drawPoi(w * 0.2, h * 0.24, "Georgopol", "#f59e0b");
    this.drawPoi(w * 0.78, h * 0.28, "Yasnaya", "#a855f7");
    this.drawPoi(w * 0.5, h * 0.85, "Military Base", "#ef4444");
    this.drawPoi(w * 0.68, h * 0.84, "Novorepnoye", "#f59e0b");
  }

  renderBermudaMap(w, h) {
    // Ocean
    this.ctx.fillStyle = '#081c2e';
    this.ctx.fillRect(0, 0, w, h);

    // Bermuda Island
    this.ctx.fillStyle = '#1b2c1f';
    this.ctx.strokeStyle = '#386940';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.ellipse(w * 0.5, h * 0.5, w * 0.42, h * 0.44, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // High ground / Peak elevation circle
    this.ctx.fillStyle = '#2d3b25';
    this.ctx.beginPath();
    this.ctx.arc(w * 0.5, h * 0.48, Math.min(w, h) * 0.18, 0, Math.PI * 2);
    this.ctx.fill();

    // POIs
    this.drawPoi(w * 0.5, h * 0.46, "PEAK (High Ground)", "#ef4444");
    this.drawPoi(w * 0.35, h * 0.38, "Clock Tower", "#f59e0b");
    this.drawPoi(w * 0.52, h * 0.68, "Factory", "#38bdf8");
    this.drawPoi(w * 0.64, h * 0.42, "Bimasakti Strip", "#10b981");
    this.drawPoi(w * 0.75, h * 0.32, "Mill", "#a855f7");
    this.drawPoi(w * 0.38, h * 0.68, "Pochinok", "#f59e0b");
  }

  renderHokGorgeMap(w, h) {
    // MOBA Jungle Dark Ground
    this.ctx.fillStyle = '#111827';
    this.ctx.fillRect(0, 0, w, h);

    // Diagonal River
    this.ctx.fillStyle = '#0f3a57';
    this.ctx.beginPath();
    this.ctx.moveTo(w * 0.1, h * 0.9);
    this.ctx.lineTo(w * 0.9, h * 0.1);
    this.ctx.lineTo(w * 0.95, h * 0.15);
    this.ctx.lineTo(w * 0.15, h * 0.95);
    this.ctx.closePath();
    this.ctx.fill();

    // Lanes (Clash Lane Top, Mid Lane Center, Farm Lane Bot)
    this.ctx.strokeStyle = '#475569';
    this.ctx.lineWidth = 14;

    // Mid Lane
    this.ctx.beginPath();
    this.ctx.moveTo(w * 0.15, h * 0.85);
    this.ctx.lineTo(w * 0.85, h * 0.15);
    this.ctx.stroke();

    // Clash / Top Lane
    this.ctx.beginPath();
    this.ctx.moveTo(w * 0.15, h * 0.85);
    this.ctx.lineTo(w * 0.15, h * 0.15);
    this.ctx.lineTo(w * 0.85, h * 0.15);
    this.ctx.stroke();

    // Farm / Bot Lane
    this.ctx.beginPath();
    this.ctx.moveTo(w * 0.15, h * 0.85);
    this.ctx.lineTo(w * 0.85, h * 0.85);
    this.ctx.lineTo(w * 0.85, h * 0.15);
    this.ctx.stroke();

    // Dragon Pits
    this.drawPoi(w * 0.38, h * 0.42, "Shadow Tyrant (Damage)", "#f59e0b");
    this.drawPoi(w * 0.62, h * 0.58, "Shadow Overlord (Waves)", "#a855f7");

    // Bases
    this.drawPoi(w * 0.16, h * 0.84, "Blue Base Nexus", "#38bdf8");
    this.drawPoi(w * 0.84, h * 0.16, "Red Base Nexus", "#ef4444");

    // Lane Labels
    this.ctx.font = '11px Rajdhani';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText("CLASH LANE (Top)", w * 0.18, h * 0.12);
    this.ctx.fillText("MID LANE (Pivot)", w * 0.52, h * 0.48);
    this.ctx.fillText("FARM LANE (Bot/ADC)", w * 0.62, h * 0.88);
  }

  drawPoi(x, y, text, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 11px Rajdhani, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
    this.ctx.shadowBlur = 4;
    this.ctx.fillText(text, x, y - 8);
    this.ctx.shadowBlur = 0;
  }

  drawArrow(fromx, fromy, tox, toy, color, width) {
    const headlen = 14;
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.lineWidth = width;

    this.ctx.beginPath();
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(tox, toy);
    this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawCircle(fromx, fromy, tox, toy, color, width) {
    const radius = Math.hypot(tox - fromx, toy - fromy);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.setLineDash([6, 6]);
    this.ctx.beginPath();
    this.ctx.arc(fromx, fromy, radius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  addToken(x, y, label, color) {
    this.tokens.push({ x, y, label, color, type: 'token' });
    this.redrawAll();
  }

  addUtility(x, y, utilityType, color) {
    this.tokens.push({ x, y, label: utilityType.toUpperCase(), color, type: 'utility', utilityType });
    this.redrawAll();
  }

  renderTokens() {
    this.tokens.forEach(t => {
      this.ctx.save();
      if (t.type === 'token') {
        this.ctx.fillStyle = t.color;
        this.ctx.beginPath();
        this.ctx.arc(t.x, t.y, 14, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.stroke();

        this.ctx.fillStyle = '#000000';
        this.ctx.font = 'bold 10px Chakra Petch, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(t.label.slice(0, 3), t.x, t.y);
      } else if (t.type === 'utility') {
        this.ctx.fillStyle = t.utilityType === 'smoke' ? 'rgba(200, 220, 240, 0.45)' : 'rgba(239, 68, 68, 0.6)';
        this.ctx.beginPath();
        this.ctx.arc(t.x, t.y, 22, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = t.utilityType === 'smoke' ? '#94a3b8' : '#ef4444';
        this.ctx.stroke();

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 9px Rajdhani, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(t.label, t.x, t.y);
      }
      this.ctx.restore();
    });
  }

  saveState() {
    this.historyStep++;
    if (this.historyStep < this.history.length) {
      this.history.length = this.historyStep;
    }
    this.history.push({
      img: this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
      tokens: JSON.parse(JSON.stringify(this.tokens))
    });
  }

  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      const state = this.history[this.historyStep];
      this.ctx.putImageData(state.img, 0, 0);
      this.tokens = JSON.parse(JSON.stringify(state.tokens));
    } else if (this.historyStep === 0) {
      this.historyStep = -1;
      this.clearAll();
    }
  }

  clearAll() {
    this.tokens = [];
    this.history = [];
    this.historyStep = -1;
    this.drawMapBackground();
    this.saveState();
  }

  redrawAll() {
    this.drawMapBackground();
    this.renderTokens();
  }

  exportPlan() {
    const link = document.createElement('a');
    link.download = `tactical_plan_${this.currentMap}_${Date.now()}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }
}
