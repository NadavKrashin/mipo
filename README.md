[![MiPo-120.png](https://i.postimg.cc/HL605V6h/MiPo-120.png)](https://postimg.cc/PL88nrsW)

# MiPo

מערכת למעקב וניהול נוכחות של צוערים

## Steps to setup

- Clone or Fork this project

- Create a .env file with a MONGO_URI variable

- Contact me to get your MONGO_URI value

- Fill mipo_template.xlsx with soldiers data

- Run initDB.js script to fill DB Data from the excel

- Visit https://mipo-pluga-b.fly.dev to view your PWA app.(Add to home screen to use it like a native application)

## Demo

#### 1. Clone or Fork this project

#### 2. Fill mipo_template.xlsx (for example):

[![image.png](https://i.postimg.cc/7LpNh0vm/image.png)](https://postimg.cc/d7jCS7Vy)

- Name: שם הצוער
- Team: מספר צוות
- Phone: טלפון נייד

כדי שלסגל יהיה משתמש, עליכם להשאיר את השורה האחרונה של משתמש הסגל.

#### 3. Run init script to fill DB with your excel data

```bash
  node initDB.js
```

## Authorizations

**צוערים** - מפולטרים אוטומית על הצוות שלהם ויכולים לסמן נוכחות, אין להם יכולות איפוס.

**ממ״שים** - רואים את המסך נוכחות ואת המסך של הצוערים בבית. מפולטרים אוטומטית על הצוות שלהם ויכולים לאפס את נוכחות רק עבור הצוות שלהם.

**ס.מפ** - רואה את כל המסכים + יכול לסמן צוער אחר בתור ממ״ש ולאפס נוכחות של כולם

**סגל** - רואים את כל המסכים + יכולים לסמן צוער בתור ממ״ש או ס.מפ

## Run Locally

Clone the project

```bash
  git clone https://github.com/NadavKrashin/mipo.git
```

Go to the project directory

```bash
  cd mipo
```

### Frontend

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
```

### Backend

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Screenshots

[![image.png](https://i.postimg.cc/prFKgkRw/image.png)](https://postimg.cc/ZvJ9N89H)
[![image.png](https://i.postimg.cc/x8Kk5N4j/image.png)](https://postimg.cc/jnSdd2TB)

- **כפתור נוכחות ירוק/אדום** - צוער מסמן עבור עצמו שהוא נוכח/לא נוכח
- **כפתור בית כחול/כתום** - צוער מסמן כשהוא מגיע הביתה ולחלופין כשהוא מגיע לבסיס
- **איפוס** - מאפס את הנוכחות בהתאם להרשאה שלך

## Tech Stack

**Client:** Vite, React, MUI, SocketIO

**Server:** Node, Express, SocketIO

**DB:** MongoDB

**Hosting**: Fly.io

_You may change anything to your preference_

## Deploy your own MiPo with Fly.io

**1.** Build frontend

```bash
  npm run build
```

**2.** Put frontend/dist files inside backend/views directory

**3.** Deploy with Fly.io (make sure to setup your Fly.io account [Fly.io](https://fly.io))

```bash
  fly deploy
```

## Authors

- [@NadavKrashin](https://www.github.com/NadavKrashin)
  contact me if you have any questions (;
