
type TSeller = {
    _id: string;
    email: string;
    name: string;
}
export type TProduct = {
  _id: string;
  name: string;  
  compatibility: string;  
  price: number;
  quantity: number;
  brand: string;
  monitor: string;
  category: string;
  ram: string;
  graphicsCard: string;
  condition: string;
  hardDrive: string;
  color: string;
  releaseDate: string;
  seller: TSeller ;
  productImage?: string;
};
