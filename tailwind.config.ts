import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'merriweather': ['Merriweather', 'serif'],
				inter: ['Inter', 'sans-serif'],
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					gold: '#b08d57',
					navy: '#000000',
					light: '#fbfbfb'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: '#fbfbfb',
					gray: '#d6d6d6'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideInRight: {
					'0%': { transform: 'translateX(30px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				slideInLeft: {
					'0%': { transform: 'translateX(-30px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				slideUp: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeIn: 'fadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
				slideInRight: 'slideInRight 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
				slideInLeft: 'slideInLeft 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
				slideUp: 'slideUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards',
				pulse: 'pulse 3s infinite',
				float: 'float 6s ease-in-out infinite',
				scaleIn: 'scaleIn 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
			},
			transitionDuration: {
				'2000': '2000ms',
				'3000': '3000ms',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
