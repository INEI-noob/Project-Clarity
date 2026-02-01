// src/components/SEO.jsx
import { useEffect } from 'react';

export const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Project Sapphire` : 'Project Sapphire - Queer Sanctuary';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description || 'A digital sanctuary for the LGBTQ+ community');
  }, [title, description]);
  
  return null;
};