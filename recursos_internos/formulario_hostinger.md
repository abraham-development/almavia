# Review build settings

| Campo                         | Valor                                            |
| ----------------------------- | ------------------------------------------------ |
| Framework preset              | Next.js |
| Branch                        | `main` |
| Node version                  | 24 |
| Root directory                | `.` (raíz del repositorio) |

# Change build and output settings

| Campo | Valor |
| --- | --- |
| Build command \* | `build:hostinger` (`npm run build:hostinger`) |
| Package manager \* | npm (solo en Hostinger; el desarrollo local conserva pnpm 11.21.0) |
| Output directory \* | `.next` |

# Set environment variables

| Campo | Valor |
| --- | --- |
| Key | `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Value | Configurado directamente en Hostinger; no guardar aquí |
| Key | `NEXT_PUBLIC_SITE_URL` |
| Value | `https://darkgray-shrew-645074.hostingersite.com` hasta conectar el dominio definitivo |
