/* ==========================================================================
   UNDERDOG ESPORTS ACADEMY - SUPABASE CLOUD & REALTIME MODULE
   Cross-Device Cloud Sync, Multiplayer Tactical Rooms & Live Scrims
   ========================================================================== */

(function () {
  'use strict';

  class UnderdogSupabase {
    constructor() {
      this.client = null;
      this.activeChannel = null;
      this.scrimChannel = null;
      this.isConnected = false;
      this.config = this.loadConfig();

      if (this.config.url && this.config.anonKey) {
        this.init(this.config.url, this.config.anonKey);
      }
    }

    loadConfig() {
      try {
        const saved = localStorage.getItem('underdog_supabase_config');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved supabase config:', e);
      }
      return {
        url: 'https://iwggpixdxhdetncnossa.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Z2dwaXhkeGhkZXRuY25vc3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDE3MDUsImV4cCI6MjEwNTQxNzcwNX0.LYQaNMtFngED1TqvbujkWkX3qNfIxXntzysg_qkaLtI'
      };
    }

    saveConfig(url, anonKey) {
      this.config = { url: url.trim(), anonKey: anonKey.trim() };
      localStorage.setItem('underdog_supabase_config', JSON.stringify(this.config));
      return this.init(this.config.url, this.config.anonKey);
    }

    init(url, anonKey) {
      if (!window.supabase || !window.supabase.createClient) {
        console.warn('Supabase JS library not loaded in window.supabase');
        return false;
      }
      try {
        this.client = window.supabase.createClient(url, anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          },
          realtime: {
            params: {
              eventsPerSecond: 15
            }
          }
        });
        this.isConnected = true;
        console.log('⚡ Underdog Supabase Client Initialized:', url);
        this.updateStatusBadge(true);
        return true;
      } catch (err) {
        console.error('Supabase init failed:', err);
        this.isConnected = false;
        this.updateStatusBadge(false);
        return false;
      }
    }

    updateStatusBadge(connected) {
      const badge = document.getElementById('cloudStatusBadge');
      const dot = document.getElementById('cloudStatusDot');
      const text = document.getElementById('cloudStatusText');
      if (badge && dot && text) {
        if (connected) {
          badge.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-sub font-bold uppercase tracking-wider cursor-pointer hover:bg-emerald-500/20 transition-all';
          dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
          text.textContent = 'Cloud Live 🟢';
        } else {
          badge.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-sub font-bold uppercase tracking-wider cursor-pointer hover:bg-amber-500/20 transition-all';
          dot.className = 'w-2 h-2 rounded-full bg-amber-400';
          text.textContent = 'Local Mode 🟡';
        }
      }
    }

    // --- REALTIME SQUAD TACTICAL ROOM ---
    joinTacticalRoom(roomCode, onActionReceived) {
      if (!this.client) return null;
      if (this.activeChannel) {
        this.client.removeChannel(this.activeChannel);
      }

      const channelName = `squad_room_${roomCode.toUpperCase()}`;
      console.log(`Connecting to Tactical Room: ${channelName}`);

      this.activeChannel = this.client.channel(channelName, {
        config: { broadcast: { self: false } }
      });

      this.activeChannel
        .on('broadcast', { event: 'tactical_action' }, (payload) => {
          if (typeof onActionReceived === 'function') {
            onActionReceived(payload.payload);
          }
        })
        .subscribe((status) => {
          console.log(`Tactical room [${roomCode}] status:`, status);
        });

      return this.activeChannel;
    }

    broadcastTacticalAction(actionType, data) {
      if (!this.activeChannel) return;
      this.activeChannel.send({
        type: 'broadcast',
        event: 'tactical_action',
        payload: {
          action: actionType,
          data: data,
          sender: window.app?.currentUser?.ign || 'Teammate',
          timestamp: Date.now()
        }
      }).catch(err => console.error('Broadcast tactical action error:', err));
    }

    leaveTacticalRoom() {
      if (this.activeChannel && this.client) {
        this.client.removeChannel(this.activeChannel);
        this.activeChannel = null;
      }
    }

    // --- REALTIME SCRIM LOBBY ---
    joinScrimLobby(lobbyCode, onScoreUpdate) {
      if (!this.client) return null;
      if (this.scrimChannel) {
        this.client.removeChannel(this.scrimChannel);
      }

      const channelName = `scrim_lobby_${lobbyCode.toUpperCase()}`;
      this.scrimChannel = this.client.channel(channelName, {
        config: { broadcast: { self: false } }
      });

      this.scrimChannel
        .on('broadcast', { event: 'scrim_update' }, (payload) => {
          if (typeof onScoreUpdate === 'function') {
            onScoreUpdate(payload.payload);
          }
        })
        .subscribe((status) => {
          console.log(`Scrim lobby [${lobbyCode}] status:`, status);
        });

      return this.scrimChannel;
    }

    broadcastScrimUpdate(lobbyData) {
      if (!this.scrimChannel) return;
      this.scrimChannel.send({
        type: 'broadcast',
        event: 'scrim_update',
        payload: {
          lobby: lobbyData,
          sender: window.app?.currentUser?.ign || 'Host',
          timestamp: Date.now()
        }
      }).catch(err => console.error('Broadcast scrim update error:', err));
    }

    // --- CLOUD USER DATA PERSISTENCE ---
    async saveUserDataToCloud(userId, dataType, payload) {
      if (!this.client) return false;
      try {
        const { error } = await this.client
          .from('user_cloud_data')
          .upsert({
            user_id: userId,
            data_type: dataType,
            payload: payload,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id,data_type' });

        if (error) throw error;
        console.log(`Saved ${dataType} to Supabase cloud!`);
        return true;
      } catch (err) {
        console.warn('Cloud save error:', err.message);
        return false;
      }
    }

    async loadUserDataFromCloud(userId, dataType) {
      if (!this.client) return null;
      try {
        const { data, error } = await this.client
          .from('user_cloud_data')
          .select('payload')
          .eq('user_id', userId)
          .eq('data_type', dataType)
          .single();

        if (error) return null;
        return data?.payload || null;
      } catch (err) {
        console.warn('Cloud load error:', err.message);
        return null;
      }
    }
  }

  // Expose globally
  window.underdogSupabase = new UnderdogSupabase();
})();
