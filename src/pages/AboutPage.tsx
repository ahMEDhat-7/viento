import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-8">About VIENTO</h1>
            
            <div className="text-lg text-muted-foreground space-y-6">
              <p>
                VIENTO was born from a simple philosophy: less is more. In a world saturated with fast fashion and fleeting trends, we believe in creating pieces that stand the test of time.
              </p>
              
              <p>
                Our minimalist approach to fashion isn't just about aesthetics—it's about mindful consumption, quality craftsmanship, and building a wardrobe that truly serves you.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Our Values</h2>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Quality First</h3>
                  <p>Every piece is crafted with premium materials and attention to detail. We believe in creating garments that improve with age and become more beautiful over time.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Timeless Design</h3>
                  <p>Our designs transcend seasonal trends. We create classic silhouettes that remain relevant year after year, forming the foundation of a thoughtful wardrobe.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Sustainable Practice</h3>
                  <p>We're committed to ethical manufacturing and sustainable practices. Every decision we make considers its impact on people and the planet.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Minimalist Aesthetic</h3>
                  <p>Clean lines, neutral colors, and versatile pieces that can be mixed, matched, and styled in countless ways. Simplicity is our signature.</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Our Story</h2>
              
              <p>
                Founded by a team of designers who were tired of the overwhelming choices in fashion retail, VIENTO started as a personal quest for the perfect basic pieces. What began as a search for quality essentials evolved into a brand dedicated to thoughtful design.
              </p>
              
              <p>
                Today, we continue to challenge the notion that more choices mean better fashion. Instead, we focus on perfecting a curated selection of pieces that work together seamlessly, creating infinite possibilities from finite options.
              </p>

              <div className="bg-muted/30 p-8 rounded-lg mt-12">
                <h3 className="text-xl font-semibold text-foreground mb-4">Ready to simplify your wardrobe?</h3>
                <p className="mb-6">Discover our carefully curated collection of minimalist essentials.</p>
                <Button asChild>
                  <Link to="/products">
                    Shop Our Collection
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}