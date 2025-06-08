import Swal from 'sweetalert2';

export const payWithPaystack = ({
  email,
  amount,
  reference,
  onSuccess,
  onClose,
}: {
  email: string;
  amount: number;
  reference?: string;
  onSuccess: (response: any) => void;
  onClose?: () => void;
}) => {
  try {
    const PaystackPop = (window as any).PaystackPop;

    if (!PaystackPop) {
      Swal.fire({
        title: 'Paystack Error',
        text: 'Payment system failed to load. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#db4444',
      });
      return;
    }

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email,
      amount: amount * 100, // convert to kobo
      currency: 'NGN',
      ref: reference || `ORD-${Date.now()}`,
      callback: function (response: any) {
        onSuccess(response);
      },
      onClose: function () {
        onClose?.();
      },
    });

    handler.openIframe();
  } catch (err) {
    console.error('Paystack error:', err);
    Swal.fire({
      title: 'Error',
      text: 'Something went wrong with the payment process.',
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#db4444',
    });
  }
};
