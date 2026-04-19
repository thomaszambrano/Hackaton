#!/usr/bin/env bash
# Ejecutar una vez (o tras actualizar la imagen de Chatwoot) antes de usar la UI en :3000.
set -euo pipefail
cd "$(dirname "$0")/.."
docker compose run --rm chatwoot_rails bundle exec rails db:chatwoot_prepare
