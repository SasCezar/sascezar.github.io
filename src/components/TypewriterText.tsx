import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  titles: string[];
}

export function TypewriterText({ titles }: TypewriterTextProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTitleIndex, titles]);

  return (
    <span className="inline-flex items-center">
      {currentText}
      <span className="inline-block w-0.5 h-[1em] bg-neutral-900 ml-1 animate-pulse"></span>
    </span>
  );
}
