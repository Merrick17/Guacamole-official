import { useEffect, useLayoutEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { GrClose } from 'react-icons/gr';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const appear = keyframes`
  0% { opacity: 0; transform: scale(.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const Wrapper = styled.div`
  h1 {
    text-align: center;
  }
  position: relative;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1040;
  padding: 0;
  border: none;
  background: #10141f;
  color: white;
  width: 100%;
  height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.4em;
  }
  &::-webkit-scrollbar-thumb {
    bg-color: #cccccc33;
  }
  animation: ${appear} 0.1s;
  @media (min-height: 460px) {
    width: 320px;
    height: 420px;
    border-radius: 10px;
  }
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: red;
`;

function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // document.body.style.overflow = 'scroll'
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}

function useOnClickOutside(
  ref: any,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export function Modal({
  children,
  onClose,
}: React.PropsWithChildren<{ onClose: () => void }>) {
  const ref = useRef<HTMLDivElement>(null!);

  useOnClickOutside(ref, onClose);
  useLockBodyScroll();

  return (
    // <Container className="gamba-connect-modal-container">
    //   <Wrapper className="gamba-connect-modal" ref={ref}>
    //     <div
    //       className="text-lg text-white absolute right-2 top-2 cursor-pointer"
    //       onClick={onClose}
    //     >
    //       <GrClose className="text-white" color="white" />
    //     </div>
    //     {children}
    //   </Wrapper>
    // </Container>
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
