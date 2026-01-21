-- Create products table for local product storage
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  handle TEXT UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(10,2),
  product_type TEXT,
  vendor TEXT,
  tags TEXT[],
  images TEXT[],
  options JSONB DEFAULT '[]'::jsonb,
  variants JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read, no public write for now)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products (public storefront)
CREATE POLICY "Anyone can view products"
ON public.products
FOR SELECT
USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert a sample product
INSERT INTO public.products (title, handle, description, price, compare_at_price, product_type, vendor, tags, images)
VALUES (
  'Knee Compression Sleeve',
  'knee-compression-sleeve',
  'Premium knee compression sleeve for joint support and pain relief. Perfect for athletes and everyday comfort.',
  29.99,
  39.99,
  'Compression Wear',
  'CompressionPro',
  ARRAY['knee', 'compression', 'recovery', 'bestseller'],
  ARRAY['/placeholder.svg']
);