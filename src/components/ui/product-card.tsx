import { Product } from '@/store/useStore';
import { Button } from './button';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.slug}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-foreground mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              disabled={product.stock_quantity <= 0}
            >
              {product.stock_quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}