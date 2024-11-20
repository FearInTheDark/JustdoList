import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.{js,jsx,ts,tsx,vue}',
    ],
    theme: {
    	extend: {
    		fontWeight: {
    			minibold: '500'
    		},
    		fontFamily: {
    			sans: ['Figtree', ...defaultTheme.fontFamily.sans],
    			inter: ['Inter', 'sans-serif'],
    			mono: ["Roboto Mono", "monospace"],
    			ui: ["Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
    			montserrat: ["Montserrat", "sans-serif"],
    			tiktok: ["TikTok", "sans-serif"]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			'color-1': 'hsl(var(--color-1))',
    			'color-2': 'hsl(var(--color-2))',
    			'color-3': 'hsl(var(--color-3))',
    			'color-4': 'hsl(var(--color-4))',
    			'color-5': 'hsl(var(--color-5))',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			badge: {
    				DEFAULT: 'hsl(var(--badge-amateur))',
    				amateur: 'hsl(var(--badge-amateur))',
    				beginner: 'hsl(var(--badge-beginner))',
    				intermediate: 'hsl(var(--badge-intermediate))',
    				admin: 'hsl(var(--badge-admin))'
    			}
    		},
    		animation: {
    			rainbow: 'rainbow var(--speed, 2s) infinite linear',
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
    			fadeIn: 'fadeIn 0.5s ease-in-out',
    			fadeOut: 'fadeOut 2s ease-in-out 1s forwards',
    			'spin-slow': 'spin 5s linear infinite',
    			shine: 'shine var(--duration) infinite linear'
    		},
    		keyframes: {
    			rainbow: {
    				'0%': {
    					'background-position': '0%'
    				},
    				'100%': {
    					'background-position': '200%'
    				}
    			},
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			},
    			'code-1': {
    				'0%': {
    					opacity: '0'
    				},
    				'2.5%': {
    					opacity: '1'
    				},
    				'97.5%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'code-2': {
    				'16.2%': {
    					opacity: '0'
    				},
    				'18.75%': {
    					opacity: '1'
    				},
    				'97.5%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'code-3': {
    				'32.5%': {
    					opacity: '0'
    				},
    				'35%': {
    					opacity: '1'
    				},
    				'97.5%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'code-4': {
    				'48.75%': {
    					opacity: '0'
    				},
    				'51.25%': {
    					opacity: '1'
    				},
    				'97.5%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'code-5': {
    				'65%': {
    					opacity: '0'
    				},
    				'72.5%': {
    					opacity: '1'
    				},
    				'97.5%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			'code-6': {
    				'81.25%': {
    					opacity: '0'
    				},
    				'83.75%': {
    					opacity: '1'
    				},
    				'97.5%': {
    					opacity: '1'
    				},
    				'100%': {
    					opacity: '0'
    				}
    			},
    			breath: {
    				'0%, 100%': {
    					transform: 'scale(0.95)'
    				},
    				'50%': {
    					transform: 'scale(1.1)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-5%)'
    				}
    			},
    			line: {
    				'0%, 100%': {
    					left: '0',
    					opacity: '0'
    				},
    				'50%': {
    					left: '100%',
    					transform: 'translateX(-100%)'
    				},
    				'10%, 40%, 60%, 90%': {
    					opacity: '0'
    				},
    				'25%, 75%': {
    					opacity: '1'
    				}
    			},
    			'infinite-scroll': {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(-100%)'
    				}
    			},
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			},
    			fadeIn: {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			fadeOut: {
    				'0%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				},
    				'100%': {
    					opacity: '0',
    					transform: 'scale(0.8)'
    				}
    			},
    			shine: {
    				'0%': {
    					'background-position': '0% 0%'
    				},
    				'50%': {
    					'background-position': '100% 100%'
    				},
    				to: {
    					'background-position': '0% 0%'
    				}
    			}
    		},
    		dropShadow: {
    			custom: '0 4px 3px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.06)',
    			'custom-blue': '0 4px 3px rgba(0, 0, 255, 0.3)',
    			'custom-red': '0 4px 3px rgba(255, 0, 0, 0.3)'
    		},
    		screens: {
    			'h-sm': {
    				raw: '(min-height: 640px)'
    			},
    			'h-md': {
    				raw: '(min-height: 768px)'
    			},
    			'h-lg': {
    				raw: '(min-height: 1024px)'
    			},
                'xxl': {
                    raw: '(min-width: 1400px)'
                }
    		},
            maxWidth: {
                'task-dialog': 'min(48rem, 80%)',
            }
    	}
    },
    plugins: [
        require("tailwindcss-animate"),
        require('daisyui'),
        require('tailwind-scrollbar-hide')
    ],
};
