import React, { useState } from 'react';
import Collapse from './collapse';
import Fade from './fade';
import Grow from './grow';

export default { title: 'Transitions' };

export const CollapseStory = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <button onClick={() => setCollapsed(prev => !prev)}>toggle</button>
      <Collapse in={collapsed} collapsedHeight={40}>
        <div style={{ backgroundColor: 'black', width: 100, height: 100 }} />
      </Collapse>
    </div>
  );
};

CollapseStory.story = {
  name: 'Collapse'
};

export const FadeStory = () => {
  const [faded, setFaded] = useState(false);

  return (
    <div>
      <button onClick={() => setFaded(prev => !prev)}>toggle</button>
      <Fade in={faded}>
        <div style={{ backgroundColor: 'black', width: 100, height: 100 }} />
      </Fade>
    </div>
  );
};

FadeStory.story = {
  name: 'Fade'
};

export const GrowStory = () => {
  const [growed, setGrowed] = useState(false);

  return (
    <div>
      <button onClick={() => setGrowed(prev => !prev)}>toggle</button>
      <Grow in={growed}>
        <div style={{ backgroundColor: 'black', width: 100, height: 100 }} />
      </Grow>
      <br />
      <Grow in={growed} style={{ transformOrigin: '0 0 0' }} timeout={growed ? 1000 : undefined}>
        <div style={{ backgroundColor: 'black', width: 100, height: 100 }} />
      </Grow>
    </div>
  );
};

GrowStory.story = {
  name: 'Grow'
};
