import { CartRepository } from '@/lib/shopify/repositories/cart-repository';
import { ProductRepository } from '@/lib/shopify/repositories/product-repository';
import { PageRepository } from '@/lib/shopify/repositories/page-repository';
import { CollectionRepository } from '@/lib/shopify/repositories/collection-repository';
import { MenuRepository } from '@/lib/shopify/repositories/menu-repository';

export class ShopifyService {
  private cartRepository: CartRepository;
  private productRepository: ProductRepository;
  private collectionRepository: CollectionRepository;
  private pageRepository: PageRepository;
  private menuRepository: MenuRepository;

  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
    this.collectionRepository = new CollectionRepository(this.productRepository);
    this.pageRepository = new PageRepository();
    this.menuRepository = new MenuRepository();
  }

  // Cart methods
  async createCart() {
    return this.cartRepository.createCart();
  }

  async addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
    return this.cartRepository.addToCart(cartId, lines);
  }

  async removeFromCart(cartId: string, lineIds: string[]) {
    return this.cartRepository.removeFromCart(cartId, lineIds);
  }

  async updateCart(
    cartId: string,
    lines: { id: string; merchandiseId: string; quantity: number }[]
  ) {
    return this.cartRepository.updateCart(cartId, lines);
  }

  async getCart(cartId: string | undefined) {
    return this.cartRepository.getCart(cartId);
  }

  // Product methods
  async getProduct(handle: string) {
    return this.productRepository.getProduct(handle);
  }

  async getProducts(options: { query?: string; reverse?: boolean; sortKey?: string }) {
    return this.productRepository.getProducts(options);
  }

  async getProductRecommendations(productId: string) {
    return this.productRepository.getProductRecommendations(productId);
  }

  // Collection methods
  async getCollection(handle: string) {
    return this.collectionRepository.getCollection(handle);
  }

  async getCollections() {
    return this.collectionRepository.getCollections();
  }

  async getCollectionProducts(options: {
    collection: string;
    reverse?: boolean;
    sortKey?: string;
  }) {
    return this.collectionRepository.getCollectionProducts(options);
  }

  // Page methods
  async getPage(handle: string) {
    return this.pageRepository.getPage(handle);
  }

  async getPages() {
    return this.pageRepository.getPages();
  }

  // Menu methods
  async getMenu(handle: string) {
    return this.menuRepository.getMenu(handle);
  }
}

export const shopifyService = new ShopifyService();
