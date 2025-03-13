'use client';

import React from 'react';
import { Bell, ArrowRight, X, Check } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useNotifications } from '@/contexts/NotificationContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Centre de notifications</h1>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">{notifications.length} notification{notifications.length > 1 ? 's' : ''}</span>
              {notifications.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={markAllAsRead}
                >
                  <Check className="w-4 h-4 mr-2" />
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
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-2">Aucune notification</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Vous n&apos;avez aucune notification pour le moment. Les alertes importantes apparaîtront ici.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-l-4 ${notification.borderClass} ${notification.read ? 'opacity-70' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className={`${notification.iconBgClass} p-2 rounded-full mr-4 shrink-0`}>
                        {React.createElement(notification.icon, { className: `w-5 h-5 ${notification.iconColorClass}` })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">
                            {notification.title}
                            {notification.read && (
                              <span className="ml-2 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                Lu
                              </span>
                            )}
                          </h3>
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
                          <div className="flex space-x-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-gray-500"
                                    onClick={() => markAsRead(notification.id)}
                                    disabled={notification.read}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Marquer comme lu</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-gray-500"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Supprimer</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
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