export type ProductListItem = {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
};

export type ProductSpecs = {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
};

export type ProductColorOption = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type ProductStorageOption = {
  capacity: string;
  price: number;
};

export type ProductDetail = {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: ProductSpecs;
  colorOptions: ProductColorOption[];
  storageOptions: ProductStorageOption[];
  similarProducts: ProductListItem[];
};

export type CartItem = {
  productId: string;
  brand: string;
  name: string;
  imageUrl: string;
  colorName: string;
  storageCapacity: string;
  price: number;
};
