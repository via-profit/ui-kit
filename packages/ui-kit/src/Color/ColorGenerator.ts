import { Color } from './Color';

export class ColorGenerator {
  private static readonly palettes = {
    // Пастельная палитра
    pastel: [
      '#FFB6C1', // Светло-розовый
      '#B0E0E6', // Голубой
      '#C1FFC1', // Мятный
      '#FFDAB9', // Персиковый
      '#E6E6FA', // Лавандовый
      '#FFFACD', // Лимонный
      '#F0E68C', // Хаки
      '#DDA0DD', // Сливовый
      '#FBCEB1', // Абрикосовый
      '#98FB98', // Бледно-зеленый
    ],

    // Яркая палитра
    vibrant: [
      '#FF4D4D', // Ярко-красный
      '#4DFF4D', // Ярко-зеленый
      '#4D4DFF', // Ярко-синий
      '#FFFF4D', // Ярко-желтый
      '#FF4DFF', // Ярко-розовый
      '#4DFFFF', // Циан
      '#FFA64D', // Оранжевый
      '#B84DFF', // Фиолетовый
      '#FF4DA6', // Розовый
      '#4DFFB8', // Бирюзовый
    ],

    // Приглушенная палитра
    muted: [
      '#8B9DC3', // Приглушенный синий
      '#B2C9AB', // Приглушенный зеленый
      '#D3B5B5', // Приглушенный розовый
      '#C9B79C', // Бежевый
      '#9F9FAD', // Серо-синий
      '#B8A99A', // Коричневатый
      '#A7B3A2', // Серо-зеленый
      '#C5AFA0', // Розовато-коричневый
      '#9A9B73', // Оливковый
      '#B79FAD', // Сиреневый
    ],

    // Осенняя палитра
    autumn: [
      '#D2691E', // Шоколадный
      '#8B4513', // Коричневый
      '#B22222', // Кирпичный
      '#CD853F', // Перу
      '#DEB887', // Дуб
      '#F4A460', // Песочный
      '#DAA520', // Золотой
      '#B8860B', // Темно-золотой
      '#A0522D', // Сиена
      '#8B5A2B', // Темно-коричневый
    ],

    // Морская палитра
    ocean: [
      '#006994', // Темно-синий
      '#20B2AA', // Зеленовато-голубой
      '#87CEEB', // Небесно-голубой
      '#4682B4', // Сине-серый
      '#5F9EA0', // Кадетский синий
      '#00CED1', // Бирюзовый
      '#40E0D0', // Бирюзовый светлый
      '#48D1CC', // Средний бирюзовый
      '#AFEEEE', // Бледно-бирюзовый
      '#B0E0E6', // Пудрово-голубой
    ],

    // Лесная палитра
    forest: [
      '#228B22', // Лесной зеленый
      '#32CD32', // Лаймово-зеленый
      '#6B8E23', // Оливково-зеленый
      '#808000', // Оливковый
      '#556B2F', // Темно-оливковый
      '#8FBC8F', // Темно-морской зеленый
      '#2E8B57', // Морской зеленый
      '#3CB371', // Средний морской зеленый
      '#66CDAA', // Средний аквамарин
      '#90EE90', // Светло-зеленый
    ],
  };

  /**
   * Генерирует цвет на основе UUID
   */
  public static fromUuid(
    uuid: string,
    palette: keyof typeof ColorGenerator.palettes = 'pastel',
  ): Color {
    const hash = this.stringToHashCode(uuid);
    const paletteColors = this.palettes[palette];
    const index = Math.abs(hash) % paletteColors.length;

    // Используем публичный фабричный метод вместо конструктора
    return Color.fromString(paletteColors[index]);
  }

  /**
   * Генерирует цвет на основе строки с использованием хеш-функции
   */
  public static fromString(str: string): Color {
    const hash = this.stringToHashCode(str);

    // Генерируем цвет в HSL пространстве для более равномерного распределения
    const h = Math.abs(hash) % 360;
    const s = 60 + (Math.abs(hash >> 8) % 40); // 60-100%
    const l = 40 + (Math.abs(hash >> 16) % 40); // 40-80%

    // Используем публичный фабричный метод вместо конструктора
    return Color.fromString(`hsl(${h}, ${s}%, ${l}%)`);
  }

  /**
   * Генерирует набор цветов для заданной строки (например, для градиентов)
   */
  public static generatePalette(str: string, count: number = 5): Color[] {
    const colors: Color[] = [];
    const baseHash = this.stringToHashCode(str);

    for (let i = 0; i < count; i++) {
      const hash = baseHash + i * 1000;
      const h = (Math.abs(hash) + i * 30) % 360;
      const s = 60 + (Math.abs(hash >> 8) % 40);
      const l = 40 + (Math.abs(hash >> 16) % 40);

      // Используем публичный фабричный метод
      colors.push(Color.fromString(`hsl(${h}, ${s}%, ${l}%)`));
    }

    return colors;
  }

  /**
   * Возвращает доступные палитры
   */
  public static getPalettes() {
    return { ...this.palettes };
  }

  private static stringToHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Преобразуем в 32-битное целое
    }

    return hash;
  }
}

export default ColorGenerator;
