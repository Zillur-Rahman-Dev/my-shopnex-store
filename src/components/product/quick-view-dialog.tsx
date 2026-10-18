"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/products";
import {
  ShoppingCart,
  Check,
  ExternalLink,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";
import { toast } from "sonner";

interface QuickViewDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: QuickViewDialogProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || "/placeholder.svg"];

  const currentImage = images[selectedImage] || product.image || "/placeholder.svg";

  const handleAddToCart = async () => {
    if (!product.inStock) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    setIsLoading(false);
    setIsAdded(true);
    toast.success(`${quantity}x "${product.name}" added to cart!`);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden sm:rounded-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Quick view product details</DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/40 border border-border/50">
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                {!product.inStock && (
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 bg-destructive/90 text-destructive-foreground"
                  >
                    Out of Stock
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-primary ring-2 ring-primary/20 scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
                    {product.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {product.inStock ? "• In Stock" : "• Out of Stock"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {product.name}
                </h2>
                <div className="text-2xl font-extrabold text-primary">
                  ${product.price}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description
                </h4>
                <div
                  className="text-sm text-muted-foreground leading-relaxed line-clamp-4 prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: product.description || "No description available.",
                  }}
                />
              </div>

              <Separator />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg bg-background">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-muted"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1 || !product.inStock}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none hover:bg-muted"
                      onClick={() => handleQuantityChange(1)}
                      disabled={!product.inStock}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock || isLoading}
                    className="flex-1 font-semibold transition-all"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                    ) : isAdded ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>

                  <Link
                    href={`/products/${product.id}`}
                    onClick={() => onOpenChange(false)}
                    className="inline-flex"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full font-medium"
                    >
                      Full Details
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust badges */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-muted-foreground border-t border-border/60">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Fast, reliable delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
