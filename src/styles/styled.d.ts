import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary?: string;
      secondary?: string;
      background_primary?: string;

      surface?: string;

      text_primary?: string;
      text_secondary?: string;

      border?: string;
    };
  }
}
