import type { ModuleColor } from '@/types/course';

interface ModuleColorStyles {
  glow: string;
  iconWrap: string;
  subtitle: string;
  stepBadge: string;
}

export const MODULE_COLOR_STYLES: Record<ModuleColor, ModuleColorStyles> = {
  blue: {
    glow: 'bg-blue-600/10 group-hover:bg-blue-600/20',
    iconWrap: 'bg-blue-600/20 text-blue-400',
    subtitle: 'text-blue-400',
    stepBadge: 'bg-blue-600/20 text-blue-400',
  },
  purple: {
    glow: 'bg-purple-600/10 group-hover:bg-purple-600/20',
    iconWrap: 'bg-purple-600/20 text-purple-400',
    subtitle: 'text-purple-400',
    stepBadge: 'bg-purple-600/20 text-purple-400',
  },
  emerald: {
    glow: 'bg-emerald-600/10 group-hover:bg-emerald-600/20',
    iconWrap: 'bg-emerald-600/20 text-emerald-400',
    subtitle: 'text-emerald-400',
    stepBadge: 'bg-emerald-600/20 text-emerald-400',
  },
  orange: {
    glow: 'bg-orange-600/10 group-hover:bg-orange-600/20',
    iconWrap: 'bg-orange-600/20 text-orange-400',
    subtitle: 'text-orange-400',
    stepBadge: 'bg-orange-600/20 text-orange-400',
  },
};
