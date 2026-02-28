import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

type Props = {
  readonly children: readonly React.ReactNode[];
};

const SliderContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 200px;
  background-color: gray;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  touch-action: pan-y;
  height: 100%;
  user-select: none; /* Предотвращает выделение текста при перетаскивании мышью */
`;

const SliderTrack = styled.div<{ isDragging: boolean }>`
  display: flex;
  height: 100%;
  transition: ${props => (props.isDragging ? 'none' : 'transform 0.3s ease')};
  /* cursor: ${props => (props.isDragging ? 'grabbing' : 'grab')}; */
`;

export const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border: 1px solid #ddd;
  font-size: 24px;
  user-select: none;
  box-sizing: border-box;
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
`;

const ControlButton = styled(Button)`
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Swiper: React.FC<Props> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchCurrent, setTouchCurrent] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const minSwipeDistance = 50;

  // Сброс смещения при изменении индекса
  useEffect(() => {
    if (!isDragging) {
      setDragOffset(0);
    }
  }, [currentIndex, isDragging]);

  // Блокируем контекстное меню на треке во время драга
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, [isDragging]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setTouchStart(clientX);
    setTouchCurrent(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || touchStart === null) return;

    setTouchCurrent(clientX);
    const delta = clientX - touchStart;

    // Вычисляем новое смещение в процентах
    let newOffset = (delta / (sliderRef.current?.offsetWidth || 1)) * 100;

    // Ограничиваем смещение, чтобы нельзя было утащить дальше границ
    const maxDrag = 100; // максимум 100% вправо (предыдущий слайд)
    const minDrag = -100; // минимум -100% влево (следующий слайд)

    // Применяем ограничения
    newOffset = Math.max(minDrag, Math.min(maxDrag, newOffset));

    // Добавляем сопротивление на границах (эффект пружины)
    if (currentIndex === 0 && newOffset > 0) {
      // Сопротивление при попытке утащить первый слайд вправо
      newOffset = newOffset * 0.3;
    } else if (currentIndex === children.length - 1 && newOffset < 0) {
      // Сопротивление при попытке утащить последний слайд влево
      newOffset = newOffset * 0.3;
    }

    setDragOffset(newOffset);
  };

  const handleDragEnd = () => {
    if (!isDragging || touchStart === null || touchCurrent === null) {
      setIsDragging(false);

      return;
    }

    const delta = touchCurrent - touchStart;
    const swipeDistance = Math.abs(delta);

    // Определяем, нужно ли переключать слайд
    if (swipeDistance > minSwipeDistance) {
      if (delta < 0 && currentIndex < children.length - 1) {
        // Свайп влево
        setCurrentIndex(prev => prev + 1);
      } else if (delta > 0 && currentIndex > 0) {
        // Свайп вправо
        setCurrentIndex(prev => prev - 1);
      } else {
        // Если достигнут край, возвращаем с анимацией
        setDragOffset(0);
      }
    } else {
      // Если свайп был слишком коротким, возвращаемся к текущему слайду
      setDragOffset(0);
    }

    setIsDragging(false);
    setTouchStart(null);
    setTouchCurrent(null);
  };

  // Обработчики для сенсорных устройств
  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleDragStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Предотвращаем скролл страницы
    handleDragMove(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    handleDragEnd();
  };

  const onTouchCancel = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Обработчики для мыши (ПК)
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    // Запоминаем начальную позицию мыши
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    handleDragMove(e.clientX);
  };

  const onMouseUp = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const onMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Глобальные обработчики для мыши (чтобы ловить события даже за пределами компонента)
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      handleDragMove(e.clientX);
    };

    const handleGlobalMouseUp = () => {
      handleDragEnd();
    };

    const handleGlobalMouseLeave = () => {
      handleDragEnd();
    };

    // Добавляем глобальные обработчики
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      // Удаляем глобальные обработчики
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, [isDragging, touchStart, touchCurrent, currentIndex]);

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, children.length - 1));
  };

  const goToPrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Вычисляем позицию трека
  const getTrackPosition = () => {
    const basePosition = -currentIndex * 100;
    if (isDragging) {
      return basePosition + dragOffset;
    }

    return basePosition;
  };

  return (
    <SliderContainer>
      <SliderWrapper
        ref={sliderRef}
        // Сенсорные события
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
        // События мыши
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        // Стили для курсора
        // style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <SliderTrack
          ref={trackRef}
          isDragging={isDragging}
          style={{ transform: `translateX(${getTrackPosition()}%)` }}
        >
          {React.Children.map(children, child => (
            <Slide style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>{child}</Slide>
          ))}
        </SliderTrack>
      </SliderWrapper>

      <SliderControls>
        <ControlButton type="button" onClick={goToPrev} disabled={currentIndex === 0}>
          ←
        </ControlButton>
        <span>
          {currentIndex + 1} / {children.length}
        </span>
        <ControlButton
          type="button"
          onClick={goToNext}
          disabled={currentIndex === children.length - 1}
        >
          →
        </ControlButton>
      </SliderControls>
    </SliderContainer>
  );
};

export default Swiper;
