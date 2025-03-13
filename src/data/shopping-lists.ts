export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  price?: number;
}

export interface ShoppingList {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  items: ShoppingListItem[];
  completed: boolean;
}

// Produits fréquemment achetés par catégorie
export const frequentProducts: Record<string, Array<{ name: string; unit: string }>> = {
  "Produits laitiers": [
    { name: "Lait", unit: "L" },
    { name: "Yaourt nature", unit: "pièces" },
    { name: "Fromage râpé", unit: "g" },
    { name: "Beurre", unit: "g" },
    { name: "Crème fraîche", unit: "ml" }
  ],
  "Boulangerie": [
    { name: "Pain", unit: "pièce" },
    { name: "Baguette", unit: "pièce" },
    { name: "Croissants", unit: "pièces" }
  ],
  "Fruits et légumes": [
    { name: "Pommes", unit: "kg" },
    { name: "Bananes", unit: "kg" },
    { name: "Carottes", unit: "kg" },
    { name: "Tomates", unit: "kg" },
    { name: "Salade", unit: "pièce" }
  ],
  "Viandes": [
    { name: "Poulet", unit: "kg" },
    { name: "Steak haché", unit: "g" },
    { name: "Jambon", unit: "tranches" }
  ],
  "Entretien": [
    { name: "Lessive", unit: "L" },
    { name: "Liquide vaisselle", unit: "ml" },
    { name: "Éponges", unit: "pièces" }
  ]
};

// Unités communes pour les suggestions
export const commonUnits = [
  "pièce",
  "pièces",
  "kg",
  "g",
  "L",
  "ml",
  "tranches",
  "bouteille",
  "paquet",
  "boîte"
];

// Liste des derniers produits utilisés (simulé)
export const recentProducts = [
  { name: "Lait", unit: "L", category: "Produits laitiers" },
  { name: "Pain", unit: "pièce", category: "Boulangerie" },
  { name: "Œufs", unit: "boîte", category: "Produits laitiers" },
  { name: "Yaourt", unit: "pièces", category: "Produits laitiers" },
  { name: "Pommes", unit: "kg", category: "Fruits et légumes" },
  { name: "Pâtes", unit: "paquet", category: "Épicerie" }
];

export const shoppingLists: ShoppingList[] = [
  {
    id: "1",
    title: "Courses hebdomadaires",
    createdAt: "2023-03-10T10:00:00Z",
    updatedAt: "2023-03-10T10:00:00Z",
    items: [
      {
        id: "item1",
        name: "Lait",
        quantity: 2,
        unit: "L",
        category: "Produits laitiers",
        checked: true,
        price: 1.99
      },
      {
        id: "item2",
        name: "Pain",
        quantity: 1,
        unit: "pièce",
        category: "Boulangerie",
        checked: true,
        price: 1.20
      },
      {
        id: "item3",
        name: "Pommes",
        quantity: 1,
        unit: "kg",
        category: "Fruits et légumes",
        checked: false,
        price: 2.50
      },
      {
        id: "item4",
        name: "Yaourt nature",
        quantity: 6,
        unit: "pièces",
        category: "Produits laitiers",
        checked: false,
        price: 2.30
      }
    ],
    completed: false
  },
  {
    id: "2",
    title: "Repas du dimanche",
    createdAt: "2023-03-12T14:30:00Z",
    updatedAt: "2023-03-12T14:30:00Z",
    items: [
      {
        id: "item5",
        name: "Poulet",
        quantity: 1,
        unit: "kg",
        category: "Viandes",
        checked: true,
        price: 8.50
      },
      {
        id: "item6",
        name: "Pommes de terre",
        quantity: 1,
        unit: "kg",
        category: "Fruits et légumes",
        checked: false,
        price: 1.80
      },
      {
        id: "item7",
        name: "Carottes",
        quantity: 500,
        unit: "g",
        category: "Fruits et légumes",
        checked: false,
        price: 1.20
      }
    ],
    completed: false
  },
  {
    id: "3",
    title: "Produits d'entretien",
    createdAt: "2023-03-15T09:15:00Z",
    updatedAt: "2023-03-15T09:15:00Z",
    items: [
      {
        id: "item8",
        name: "Lessive",
        quantity: 1,
        unit: "bouteille",
        category: "Entretien",
        checked: true,
        price: 5.99
      },
      {
        id: "item9",
        name: "Liquide vaisselle",
        quantity: 1,
        unit: "bouteille",
        category: "Entretien",
        checked: true,
        price: 2.49
      },
      {
        id: "item10",
        name: "Éponges",
        quantity: 3,
        unit: "pièces",
        category: "Entretien",
        checked: true,
        price: 1.99
      }
    ],
    completed: false
  }
];

// Fonction utilitaire pour calculer le nombre d'articles complétés dans une liste
export function getCompletedItemCount(list: ShoppingList): number {
  return list.items.filter(item => item.checked).length;
}

export const categories = [
  "Produits laitiers",
  "Boulangerie",
  "Fruits et légumes",
  "Viandes",
  "Poissons",
  "Épicerie",
  "Boissons",
  "Entretien",
  "Hygiène",
  "Surgelés"
]; 