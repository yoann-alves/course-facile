export interface Product {
  id: string;
  name: string;
  category: string;
  defaultUnit: string;
  description?: string;
  imageUrl?: string;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    sugar?: number;
    salt?: number;
  };
  averagePrice?: number;
}

export interface ProductInstance {
  id: string;
  productId: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expirationDate: string;
  location?: string; // e.g., "Refrigerator", "Pantry", etc.
  opened?: boolean;
  notes?: string;
}

// Liste des produits disponibles
export const products: Product[] = [
  {
    id: "p1",
    name: "Lait demi-écrémé",
    category: "Produits laitiers",
    defaultUnit: "L",
    description: "Lait demi-écrémé UHT, 1.5% de matière grasse",
    nutritionalInfo: {
      calories: 46,
      protein: 3.2,
      carbs: 4.8,
      fat: 1.5
    },
    averagePrice: 0.95
  },
  {
    id: "p2",
    name: "Yaourt nature",
    category: "Produits laitiers",
    defaultUnit: "pièce",
    description: "Yaourt nature au lait entier",
    nutritionalInfo: {
      calories: 60,
      protein: 3.5,
      carbs: 5,
      fat: 3.2
    },
    averagePrice: 0.40
  },
  {
    id: "p3",
    name: "Pain de campagne",
    category: "Boulangerie",
    defaultUnit: "pièce",
    description: "Pain de campagne à la farine de blé et de seigle",
    nutritionalInfo: {
      calories: 265,
      protein: 9,
      carbs: 52,
      fat: 1.2
    },
    averagePrice: 2.10
  },
  {
    id: "p4",
    name: "Pommes Golden",
    category: "Fruits et légumes",
    defaultUnit: "kg",
    description: "Pommes Golden, sucrées et croquantes",
    nutritionalInfo: {
      calories: 52,
      protein: 0.3,
      carbs: 14,
      fat: 0.2,
      sugar: 10.4
    },
    averagePrice: 2.50
  },
  {
    id: "p5",
    name: "Poulet entier",
    category: "Viandes",
    defaultUnit: "kg",
    description: "Poulet fermier élevé en plein air",
    nutritionalInfo: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    },
    averagePrice: 7.90
  },
  {
    id: "p6",
    name: "Lessive liquide",
    category: "Entretien",
    defaultUnit: "L",
    description: "Lessive liquide tous textiles",
    averagePrice: 5.99
  }
];

// Instances de produits avec dates de péremption
export const productInstances: ProductInstance[] = [
  {
    id: "pi1",
    productId: "p1",
    quantity: 1,
    unit: "L",
    purchaseDate: "2023-03-01T10:00:00Z",
    expirationDate: "2023-03-15T10:00:00Z",
    location: "Réfrigérateur",
    opened: true,
    notes: "Ouvert le 5 mars"
  },
  {
    id: "pi2",
    productId: "p1",
    quantity: 2,
    unit: "L",
    purchaseDate: "2023-03-05T10:00:00Z",
    expirationDate: "2023-04-05T10:00:00Z",
    location: "Placard cuisine"
  },
  {
    id: "pi3",
    productId: "p2",
    quantity: 4,
    unit: "pièces",
    purchaseDate: "2023-03-02T10:00:00Z",
    expirationDate: "2023-03-20T10:00:00Z",
    location: "Réfrigérateur"
  },
  {
    id: "pi4",
    productId: "p3",
    quantity: 1,
    unit: "pièce",
    purchaseDate: "2023-03-10T10:00:00Z",
    expirationDate: "2023-03-14T10:00:00Z",
    location: "Cuisine",
    opened: true
  },
  {
    id: "pi5",
    productId: "p4",
    quantity: 1.5,
    unit: "kg",
    purchaseDate: "2023-03-08T10:00:00Z",
    expirationDate: "2023-03-22T10:00:00Z",
    location: "Réfrigérateur"
  },
  {
    id: "pi6",
    productId: "p5",
    quantity: 1.2,
    unit: "kg",
    purchaseDate: "2023-03-09T10:00:00Z",
    expirationDate: "2023-03-12T10:00:00Z",
    location: "Réfrigérateur",
    notes: "À cuisiner rapidement"
  }
];

// Fonction utilitaire pour obtenir les détails d'un produit à partir de son instance
export function getProductDetails(instance: ProductInstance): Product | undefined {
  return products.find(product => product.id === instance.productId);
}

// Fonction utilitaire pour obtenir toutes les instances d'un produit
export function getProductInstances(productId: string): ProductInstance[] {
  return productInstances.filter(instance => instance.productId === productId);
}

// Fonction utilitaire pour vérifier si un produit est périmé
export function isExpired(instance: ProductInstance): boolean {
  const now = new Date();
  const expirationDate = new Date(instance.expirationDate);
  return expirationDate < now;
}

// Fonction utilitaire pour calculer le nombre de jours avant péremption
export function daysUntilExpiration(instance: ProductInstance): number {
  const now = new Date();
  const expirationDate = new Date(instance.expirationDate);
  const diffTime = expirationDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
} 