import React from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">    
  <p>Mac Address: {name}</p>
    </div>
  );
};

export default ExploreContainer;
