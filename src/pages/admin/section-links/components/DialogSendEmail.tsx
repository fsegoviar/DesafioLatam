import React, { useLayoutEffect, useRef } from 'react';

type DialogCreateLinkTypes = {
  open: boolean;
  close: () => void;
};

export const DialogSendEmail = (props: DialogCreateLinkTypes) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);

  useLayoutEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
  }, [props.open]);

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container"
        id="window-container"
        ref={containerRef}
      ></div>
    </div>
  );
};
