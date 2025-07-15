export interface Theme {
  name: string
  colors: {
    background: string
    card: string
    text: string
    textMuted: string
    primary: string
    secondary: string
    accent: string
    border: string
    hover: string
  }
  gradients?: {
    background?: string
    card?: string
  }
  animations?: {
    duration?: string
    easing?: string
  }
}
