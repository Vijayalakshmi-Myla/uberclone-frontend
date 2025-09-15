'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!data && !error) return;

      if (!data) {
        await supabase
          .from('profiles')
          .insert({ user_id: user.id, full_name: user.email });

        const { data: p } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setProfile(p);
      } else {
        setProfile(data);
      }
    })();
  }, []);

  const save = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        avatar_url: profile.avatar_url,
      })
      .eq('user_id', profile.user_id);

    if (error) alert(error.message);
  };

  if (!profile) return <div className="p-6 text-black">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="card space-y-3">
        <h2 className="text-xl font-semibold text-blue-900">Your Profile</h2>
        <input
          className="input"
          value={profile.full_name ?? ''}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          placeholder="Full name"
        />
        <input
          className="input"
          value={profile.phone ?? ''}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          placeholder="Phone"
        />
        <input
          className="input"
          value={profile.avatar_url ?? ''}
          onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
          placeholder="Avatar URL"
        />
        <div className="flex gap-2">
          <button className="btn" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
