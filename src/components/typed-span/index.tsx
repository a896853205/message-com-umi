import { FC, useEffect, useRef } from 'react';

import Typed from 'typed.js';

interface Props {
  strings: string | string[];
}

const TypedSpan: FC<Props> = ({ strings }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let typed: Typed | null = null;
    if (spanRef?.current) {
      typed = new Typed(spanRef.current, {
        strings: Array.isArray(strings) ? strings : [strings],
        typeSpeed: 50,
      });
    }

    return () => {
      typed?.destroy();
    };
  }, [spanRef]);

  return <span ref={spanRef} />;
};

export default TypedSpan;
