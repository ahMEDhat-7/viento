import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { useStore } from '@/store/useStore';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItemsCount, toggleCart, user, toggleAuthModal } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-wide text-foreground hover:opacity-80 transition-opacity">
            VIENTO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={user ? undefined : toggleAuthModal}
              className="text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
              <span className="ml-2">{user ? 'Account' : 'Login'}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative text-muted-foreground hover:text-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount()}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              
              <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (!user) toggleAuthModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 justify-start text-muted-foreground hover:text-foreground"
                >
                  <User className="h-5 w-5 mr-2" />
                  {user ? 'Account' : 'Login'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toggleCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative text-muted-foreground hover:text-foreground"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount()}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}