import "./index.css";
import { Composition } from "remotion";
import { HeroLoop, heroLoopSchema, SLIDE_FRAMES, type HeroLoopProps } from "./HeroLoop";

// Imágenes generadas con APIMart (scripts/generate-images.mjs → video/public/images).
const images = ["images/hero-esencia.jpg", "images/hero-ritual.jpg", "images/espacio.jpg"];
const FPS = 30;
const duration = images.length * SLIDE_FRAMES; // 10,5 s

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        schema={heroLoopSchema}
        durationInFrames={duration}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ images, focus: "65% center" } satisfies HeroLoopProps}
      />
      <Composition
        id="HeroLoopPortrait"
        component={HeroLoop}
        schema={heroLoopSchema}
        durationInFrames={duration}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ images, focus: "70% center" } satisfies HeroLoopProps}
      />
    </>
  );
};
