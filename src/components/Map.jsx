'use client';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';

export default function Map({ onPick }) {
  const ref = useRef(null);

  useEffect(() => {
    let map;
    (async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      });
      await loader.load();

      map = new google.maps.Map(ref.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });

      const input = document.createElement('input');
      input.placeholder = 'Search location';
      input.className = 'input absolute left-2 top-2 w-72 bg-white';
      ref.current.appendChild(input);

      const ac = new google.maps.places.Autocomplete(input, {
        fields: ['geometry', 'formatted_address'],
      });

      ac.addListener('place_changed', () => {
        const p = ac.getPlace();
        const lat = p.geometry?.location?.lat();
        const lng = p.geometry?.location?.lng();
        if (!lat || !lng) return;

        map.setCenter({ lat, lng });
        onPick({ lat, lng, address: p.formatted_address || '' });
      });
    })();

    return () => {};
  }, [onPick]);

  return (
    <div
      ref={ref}
      className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow bg-slate-200"
    />
  );
}
