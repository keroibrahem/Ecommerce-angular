export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
}
export interface Categories{
    id: number;
    name: string;
    image: string;
}
export interface CartItem {
  id?: number;        
  idUser: string;      
  idProduct: number;   
  quantity: number;
}
