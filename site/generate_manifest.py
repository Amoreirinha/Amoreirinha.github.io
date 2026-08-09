#!/usr/bin/env python3
"""
Escaneia as pastas 'images_and_videos' e 'audio' e gera um manifest.json
dentro de cada uma, listando os arquivos encontrados.

So' e' preciso rodar isso se voce' for publicar o site em um servidor que
NAO mostra listagem de pastas (Netlify, GitHub Pages, Vercel, S3, etc).

Se voce' abrir o site localmente com:
    python3 -m http.server 8000
... o carrossel ja' detecta os arquivos sozinho, sem precisar desse script.

Uso:
    python3 generate_manifest.py
Rode de novo sempre que adicionar/remover arquivos, antes de publicar.
"""
import json
from pathlib import Path

ROOT = Path(__file__).parent

IMAGE_VIDEO_EXT = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".heic",
    ".mp4", ".webm", ".mov", ".m4v",
}
AUDIO_EXT = {".mp3", ".m4a", ".wav", ".ogg"}


def write_manifest(folder: Path, extensions: set[str]) -> int:
    folder.mkdir(exist_ok=True)
    files = sorted(
        p.name
        for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in extensions and p.name != "manifest.json"
    )
    (folder / "manifest.json").write_text(json.dumps(files, ensure_ascii=False, indent=2), encoding="utf-8")
    return len(files)


if __name__ == "__main__":
    n_media = write_manifest(ROOT / "images_and_videos", IMAGE_VIDEO_EXT)
    n_audio = write_manifest(ROOT / "audio", AUDIO_EXT)
    print(f"images_and_videos: {n_media} arquivo(s) -> manifest.json gerado")
    print(f"audio: {n_audio} arquivo(s) -> manifest.json gerado")
