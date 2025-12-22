// Database types matching the PostgreSQL schema
export interface ProduitDB {
  id_produit: number
  nom: string
  description: string | null
  prix: number
  image: string | null
  image2: string | null
  image3: string | null
  frais_livraison: number // Shipping cost

}

export interface CommandeDB {
  id_commande: number
  nom_client: string
  email: string
  telephone: string | null
  adresse: string | null
  date_commande: Date
  statut: string | null
}

export interface LigneCommandeDB {
  id_ligne: number
  id_commande: number
  id_produit: number
  quantite: number
  prix_unitaire: number
  taille: string | null
  couleur: string | null
}

export interface StockDB {
  id_stock: number
  id_produit: number
  taille: number
  quantite: number
}

export interface PaiementDB {
  id_paiement: number
  id_commande: number
  montant: number
  methode: string | null
  statut: string | null
  date_paiement: Date | null
}

export interface ContactMessageDB {
  id_message: number
  nom: string
  email: string
  message: string
  date_envoi: Date
}
