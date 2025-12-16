# Database Setup Instructions

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Shoes_app
DB_USER=postgres
DB_PASSWORD=your_password_here
```

## 2. Database Connection

The app uses PostgreSQL with the following connection settings:
- Host: `DB_HOST` (default: localhost)
- Port: `DB_PORT` (default: 5432)
- Database: `DB_NAME` (default: Shoes_app)
- User: `DB_USER` (default: postgres)
- Password: `DB_PASSWORD`

## 3. Database Schema

The database should have the following tables (already created):
- `produit` - Products table
- `commande` - Orders table
- `ligne_commande` - Order lines table
- `paiement` - Payment table
- `contact_message` - Contact messages table

## 4. Sample Data

Run the `database-setup.sql` file to insert sample products:

```bash
psql -U postgres -d Shoes_app -f database-setup.sql
```

## 5. Product Data Structure

The app supports storing complex product data (images, colors, sizes) as JSON in the `description` field. The API will parse this JSON and merge it with default values if needed.

Example JSON structure in description:
```json
{
  "images": ["/path/to/image1.jpg", "/path/to/image2.jpg"],
  "colors": [
    {"name": "Brown", "hex": "#654321", "image": "/path/to/image.jpg"}
  ],
  "sizes": [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
  "category": "Leather Footwear",
  "rating": 4.5,
  "reviewCount": 10
}
```

## 6. API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get a single product
- `POST /api/orders` - Create a new order
- `POST /api/contact` - Save a contact message

## 7. Testing the Connection

After setting up the environment variables, restart your Next.js development server:

```bash
npm run dev
```

The app will automatically connect to the database when API routes are called.

