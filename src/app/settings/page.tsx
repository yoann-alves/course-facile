'use client';

import React, { useState } from 'react';
import { Bell, User, Share2, Save, Monitor, Info as InfoIcon, Database, ListChecks, HelpCircle, Book, Mail, MessageSquare, FileText, Shield, Download, Upload } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';
import { ThemeSelector } from '@/components/ThemeSelector';
import { cn } from '@/lib/utils';

// Définition des types d'onglets
type TabType = 'account' | 'interface' | 'notifications' | 'data' | 'lists' | 'help';

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
    { id: 'account', label: 'Compte', icon: User },
    { id: 'interface', label: 'Interface', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Données', icon: Database },
    { id: 'lists', label: 'Listes', icon: ListChecks },
    { id: 'help', label: 'Aide', icon: HelpCircle },
  ];
  
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<TabType>('account');

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
            {/* Onglet Compte */}
            {activeTab === 'account' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Compte
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
                      />
                    </div>
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Langue
                      </label>
                      <select
                        id="language"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </select>
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

            {/* Onglet Interface */}
            {activeTab === 'interface' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Interface
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Thème</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Choisissez le thème de l&apos;application</p>
                      <ThemeSelector />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Format de date</h3>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                        <option value="fr">DD/MM/YYYY</option>
                        <option value="en">MM/DD/YYYY</option>
                        <option value="iso">YYYY-MM-DD</option>
                      </select>
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
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">Badges de notification</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Afficher le nombre de notifications non lues</p>
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
                          <p className="text-sm text-gray-500 dark:text-gray-400">Notifications pour les produits qui expirent bientôt</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Délai d&apos;alerte de péremption</h3>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                          <option value="1">1 jour avant</option>
                          <option value="3">3 jours avant</option>
                          <option value="7">1 semaine avant</option>
                          <option value="14">2 semaines avant</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Données */}
            {activeTab === 'data' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Données
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Membres de la famille</h3>
                      <div className="space-y-2">
                        {/* Liste des membres */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div>
                            <span className="font-medium dark:text-gray-200">Marie Dupont</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">marie.dupont@example.com</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Supprimer
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex space-x-2">
                          <input
                            type="email"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                            placeholder="Email du membre"
                          />
                          <Button>Inviter</Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Exporter mes données
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Importer des données
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Listes */}
            {activeTab === 'lists' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <ListChecks className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Préférences des Listes
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Tri par défaut</h3>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                        <option value="date-desc">Plus récent d&apos;abord</option>
                        <option value="date-asc">Plus ancien d&apos;abord</option>
                        <option value="name-asc">Alphabétique (A-Z)</option>
                        <option value="name-desc">Alphabétique (Z-A)</option>
                      </select>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Unités par défaut</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Liquides</span>
                          <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                            <option value="L">Litres (L)</option>
                            <option value="ml">Millilitres (ml)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 dark:text-gray-300">Poids</span>
                          <select className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md">
                            <option value="kg">Kilogrammes (kg)</option>
                            <option value="g">Grammes (g)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Archiver automatiquement</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Archiver les listes terminées après 30 jours</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Aide */}
            {activeTab === 'help' && (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                    Aide et Support
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Documentation</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Book className="w-4 h-4 mr-2" />
                          Guide d&apos;utilisation
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <HelpCircle className="w-4 h-4 mr-2" />
                          FAQ
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Support</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="w-4 h-4 mr-2" />
                          Contacter le support
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat en direct
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Informations légales</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          Conditions d&apos;utilisation
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Politique de confidentialité
                        </Button>
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>Version de l'application : 1.0.0</p>
                        <p>Dernière mise à jour : 13 mars 2024</p>
                      </div>
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