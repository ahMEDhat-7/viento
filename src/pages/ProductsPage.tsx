import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { supabase } from '@/integrations/supabase/client';

export default function ProductsPage() {
  const {
    products,
    categories,
    selectedCategory,
    setProducts,
    setCategories,
    setSelectedCategory
  } = useStore();
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesData) {
        setCategories(categoriesData);
      }

      // Fetch products
      let query = supabase
        .from('products')
        .select(`
          *,
          categories(name, slug)
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory);
      }

      const { data: productsData } = await query;

      if (productsData) {
        setProducts(productsData);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory, setProducts, setCategories]);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover timeless pieces crafted for the modern minimalist
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="mb-2"
          >
            All Products
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}