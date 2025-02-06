Ai-monstropedia is a codex of AI-generated monsters inspired by classic monster-collection games, like Pokémon. Each creature is uniquely designed based on AI-generated prompts and follows structured attributes:

Name,  
Type (Elemental category),  
Move Set (4 unique abilities)  

This project aims to blend AI creativity with game-inspired themes to produce a diverse and interactive monster encyclopedia. It utilizes huggingface's stable diffusion models to create images for the monsters.

This is a boostrap boilerplate Next.js app. The following steps allow you to run this service locally.
  
    

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, head to ```localhost:3000```

To run the backend, AI-gen server, please make sure you have the following downloaded or set up:

Node.js  
Docker  
Huggingface API key  
MinIO  

Ensure that a ```.env``` file is set up similar to the following:

```
# Huggingface API Key
HUGGINGFACE_API_KEY=your_huggingface_token

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=admin123
MINIO_BUCKET_NAME=ai-monsters
```

To set up a MinIO bucket, run the following:

```
docker run -d -p 9000:9000 -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=admin" \
  -e "MINIO_ROOT_PASSWORD=admin123" \
  quay.io/minio/minio server /data --console-address ":9001"
```

Make sure you have access. visit ```localhost:9001```, login with your chosen credentials.

Finally, run ```node server.js``` to run your local server in order to make calls to huggingface model. 
If you refresh your minIO screen in localhost9001, you should notice you now have a bucket to store images in.