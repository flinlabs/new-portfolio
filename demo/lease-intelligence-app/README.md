# Lease Intelligence — sandbox demo

The real Lease Intelligence frontend, running in static mode on a fully
fabricated seven-lease portfolio (`src/staticData.js`). No real portfolio
data, no backend, no API keys — the live-synthesis path was removed for
the public build.

Build and refresh the embedded copy:

    npm install
    npx vite build --base=./
    rm -rf ../../public/lease-intelligence-demo
    cp -r dist ../../public/lease-intelligence-demo
