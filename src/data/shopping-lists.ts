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
}

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
        checked: false,
        price: 1.99
      },
      {
        id: "item2",
        name: "Pain",
        quantity: 1,
        unit: "pièce",
        category: "Boulangerie",
        checked: false,
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
    ]
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
        checked: false,
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
    ]
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
        checked: false,
        price: 5.99
      },
      {
        id: "item9",
        name: "Liquide vaisselle",
        quantity: 1,
        unit: "bouteille",
        category: "Entretien",
        checked: false,
        price: 2.49
      },
      {
        id: "item10",
        name: "Éponges",
        quantity: 3,
        unit: "pièces",
        category: "Entretien",
        checked: false,
        price: 1.99
      }
    ]
  }
];

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