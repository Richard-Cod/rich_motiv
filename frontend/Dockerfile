FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g serve

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

# construit l'app pour la production en la minifiant
RUN npm run build

# RUN npm run serve
# npx serve -s -l tcp://localhost:8080 ../mobile/www/

EXPOSE 5000

#CMD [ "npm", "run" , "serve" ]
CMD [ "serve","-s", "../mobile/www/" ]
#CMD [ "npx", "serve", "-s", "-l" , "tcp://localhost:8080", "../mobile/www/" ]


# docker build --tag richmotivefront:latest .
# docker run --name richmotivefront --d -p 4500:4500 richmotivefront:latest