'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function DeleteBooking({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await supabase.from('bookings').delete().eq('id', id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Booking deleted successfully');
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
      <Button
        onClick={handleDelete}
        className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
      >
        <Trash2 className="w-4 h-4" />
        <span>Cancel</span>
      </Button>
    </div>
  );
}
