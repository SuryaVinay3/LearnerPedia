import React, { useEffect, useState } from 'react';
import { StoreItem } from '../../../types';

export const StoreView: React.FC = () => {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/store');
      if (res.ok) {
        const json = await res.json();
        setItems(json);
      }
    } catch (e) {
      console.error('Failed to fetch store items:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Store & Merch Inventory</h1>
        <p className="text-slate-400 text-xs mt-0.5">Manage digital avatars, theme unlocks, streak shields, and real physical rewards in the LP Store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">Loading store inventory...</p>
        ) : items.length === 0 ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">No inventory items available.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-2xl">{item.icon || '🎁'}</span>
                <span className="font-extrabold text-amber-400 text-xs">{item.price} LP</span>
              </div>
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <p className="text-slate-400 text-xs">{item.description}</p>
              <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-800">
                <span className="uppercase font-mono font-bold text-indigo-400">{item.category}</span>
                <span>In Stock</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
