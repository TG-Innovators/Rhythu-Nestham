-- ==============================================================================
-- RYTHU NESTHAM — SUPABASE SEED DATA (Telangana & Andhra Pradesh)
-- ==============================================================================

-- Seed Categories
INSERT INTO public.categories (name, slug, description, image_url, icon, item_count, display_order)
VALUES
  ('Fresh Vegetables', 'vegetables', 'Country tomatoes, leafy greens, ridge gourds directly from field', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', 'Carrot', 142, 1),
  ('Seasonal Fruits', 'fruits', 'Banganapalli mangoes, sweet guavas, and papaya naturally ripened', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80', 'Apple', 88, 2),
  ('Grains & Millets', 'grains-millets', 'Single-origin Sona Masoori, Foxtail & Ragi millets', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', 'Wheat', 64, 3),
  ('Pulses & Lentils', 'pulses-lentils', 'Unpolished Toor Dal, green gram & black urad from Deccan red soil', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80', 'CircleDot', 49, 4),
  ('Organic Specials', 'organic-specials', 'PGS-India certified organic turmeric, cold-pressed oils & raw wild honey', 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80', 'Sparkles', 37, 5),
  ('Farm Equipment & Inputs', 'farm-supplies', 'Gravity drip kits, bio-fertilizers & solar light traps for growers', 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80', 'Wrench', 52, 6)
ON CONFLICT (name) DO NOTHING;
