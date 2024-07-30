# Projekt MVP

## Opis

Projekt MVP to aplikacja, która pozwala na zarządzanie danymi w prosty i efektywny sposób. Poniżej znajdziesz instrukcje dotyczące klonowania repozytorium oraz uruchamiania aplikacji.

## Wymagania

- [Node.js](https://nodejs.org/) (zalecana wersja LTS)
- [Git](https://git-scm.com/)

## Instrukcje

### 1. Otwórz terminal lub wiersz poleceń

Na swoim komputerze otwórz terminal (Linux/Mac) lub wiersz poleceń (Windows).

### 2. Przejdź do katalogu

Przejdź do katalogu, w którym chcesz sklonować repozytorium. Użyj polecenia:

```bash
cd /ścieżka/do/katalogu
```

### 3. Sklonuj repozytorium

Użyj poniższego polecenia, aby sklonować repozytorium:

```bash
git clone https://github.com/AdrianPodraza/MVP
```

````

### 4. Przejdź do katalogu serwera
Po sklonowaniu repozytorium, przejdź do katalogu serwera:
```bash
cd server
````

### 5. Zainstaluj moduły serwera

Zainstaluj wszystkie moduły przy pomocy polecenia:

```bash
npm install
```

### 6. Zainstaluj moduły frontendu

Cofnij się do głównego katalogu i zainstaluj potrzebne moduły frontendu:

```bash
cd ..
npm install
```

### 7. Uruchom serwer

Otwórz dwa terminale:
W pierwszym terminalu, w katalogu serwera, wpisz:

```bash
npm start
```

W drugim terminalu, w katalogu głównym, wpisz:

```bash
npm run dev
```

### 8.Użycie

Po wykonaniu powyższych kroków, aplikacja powinna być uruchomiona i dostępna w przeglądarce
