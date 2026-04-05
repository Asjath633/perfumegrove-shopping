
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getProductById, getProductsByCategory, Product, getSizeImage } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setQuantity(1);
        setSelectedSize("");
        // Find related products from the same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate("/perfumes");
      }
    }
  }, [id, navigate]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
      const currentSizeObj = product.sizes?.find(s => s.size === selectedSize) ||
        { size: product.size, stock: product.stock };
      if (newQuantity >= 1 && newQuantity <= currentSizeObj.stock) {
        setQuantity(newQuantity);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    // If clicking the same size again, toggle back to default image
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
      setQuantity(1);
      setImageLoaded(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const sizeToAdd = selectedSize || product.size;
      const productWithSelectedSize = {
        ...product,
        size: sizeToAdd,
        price: product.sizes?.find(s => s.size === sizeToAdd)?.price || product.price
      };

      for (let i = 0; i < quantity; i++) {
        addToCart(productWithSelectedSize);
      }
    }
  };

  const getCurrentStock = () => {
    if (!product) return 0;
    const sizeToCheck = selectedSize || product.size;
    if (product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === sizeToCheck);
      return sizeObj ? sizeObj.stock : product.stock;
    }
    return product.stock;
  };

  const getCurrentPrice = () => {
    if (!product) return 0;
    const sizeToCheck = selectedSize || product.size;
    if (product.sizes) {
      const sizeObj = product.sizes.find(s => s.size === sizeToCheck);
      return sizeObj ? sizeObj.price : product.price;
    }
    return product.price;
  };



  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-20 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-64 mb-6"></div>
            <div className="h-4 bg-secondary rounded w-40"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative rounded-lg aspect-[3/4] md:aspect-square overflow-hidden bg-secondary">
              <div
                className={`absolute inset-0 bg-secondary animate-pulse ${imageLoaded ? 'hidden' : 'block'}`}
              ></div>
              <img
                key={`${product.id}-${selectedSize}`}
                src={getSizeImage(product, selectedSize)}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.log('Image failed to load:', getSizeImage(product, selectedSize));
                  setImageLoaded(true);
                }}
              />
            </div>

            <div className="flex flex-col">
              <div>
                <p className="subtle-text mb-2 tracking-[0.2em]">{product.category.toUpperCase()}</p>
                <h1 className="h2 mb-4">{product.name}</h1>

                <div className="mb-6">
                  <span className="text-2xl font-bold text-richblack">₹{getCurrentPrice()}</span>
                </div>

                <div className="mb-6">
                  <p className="text-warmgray leading-relaxed">{product.description}</p>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Notes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map(note => (
                      <span key={note} className="bg-secondary px-3 py-1 rounded-full text-sm">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Warranty */}
                {product.warranty && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Warranty</h3>
                    <div className="bg-secondary px-4 py-3 rounded-md text-sm font-medium text-richblack">
                      {product.warranty}
                    </div>
                  </div>
                )}

                {/* Size */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes ? (
                      product.sizes.map(sizeOption => (
                        <button
                          key={sizeOption.size}
                          onClick={() => handleSizeChange(sizeOption.size)}
                          className={`px-4 py-2 rounded-md text-sm transition-colors ${selectedSize === sizeOption.size
                              ? 'bg-richblack text-white'
                              : 'bg-secondary hover:bg-gold/10'
                            }`}
                        >
                          {sizeOption.size} - ₹{sizeOption.price}
                        </button>
                      ))
                    ) : (
                      <div className="inline-block bg-secondary px-4 py-2 rounded-md text-sm">
                        {product.size} - ₹{product.price}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-2 border rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-6">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= getCurrentStock()}
                      className="p-2 border rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>

                    <span className="ml-4 text-sm text-warmgray">
                      {getCurrentStock()} available
                    </span>
                  </div>
                </div>

                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className="button-primary flex items-center justify-center w-full"
                  disabled={getCurrentStock() === 0}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="h3 mb-8">You may also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
