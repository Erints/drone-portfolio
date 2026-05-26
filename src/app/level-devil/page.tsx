"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function LevelDevil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover" | "win">("start");
  const [deathCount, setDeathCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Game Engine Constants
  const GRAVITY = 0.6;
  const JUMP_FORCE = -10;
  const MOVE_SPEED = 5;

  // Level Definitions (Troll Mechanics!)
  const levels = [
    {
      id: 1,
      name: "Looks Easy",
      playerStart: { x: 50, y: 300 },
      goal: { x: 700, y: 320, width: 40, height: 60 },
      platforms: [
        { x: 0, y: 380, w: 800, h: 40, type: "solid" }
      ],
      spikes: [],
      // Troll trigger: Hole opens up right before the door
      troll: (player: any, state: any) => {
        if (player.x > 500 && !state.trolled) {
          state.platforms = [
            { x: 0, y: 380, w: 600, h: 40, type: "solid" },
            { x: 680, y: 380, w: 120, h: 40, type: "solid" } // Gap added!
          ];
          state.trolled = true;
        }
      }
    },
    {
      id: 2,
      name: "Jump?",
      playerStart: { x: 50, y: 300 },
      goal: { x: 700, y: 200, width: 40, height: 60 },
      platforms: [
        { x: 0, y: 380, w: 200, h: 40, type: "solid" },
        { x: 300, y: 300, w: 100, h: 20, type: "solid" },
        { x: 500, y: 250, w: 100, h: 20, type: "solid" },
        { x: 650, y: 260, w: 150, h: 40, type: "solid" }
      ],
      spikes: [],
      // Troll trigger: Spike falls from the sky when jumping to the middle platform
      troll: (player: any, state: any) => {
        if (player.x > 250 && !state.trolled) {
          state.spikes.push({ x: 340, y: 0, w: 20, h: 20, falling: true, vy: 5 });
          state.trolled = true;
        }
      }
    },
    {
      id: 3,
      name: "Trust Issues",
      playerStart: { x: 50, y: 300 },
      goal: { x: 700, y: 320, width: 40, height: 60 },
      platforms: [
        { x: 0, y: 380, w: 800, h: 40, type: "solid" }
      ],
      spikes: [
        { x: 400, y: 360, w: 20, h: 20, falling: false } // Visible spike
      ],
      // Troll trigger: The goal runs away
      troll: (player: any, state: any) => {
        if (player.x > 500 && !state.trolled) {
          state.goal.vy = -5; // Door flies up!
          state.trolled = true;
        }
        if (state.goal.vy) {
          state.goal.y += state.goal.vy;
          // Bring it back down eventually to let them win, or maybe drop them into another hole
          if (state.goal.y < -100) {
             state.platforms = []; // Entire floor disappears!
          }
        }
      }
    }
  ];

  // Game Loop State (Mutable for performance inside requestAnimationFrame)
  const gameStateRef = useRef({
    player: { x: 50, y: 300, w: 20, h: 20, vx: 0, vy: 0, onGround: false },
    keys: { ArrowLeft: false, ArrowRight: false, ArrowUp: false, Space: false },
    level: JSON.parse(JSON.stringify(levels[0])), // Deep copy initial level
    trolled: false
  });

  const loadLevel = (levelIndex: number) => {
    if (levelIndex > levels.length) {
      setGameState("win");
      return;
    }
    setCurrentLevel(levelIndex);
    const newLevel = JSON.parse(JSON.stringify(levels[levelIndex - 1]));
    gameStateRef.current.level = newLevel;
    gameStateRef.current.player = {
      ...gameStateRef.current.player,
      x: newLevel.playerStart.x,
      y: newLevel.playerStart.y,
      vx: 0,
      vy: 0
    };
    gameStateRef.current.trolled = false;
  };

  const handleDeath = () => {
    setDeathCount(prev => prev + 1);
    loadLevel(currentLevel); // Restart current level
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current.keys.hasOwnProperty(e.code)) {
        gameStateRef.current.keys[e.code as keyof typeof gameStateRef.current.keys] = true;
      }
      if (e.code === "Space" && gameState === "start") {
        setGameState("playing");
        loadLevel(1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameStateRef.current.keys.hasOwnProperty(e.code)) {
        gameStateRef.current.keys[e.code as keyof typeof gameStateRef.current.keys] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const gameLoop = () => {
      const state = gameStateRef.current;
      const { player, keys, level } = state;

      // PHYSICS
      player.vy += GRAVITY;

      if (keys.ArrowRight) player.vx = MOVE_SPEED;
      else if (keys.ArrowLeft) player.vx = -MOVE_SPEED;
      else player.vx = 0;

      if ((keys.ArrowUp || keys.Space) && player.onGround) {
        player.vy = JUMP_FORCE;
        player.onGround = false;
      }

      player.x += player.vx;
      player.y += player.vy;

      // COLLISIONS (Platforms)
      player.onGround = false;
      level.platforms.forEach((plat: any) => {
        // Simple AABB Collision
        if (
          player.x < plat.x + plat.w &&
          player.x + player.w > plat.x &&
          player.y < plat.y + plat.h &&
          player.y + player.h > plat.y
        ) {
          // Resolve collision (crude, assuming falling from above)
          if (player.vy > 0 && player.y + player.h - player.vy <= plat.y) {
            player.onGround = true;
            player.vy = 0;
            player.y = plat.y - player.h;
          }
        }
      });

      // DEATH CONDITIONS
      if (player.y > 600) {
        handleDeath();
        return;
      }

      level.spikes.forEach((spike: any) => {
        if (spike.falling) {
            spike.y += spike.vy || 5;
        }
        if (
          player.x < spike.x + spike.w &&
          player.x + player.w > spike.x &&
          player.y < spike.y + spike.h &&
          player.y + player.h > spike.y
        ) {
          handleDeath();
          return;
        }
      });

      // LEVEL DEVIL TROLL TRIGGERS
      if (level.troll) {
        level.troll(player, state.level);
      }

      // GOAL COLLISION
      if (
        player.x < level.goal.x + level.goal.width &&
        player.x + player.w > level.goal.x &&
        player.y < level.goal.y + level.goal.height &&
        player.y + player.h > level.goal.y
      ) {
        loadLevel(currentLevel + 1);
        return;
      }

      // DRAWING
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid (Notebook style)
      ctx.fillStyle = "#fbf9f3";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(37, 99, 235, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Draw Platforms
      ctx.fillStyle = "#2d3748";
      level.platforms.forEach((plat: any) => {
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      });

      // Draw Spikes
      ctx.fillStyle = "#ef4444";
      level.spikes.forEach((spike: any) => {
        ctx.beginPath();
        ctx.moveTo(spike.x + spike.w / 2, spike.y);
        ctx.lineTo(spike.x + spike.w, spike.y + spike.h);
        ctx.lineTo(spike.x, spike.y + spike.h);
        ctx.fill();
      });

      // Draw Goal (Door)
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(level.goal.x, level.goal.y, level.goal.width, level.goal.height);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(level.goal.x + 30, level.goal.y + 30, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Player
      ctx.fillStyle = "#ff67a0";
      ctx.fillRect(player.x, player.y, player.w, player.h);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, currentLevel]);

  return (
    <div className="min-h-screen bg-[#fbf9f3] flex flex-col items-center justify-center font-mono text-[#2d3748] p-4">
      <div className="w-full max-w-4xl flex justify-between items-center mb-4">
         <a href="/" className="text-[#2563eb] hover:underline flex items-center gap-2">
            ← Back to Lab
         </a>
         <div className="flex gap-6">
             <span className="font-bold text-xl">Level: {currentLevel}</span>
             <span className="font-bold text-xl text-red-500">Deaths: {deathCount}</span>
         </div>
      </div>

      <div className="relative border-4 border-[#2563eb] rounded-xl overflow-hidden shadow-[8px_8px_0px_rgba(37,99,235,0.2)] bg-white">
        {gameState === "start" && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-black text-[#2563eb] mb-4 uppercase tracking-tighter">Level Devil</h1>
            <p className="text-xl mb-8 font-semibold">Do you trust your eyes?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameState("playing")}
              className="bg-[#2563eb] text-white px-8 py-3 rounded-full font-bold shadow-lg"
            >
              PRESS SPACE TO START
            </motion.button>
            <p className="mt-8 text-sm text-gray-500">Controls: Arrow Keys to move, UP to jump.</p>
          </div>
        )}

        {gameState === "win" && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-black text-[#2563eb] mb-4">YOU SURVIVED</h1>
            <p className="text-2xl mb-8">Total Deaths: {deathCount}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDeathCount(0);
                setCurrentLevel(1);
                setGameState("start");
              }}
              className="bg-[#2563eb] text-white px-8 py-3 rounded-full font-bold shadow-lg"
            >
              PLAY AGAIN
            </motion.button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="block"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      
      <div className="mt-8 text-center text-sm text-[#4a5568] max-w-2xl">
         <p>Inspired by the infamous "Level Devil" games. The rules change, floors disappear, and doors run away. Good luck, engineer.</p>
      </div>
    </div>
  );
}
