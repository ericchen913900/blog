import React, { useEffect, useRef, useCallback } from 'react';

type Props = { titleText: string; className?: string };

const useTextAnimation = (titleText: string) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const randomText = (amount: number) => {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
    let text = '';
    for (let i = 0; i < amount; i++) {
      text += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return text;
  };

  const animateTitle = useCallback(() => {
    if (!titleRef.current) return;

    const animationInterval = 7000;
    const characterDelay = 200;
    const randomDelay = 50;

    const intervalId = setInterval(() => {
      for (let j = 0; j <= titleText.length; j++) {
        window.setTimeout(() => {
          const current = j;
          for (let k = 0; k <= 5; k++) {
            window.setTimeout(() => {
              const correct = titleText.slice(0, current) + randomText(titleText.length - current);
              if (titleRef.current) {
                titleRef.current.innerText = correct;
              }
            }, randomDelay * k);
          }
        }, characterDelay * j);
      }
    }, animationInterval);

    // cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [titleText]);

  useEffect(() => {
    const off = animateTitle();
    return () => {
      if (typeof off === 'function') off();
    };
  }, [animateTitle]);

  return titleRef;
};

export default function TitleScramble({ titleText, className }: Props) {
  const ref = useTextAnimation(titleText);
  return (
    <h1 ref={ref as any} className={className}>
      {titleText}
    </h1>
  );
}
