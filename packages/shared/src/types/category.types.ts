export type ProductivityWeight = -2 | -1 | 0 | 1 | 2;

export interface Category {
  readonly id: number;
  readonly name: string;
  readonly color: string;
  readonly productivityScore: ProductivityWeight;
  readonly icon?: string;
  readonly isDefault: boolean;
}

export interface CategoryMapping {
  readonly domain: string;
  readonly categoryId: number;
  readonly isCustomOverride: boolean;
}
