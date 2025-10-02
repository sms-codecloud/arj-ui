#install react

- npm install react
- npm install reactdom

#parcel

- npm install -D parcel parcel

#react-icons

- npm install react-icons

#react app to build

- npx parcel build index.html / npm run build

#react app to run

- npx parcel index.html / npm start

#react routing

- npm install react-router-dom
- If routing error appears follow below steps
  - Remove-Item -Recurse -Force node_modules, package-lock.json, .parcel-cache
  - npm install
  - npx parcel cache clear
  - npm install react-router-dom@latest
