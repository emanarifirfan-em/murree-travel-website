import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Compass, 
  MapPin, 
  Wind, 
  Maximize2, 
  ArrowRight,
  SunMedium,
  Layers
} from 'lucide-react';

interface VideoScene {
  id: string;
  title: string;
  location: string;
  altitude: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  highlight: string;
}

const MURREE_SCENES: VideoScene[] = [
  {
    id: 'misty-pine',
    title: 'Morning Fog Across Pine Ridges',
    location: 'Mukshpuri Ridge & Nathia Gali',
    altitude: '2,800 m / 9,200 ft',
    description: 'Soft Himalayan morning mist creeping through blue pine and cedar canopies across the Galiyat ridge.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-fog-over-the-pine-trees-42512-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Blue Pine Canopies'
  },
  {
    id: 'winter-snow',
    title: 'High-Altitude Snowfall Horizon',
    location: 'Kashmir Point & Dunga Gali',
    altitude: '2,350 m / 7,710 ft',
    description: 'Fresh powdery snow gently blanketing centuries-old cedar and fir forests in quiet mountain seclusion.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pine-trees-in-a-forest-covered-in-snow-40366-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Winter Snowline'
  },
  {
    id: 'mountain-highway',
    title: 'The Pine Avenue Road Ascent',
    location: 'Murree Expressway (N-75) & Bank Road',
    altitude: '1,950 m – 2,291 m',
    description: 'The scenic climb ascending from Islamabad through Charra Pani and Tret up into the cool mountain air.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-road-surrounded-by-pine-trees-41484-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Expressway Ascent'
  },
  {
    id: 'valley-clouds',
    title: 'Rolling Cloud Inversion Over Bhurban',
    location: 'Bhurban Valley & Pir Panjal View',
    altitude: '1,850 m / 6,070 ft',
    description: 'A sea of white clouds settling softly in the valleys below, opening toward the snow peaks of Azad Kashmir.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-over-a-mountain-valley-41486-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Valley Cloud Inversion'
  }
];

interface MurreeCinemaShowcaseProps {
  onPlanTrip?: () => void;
}

export const MurreeCinemaShowcase: React.FC<MurreeCinemaShowcaseProps> = ({ onPlanTrip }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeScene = MURREE_SCENES[activeSceneIndex];

  // Soft ambient alpine wind synthesizer when unmuted
  useEffect(() => {
    if (!isMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioContextRef.current) {
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          // Gentle white/pink noise simulation of mountain wind breeze
          const bufferSize = ctx.sampleRate * 2;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.04;
          }

          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          noise.loop = true;

          // Low pass filter for soft breeze tone
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 280;

          const gain = ctx.createGain();
          gain.gain.value = 0.15;
          gainNodeRef.current = gain;

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start();
        } else if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      } catch (err) {
        console.warn('Web Audio ambient breeze initialization deferred:', err);
      }
    } else {
      if (audioContextRef.current && audioContextRef.current.state === 'running') {
        audioContextRef.current.suspend();
      }
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSelectScene = (index: number) => {
    setActiveSceneIndex(index);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section id="cinema-showcase" className="relative w-full py-20 bg-[#f4f8f5] overflow-hidden border-t border-b border-[#d8e4dc]">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-emerald-100/50 via-teal-50/20 to-transparent pointer-events-none rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-[#a87920] mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#c49838]" />
              <span>THE HIGHLAND CINEMA EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122319] font-normal leading-tight">
              Atmospheric Murree & Galiyat
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#475e52] max-w-2xl font-light leading-relaxed">
              Experience the living alpine soul of Murree — morning mist weaving through blue pines, fresh high-altitude snowline, and quiet mountain horizons.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="mt-5 md:mt-0 flex items-center space-x-3 text-xs text-[#2b4235] bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#d6e2db] shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold">{activeScene.location}</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-[#a87920] font-bold">{activeScene.altitude}</span>
          </div>
        </div>

        {/* Video Cinema Stage */}
        <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl border border-[#d2dfd7] bg-[#122219] group">
          {/* Main Looping Video */}
          <video
            ref={videoRef}
            key={activeScene.id}
            src={activeScene.videoUrl}
            poster={activeScene.posterUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center transition-opacity duration-1000"
          />

          {/* Soft cinematic vignette gradient over video */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c14]/90 via-[#0d1c14]/25 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1c14]/50 via-transparent to-transparent pointer-events-none"></div>

          {/* Top Floating Telemetry Overlay */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[#122319] text-xs font-semibold shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span className="tracking-wider uppercase text-[11px] font-mono">LIVE AESTHETIC CAPTURE</span>
            </div>

            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-light border border-white/20">
              <Wind className="w-3.5 h-3.5 text-emerald-300" />
              <span>Alpine Forest Breeze • 13°C Current</span>
            </div>
          </div>

          {/* Bottom Floating Information & Controls */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl text-white">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#f3cf7e] uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeScene.location}</span>
                <span>•</span>
                <span>{activeScene.highlight}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white drop-shadow-md">
                {activeScene.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-200/90 font-light line-clamp-2 leading-relaxed">
                {activeScene.description}
              </p>
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center space-x-2.5 self-start md:self-end">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/90 hover:bg-white text-[#122319] shadow-lg transition-transform active:scale-95 cursor-pointer"
                title={isPlaying ? "Pause Cinema" : "Play Cinema"}
                aria-label={isPlaying ? "Pause Cinema" : "Play Cinema"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                  !isMuted 
                    ? 'bg-[#c49838] text-white border-[#f3cf7e]' 
                    : 'bg-black/40 hover:bg-black/60 text-white border-white/20'
                }`}
                title={isMuted ? "Unmute Alpine Atmosphere" : "Mute Sound"}
                aria-label="Toggle ambient mountain sound"
              >
                {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {onPlanTrip && (
                <button
                  onClick={onPlanTrip}
                  className="px-4 py-2.5 rounded-full bg-[#1b3e2b] hover:bg-[#255239] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Experience This</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scene Selection Carousel Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {MURREE_SCENES.map((scene, idx) => {
            const isSelected = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => handleSelectScene(idx)}
                className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white border-[#c49838] shadow-md ring-2 ring-[#c49838]/20'
                    : 'bg-white/70 hover:bg-white border-[#dce6df] hover:border-[#b8cfc2] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                  <span className={isSelected ? 'text-[#a87920] font-bold' : 'text-[#6b8577]'}>
                    SCENE 0{idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-400">{scene.altitude.split('/')[0]}</span>
                </div>
                <div className="font-medium text-xs sm:text-sm text-[#14261c] group-hover:text-[#18422d] line-clamp-1">
                  {scene.title}
                </div>
                <div className="text-[11px] text-[#5e776a] line-clamp-1 mt-0.5">
                  {scene.location.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
