'use strict';

import React from 'react';
import Navigation from './Navigation';

export default function Sidebar(props) {
  return (
    <aside className="sidebar sidebar--collapsed main__sidebar">
      <Navigation {...props} />
    </aside>
  );
}
