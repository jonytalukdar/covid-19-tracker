import { useState, useEffect, useCallback } from 'react';

function DisplayPosition({ map, center, zoom }) {
  const [position, setPosition] = useState(map.getCenter());

  const onClick = useCallback(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [map, center, zoom]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    onClick();
  }, [center, onClick]);

  return null;
}

export default DisplayPosition;
