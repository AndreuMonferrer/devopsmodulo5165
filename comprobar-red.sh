#!/usr/bin/env bash
# Comprobación de un portátil del aula y de la red para las prácticas del módulo 5165.
# Uso: bash comprobar-red.sh [IP_DEL_PROXMOX]
# Genera informe-red.txt en la carpeta actual.

PROXMOX=${1:-}
INFORME="informe-red.txt"
exec > >(tee "$INFORME") 2>&1

ok()  { echo "  OK     $*"; }
mal() { echo "  FALLA  $*"; }
t()   { timeout 8 "$@" >/dev/null 2>&1; }

echo "== Comprobación del módulo 5165 · $(date '+%F %H:%M') · $(hostname)"

echo; echo "1. Sistema y permisos"
echo "  Sistema: $(. /etc/os-release; echo "$PRETTY_NAME")  ·  Escritorio: ${XDG_CURRENT_DESKTOP:-?}"
echo "  CPU: $(nproc) núcleos  ·  RAM: $(free -g | awk '/Mem/{print $2}') GB  ·  Disco libre en /: $(df -h / | awk 'NR==2{print $4}')"
grep -qE 'vmx|svm' /proc/cpuinfo && ok "virtualización por hardware disponible" || mal "sin virtualización por hardware (VT-x/AMD-V)"
sudo -n true 2>/dev/null && ok "sudo sin contraseña" || { sudo -v && ok "sudo con contraseña" || mal "sin sudo"; }

echo; echo "2. Programas instalados"
for p in git curl jq python3 pip3 pipx docker podman terraform tofu ansible ssh nc; do
  command -v "$p" >/dev/null && ok "$p ($("$p" --version 2>/dev/null | head -1))" || mal "$p no instalado"
done

echo; echo "3. Proxy y DNS"
env | grep -i '_proxy=' | sed 's/^/  proxy: /' || true
[ -z "$(env | grep -i '_proxy=')" ] && echo "  (sin variables de proxy)"
echo "  IP pública del aula: $(curl -s --max-time 8 https://ifconfig.me || echo desconocida)"
getent hosts github.com >/dev/null && ok "resolución DNS" || mal "resolución DNS"

echo; echo "4. Salida SSH (puerto 22)"
out=$(timeout 10 ssh -T -o BatchMode=yes -o ConnectTimeout=8 -o StrictHostKeyChecking=accept-new git@github.com 2>&1)
echo "$out" | grep -qiE 'successfully|permission denied' && ok "SSH a github.com" || mal "SSH a github.com ($out)"
t nc -zv -w5 ssh.github.com 443 && ok "SSH por el puerto 443 (alternativa de GitHub)" || mal "puerto 443 de ssh.github.com"

echo; echo "5. Salida UDP"
python3 - <<'PY' && echo "  OK     consulta DNS por UDP a 1.1.1.1 (UDP sale)" || echo "  FALLA  UDP hacia Internet parece bloqueado"
import socket, sys
q = b'\x12\x34\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x06github\x03com\x00\x00\x01\x00\x01'
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.settimeout(5)
try: s.sendto(q, ("1.1.1.1", 53)); s.recv(512)
except Exception: sys.exit(1)
PY
echo "  (el puerto de WireGuard, UDP 51820, solo se puede confirmar con un servidor en la nube)"

echo; echo "6. Webs y servicios que usan las prácticas (HTTPS)"
for u in https://github.com https://api.github.com https://ghcr.io/v2/ https://registry-1.docker.io/v2/ \
         https://download.docker.com https://pypi.org/simple/ https://registry.terraform.io https://releases.hashicorp.com \
         https://apt.releases.hashicorp.com https://galaxy.ansible.com https://sonarcloud.io https://ntfy.sh \
         https://console.aws.amazon.com https://awsacademy.instructure.com https://portal.azure.com \
         https://app.diagrams.net https://calculator.aws https://cloud-images.ubuntu.com https://grafana.com ; do
  c=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$u")
  [ "$c" != "000" ] && ok "$u ($c)" || mal "$u (sin respuesta: bloqueada o sin salida)"
done

echo; echo "7. Descarga de imágenes de contenedor"
if command -v docker >/dev/null; then
  docker pull -q hello-world >/dev/null 2>&1 && ok "docker pull de Docker Hub" || mal "docker pull de Docker Hub"
  docker pull -q ghcr.io/aquasecurity/trivy:latest >/dev/null 2>&1 && ok "docker pull de ghcr.io" || mal "docker pull de ghcr.io"
  tok=$(curl -s --max-time 8 "https://auth.docker.io/token?service=registry.docker.io&scope=repository:ratelimitpreview/test:pull" | jq -r .token 2>/dev/null)
  [ -n "$tok" ] && echo "  Límite de Docker Hub para esta IP: $(curl -s --head -H "Authorization: Bearer $tok" https://registry-1.docker.io/v2/ratelimitpreview/test/manifests/latest | grep -i ratelimit | tr -d '\r' | tr '\n' ' ')"
else
  echo "  (Docker no instalado: se comprobará cuando esté)"
fi

echo; echo "8. Proxmox del centro"
if [ -n "$PROXMOX" ]; then
  c=$(curl -sk -o /dev/null -w '%{http_code}' --max-time 8 "https://$PROXMOX:8006")
  [ "$c" != "000" ] && ok "interfaz web y API en https://$PROXMOX:8006 ($c)" || mal "no se llega a https://$PROXMOX:8006"
  t nc -zv -w5 "$PROXMOX" 22 && ok "SSH al Proxmox" || mal "SSH al Proxmox (puede estar cerrado a propósito)"
  echo "  Red del portátil: $(ip -4 -o addr show scope global | awk '{print $4}' | tr '\n' ' ')"
else
  echo "  (sin comprobar: ejecutad el script con la IP del Proxmox como parámetro)"
fi

echo; echo "== Fin. Informe guardado en $INFORME"
