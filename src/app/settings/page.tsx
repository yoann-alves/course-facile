'use client';

import React, { useState } from 'react';
import { Bell, User, Share2, Save, Monitor, Info as InfoIcon } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';
import { ThemeSelector } from '@/components/ThemeSelector';
import { cn } from '@/lib/utils';

// Définition des types d'onglets
type TabType = 'profile' | 'appearance' | 'notifications' | 'sharing' | 'info';

// Interface pour les onglets
interface TabItem {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

export default function SettingsPage() {
  const { showBadges, toggleShowBadges } = useNotifications();
  
  // Liste des onglets disponibles
  const tabs: TabItem[] = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'appearance', label: 'Apparence', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'sharing', label: 'Partage', icon: Share2 },
    { id: 'info', label: 'Informations', icon: InfoIcon },
  ];
  
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Paramètres</h1>
          </div>
          
          {/* Navigation par onglets */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
                  )}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="mt-6">
            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Profil
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Votre nom"
                        defaultValue="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                        placeholder="Votre email"
                        defaultValue="jean.dupont@example.com"
                      />
                    </div>
                    <div className="pt-2 flex justify-end">
                      <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Onglet Apparence */}
            {activeTab === 'appearance' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Apparence
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Thème</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Choisissez le thème de l'application</p>
                      <ThemeSelector />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Notifications
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Afficher les badges de notification</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Afficher le nombre de notifications à côté de l&apos;icône de cloche</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={showBadges}
                          onChange={toggleShowBadges}
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Alertes de péremption</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir des notifications pour les produits qui expirent bientôt</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Rappels de courses</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir des rappels pour les achats récurrents</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Notifications par email</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir des notifications par email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Partage */}
            {activeTab === 'sharing' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Partage
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Membres de la famille</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div>
                            <span className="font-medium dark:text-gray-200">Marie Dupont</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">marie.dupont@example.com</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Supprimer
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div>
                            <span className="font-medium dark:text-gray-200">Pierre Dupont</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">pierre.dupont@example.com</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Inviter un membre</h3>
                      <div className="flex space-x-2">
                        <input
                          type="email"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                          placeholder="Email"
                        />
                        <Button>
                          Inviter
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Informations */}
            {activeTab === 'info' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <InfoIcon className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Informations
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Version de l&apos;application</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">1.0.0</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Dernière mise à jour</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">13 mars 2023</p>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Conditions d&apos;utilisation
                      </Button>
                    </div>
                    <div>
                      <Button variant="outline" className="w-full">
                        Politique de confidentialité
                      </Button>
                    </div>
                    <div className="pt-4">
                      <Button variant="ghost" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Déconnexion
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 