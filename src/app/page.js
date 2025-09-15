'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Home() {
  const r = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) r.replace('/dashboard');
      else r.replace('/login');
    });
  }, [r]);
  return null;
}
