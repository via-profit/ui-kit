import React from 'react';
import { Link } from 'react-router-dom';

const Introduction: React.FC = () => (
  <>
    <h2>Home</h2>

    <Link to="/docs">Documentation</Link>
  </>
);

export default Introduction;
