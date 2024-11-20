# Tesi: Sito Web per la Review di Immagini e Pagine Web con WebGazer

Questo progetto è il risultato della mia tesi e consiste in un sito web per la revisione di immagini o pagine web tramite l'uso di **WebGazer**, una tecnologia che utilizza la webcam per monitorare lo sguardo dell'utente sullo schermo. Il sito permette di condurre test mirati a raccogliere dati su dove gli utenti posano lo sguardo.

## Caratteristiche Principali

### Due Tipi di Utenti
1. **Creator**: Gli utenti che progettano e creano test, definendone il contenuto: immagini, pagine web, questionario finale.
2. **Tester**: Gli utenti che svolgono i test osservando le varie immagini e fornendo dati sul loro sguardo.

### Accesso ai Test
I test possono essere eseguiti anche da utenti non registrati come tester, grazie a:
  - Un **link diretto** al test, fornito da un creator.
  - Un **nickname**, per l'identificazione del partecipante.
  - Una **password**, anch'essa fornita dall'utente creator.

## Funzionalità
- **Monitoraggio dello sguardo**: Utilizzo di WebGazer per tracciare e analizzare il movimento degli occhi.
- **Creazione dei test**: Pannello dedicato ai creator per configurare test personalizzati.
- **Esecuzione dei test**: Interfaccia semplice e intuitiva per i tester, con raccolta di dati sullo sguardo in tempo reale.
- **Accesso sicuro ai test**: Possibilità di condividere test tramite link protetto da password.
- **Analisi dei risultati**: Esportazione e visualizzazione dei dati raccolti per la revisione e il miglioramento dei contenuti testati.

## Tecnologie Utilizzate
- **Frontend**: HTML, SCSS, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **WebGazer.js**: Libreria per il monitoraggio dello sguardo

## Come Utilizzare il Progetto
1. Clonare il repository:
   ```bash
   git clone https://github.com/AivAiv/GazeTracker-Tesi
2. Importare il database di esempio tramite il file fornito: `db/gazetrackerdb.sql`.