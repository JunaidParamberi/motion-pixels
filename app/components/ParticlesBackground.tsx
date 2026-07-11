"use client";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  Engine,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // using slim version of tsparticles

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canRun =
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canRun);
  }, []);

  // this should be run only once per application lifetime
  useEffect(() => {
    if (!enabled) return;

    initParticlesEngine(async (engine: Engine) => {
      // load the slim version to reduce the bundle size
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [enabled]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    void container;
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent", // Dark blue background
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push", // Push particles on click
          },
          onHover: {
            enable: false,
            mode: "grab", // Repulse particles on hover
          },
        },
        modes: {
          push: {
            quantity: 4, // Push 4 particles at a time
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#fff", // White particles
        },
        links: {
          color: "#ffffff", // Link color
          distance: 150, // Link distance
          enable: false, // Enable linking particles
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out, // Particles move out of bounds
          },
          random: false,
          speed: { min: 0.5, max: 1 },
          straight: false,
        },
        number: {
          density: {
            enable: true, // Enable particle density
            area: 800,
          },
          value: 120,
        },
        opacity: {
          value: 0.5, // Particle opacity
        },
        shape: {
          type: ["circle", "square", "triangle"],
        },
        size: {
          value: { min: 0.5, max: 3 }, // Smaller size range
          random: true,
        },
      },
      detectRetina: false,
    }),
    []
  );

  // Only render the particles if initialized
  return init && enabled ? (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  ) : (
    <></>
  );
};

export default ParticlesBackground;
