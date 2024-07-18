# MoviePlay

Aplicación mobile para buscar tus películas favoritas. Desarrollada en React Native principalmente para Android. Backend realizado con Java 17 Springboot + PostgreSQL.

## Frontend

- **Repositorio**: [movieplay-frontend](https://github.com/ignacind/movieplay-frontend)

![ReactNative](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

Contar con [npm](https://nodejs.org/en) para instalar las dependencias.

1. Abrir la carpeta `frontend/` desde la terminal e instalar dependencias:

```bash
npm install
```

2. Tener en ejecución una instancia de un simulador Android, o tener un celular Android conectado con las opciones de developer adecuadas.

3. Para lanzar el proyecto frontend utilizar el comando:

```bash
npm run android
```

## Backend

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

Requisitos:

- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Docker](https://www.docker.com/products/docker-desktop/)

1. Abrir la carpeta `backend/backend-api` desde la terminal.
2. Ejecutar el comando:

```bash
docker-compose up --build
```

El proyecto backend se lanzará en una imagen de Docker junto a una imagen de PostgreSQL y una imagen de pgAdmin.

Los datos relevantes de la base de datos se pueden encontrar dentro del archivo `backend-api/docker-compose.yml`

Para ver la documentación de la API, puede utilizar el [Swagger](https://movieplay-api.onrender.com/swagger-ui/index.html) del deploy.

## Nuestro Equipo

| Integrante             | :octocat:                                                                                                                                                                                                        | Redes                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ignacio Indurain Moneo | <img src="https://i.imgur.com/lSGOyvY.jpeg" alt="Image" width="56vw">                                                                                                                                            | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ignacio-indurain-moneo/)[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nacho-93)               |
| Juan Ignacio Mendieta  | <img src="https://media.licdn.com/dms/image/D4D03AQHSnpjv8xZRzw/profile-displayphoto-shrink_800_800/0/1673963580446?e=1722470400&v=beta&t=VF0BPGFVAaYBDr7HT-M6vO0GdoTm-_t6SsqTLdPFCp8" alt="Image" width="56vw"> | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juan-ignacio-mendieta/)[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JuanxIG)                 |
| Santiago Rapetti       | <img src="https://media.licdn.com/dms/image/D4D03AQFaPnxMjtrmqg/profile-displayphoto-shrink_400_400/0/1693871652713?e=1722470400&v=beta&t=veSc4n-rVlmLSOMQuvS315KIjUs2xngnFBdNFGu_T1s" alt="Image" width="56vw"> | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/santiago-rapetti-728b5222a/)[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SantiRapetti)       |
| Tomás Santiago Sanjiao | <img src="https://media.licdn.com/dms/image/D4D03AQE_INKAFFuZXw/profile-displayphoto-shrink_400_400/0/1678295403019?e=1722470400&v=beta&t=nFAbi5xupJRO9bwF4WmQOgMMco51ORFA13fxjL8Ykp0" alt="Image" width="56vw"> | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tom%C3%A1s-santiago-sanjiao-ab060b231/)[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Tosa149) |
| Lucas Von Elm          | <img src="https://avatars.githubusercontent.com/u/70777709?v=4" alt="Image" width="56vw">                                                                                                                        | [![Android](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucasvonelm/)[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/xlucasve)                           |
