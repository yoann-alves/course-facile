'use client';

import React from 'react';
import { Bell, User, Share2, Save } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-6">
                {/* Paramètres du profil */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-green-600" />
                      Profil
                    </h2>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Votre nom"
                          defaultValue="Jean Dupont"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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

                {/* Paramètres de notification */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-green-600" />
                      Notifications
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">Alertes de péremption</h3>
                          <p className="text-sm text-gray-500">Recevoir des notifications pour les produits qui expirent bientôt</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">Rappels de courses</h3>
                          <p className="text-sm text-gray-500">Recevoir des rappels pour les achats récurrents</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">Notifications par email</h3>
                          <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Paramètres de partage */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Share2 className="w-5 h-5 mr-2 text-green-600" />
                      Partage
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">Membres de la famille</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div>
                              <span className="font-medium">Marie Dupont</span>
                              <span className="text-sm text-gray-500 ml-2">marie.dupont@example.com</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              Supprimer
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div>
                              <span className="font-medium">Pierre Dupont</span>
                              <span className="text-sm text-gray-500 ml-2">pierre.dupont@example.com</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-2">Inviter un membre</h3>
                        <div className="flex space-x-2">
                          <input
                            type="email"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Informations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Version de l&apos;application</h4>
                      <p className="text-sm text-gray-500">1.0.0</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Dernière mise à jour</h4>
                      <p className="text-sm text-gray-500">15 mars 2023</p>
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
                      <Button variant="ghost" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                        Déconnexion
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 