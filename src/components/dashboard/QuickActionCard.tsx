import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface QuickActionCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  href: string;
}

/**
 * Composant pour afficher une action rapide sur le tableau de bord
 */
export default function QuickActionCard({
  id,
  title,
  description,
  icon: Icon,
  bgColor,
  iconColor,
  href
}: QuickActionCardProps) {
  return (
    <Link key={id} href={href} className="block">
      <Card className="hover:shadow-md transition-shadow border-transparent hover:border-gray-200">
        <div className="p-4 flex flex-col items-center text-center">
          <div className={`${bgColor} p-3 rounded-full mb-3`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </Card>
    </Link>
  );
} 