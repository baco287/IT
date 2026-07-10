@echo off
rem Lokalen Vorschau-Server starten: Doppelklick oder "serve.cmd" im Terminal
echo Server laeuft auf http://localhost:8123 (Beenden mit Strg+C)
start http://localhost:8123
python -m http.server 8123
