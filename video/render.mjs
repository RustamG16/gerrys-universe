// Renders every composition to ../public/media as <id>.mp4 plus a poster frame (<id>-poster.jpg).
import { execSync } from 'node:child_process';

const comps = [
  ['Intro', 'universe-intro', 120],
  ['Speedrun', 'speedrun', 250],
  ['Mission', 'mission-timeline', 340],
];
for (const [id, file, posterFrame] of comps) {
  execSync(`npx remotion render src/index.jsx ${id} ../public/media/${file}.mp4 --codec=h264 --crf=26`, { stdio: 'inherit' });
  execSync(`npx remotion still src/index.jsx ${id} ../public/media/${file}-poster.jpg --frame=${posterFrame} --image-format=jpeg --jpeg-quality=82`, { stdio: 'inherit' });
}
