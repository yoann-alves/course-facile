import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { THEME } from '@/lib/constants';

export interface NavigationItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  description?: string;
  isCollapsed?: boolean;
  badgeCount?: number;
  badgeVariant?: 'default' | 'secondary' | 'outline' | 'destructive';
  onClick?: () => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  exactMatch?: boolean;
}

/**
 * Composant réutilisable pour les éléments de navigation
 */
export default function NavigationItem({
  href,
  icon: Icon,
  label,
  description,
  isCollapsed = false,
  badgeCount,
  badgeVariant = 'default',
  onClick,
  className,
  activeClassName,
  inactiveClassName,
  exactMatch = false,
}: NavigationItemProps) {
  const pathname = usePathname();
  const isActive = exactMatch 
    ? pathname === href 
    : pathname.startsWith(href) && href !== '/' ? true : pathname === href;

  const itemContent = (
    <div
      className={cn(
        'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? `bg-${THEME.PRIMARY}-50 text-${THEME.PRIMARY}-600 dark:bg-${THEME.PRIMARY}-900/20 dark:text-${THEME.PRIMARY}-400`
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
        isActive && activeClassName,
        !isActive && inactiveClassName,
        className
      )}
      onClick={onClick}
    >
      <Icon
        className={cn(
          'mr-2 h-5 w-5 shrink-0',
          isActive
            ? `text-${THEME.PRIMARY}-600 dark:text-${THEME.PRIMARY}-400`
            : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'
        )}
        aria-hidden="true"
      />
      {!isCollapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badgeCount !== undefined && (
            <Badge variant={badgeVariant} className="ml-auto">
              {badgeCount}
            </Badge>
          )}
        </>
      )}
    </div>
  );

  // Si le menu est réduit, afficher un tooltip avec le label
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link href={href} className="block">
              {itemContent}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            <div>
              <p className="font-medium">{label}</p>
              {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
            {badgeCount !== undefined && (
              <Badge variant={badgeVariant}>{badgeCount}</Badge>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Sinon, afficher le lien normal
  return <Link href={href}>{itemContent}</Link>;
} 