# `@mehan/astryx`

Mehan Design System `v1` integration package for Meta Astryx (`@astryxdesign/core`).

## Quick Setup (Zero Bundler Plugins)

```tsx
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@mehan/astryx/fonts.css';
import '@mehan/astryx/themes/mehan-confectionery.css';
import '@mehan/astryx/styles.css';

import {Theme} from '@astryxdesign/core/theme';
import {LayerProvider} from '@astryxdesign/core/Layer';
import {mehanConfectioneryTheme} from '@mehan/astryx/themes/mehan-confectionery';

export function AppProviders({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={mehanConfectioneryTheme} mode="system">
      <LayerProvider>{children}</LayerProvider>
    </Theme>
  );
}
```
