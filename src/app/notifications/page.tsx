'use client';

import React from 'react';
import { Bell, AlertTriangle, Info, ArrowRight, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { expirationItems, isExpiringSoon, isExpired } from '@/data/expiration-items';
import Link from 'next/link';

export default function NotificationsPage() {
  // Filtrer les produits qui expirent bientôt ou sont expirés
  const expiringSoonItems = expirationItems.filter(item => isExpiringSoon(item));
  const expiredItems = expirationItems.filter(item => isExpired(item));
  
  // Déterminer le niveau d'alerte pour les péremptions
  const hasExpiredItems = expiredItems.length > 0;
  const hasExpiringSoonItems = expiringSoonItems.length > 0;
  
  // Créer un tableau de notifications
  const notifications = [];
  
  // Ajouter la notification pour les produits périmés si nécessaire
  if (hasExpiredItems) {
    notifications.push({
      id: 'expired',
      title: 'Attention : Produits périmés',
      message: `${expiredItems.length} produit${expiredItems.length > 1 ? 's' : ''} périmé${expiredItems.length > 1 ? 's' : ''}`,
      icon: AlertTriangle,
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
      iconBgClass: 'bg-red-100',
      iconColorClass: 'text-red-600',
      textColorClass: 'text-red-600',
      actionColorClass: 'text-red-600',
      href: '/manage-expirations',
      date: new Date().toISOString()
    });
  }
  
  // Ajouter la notification pour les produits qui arrivent à expiration si nécessaire
  if (hasExpiringSoonItems) {
    notifications.push({
      id: 'expiring-soon',
      title: 'Alerte : Bientôt périmés',
      message: `${expiringSoonItems.length} produit${expiringSoonItems.length > 1 ? 's' : ''} arrive${expiringSoonItems.length > 1 ? 'nt' : ''} à expiration`,
      icon: Bell,
      bgClass: 'bg-amber-50',
      borderClass: 'border-amber-200',
      iconBgClass: 'bg-amber-100',
      iconColorClass: 'text-amber-600',
      textColorClass: 'text-amber-600',
      actionColorClass: 'text-amber-600',
      href: '/manage-expirations',
      date: new Date().toISOString()
    });
  }
  
  // Exemple de notification informative (pour démonstration)
  notifications.push({
    id: 'info-example',
    title: 'Information',
    message: 'Bienvenue dans votre centre de notifications',
    icon: Info,
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    iconBgClass: 'bg-green-100',
    iconColorClass: 'text-green-600',
    textColorClass: 'text-green-600',
    actionColorClass: 'text-green-600',
    href: '#',
    date: new Date(Date.now() - 86400000).toISOString() // 1 jour avant
  });

  // Trier les notifications par date (les plus récentes en premier)
  notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Centre de notifications</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">{notifications.length} notification{notifications.length > 1 ? 's' : ''}</span>
              {notifications.length > 0 && (
                <Button variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Tout marquer comme lu
                </Button>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">Aucune notification</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Vous n&apos;avez aucune notification pour le moment. Les alertes importantes apparaîtront ici.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${notification.borderClass}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className={`${notification.iconBgClass} p-2 rounded-full mr-4 shrink-0`}>
                        {React.createElement(notification.icon, { className: `w-5 h-5 ${notification.iconColorClass}` })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-800">{notification.title}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.date).toLocaleDateString('fr-FR', { 
                              day: 'numeric', 
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className={`text-sm ${notification.textColorClass}`}>
                          {notification.message}
                        </p>
                        <div className="mt-3 flex justify-between items-center">
                          <Link href={notification.href} className="inline-flex items-center">
                            <Button variant="ghost" size="sm" className={notification.actionColorClass}>
                              Voir les détails
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 