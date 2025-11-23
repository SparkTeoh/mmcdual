/**
 * Lucide Icons Registry
 * 
 * This file imports only the icons used in the codebase.
 * The bundler will tree-shake unused icons, reducing bundle size.
 * 
 * To add a new icon:
 * 1. Import it: import { IconName } from "lucide";
 * 2. Add it to the iconMap object
 */

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  X,
  Play,
  MoveUpLeft,
  UserRoundCheck,
  DollarSign,
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  User,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  ArrowDown,
  Percent,
  XCircle,
  Package,
} from "lucide";

// Map of icon names to their components
export const iconMap: Record<string, any> = {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  X,
  Play,
  MoveUpLeft,
  UserRoundCheck,
  DollarSign,
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  User,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Zap,
  ArrowDown,
  Percent,
  XCircle,
  Package,
};

// Export createElement from lucide
export { createElement } from "lucide";

