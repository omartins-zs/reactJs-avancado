#!/bin/sh
set -e

echo "=========================================================="
echo " Iniciando Portal ReactJS Avancado (DIO) na porta ${PORT:-3000}"
echo "=========================================================="

exec serve -s /app/build -l ${PORT:-3000}
