# Поддержка тем оформления

Поддержка тем реализована при помощи обёртки над провайдером `ThemeProvider` пакета [@emotion/react](https://emotion.sh/docs/theming).

Прежде всего ваше приложение должно быть, так же как в случае с ванильным @emotion, обёрнуто в специальный компонент-провайдер. Провайдер принимает, в качестве параметра `theme`, объект с заранее подготовленной темой оформления. Прежде чем передавать тему, её необходимо создать:

```tsx
import createTheme from '@via-profit/ui-kit/ThemeProvider/createTheme';
import ThemeProvider from '@via-profit/ui-kit/ThemeProvider';
import Button from '@via-profit/ui-kit/Button';

const Example: React.FC = () => {
  const theme = React.useMemo(
    () =>
      createTheme({
        isDark: false,
        colors: {
          accentPrimary: '#66b13d',
          accentPrimaryContrast: '#FFFFFF',
        },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <Button color="primary">The Button Standard</Button>
      <Button color="primary" variant="outlined">The Button Outlined</Button>
    </ThemeProvider>
  );
};

export default Example;
```

<ExampleThemeProvider>
