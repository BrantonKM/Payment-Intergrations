import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-white border-t mt-6">
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 text-center">
        Boutique Payments Demo • Built with React + Tailwind • {new Date().getFullYear()}
      </div>
    </footer>
  );
}
