'use client';

import React, { useEffect, useRef } from 'react';
import Modal from '@/components/modals/Modal';
import ModalTriggerContainer from '@/components/modals/ModalTriggerContainer';
import { ModalProvider } from '@/context/ModalContext';
import ProductDetailsModal from '@/components/modals/actions/ProductDetailsModal';

const ProductDetailsInterceptor = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // auto-open the modal as soon as this route loads
    triggerRef.current?.click();
  }, []);

  return (
    <ModalProvider>
      <ModalTriggerContainer ref={triggerRef}>
        <></>
      </ModalTriggerContainer>
      <Modal>
        <ProductDetailsModal />
      </Modal>
    </ModalProvider>
  );
};

export default ProductDetailsInterceptor;
