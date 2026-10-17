"""Explicitly import local game resources; never downloads or uploads content."""
import argparse,os,runpy,json
from pathlib import Path

parser=argparse.ArgumentParser(description='Import resources from your local Nekojishi 1.06s installation.')
parser.add_argument('--game-dir',required=True,help='Game folder, or its game subfolder containing data.rpa/media.rpa')
args=parser.parse_args()
game=Path(args.game_dir).expanduser().resolve()
if (game/'game'/'data.rpa').is_file():game=game/'game'
for archive in ['data.rpa','media.rpa']:
 if not (game/archive).is_file():parser.error(f'Missing archive: {archive}')
try:import PIL
except ImportError:parser.error('Pillow is required. Install it with python -m pip install -r scripts/requirements.txt')
os.environ['NEKOJISHI_GAME_DIR']=str(game)
root=Path(__file__).resolve().parent
runpy.run_path(str(root/'extract-assets.py'),run_name='__main__')
runpy.run_path(str(root/'prepare-vn-resources.py'),run_name='__main__')
(root.parent/'src'/'resource-pack.json').write_text(json.dumps({'kind':'game'}),encoding='utf-8')
print('Local import complete. Generated assets and dialogue files must stay private unless separately authorized.')
