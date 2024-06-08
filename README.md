# Product Inventory management

#### This product inventroy Api is built with Express and TypeScript, Mongoose. Zod validation implemented for data validation.

# How to install

**1. Clone the repository**

```bash
https://github.com/monzurul002/batch3-assginment-3

cd batch3-assginment-3

```

## **2. Install Dependencies**

```bash
$ npm install
```

**3. Configure Environment Variables**

### Create a `.env` file in the root of the project and add the following environment variables:

```bash
PORT=5000
Databse-url="mongodb://localhost:27017/batch3-assginment-3"
```

## To run this repogitory

```base
$ npm run start:dev
```

## Check Out the API Endpoints

### Product Management

#### 1. Create a New Product

- **Endpoint:** `/api/products`
- **Method:** `POST`

#### 2. Retrieve All Products

- **Endpoint:** `/api/products`
- **Method:** `GET`

#### 3. Retrieve Specific Product by ID

- **Endpoint:** `/api/products/:productId`
- **Method:** `GET`

#### 4. Update Product Information

- **Endpoint:** `/api/products/:productId`
- **Method:** `PUT`

#### 5. Delete a Product

- **Endpoint:** `/api/products/:productId`
- **Method:** `DELETE`

#### 6. Search a Product

- **Endpoint:** `/api/products?searchTerm=iphone`
- **Method:** `GET`

## Order Management

#### 1. Create a New Order

- **Endpoint**: `/api/orders`
- **Method**: `POST`

#### 2. Retrieve All Orders

- **Endpoint**: `/api/orders`
- **Method**: `GET`

#### 3. Retrieve Orders by User Email

- **Endpoint**: `/api/orders?email=level2@programming-hero.com`
- **Method**: `GET`
