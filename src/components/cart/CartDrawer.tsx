import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { CartUpsells } from "./CartUpsells";

export function CartDrawer() {
  const { 
    items, 
    isLoading,
    isOpen,
    setOpen,
    updateQuantity, 
    removeItem, 
    createCheckout,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    try {
      await createCheckout();
      const checkoutUrl = useCartStore.getState().checkoutUrl;
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
        setOpen(false);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-serif text-xl">Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4">
                      <div className="w-20 h-24 bg-secondary rounded overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.selectedOptions.map(option => option.value).join(' / ')}
                        </p>
                        <p className="text-sm font-medium mt-2">
                          ${parseFloat(item.price.amount).toFixed(2)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsells Section */}
                <CartUpsells cartItems={items} />
              </div>
              
              <div className="flex-shrink-0 space-y-4 pt-6 border-t bg-background mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full" 
                  size="lg"
                  disabled={items.length === 0 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Checkout...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Shipping & taxes calculated at checkout
                </p>
                
                {/* Payment Methods */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {/* Visa */}
                  <div className="w-10 h-6 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-4 w-6">
                      <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                      <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z"/>
                      <path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z"/>
                    </svg>
                  </div>
                  {/* Mastercard */}
                  <div className="w-10 h-6 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-4 w-6">
                      <path fill="#3F51B5" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z"/>
                      <path fill="#FFC107" d="M30 14A10 10 0 1 0 30 34A10 10 0 1 0 30 14Z"/>
                      <path fill="#FF3D00" d="M22.014,30c-0.464-0.617-0.863-1.284-1.176-2h6.325c0.278-0.636,0.496-1.304,0.637-2h-7.598c-0.131-0.653-0.202-1.321-0.202-2s0.071-1.347,0.202-2h7.598c-0.141-0.696-0.359-1.364-0.637-2h-6.325c0.313-0.716,0.711-1.383,1.176-2h3.972c-0.529-0.762-1.156-1.443-1.869-2h-0.233h-0.233c-0.714,0.557-1.341,1.238-1.87,2h-0.233h-0.232c-0.714-0.762-1.341-1.443-1.87-2h-0.233h-0.233c-0.714,0.557-1.341,1.238-1.87,2c-0.464,0.617-0.863,1.284-1.176,2c-0.278,0.636-0.496,1.304-0.637,2c-0.131,0.653-0.202,1.321-0.202,2s0.071,1.347,0.202,2c0.141,0.696,0.359,1.364,0.637,2c0.313,0.716,0.712,1.383,1.176,2c0.529,0.762,1.156,1.443,1.869,2h0.233h0.233c0.714-0.557,1.341-1.238,1.87-2h0.233h0.233c0.714,0.762,1.341,1.443,1.87,2h0.233h0.233C23.17,31.443,22.543,30.762,22.014,30z"/>
                      <circle cx="18" cy="24" r="10" fill="#FF3D00"/>
                    </svg>
                  </div>
                  {/* Amex */}
                  <div className="w-10 h-6 bg-[#006FCF] rounded border border-border flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">AMEX</span>
                  </div>
                  {/* PayPal */}
                  <div className="w-10 h-6 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="h-4 w-6">
                      <path fill="#1565C0" d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c3.785,0,6.958,2.615,7.806,6.172 c-0.091-0.879-0.264-1.729-0.531-2.536C39.355,13.413,36.209,11,32.332,11H18.869c-0.474,0-0.852,0.326-0.955,0.769L14.849,26.94 c-0.084,0.36,0.191,0.7,0.559,0.7h4.969l2.312-9.979l0.003-0.012L18.7,13.767z"/>
                      <path fill="#039BE5" d="M33.131,19c0.09,0.873,0.088,1.792-0.031,2.757c-1.067,8.621-7.137,11.31-14.208,11.31h-1.992 c-0.864,0-1.593,0.627-1.728,1.478l-1.053,6.672l-0.299,1.894c-0.067,0.429,0.263,0.815,0.695,0.815h5.771 c0.756,0,1.398-0.55,1.517-1.296l0.063-0.324l1.201-7.614l0.077-0.42c0.119-0.747,0.761-1.296,1.517-1.296h0.956 c6.186,0,11.027-2.512,12.438-9.779C38.655,20.253,37.208,18.251,33.131,19z"/>
                      <path fill="#283593" d="M32.206,18.226c-0.372-0.109-0.757-0.202-1.155-0.28c-0.398-0.077-0.809-0.14-1.232-0.186 c-0.801-0.089-1.663-0.134-2.576-0.134h-7.768c-0.357,0-0.693,0.093-0.985,0.256c-0.521,0.292-0.891,0.813-0.985,1.447l-1.653,10.477 l-0.048,0.305c0.135-0.851,0.864-1.478,1.728-1.478h1.992c7.071,0,12.141-2.689,14.208-11.31c0.061-0.256,0.112-0.506,0.155-0.751 C33.278,16.2,32.623,15.923,32.206,18.226z"/>
                    </svg>
                  </div>
                  {/* Apple Pay */}
                  <div className="w-10 h-6 bg-black rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 50 20" className="h-3 w-7 fill-white">
                      <path d="M9.6 4.3c-.6.7-1.5 1.2-2.4 1.1-.1-.9.3-1.9.8-2.5C8.6 2.2 9.6 1.6 10.4 1.6c.1 1-.3 1.9-.8 2.7zm.8 1.4c-1.3-.1-2.5.8-3.1.8s-1.6-.7-2.7-.7c-1.4 0-2.6.8-3.3 2-.7 1.2-.5 3.5.5 5.3.7 1.2 1.5 2.5 2.6 2.5s1.4-.8 2.7-.8 1.7.8 2.7.8 1.9-1.3 2.5-2.5c.4-.8.6-1.3.9-2.1-2.3-1-2.7-4.4-.8-5.3z"/>
                      <path d="M18.8 15.5V4.2h3.3c2.1 0 3.5 1.4 3.5 3.5s-1.5 3.5-3.6 3.5h-2.1v4.3h-1.1zm1.1-5.3h1.8c1.5 0 2.3-.8 2.3-2.3s-.8-2.4-2.3-2.4h-1.8v4.7zm8.2 5.5c-1.1 0-2-.5-2.5-1.5l-.9.5c.6 1.3 1.8 2 3.4 2 1.9 0 3.2-1 3.2-2.5 0-1.2-.7-1.9-2.4-2.3l-1-.3c-1.2-.3-1.6-.7-1.6-1.3 0-.7.6-1.2 1.6-1.2.9 0 1.5.4 1.9 1l.9-.5c-.5-1-1.5-1.5-2.8-1.5-1.7 0-2.8.9-2.8 2.3 0 1.1.7 1.8 2.2 2.2l1.1.3c1.2.3 1.7.7 1.7 1.4 0 .8-.7 1.4-1.8 1.4h-.2zm5.9 0c-.9 0-1.5-.5-1.5-1.5v-5h1.6v-1h-1.6V5.6h-1.1v1.6h-1.2v1h1.2v5.2c0 1.5.8 2.3 2.3 2.3.4 0 .7 0 1-.1v-1c-.2 0-.5.1-.7.1z"/>
                    </svg>
                  </div>
                  {/* Google Pay */}
                  <div className="w-10 h-6 bg-white rounded border border-border flex items-center justify-center">
                    <svg viewBox="0 0 50 20" className="h-3 w-7">
                      <path fill="#5F6368" d="M23.8 10v3.4h-1.1V4.1h2.9c.7 0 1.3.2 1.8.7.5.5.7 1 .7 1.7s-.2 1.2-.7 1.7c-.5.5-1.1.7-1.8.7h-1.8zm0-4.8v3.7h1.8c.5 0 .9-.2 1.2-.5.3-.3.5-.7.5-1.2s-.2-.9-.5-1.2c-.3-.3-.7-.5-1.2-.5h-1.8zm9.2 1.7c.8 0 1.5.2 1.9.7.4.5.7 1.1.7 2v4h-1.1v-.9c-.2.3-.5.6-.9.8-.4.2-.8.3-1.3.3-.7 0-1.3-.2-1.7-.5-.4-.4-.7-.8-.7-1.4 0-.6.2-1 .6-1.4.4-.3 1-.5 1.8-.5h2.1v-.4c0-.5-.1-.9-.4-1.2-.3-.3-.7-.4-1.2-.4-.4 0-.7.1-1 .2-.3.2-.5.4-.6.7l-.9-.5c.2-.5.5-.8 1-1.1.5-.3 1-.4 1.7-.4zm-1.2 5.8c.5 0 .9-.1 1.2-.4.3-.3.6-.6.7-1v-.7h-2c-.9 0-1.4.3-1.4 1 0 .3.1.6.4.8.3.2.6.3 1.1.3zm7-5.7l-.4 1c-.3-.2-.6-.2-.9-.2-.5 0-.8.2-1.1.5-.3.3-.4.8-.4 1.4v4.8h-1.1V6.9h1.1v.9c.3-.6.9-1 1.7-1 .4 0 .8.1 1.1.2z"/>
                      <path fill="#4285F4" d="M12 6.6c0-.4 0-.7-.1-1.1H6.1v2.1h3.3c-.1.8-.5 1.4-1.1 1.9v1.6h1.8c1.1-1 1.7-2.4 1.9-4.5z"/>
                      <path fill="#34A853" d="M6.1 13c1.5 0 2.7-.5 3.6-1.3l-1.8-1.4c-.5.3-1.1.5-1.8.5-1.4 0-2.6-.9-3-2.2H1.2v1.5c.9 1.8 2.8 2.9 4.9 2.9z"/>
                      <path fill="#FBBC04" d="M3.1 8.4c-.1-.3-.2-.7-.2-1.1s.1-.8.2-1.1V4.7H1.2C.8 5.5.6 6.4.6 7.3s.2 1.8.6 2.6l1.9-1.5z"/>
                      <path fill="#EA4335" d="M6.1 3.9c.8 0 1.5.3 2 .8l1.5-1.5C8.8 2.5 7.6 2 6.1 2 4 2 2.1 3.1 1.2 4.9l1.9 1.5c.4-1.2 1.6-2.5 3-2.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
