'use client';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (user.role === 'admin') {
      router.push('/dashboard/admin');
    } else if (user.role === 'teacher') {
      router.push('/dashboard/teacher');
    } else if (user.role === 'student') {
      router.push('/dashboard/student');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow-lg">
        <div className="w-12 h-12 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
        <p className="text-gray-800 text-lg font-medium">Loading dashboard...</p>
      </div>
    </div>
  );
}
