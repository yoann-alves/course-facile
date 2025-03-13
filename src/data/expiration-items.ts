export interface ExpirationItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expirationDate: string;
  purchaseDate: string;
}

export const expirationItems: ExpirationItem[] = [
  {
    id: "exp1",
    name: "Yaourt nature",
    quantity: 4,
    unit: "pièces",
    category: "Produits laitiers",
    expirationDate: "2023-03-25T00:00:00Z",
    purchaseDate: "2023-03-10T00:00:00Z"
  },
  {
    id: "exp2",
    name: "Jambon",
    quantity: 1,
    unit: "paquet",
    category: "Viandes",
    expirationDate: "2023-03-18T00:00:00Z",
    purchaseDate: "2023-03-12T00:00:00Z"
  },
  {
    id: "exp3",
    name: "Lait",
    quantity: 1,
    unit: "L",
    category: "Produits laitiers",
    expirationDate: "2023-04-05T00:00:00Z",
    purchaseDate: "2023-03-10T00:00:00Z"
  },
  {
    id: "exp4",
    name: "Fromage râpé",
    quantity: 1,
    unit: "paquet",
    category: "Produits laitiers",
    expirationDate: "2023-03-20T00:00:00Z",
    purchaseDate: "2023-03-05T00:00:00Z"
  },
  {
    id: "exp5",
    name: "Tomates",
    quantity: 500,
    unit: "g",
    category: "Fruits et légumes",
    expirationDate: "2023-03-17T00:00:00Z",
    purchaseDate: "2023-03-12T00:00:00Z"
  },
  {
    id: "exp6",
    name: "Poulet",
    quantity: 1,
    unit: "kg",
    category: "Viandes",
    expirationDate: "2023-03-16T00:00:00Z",
    purchaseDate: "2023-03-14T00:00:00Z"
  },
  {
    id: "exp7",
    name: "Jus d'orange",
    quantity: 1,
    unit: "L",
    category: "Boissons",
    expirationDate: "2023-03-30T00:00:00Z",
    purchaseDate: "2023-03-10T00:00:00Z"
  }
];

// Fonction utilitaire pour vérifier si un produit expire bientôt (dans les 3 jours)
export function isExpiringSoon(item: ExpirationItem): boolean {
  const today = new Date();
  const expDate = new Date(item.expirationDate);
  const diffTime = expDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 3;
}

// Fonction utilitaire pour vérifier si un produit est expiré
export function isExpired(item: ExpirationItem): boolean {
  const today = new Date();
  const expDate = new Date(item.expirationDate);
  return expDate < today;
} 