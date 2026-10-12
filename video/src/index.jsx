import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Mission } from './Mission.jsx';
import { Intro } from './Intro.jsx';

function Root() {
  return (
    <>
      <Composition id="Intro" component={Intro} durationInFrames={180} fps={30} width={1920} height={1080} />
      <Composition id="Mission" component={Mission} durationInFrames={360} fps={30} width={1920} height={1080} />
    </>
  );
}

registerRoot(Root);
